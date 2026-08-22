import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getQuolyBotSystemInstruction, getRealQuolyBotResponse } from '../data/quolybotKnowledge';

async function queryGeminiApiIfAvailable(messagesHistory, currentPromptText) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || !apiKey.startsWith('AIzaSy')) {
    return null;
  }

  const systemInstruction = getQuolyBotSystemInstruction();

  const formattedContents = messagesHistory
    .filter((m) => m.id !== 1)
    .map((m) => ({
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
      temperature: 0.7,
      maxOutputTokens: 350,
    },
  };

  const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash'];
  for (const model of modelsToTry) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          return candidateText.trim();
        }
      }
    } catch (err) {
      console.warn(`QuolyBot API query notice:`, err);
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
      text: "Hello! I'm QuolyBot, your AI Assistant at QuolyTech® Studio. Write a prompt or ask me anything about our design, development, or strategic growth services!",
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
    greet: 'AI Assistant • Online',
    thinking: 'Searching / Processing...',
    success: 'Success / Confirmed',
  };

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

  const handleSendPrompt = async (e) => {
    e?.preventDefault();
    if (!promptText.trim()) return;

    const userPrompt = promptText.trim();
    const userMsg = { id: Date.now(), sender: 'user', text: userPrompt };
    
    setMessages((prev) => [...prev, userMsg]);
    setPromptText('');
    setAvatarState('thinking');

    setTimeout(async () => {
      let responseText = null;

      try {
        responseText = await queryGeminiApiIfAvailable(messages, userPrompt);
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
        aria-label="Open QuolyBot Assistant"
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
                    <div className="quolybot-card-role">AI ASSISTANT AT QUOLYTECH®</div>
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

              {/* Prompt Input Form */}
              <form onSubmit={handleSendPrompt} className="quolybot-prompt-form">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Write a prompt..."
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
                <span>Ready to start a project?</span>
                <button
                  className="quolybot-talk-btn"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/contact');
                  }}
                >
                  Let's talk <span className="cta-status-dot"></span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
