import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ onOpenAuth }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="header">
        <div className="header-pill">
          <Link to="/" className="logo" aria-label="QuolyTech home">
            <img src="/favicon.png" alt="QuolyTech" className="header-pill-logo" />
          </Link>

          <nav className="nav-links">
            <Link to="/studio" className={`nav-link ${isActive('/studio') ? 'active' : ''}`}>
              Studio
            </Link>
            <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>
              Projects
            </Link>
            <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
              Blog
            </Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
              Contact
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <Link to="/contact" className="header-talk-btn">
              Let's talk
            </Link>

            <button
              className="header-auth-btn"
              onClick={onOpenAuth}
              type="button"
            >
              Log in
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hamburger-toggle"
              aria-label="Toggle Navigation"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              backgroundColor: '#ffffff',
              color: '#111111',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px',
              padding: '40px'
            }}
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '32px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '32px', fontWeight: '700' }}
            >
              Home
            </Link>
            <Link 
              to="/studio" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '32px', fontWeight: '700' }}
            >
              Studio
            </Link>
            <Link 
              to="/projects" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '32px', fontWeight: '700' }}
            >
              Projects
            </Link>
            <Link 
              to="/blog" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '32px', fontWeight: '700' }}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '32px', fontWeight: '700' }}
            >
              Contact
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuth) onOpenAuth();
              }}
              style={{
                backgroundColor: '#09090b',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                padding: '14px 36px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '12px'
              }}
            >
              Log in / Sign up
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
