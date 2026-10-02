import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getQuolyBotSystemInstruction, getRealQuolyBotResponse } from '../data/quolybotKnowledge';

// Replies render as plain text, so drop any markdown the model slips in.
const cleanReply = (text) =>
  text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/^#+\s*/gm, '')
    .replace(/^\s*[*-]\s+/gm, '• ')
    .trim();

// Last turns of the conversation, starting with a user turn as Gemini requires.
function buildHistory(messagesHistory) {
  const turns = messagesHistory.filter((m) => m.id !== 1).slice(-12);
  while (turns.length && turns[0].sender !== 'user') turns.shift();
  return turns;
}

// Preferred path: the QuolyTech backend keeps the API key server-side.
async function queryBackendIfConfigured(messagesHistory, currentPromptText) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) return null;

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, '')}/api/chatbot/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: currentPromptText,
        history: buildHistory(messagesHistory).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          text: m.text,
        })),
      }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    // Only trust live AI answers; the backend's keyword fallback is less specific than ours.
    return data.source === 'gemini' && data.reply ? cleanReply(data.reply) : null;
  } catch (err) {
    console.warn('QuolyBot backend notice:', err);
    return null;
  }
}

async function queryGeminiApiIfAvailable(messagesHistory, currentPromptText) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const systemInstruction = getQuolyBotSystemInstruction();

  const formattedContents = buildHistory(messagesHistory).map((m) => ({
    role: m.sender === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }));

  formattedContents.push({
    role: 'user',
    parts: [{ text: currentPromptText }],
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: formattedContents,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 1024,
      thinkingConfig: { thinkingLevel: 'low' },
    },
  };

  // Strongest model first; the lite models are the fallback when flash models
  // are overloaded (503). Each attempt is capped so a visitor never waits long.
  const modelsToTry = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-3-flash-preview'];
  for (const model of modelsToTry) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts
          ?.map((p) => p.text || '')
          .join('');
        if (candidateText) {
          return cleanReply(candidateText);
        }
      }
    } catch (err) {
      console.warn(`QuolyBot API query notice:`, err);
    } finally {
      clearTimeout(timer);
    }
  }

  return null;
}

