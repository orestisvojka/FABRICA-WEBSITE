import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, X, CheckCircle, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4500';
      const endpoint = activeTab === 'login' ? 'login' : 'register';
      const res = await fetch(`${backendUrl}/api/auth/${endpoint}`, {
        method: 'POST',
        credentials: 'include', // the session is a cookie shared with the dashboard
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        alert(data.error || 'Authentication failed. Please try again.');
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Editors and admins continue into the CMS dashboard, already signed in
        if (data.user && data.user.role !== 'VIEWER') {
          window.location.href = data.dashboardUrl;
        }
      }, 1800);
    } catch {
      setIsLoading(false);
      alert('Could not reach the server. Is the backend running? (node backend/server.mjs)');
    }
  };

  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setIsSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="auth-modal-wrapper">
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* High-End Auth Card Modal */}
          <motion.div
            className="auth-modal-card"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          >
            {/* Top Bar Layout containing Tab Switcher & Close Button cleanly separated */}
            <div className="auth-modal-top-bar">
              {/* Sliding Pill Tab Switcher */}
              <div className="auth-tabs-switcher">
                <button
                  className={`auth-tab-btn ${activeTab === 'login' ? 'is-active' : ''}`}
                  onClick={() => handleTabSwitch('login')}
                  type="button"
                >
                  {activeTab === 'login' && (
                    <motion.div
                      layoutId="authActivePill"
                      className="auth-tab-active-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="auth-tab-text">Log In</span>
                </button>

                <button
                  className={`auth-tab-btn ${activeTab === 'signup' ? 'is-active' : ''}`}
                  onClick={() => handleTabSwitch('signup')}
                  type="button"
                >
                  {activeTab === 'signup' && (
                    <motion.div
                      layoutId="authActivePill"
                      className="auth-tab-active-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="auth-tab-text">Sign Up</span>
                </button>
              </div>

              {/* Close Button */}
              <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <motion.div
                className="auth-success-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={48} className="auth-success-icon" />
                <h3>{activeTab === 'login' ? 'Authenticated!' : 'Account Created!'}</h3>
                <p>Redirecting you to your QuolyTech dashboard...</p>
              </motion.div>
            ) : (
              /* Smooth Sliding Form Content */
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="auth-slide-content"
                >
                  {/* Header Lockup */}
                  <div className="auth-header-lockup">
                    <div className="auth-logo-tag">QUOLYTECH® CLIENT PORTAL</div>
                    <h2 className="auth-modal-title">
                      {activeTab === 'login' ? 'Welcome back.' : 'Create account.'}
                    </h2>
                    <p className="auth-modal-sub">
                      {activeTab === 'login'
                        ? 'Access your studio projects, project roadmaps, and client dashboard.'
                        : 'Start your agency collaboration and track your branding & web projects.'}
                    </p>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="auth-social-grid">
                    <button
                      type="button"
                      className="auth-social-btn"
                      onClick={() => handleSubmit({ preventDefault: () => {} })}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Google</span>
                    </button>

                    <button
                      type="button"
                      className="auth-social-btn"
                      onClick={() => handleSubmit({ preventDefault: () => {} })}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </button>
                  </div>

                  <div className="auth-divider">
                    <span>or continue with email</span>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="auth-form-body">
                    {activeTab === 'signup' && (
                      <motion.div
                        className="auth-input-group"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="auth-input-label">Full Name*</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="auth-input-field"
                          required
                        />
                      </motion.div>
                    )}

                    <div className="auth-input-group">
                      <label className="auth-input-label">Email Address*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hello@quolytech.com"
                        className="auth-input-field"
                        required
                      />
                    </div>

                    <div className="auth-input-group">
                      <div className="auth-label-row">
                        <label className="auth-input-label">Password*</label>
                        {activeTab === 'login' && (
                          <button
                            type="button"
                            className="auth-forgot-link"
                            onClick={() => alert('Password reset instructions sent to your email.')}
                          >
                            Forgot?
                          </button>
                        )}
                      </div>
                      <div className="auth-password-wrapper">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="auth-input-field"
                          required
                        />
                        <button
                          type="button"
                          className="auth-eye-btn"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {activeTab === 'signup' && (
                      <div className="auth-checkbox-group">
                        <input
                          type="checkbox"
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="agreeTerms">
                          I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
                        </label>
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="auth-submit-btn"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <div className="auth-spinner-wrap">
                          <span className="auth-spinner"></span>
                          <span>Authenticating...</span>
                        </div>
                      ) : (
                        <>
                          <span>{activeTab === 'login' ? 'Log In' : 'Create Account'}</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
