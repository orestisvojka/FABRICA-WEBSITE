import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <h2 className="footer-heading">Let's craft your next digital breakthrough.</h2>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '24px' }}>
              Subscribe to our monthly studio journal for insights on web performance, brand strategy, and design systems.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer-input"
              />
              <button type="submit" className="btn-primary btn-dark" style={{ padding: '14px 24px' }}>
                {subscribed ? (
                  <>
                    Subscribed <Check size={18} color="#10b981" />
                  </>
                ) : (
                  <>
                    Join <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-col-links">
              <Link to="/">Home</Link>
              <Link to="/studio">Studio</Link>
              <Link to="/projects">Projects (27)</Link>
              <Link to="/blog">Blog & Journal</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-col-links">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://dribbble.com" target="_blank" rel="noreferrer">Dribbble</a>
              <a href="mailto:hello@fabrica.com">hello@fabrica.com</a>
              <a href="tel:+14155550199">+1 (415) 555-0199</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} fabrica® Studio. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
