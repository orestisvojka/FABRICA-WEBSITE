import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ContactSection() {
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate submission API latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
    setErrorMsg('');
  };

  return (
    <div className="contact-outer-wrapper">
      <motion.section 
        className="contact-island-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Kinetic Dark Atmosphere Texture */}
        <img 
          src="/hero-texture.png" 
          alt="Dark atmospheric background" 
          className="contact-texture-bg"
        />

        <div className="contact-container">
          <motion.div
            className="contact-split-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {/* Left Column - Crisp White Interactive Form Card */}
            <motion.div variants={itemVariants} className="contact-left-col">
              <div className="contact-form-card">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="contact-form-inner"
                    >
                      <span className="contact-form-tag">Tell us more</span>
                      <h3 className="contact-form-title">
                        Have a project <span className="contact-form-title-bold">in mind?</span>
                      </h3>

                      {errorMsg && (
                        <div className="contact-form-error">
                          {errorMsg}
                        </div>
                      )}

                      <div className="contact-field-group">
                        <label className="contact-field-label">Your name*</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="contact-form-input"
                          required
                        />
                      </div>

                      <div className="contact-field-group">
                        <label className="contact-field-label">Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="hello@site.com"
                          className="contact-form-input"
                          required
                        />
                      </div>

                      <div className="contact-field-group">
                        <label className="contact-field-label">Message*</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message"
                          className="contact-form-textarea"
                          rows={4}
                          required
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className="contact-submit-btn"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      >
                        {isSubmitting ? (
                          <div className="contact-btn-spinner-wrap">
                            <span className="contact-btn-spinner"></span>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <span>Send Message</span>
                        )}
                      </motion.button>

                      <p className="contact-privacy-disclaimer">
                        By submitting, you agree to our <strong>Terms</strong> and <strong>Privacy Policy</strong>.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-response"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="contact-success-state"
                    >
                      <motion.div 
                        className="contact-success-icon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>

                      <h3 className="contact-success-title">Message sent!</h3>
                      <p className="contact-success-desc">
                        Thank you for reaching out, <strong>{formData.name}</strong>. We've received your project inquiry and our team will get back to you within 24 hours.
                      </p>

                      <motion.button
                        onClick={handleReset}
                        className="contact-reset-btn"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Send another message
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Watermark Footer */}
              <div className="contact-watermark">
                © 2026 QuolyTech® Studio
              </div>
            </motion.div>

            {/* Right Column - "Let's talk." Typography & Team Lead Card */}
            <motion.div variants={itemVariants} className="contact-right-col">
              <div className="contact-right-top">
                <h2 className="contact-main-headline">Let's talk.</h2>
                <p className="contact-main-subtitle">
                  Tell us about your project—whether it's a website, SEO, or marketing.
                </p>
              </div>

              <div className="contact-features-grid">
                <div className="contact-feature-item">
                  <div className="contact-feature-header">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    <span>Quick response</span>
                  </div>
                  <p className="contact-feature-desc">
                    If you're ready to create and collaborate, we'd love to hear from you.
                  </p>
                </div>

                <div className="contact-feature-item">
                  <div className="contact-feature-header">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    <span>Clear next steps</span>
                  </div>
                  <p className="contact-feature-desc">
                    After the consultation, we'll provide you with a detailed plan and timeline.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
