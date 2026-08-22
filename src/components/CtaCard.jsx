import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

export default function CtaCard() {
  const navigate = useNavigate();

  return (
    <div className="hero-cta-card">
      <div className="cta-avatar-icon-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
        <Crown size={22} color="#ffffff" />
      </div>
      <div className="cta-card-content">
        <div className="cta-card-role">
          <div>Team Lead</div>
          <div>at QuolyTech®</div>
        </div>
        <div className="cta-card-name">Lauren Thompson</div>
        <motion.button 
          className="cta-card-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          onClick={() => navigate('/contact')}
        >
          Let's talk
          <span className="cta-status-dot"></span>
        </motion.button>
      </div>
    </div>
  );
}
