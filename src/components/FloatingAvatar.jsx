import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FloatingAvatar() {
  const navigate = useNavigate();

  return (
    <div className="floating-avatar-card" onClick={() => navigate('/contact')}>
      <img
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
        alt="Lauren Thompson - Team Lead"
        className="avatar-img"
      />
      <div className="avatar-info">
        <span className="avatar-role">Team Lead at fabrica®</span>
        <span className="avatar-name">Lauren Thompson</span>
        <button className="avatar-btn">
          Let's talk <span className="online-dot"></span>
        </button>
      </div>
    </div>
  );
}
