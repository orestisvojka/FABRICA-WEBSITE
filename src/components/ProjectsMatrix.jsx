import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 'boltshift',
    slug: 'boltshift',
    title: 'Boltshift.',
    year: '/2026',
    image: '/boltshift.png',
    logo: (
      <div className="pm-logo-lockup">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.2"/>
          <path d="M13 2L4 14H11L9 22L20 10H12L13 2Z" fill="#FFFFFF"/>
        </svg>
        <span>Boltshift</span>
      </div>
    )
  },
  {
    id: 'ephemeral',
    slug: 'ephemeral',
    title: 'Ephemeral.',
    year: '/2026',
    image: '/ephemeral.png',
    logo: (
      <div className="pm-logo-lockup">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
        <span>Ephemeral</span>
      </div>
    )
  },
  {
    id: 'powersurge',
    slug: 'powersurge',
    title: 'Powersurge.',
    year: '/2024',
    image: '/powersurge.png',
    logo: (
      <div className="pm-logo-lockup">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="12" height="16" rx="2" stroke="#FFFFFF" strokeWidth="2" fill="none"/>
          <rect x="9" y="1" width="6" height="3" rx="1" fill="#FFFFFF"/>
          <rect x="9" y="8" width="6" height="8" rx="1" fill="#FFFFFF"/>
        </svg>
        <span>Powersurge</span>
      </div>
    )
  },
  {
    id: 'mastermail',
    slug: 'mastermail',
    title: 'Mastermail.',
    year: '/2024',
    image: '/mastermail.png',
    logo: (
      <div className="pm-logo-lockup">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L17 7L12 12L7 7L12 2Z" fill="#FFFFFF"/>
          <path d="M12 12L17 17L12 22L7 17L12 12Z" fill="#FFFFFF"/>
          <path d="M2 12L7 7L12 12L7 17L2 12Z" fill="#FFFFFF"/>
          <path d="M22 12L17 7L12 12L17 17L22 12Z" fill="#FFFFFF"/>
        </svg>
        <span>Mastermail</span>
      </div>
    )
  },
  {
    id: 'warpspeed',
    slug: 'warpspeed',
    title: 'Warpspeed.',
    year: '/2023',
    image: '/warpspeed.png',
    logo: (
      <div className="pm-logo-lockup">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
          <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.356-8-5.096 0-5.096 8 0 8 5.223 0 7.261-8 12.356-8z"/>
        </svg>
        <span>Warpspeed</span>
      </div>
    )
  },
  {
    id: 'cloudwatch',
    slug: 'cloudwatch',
    title: 'CloudWatch.',
    year: '/2020',
    image: '/cloudwatch.png',
    logo: (
      <div className="pm-logo-lockup">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="12" r="6" fill="#FFFFFF" fillOpacity="0.8"/>
          <circle cx="15" cy="12" r="6" fill="#FFFFFF"/>
        </svg>
        <span>CloudWatch</span>
      </div>
    )
  }
];

export default function ProjectsMatrix() {
  const navigate = useNavigate();

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Synchronized Hover Micro-Animation Variants
  const cardContainerVariants = {
    rest: { y: 0 },
    hover: {
      y: -8,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: { type: 'spring', stiffness: 220, damping: 22 }
    }
  };

  const overlayHoverVariants = {
    rest: { opacity: 0.15 },
    hover: {
      opacity: 0.45,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const logoHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.08,
      y: -5,
      transition: { type: 'spring', stiffness: 280, damping: 18 }
    }
  };

  const titleHoverVariants = {
    rest: { x: 0 },
    hover: {
      x: 4,
      transition: { type: 'spring', stiffness: 400, damping: 25 }
    }
  };

  const dotsHoverVariants = {
    rest: { scale: 1, opacity: 0.5 },
    hover: {
      scale: 1.25,
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="projects-matrix-section">
      <div className="container">
        {/* Typographic Header Block */}
        <div className="pm-header-grid">
          <div className="pm-header-left">
            <h2 className="pm-title-main">Projects.</h2>
            <span className="pm-temporal-stamp">©2026</span>
          </div>

          <div className="pm-header-right">
            <p className="pm-contextual-text">
              We've helped businesses across industries achieve their goals. Here are some of our recent projects.
            </p>
          </div>
        </div>

        {/* Dual-Column 6-Card Portfolio Grid */}
        <motion.div 
          className="pm-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {projectsData.map((project) => (
            <motion.div 
              key={project.id}
              className="pm-card"
              variants={cardVariants}
              onClick={() => navigate(`/projects/${project.slug}`)}
            >
              <motion.div
                className="pm-card-inner"
                variants={cardContainerVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                {/* Meta Header Strip */}
                <div className="pm-meta-strip">
                  <div className="pm-meta-title-group">
                    <motion.span className="pm-project-name" variants={titleHoverVariants}>
                      {project.title}
                    </motion.span>
                    <span className="pm-project-year">{project.year}</span>
                  </div>
                  <motion.div className="pm-meta-dots" variants={dotsHoverVariants}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </motion.div>
                </div>

                {/* Media Container with Spring Zoom & Overlay Contrast */}
                <div className="pm-media-box">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="pm-media-img"
                    variants={imageHoverVariants}
                  />
                  
                  <motion.div 
                    className="pm-overlay"
                    variants={overlayHoverVariants}
                  />

                  {/* Centered White Logo Overlay */}
                  <motion.div className="pm-logo-overlay" variants={logoHoverVariants}>
                    {project.logo}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
