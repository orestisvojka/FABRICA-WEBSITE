import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          fabrica<sup>®</sup>
        </Link>

        <nav className="nav-links">
          <Link to="/studio" className={`nav-link ${isActive('/studio') ? 'active' : ''}`}>
            Studio
          </Link>
          <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`}>
            Projects <span className="badge-sup">27</span>
          </Link>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
            Blog
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact
          </Link>
        </nav>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: '#121212',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            padding: '40px'
          }}
        >
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-display)' }}
          >
            Home
          </Link>
          <Link 
            to="/studio" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-display)' }}
          >
            Studio
          </Link>
          <Link 
            to="/projects" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-display)' }}
          >
            Projects (27)
          </Link>
          <Link 
            to="/blog" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-display)' }}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '32px', fontWeight: '700', fontFamily: 'var(--font-display)' }}
          >
            Contact
          </Link>
        </div>
      )}
    </>
  );
}
