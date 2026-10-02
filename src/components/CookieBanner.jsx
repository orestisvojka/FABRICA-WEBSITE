import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, Check, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    try {
      const consent = localStorage.getItem('quolytech_cookie_consent');
      if (!consent) {
        // Short delay so page loads first before banner smoothly slides in
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (_) {
      // In case localStorage is disabled/restricted
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('quolytech_cookie_consent', 'accepted');
    } catch (_) {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('quolytech_cookie_consent', 'essential');
    } catch (_) {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          className="cookie-banner-island"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="region"
          aria-label="Cookie Consent Banner"
        >
          <div className="cookie-banner-glass">
            <div className="cookie-banner-header">
              <div className="cookie-icon-wrapper">
                <Cookie size={18} className="cookie-lucide-icon" />
              </div>
              <div className="cookie-title-group">
                <span className="cookie-main-title">Cookie & Telemetry Preferences</span>
                <span className="cookie-badge">Privacy First</span>
              </div>
              <button 
                className="cookie-dismiss-btn"
                onClick={handleEssentialOnly}
                aria-label="Close and accept essential only"
                title="Accept essential cookies only"
              >
                <X size={15} />
              </button>
            </div>

            <p className="cookie-banner-text">
              We use essential cookies and anonymous performance telemetry to deliver high-velocity interactions and personalized experiences. Review our{' '}
              <Link to="/privacy" className="cookie-policy-link">Privacy Policy</Link> and{' '}
              <Link to="/terms" className="cookie-policy-link">Terms</Link>.
            </p>

            <div className="cookie-action-buttons">
              <button 
                className="cookie-btn cookie-btn-primary" 
                onClick={handleAcceptAll}
              >
                <Check size={14} />
                <span>Accept All Cookies</span>
              </button>
              
              <button 
                className="cookie-btn cookie-btn-ghost" 
                onClick={handleEssentialOnly}
              >
                <span>Essential Only</span>
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