export default function QuolyBotGadget() {
  const [isOpen, setIsOpen] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [avatarState, setAvatarState] = useState('greet'); // 'greet' | 'thinking' | 'success'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hey! I'm QuolyBot, QuolyTech's AI assistant. We build AI agents, startup and SaaS products, web and mobile apps, and the design and marketing that bring them customers.\n\nWhat's the one problem costing your business the most time or money right now?",
    },
  ]);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const avatarImages = {
    greet: '/quolybot-main.png',
    thinking: '/quolybot-thinking.png',
    success: '/quolybot-success.png',
  };

  const statusLabels = {
    greet: 'Growth Partner • Online',
    thinking: 'Analyzing Bottlenecks...',
    success: 'Strategy Ready',
  };

  const quickPrompts = [
    "What's the ROI on an AI agent?",
    "Why not cheap freelancers?",
    "What's the pricing & timeline?",
    "Book a 15-min Strategy Call",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      scrollToBottom();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const triggerPrompt = async (prompt) => {
    if (!prompt || !prompt.trim() || avatarState === 'thinking') return;

    const userPrompt = prompt.trim();
    const userMsg = { id: Date.now(), sender: 'user', text: userPrompt };
    
    setMessages((prev) => [...prev, userMsg]);
    setPromptText('');
    setAvatarState('thinking');

    setTimeout(async () => {
      let responseText = null;

      try {
        responseText =
          (await queryBackendIfConfigured(messages, userPrompt)) ||
          (await queryGeminiApiIfAvailable(messages, userPrompt));
      } catch (err) {
        responseText = null;
      }

      if (!responseText) {
        responseText = getRealQuolyBotResponse(userPrompt);
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: responseText },
      ]);
      setAvatarState('success');

      setTimeout(() => {
        setAvatarState('greet');
      }, 2500);
    }, 650);
  };

  const handleSendPrompt = (e) => {
    e?.preventDefault();
    triggerPrompt(promptText);
  };

  return (
    <>
      {/* Floating Trigger Widget (Bottom Right) */}
      <motion.button
        className="quolybot-trigger-btn"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open QuolyBot Sales & Growth Strategist"
      >
        <div className="quolybot-trigger-avatar-wrapper">
          <motion.img
            key={avatarState}
            src={avatarImages[avatarState]}
            alt="QuolyBot AI"
            className="quolybot-trigger-avatar-img"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <span className="quolybot-trigger-pulse"></span>
        </div>
        <div className="quolybot-trigger-text-col">
          <span className="quolybot-trigger-title">QuolyBot</span>
          <span className="quolybot-trigger-sub">{statusLabels[avatarState]}</span>
        </div>
      </motion.button>

      {/* Modal with Backdrop Blur */}
      <AnimatePresence>
        {isOpen && (
          <div className="quolybot-modal-wrapper">
            {/* Blurry Background Backdrop Overlay */}
            <motion.div
              className="quolybot-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Bottom-Right White CTA-Style Card Modal */}
            <motion.div
              className="quolybot-modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            >
              {/* Header inside White CTA Card */}
              <div className="quolybot-card-header">
                <div className="quolybot-header-left">
                  <motion.img
                    key={avatarState}
                    src={avatarImages[avatarState]}
                    alt="QuolyBot Avatar"
                    className="quolybot-card-avatar"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                  <div className="quolybot-header-meta">
                    <div className="quolybot-card-role">GROWTH STRATEGIST AT QUOLYTECH®</div>
                    <div className="quolybot-card-name">QuolyBot</div>
                    <div className="quolybot-state-badge">
                      <span className={`quolybot-state-dot ${avatarState}`}></span>
                      {statusLabels[avatarState]}
                    </div>
                  </div>
                </div>
                <button
                  className="quolybot-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close QuolyBot"
                >
                  ✕
                </button>
              </div>

              {/* Chat Conversation Window */}
              <div 
                className="quolybot-chat-body"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`quolybot-msg-row ${
                      msg.sender === 'user' ? 'user-msg-row' : 'bot-msg-row'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <img
                        src={avatarImages[avatarState]}
                        alt="QuolyBot"
                        className="quolybot-msg-thumb"
                      />
                    )}
                    <div
                      className={`quolybot-msg-bubble ${
                        msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'
                      }`}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {avatarState === 'thinking' && (
                  <div className="quolybot-msg-row bot-msg-row">
                    <img
                      src="/quolybot-thinking.png"
                      alt="Thinking"
                      className="quolybot-msg-thumb"
                    />
                    <div className="quolybot-msg-bubble bot-bubble quolybot-typing-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Objection / Topic Chips */}
              <div 
                style={{
                  display: 'flex',
                  gap: '6px',
                  overflowX: 'auto',
                  padding: '8px 14px',
                  background: '#f8fafc',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                  scrollbarWidth: 'none',
                }}
              >
                {quickPrompts.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => triggerPrompt(chip)}
                    disabled={avatarState === 'thinking'}
                    style={{
                      whiteSpace: 'nowrap',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.12)',
                      color: '#0f172a',
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Prompt Input Form */}
              <form onSubmit={handleSendPrompt} className="quolybot-prompt-form">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Ask about ROI, bottlenecks, pricing, or timeline..."
                  className="quolybot-prompt-input"
                />
                <button
                  type="submit"
                  className="quolybot-send-btn"
                  disabled={avatarState === 'thinking'}
                >
                  Send
                </button>
              </form>

              {/* Direct Booking Link */}
              <div className="quolybot-card-footer-cta">
                <span>Ready to solve your bottleneck?</span>
                <button
                  className="quolybot-talk-btn"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/contact');
                  }}
                >
                  Book Strategy Audit <span className="cta-status-dot"></span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
