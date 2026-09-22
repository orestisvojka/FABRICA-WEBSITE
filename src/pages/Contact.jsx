import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Contact() {
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quolytech.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://quolytech.com/contact/"
      }
    ]
  };

  return (
    <div className="contact-page-outer">
      <SEOHead
        title="Contact QuolyTech | Start a Digital Project"
        description="Contact QuolyTech in Tiranë, Albania to discuss your web development, mobile app, AI agent, custom software, or digital growth project."
        canonicalPath="/contact/"
        jsonLd={breadcrumbJsonLd}
      />
      <div className="contact-container">
        <section className="contact-hero-section">
          {/* Main Title */}
          <motion.h1
            className="contact-page-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
          >
            Get in touch.
          </motion.h1>

          {/* 2-Column Contact Lockup Grid */}
          <motion.div
            className="contact-page-main-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {/* Left Column - Headline & Author Stamp */}
            <motion.div variants={itemVariants} className="contact-page-left-col">
              <h2 className="contact-page-subheadline">
                Have a project in mind? Reach out to us, and we'll discuss the best way to move forward.
              </h2>

              <div className="contact-author-stamp">
                <img
                  src="/team-lauren.png"
                  alt="Lauren Thompson"
                  className="contact-author-avatar"
                />
                <div className="contact-author-info">
                  <span className="contact-author-name">Lauren Thompson</span>
                  <span className="contact-author-role">Team Lead</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Interactive Form & Direct Details */}
            <motion.div variants={itemVariants} className="contact-page-right-col">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-page-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="contact-page-form-inner"
                  >
                    {errorMsg && (
                      <div className="contact-page-error">{errorMsg}</div>
                    )}

                    <div className="contact-input-field-group">
                      <label className="contact-input-label">Your name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="contact-page-input"
                        required
                      />
                    </div>

                    <div className="contact-input-field-group">
                      <label className="contact-input-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-page-input"
                        required
                      />
                    </div>

                    <div className="contact-input-field-group">
                      <label className="contact-input-label">Your message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="contact-page-textarea"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="contact-submit-row">
                      <motion.button
                        type="submit"
                        className="contact-page-send-btn"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      >
                        <span>{isSubmitting ? 'Sending...' : 'Send'}</span>
                        <span className="contact-send-dot">●</span>
                      </motion.button>

                      <span className="contact-disclaimer-text">
                        By submitting, you agree to our <strong>Terms</strong> and <strong>Privacy Policy</strong>.
                      </span>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-page-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="contact-page-success-card"
                  >
                    <div className="contact-success-icon-box">
                      <Check size={20} color="#10b981" />
                    </div>
                    <h3 className="contact-success-title">Message Received!</h3>
                    <p className="contact-success-desc">
                      Thank you for reaching out, <strong>{formData.name}</strong>. Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormData({ name: '', email: '', message: '' });
                        setIsSubmitted(false);
                      }}
                      className="contact-send-another-btn"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="contact-direct-details-block">
                <div className="contact-phone-block">
                  <a href="tel:+355684055007" className="contact-phone-link">
                    +355 68 405 5007
                  </a>
                </div>

                <div className="contact-email-block">
                  <a href="mailto:support@quolytech.com" className="contact-email-link">
                    support@quolytech.com
                  </a>
                </div>

                <div className="contact-social-links-list">
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="contact-social-item">
                    <span>Twitter</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-social-item">
                    <span>Instagram</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="contact-social-item">
                    <span>Dribbble</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 50/50 Split Landscape Cards Grid (Team & Office) */}
          <motion.div
            className="contact-landscape-cards-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {/* Card 1: Our Team */}
            <motion.div variants={itemVariants} className="contact-landscape-card" whileHover="hover">
              <div className="contact-landscape-top-bar">
                <span className="contact-landscape-title">Our team</span>
                <span className="contact-landscape-year">/(2024)</span>
              </div>
              <div className="contact-landscape-img-wrapper">
                <motion.img
                  src="/studio-team-group.png"
                  alt="Our Team"
                  className="contact-landscape-img"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.06 }
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
            </motion.div>

            {/* Card 2: Our Office */}
            <motion.div variants={itemVariants} className="contact-landscape-card" whileHover="hover">
              <div className="contact-landscape-top-bar">
                <span className="contact-landscape-title">Our office</span>
                <span className="contact-landscape-year">/(2024)</span>
              </div>
              <div className="contact-landscape-img-wrapper">
                <motion.img
                  src="/studio-team-collab.png"
                  alt="Our Office"
                  className="contact-landscape-img"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.06 }
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Trailing Section: Shared <Footer /> is rendered globally by App.jsx */}
    </div>
  );
}
