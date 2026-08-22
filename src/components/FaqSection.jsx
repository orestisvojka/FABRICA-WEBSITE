import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: "How long does it take to build a website?",
    answer: "Typically, a standard project takes 2 to 3 weeks from kickoff to launch, depending on the scope and prompt feedback."
  },
  {
    id: 2,
    question: "Do you offer custom websites or use templates?",
    answer: "We build fully custom, high-converting websites tailored specifically to your brand identity and business objectives."
  },
  {
    id: 3,
    question: "What's included in your SEO services?",
    answer: "Our SEO services include technical optimization, on-page SEO, speed enhancements, keyword targeting, and structured metadata."
  },
  {
    id: 4,
    question: "How does the monthly subscription model work?",
    answer: "Our monthly model provides ongoing design iterations, continuous SEO optimizations, regular updates, and dedicated support."
  },
  {
    id: 5,
    question: "Can you redesign my existing website?",
    answer: "Yes! We specialize in transforming outdated websites into modern, high-performing digital experiences."
  },
  {
    id: 6,
    question: "How do I get started?",
    answer: "Just reach out! We'll discuss your needs, create a plan, and get to work on your website."
  }
];

export default function FaqSection() {
  const [expandedIdx, setExpandedIdx] = useState(5); // Default expand the last card like the site demo
  const containerRef = useRef(null);

  // Scroll-triggered Entrance with margin offset "-100px 0px"
  const isInView = useInView(containerRef, { once: true, amount: 0.15, margin: "-100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const toggleAccordion = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section-outer" ref={containerRef}>
      <div className="faq-container">
        <motion.div
          className="faq-split-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Column (40% Width) - Anchor Typography */}
          <motion.div variants={itemVariants} className="faq-left-col">
            <h2 className="faq-main-title">FAQ.</h2>
            <p className="faq-subtext">
              Got questions? We've got answers. Here's everything you need to know about working with us.
            </p>
          </motion.div>

          {/* Right Column (60% Width) - Stacked White Accordion Cards */}
          <div className="faq-right-col">
            <div className="faq-card-stack">
              {faqs.map((faq, idx) => {
                const isOpen = expandedIdx === idx;
                return (
                  <motion.div
                    key={faq.id}
                    variants={itemVariants}
                    layout
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className={`faq-card ${isOpen ? 'faq-card-open' : ''}`}
                    onClick={() => toggleAccordion(idx)}
                  >
                    {/* Card Header Row */}
                    <div className="faq-card-header">
                      <h3 className="faq-question-text">{faq.question}</h3>

                      <motion.div
                        className="faq-icon-badge"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Fluid Expandable Content Area */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                          className="faq-answer-wrapper"
                        >
                          <p className="faq-answer-text">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
