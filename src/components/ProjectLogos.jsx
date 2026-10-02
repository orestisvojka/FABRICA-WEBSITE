import React from 'react';

export const getProjectLogo = (slug, title) => {
  const normalized = (slug || '').toLowerCase();

  switch (normalized) {
    case 'shqiponja':
    case 'shqiponja-energy':
    case 'boltshift':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#FFFFFF" fillOpacity="0.9" stroke="#FFFFFF" />
          </svg>
          <span>Shqiponja</span>
        </div>
      );

    case 'valence':
    case 'valence-studio':
    case 'ephemeral':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FFFFFF" />
            <path d="M3 9h18M9 21V9" stroke="#FFFFFF" />
          </svg>
          <span>Valence</span>
        </div>
      );

    case 'omega-architecture':
    case 'mono-store':
    case 'omega':
    case 'powersurge':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20h4.5a3 3 0 0 0 2.8-1.95L12 14l1.7 4.05A3 3 0 0 0 16.5 20H21" />
            <path d="M12 4a7 7 0 0 0-7 7c0 2.5 1.3 4.7 3.3 6" />
            <path d="M12 4a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6" />
          </svg>
          <span>Omega</span>
        </div>
      );

    case 'paperfolio':
    case 'paperfolio-studio':
    case 'mastermail':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
            <rect x="6" y="2" width="14" height="16" rx="2" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" />
            <rect x="2" y="6" width="14" height="16" rx="2" fill="#FFFFFF" stroke="#FFFFFF" fillOpacity="0.85" />
            <line x1="5" y1="11" x2="13" y2="11" stroke="#000000" strokeWidth="2" />
            <line x1="5" y1="15" x2="11" y2="15" stroke="#000000" strokeWidth="2" />
          </svg>
          <span>Paperfolio</span>
        </div>
      );

    case 'meridian-analytics':
    case 'fin-analytics':
    case 'meridian':
    case 'warpspeed':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="m7 15 4-4 4 3 6-7" />
            <circle cx="21" cy="7" r="2" fill="#FFFFFF" />
          </svg>
          <span>Meridian</span>
        </div>
      );

    case 'katachi':
    case 'katachi-design':
    case 'cloudwatch':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
            <circle cx="12" cy="12" r="9" stroke="#FFFFFF" />
            <path d="M8 12h8M12 8v8" stroke="#FFFFFF" />
          </svg>
          <span>Katachi</span>
        </div>
      );

    case 'vendome':
    case 'vendome-joaillerie':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12l4 6-10 12L2 9l4-6z" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" />
            <path d="M2 9h20M10 3l-2 6 4 12 4-12-2-6" stroke="#FFFFFF" />
          </svg>
          <span>Vendôme</span>
        </div>
      );

    case 'quolix':
    case 'quolix-ai':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#FFFFFF" />
          </svg>
          <span>Quolix AI</span>
        </div>
      );

    case 'skooly-edu':
    case 'skooly':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" />
            <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" stroke="#FFFFFF" />
          </svg>
          <span>Skooly</span>
        </div>
      );

    case 'pavlos-kolias':
    case 'pavloskolias':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16l-7 8 7 8H4" stroke="#FFFFFF" />
          </svg>
          <span>Pavlos Kolias</span>
        </div>
      );

    case 'edumanage':
    case 'edumanage-portal':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1M9 14h1M14 10h1M14 14h1" stroke="#FFFFFF" />
          </svg>
          <span>EduManage</span>
        </div>
      );

    case 'quolywheels':
    case 'quoly-wheels':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" stroke="#FFFFFF" />
            <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
            <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="#FFFFFF" />
          </svg>
          <span>QuolyWheels</span>
        </div>
      );

    case 'hypocrates-dental':
    case 'hypocrates':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8 2 5 5 5 9c0 5 3 13 7 13s7-8 7-13c0-4-3-7-7-7z" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" />
            <path d="M12 7v6M9 10h6" stroke="#FFFFFF" />
          </svg>
          <span>Hypocrates</span>
        </div>
      );

    case 'flowpilot':
    case 'flowpilot-operations':
      return (
        <div className="pm-logo-lockup">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 19 21 12 17 5 21 12 2" fill="#FFFFFF" fillOpacity="0.3" stroke="#FFFFFF" />
          </svg>
          <span>FlowPilot</span>
        </div>
      );

    default:
      return (
        <div className="pm-logo-lockup">
          <span>{title}</span>
        </div>
      );
  }
};
