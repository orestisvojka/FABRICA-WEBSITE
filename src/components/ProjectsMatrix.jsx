import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { getProjectLogo } from './ProjectLogos';

export default function ProjectsMatrix() {
  const navigate = useNavigate();

  // Render the first 8 curated portfolio projects on the homepage
  const homeProjects = projects.slice(0, 8);

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
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
      scale: 1.07,
      transition: { type: 'spring', stiffness: 220, damping: 22 }
    }
  };

  const overlayHoverVariants = {
    rest: { opacity: 0.18 },
    hover: {
      opacity: 0.45,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const logoHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.06,
      y: -4,
      transition: { type: 'spring', stiffness: 280, damping: 18 }
    }
  };

  const titleHoverVariants = {
    rest: { x: 0 },
    hover: {
      x: 3,
      transition: { type: 'spring', stiffness: 400, damping: 25 }
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
              We've helped businesses and startups across industries engineer world-class digital flagships, web apps, and automated platforms. Here are 8 featured projects.
            </p>
          </div>
        </div>

        {/* Dual-Column 8-Card Portfolio Grid */}
        <motion.div 
          className="pm-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
        >
          {homeProjects.map((project) => (
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
                    <span className="pm-project-year">/{project.year}</span>
                  </div>

                  {/* Direct Live Link Access Button */}
                  <div className="pm-meta-actions">
                    <a
                      href={project.liveUrl || project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pm-live-btn"
                      onClick={(e) => e.stopPropagation()}
                      title={`Open live project in new tab: ${project.title}`}
                    >
                      <span className="pm-live-dot" />
                      <span>Live Site</span>
                      <span className="pm-live-arrow">↗</span>
                    </a>
                  </div>
                </div>

                {/* Media Container with Spring Zoom & Overlay Contrast */}
                <div className="pm-media-box">
                  <motion.img 
                    src={project.heroImage} 
                    alt={project.title}
                    className="pm-media-img"
                    variants={imageHoverVariants}
                    onError={(e) => {
                      e.target.onerror = null;
                      if (project.fallbackImage) {
                        e.target.src = project.fallbackImage;
                      }
                    }}
                  />
                  
                  <motion.div 
                    className="pm-overlay"
                    variants={overlayHoverVariants}
                  />

                  {/* Centered White Logo Overlay */}
                  <motion.div className="pm-logo-overlay" variants={logoHoverVariants}>
                    {getProjectLogo(project.slug, project.title)}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <div className="pm-footer-cta">
          <motion.button
            className="pm-view-all-btn"
            onClick={() => {
              navigate('/projects');
              window.scrollTo(0, 0);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Explore All 14 Portfolio Projects</span>
            <span className="pm-view-all-arrow">→</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
