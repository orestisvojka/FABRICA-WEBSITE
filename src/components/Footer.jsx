import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const navigate = useNavigate();
  const footerRef = useRef(null);

  // Newsletter Form State
  const [newsName, setNewsName] = useState('');
  const [newsEmail, setNewsEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isInView = useInView(footerRef, { once: true, amount: 0.1, margin: "-50px 0px" });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsName.trim() || !newsEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 1000);
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <footer className="footer-replica" ref={footerRef}>
      <div className="footer-main-container">
        <motion.div
          className="footer-content-wrap"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Top Row: Mission Statement & Newsletter Form */}
          <div className="footer-top-grid">
            {/* Left: Statement & Manager Stamp */}
            <motion.div variants={itemVariants} className="footer-statement-col">
              <p className="footer-statement-text">
                Whether you're looking to build a stunning website, boost your brand, or drive measurable results,{' '}
                <strong className="footer-bold-text">we're here to help.</strong>
              </p>

              {/* Client Success Manager Stamp */}
              <div 
                className="footer-manager-stamp"
                onClick={() => navigate('/team/henri-bajramaj')}
                style={{ cursor: 'pointer' }}
                title="View Henri Bajramaj Profile"
              >
                <div className="footer-manager-avatar footer-manager-icon-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="footer-manager-info">
                  <span className="footer-manager-name">Henri Bajramaj</span>
                  <span className="footer-manager-role">Client Manager & Partnerships</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Newsletter Form */}
            <motion.div variants={itemVariants} className="footer-newsletter-col">
              <h3 className="footer-newsletter-title">Newsletter</h3>

              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form
                    key="news-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className="footer-newsletter-form"
                  >
                    <div className="footer-input-group">
                      <label className="footer-input-label">Your name *</label>
                      <input
                        type="text"
                        value={newsName}
                        onChange={(e) => setNewsName(e.target.value)}
                        placeholder="John Doe"
                        className="footer-line-input"
                        required
                      />
                    </div>

                    <div className="footer-input-group">
                      <label className="footer-input-label">Email *</label>
                      <input
                        type="email"
                        value={newsEmail}
                        onChange={(e) => setNewsEmail(e.target.value)}
                        placeholder="hello@site.com"
                        className="footer-line-input"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="footer-subscribe-btn"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    >
                      {isSubmitting ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <span className="footer-sub-dot"></span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="news-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="footer-news-success"
                  >
                    <div className="footer-news-success-badge">✓</div>
                    <p className="footer-news-success-text">
                      Subscribed! Thank you for joining our newsletter, <strong>{newsName}</strong>.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="footer-newsletter-subtext">
                Join our newsletter and stay updated on the latest trends in digital design.
              </p>
            </motion.div>
          </div>

          {/* Middle Row: Crosshairs, Direct Contact & Links Grid */}
          <div className="footer-middle-grid">
            <div className="footer-crosshairs-row">
              <span className="footer-crosshair">+</span>
              <span className="footer-crosshair">+</span>
              <span className="footer-crosshair">+</span>
            </div>

            <div className="footer-links-layout">
              {/* Direct Contact Column */}
              <motion.div variants={itemVariants} className="footer-contact-col">
                <a href="tel:+355684055007" className="footer-phone-number">+355 68 405 5007</a>
                <motion.a
                  href="mailto:support@quolytech.com"
                  className="footer-email-link"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="footer-email-dot">●</span>
                  <span className="footer-email-text">support@quolytech.com</span>
                </motion.a>
              </motion.div>

              {/* Navigation Column */}
              <motion.div variants={itemVariants} className="footer-nav-col">
                <h4 className="footer-col-heading">Navigation</h4>
                <ul className="footer-link-list">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/studio">Studio</Link></li>
                  <li><Link to="/services/">Services</Link></li>
                  <li><Link to="/industries/">Industries</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/404">404 Error Page</Link></li>
                </ul>
              </motion.div>

              {/* Social Column */}
              <motion.div variants={itemVariants} className="footer-social-col">
                <h4 className="footer-col-heading">Social</h4>
                <ul className="footer-link-list">
                  <li>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                      Twitter <span>↗</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                      Instagram <span>↗</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://dribbble.com" target="_blank" rel="noreferrer">
                      Dribbble <span>↗</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Giant Brand Lockup */}
          <motion.div variants={itemVariants} className="footer-brand-lockup">
            <p className="footer-giant-title">QuolyTech®</p>
            <span className="footer-giant-subtitle">Studio</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Dark Architectural Bottom Copyright Bar */}
      <div className="footer-dark-bar">
        <div className="footer-dark-container">
          <div className="footer-dark-left">
            © 2026 QuolyTech® Studio. All rights reserved.
          </div>

          <div className="footer-dark-center">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-bar-sep">•</span>
            <Link to="/terms">Terms of Service</Link>
            <span className="footer-bar-sep">•</span>
            <Link to="/404">404 Page</Link>
          </div>

          <div className="footer-dark-right"></div>
        </div>
      </div>
    </footer>
  );
}
