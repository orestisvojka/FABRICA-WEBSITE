import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ClientLogos() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.8], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const handleClientClick = (slug) => {
    navigate(`/projects/${slug}`);
    window.scrollTo(0, 0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 55, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 22,
        mass: 0.7
      }
    }
  };

  const clients = [
    {
      id: 'boltshift',
      slug: 'boltshift',
      name: 'Boltshift',
      category: 'SaaS & Cloud Ops',
      logo: (
        <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
          <path d="M6 6H16V26H6V6Z" fill="currentColor"/>
          <path d="M20 14H30V26H20V14Z" fill="currentColor"/>
          <path d="M34 6H44V26H34V6Z" fill="currentColor"/>
          <path d="M48 14H58V26H48V14Z" fill="currentColor"/>
          <path d="M62 6H72V26H62V6Z" fill="currentColor"/>
          <path d="M76 6H86V26H76V6Z" fill="currentColor"/>
          <text x="90" y="12" fill="currentColor" fontSize="9" fontWeight="700" fontFamily="sans-serif">TM</text>
        </svg>
      )
    },
    {
      id: 'warpspeed',
      slug: 'warpspeed',
      name: 'Warpspeed',
      category: 'Artificial Intelligence',
      logo: (
        <svg width="130" height="28" viewBox="0 0 130 28" fill="none">
          <path d="M6 14C6 10.134 9.13401 7 13 7C16.866 7 20 10.134 20 14C20 17.866 16.866 21 13 21C9.13401 21 6 17.866 6 14ZM10 14C10 15.6569 11.3431 17 13 17C14.6569 17 16 15.6569 16 14C16 12.3431 14.6569 11 13 11C11.3431 11 10 12.3431 10 14Z" fill="currentColor"/>
          <path d="M17 14C17 10.134 20.134 7 24 7C27.866 7 31 10.134 31 14C31 17.866 27.866 21 24 21C20.134 21 17 17.866 17 14ZM21 14C21 15.6569 22.3431 17 24 17C25.6569 17 27 15.6569 27 14C27 12.3431 25.6569 11 24 11C22.3431 11 21 12.3431 21 14Z" fill="currentColor"/>
          <text x="38" y="18" fill="currentColor" fontSize="13" fontWeight="700" letterSpacing="-0.02em" fontFamily="Inter, sans-serif">Warpspeed</text>
        </svg>
      )
    },
    {
      id: 'ephemeral',
      slug: 'ephemeral',
      name: 'Ephemeral',
      category: 'Web3 & Digital Assets',
      logo: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="17" y="2" width="2" height="8" rx="1" fill="currentColor"/>
          <rect x="17" y="26" width="2" height="8" rx="1" fill="currentColor"/>
          <rect x="2" y="17" width="8" height="2" rx="1" fill="currentColor"/>
          <rect x="26" y="17" width="8" height="2" rx="1" fill="currentColor"/>
          <rect x="6.4" y="7.8" width="8" height="2" rx="1" transform="rotate(45 6.4 7.8)" fill="currentColor"/>
          <rect x="23.4" y="24.8" width="8" height="2" rx="1" transform="rotate(45 23.4 24.8)" fill="currentColor"/>
          <rect x="7.8" y="29.6" width="8" height="2" rx="1" transform="rotate(-45 7.8 29.6)" fill="currentColor"/>
          <rect x="24.8" y="12.6" width="8" height="2" rx="1" transform="rotate(-45 24.8 12.6)" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'mastermail',
      slug: 'mastermail',
      name: 'Mastermail',
      category: 'Marketing Tech',
      logo: (
        <svg width="100" height="32" viewBox="0 0 100 32" fill="none">
          <text x="4" y="23" fill="currentColor" fontSize="22" fontWeight="800" letterSpacing="-0.03em" fontFamily="Inter, sans-serif">LOQO</text>
          <circle cx="86" cy="10" r="2.5" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'cloudwatch',
      slug: 'cloudwatch',
      name: 'CloudWatch',
      category: 'Cybersecurity',
      logo: (
        <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
          <path d="M4 10L20 2L36 10L20 18L4 10Z" fill="currentColor"/>
          <path d="M4 14L20 22V32L4 24V14Z" fill="currentColor" fillOpacity="0.7"/>
          <path d="M20 22L36 14V24L20 32V22Z" fill="currentColor" fillOpacity="0.5"/>
          <path d="M28 20L44 12V22L28 30V20Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'powersurge',
      slug: 'powersurge',
      name: 'Powersurge',
      category: 'Clean Energy Hardware',
      logo: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M6 6H14V20L22 6H30V30H22V16L14 30H6V6Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <section className="client-logos-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header with Scroll Parallax */}
        <motion.div 
          className="client-logos-header"
          style={{ y: headerY, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="client-logos-title">
            <span className="title-bullet-icon"></span>
            <span>Our clients</span>
          </div>
          <div className="client-logos-meta">
            (2016-25©)
          </div>
        </motion.div>

        {/* 6 Interactive Logo Cards Grid */}
        <motion.div 
          className="client-logos-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {clients.map((client) => (
            <motion.div 
              key={client.id}
              className="client-logo-card client-logo-card-interactive" 
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClientClick(client.slug)}
              title={`View ${client.name} Case Study`}
            >
              {/* Logo graphic */}
              <div className="client-logo-svg-wrapper">
                {client.logo}
              </div>

              {/* Hover Badge Indicator */}
              <div className="client-card-hover-badge">
                <span className="client-card-hover-title">{client.name}</span>
                <ArrowUpRight size={14} className="client-card-arrow-icon" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
