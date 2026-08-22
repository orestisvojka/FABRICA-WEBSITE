import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FloatingAvatar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Only render the floating team lead card on subpages if needed, with floating badges removed
  if (isHome) return null;

  return (
    <div className="template-badge-container">
      <motion.div 
        className="hero-cta-card" 
        style={{ cursor: 'pointer', marginBottom: '8px' }}
        onClick={() => navigate('/contact')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img
          src="/lauren.png"
          alt="Lauren Thompson"
          className="cta-avatar-img"
          style={{ width: '60px', height: '70px', borderRadius: '12px' }}
        />
        <div className="cta-card-content">
          <div className="cta-card-role">Team Lead at QuolyTech®</div>
          <div className="cta-card-name" style={{ fontSize: '15px', marginBottom: '6px' }}>Lauren Thompson</div>
          <button className="cta-card-btn" style={{ padding: '6px 14px', fontSize: '11px' }}>
            Let's talk <span className="cta-status-dot"></span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
