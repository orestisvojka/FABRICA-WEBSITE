import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ContactSection from '../components/ContactSection';

const getProjectLogo = (slug, title) => {
  switch (slug) {
    case 'boltshift':
      return (
        <div className="pm-logo-lockup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.2"/>
            <path d="M13 2L4 14H11L9 22L20 10H12L13 2Z" fill="#FFFFFF"/>
          </svg>
          <span>Boltshift</span>
        </div>
      );
    case 'ephemeral':
      return (
        <div className="pm-logo-lockup">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <span>Ephemeral</span>
        </div>
      );
    case 'powersurge':
      return (
        <div className="pm-logo-lockup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="12" height="16" rx="2" stroke="#FFFFFF" strokeWidth="2" fill="none"/>
            <rect x="9" y="1" width="6" height="3" rx="1" fill="#FFFFFF"/>
            <rect x="9" y="8" width="6" height="8" rx="1" fill="#FFFFFF"/>
          </svg>
          <span>Powersurge</span>
        </div>
      );
    case 'mastermail':
      return (
        <div className="pm-logo-lockup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L17 7L12 12L7 7L12 2Z" fill="#FFFFFF"/>
            <path d="M12 12L17 17L12 22L7 17L12 12Z" fill="#FFFFFF"/>
            <path d="M2 12L7 7L12 12L7 17L2 12Z" fill="#FFFFFF"/>
            <path d="M22 12L17 7L12 12L17 17L22 12Z" fill="#FFFFFF"/>
          </svg>
          <span>Mastermail</span>
        </div>
      );
    case 'warpspeed':
      return (
        <div className="pm-logo-lockup">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.356-8-5.096 0-5.096 8 0 8 5.223 0 7.261-8 12.356-8z"/>
          </svg>
          <span>Warpspeed</span>
        </div>
      );
    case 'cloudwatch':
      return (
        <div className="pm-logo-lockup">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="12" r="6" fill="#FFFFFF" fillOpacity="0.8"/>
            <circle cx="15" cy="12" r="6" fill="#FFFFFF"/>
          </svg>
          <span>CloudWatch</span>
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

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find matching project by slug, id, or alias, or default to boltshift
  const normalizedSlug = slug?.toLowerCase();
  const project = projects.find(
    (p) =>
      p.slug.toLowerCase() === normalizedSlug ||
      p.id.toLowerCase() === normalizedSlug ||
      (p.aliases && p.aliases.includes(normalizedSlug))
  ) || projects[0];

  // Get the next 2 projects to showcase at the bottom
  const nextProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

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
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <div className="project-detail-outer">
      <div className="project-detail-container">
        {/* Title Section */}
        <section className="project-detail-hero">
          <motion.h1
            className="project-detail-main-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
          >
            {project.title}.
          </motion.h1>

          {/* Overview Grid */}
          <motion.div
            className="project-overview-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div variants={itemVariants} className="project-overview-badge-col">
              <div className="project-badge-row">
                <span className="project-badge-dot">●</span>
                <span className="project-badge-label">Overview</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="project-overview-text-col">
              <p className="project-overview-description">
                {project.overview}
              </p>
            </motion.div>
          </motion.div>

          {/* 4-Row Specs Metadata Table */}
          <motion.div
            className="project-specs-table"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <div className="project-spec-row-wrapper">
              <div className="project-spec-line" />
              <motion.div variants={itemVariants} className="project-spec-row">
                <span className="project-spec-label">Year</span>
                <span className="project-spec-value">{project.year}</span>
              </motion.div>
            </div>

            <div className="project-spec-row-wrapper">
              <div className="project-spec-line" />
              <motion.div variants={itemVariants} className="project-spec-row">
                <span className="project-spec-label">Industry</span>
                <span className="project-spec-value">{project.industry}</span>
              </motion.div>
            </div>

            <div className="project-spec-row-wrapper">
              <div className="project-spec-line" />
              <motion.div variants={itemVariants} className="project-spec-row">
                <span className="project-spec-label">Services</span>
                <span className="project-spec-value">{project.services ? project.services.join(', ') : project.category}</span>
              </motion.div>
            </div>

            <div className="project-spec-row-wrapper">
              <div className="project-spec-line" />
              <motion.div variants={itemVariants} className="project-spec-row">
                <span className="project-spec-label">Website</span>
                <motion.a
                  href={project.url || 'https://quolytech.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="project-visit-pill-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  <span>{project.title}</span>
                  <span className="project-btn-arrow">↗</span>
                </motion.a>
              </motion.div>
              <div className="project-spec-line" />
            </div>
          </motion.div>

          {/* Challenge & Solution Section */}
          <motion.div
            className="project-challenge-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div variants={itemVariants} className="project-challenge-badge-col">
              <div className="project-badge-row">
                <span className="project-badge-dot">●</span>
                <span className="project-badge-label">Challenge</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="project-challenge-text-col">
              <div className="project-challenge-block">
                <h3 className="project-section-subhead">The Challenge</h3>
                <p className="project-section-body">
                  {project.challenge || "Building a cohesive digital identity that balances cutting-edge performance with an intuitive user experience."}
                </p>
              </div>

              <div className="project-challenge-block" style={{ marginTop: '40px' }}>
                <h3 className="project-section-subhead">The Solution</h3>
                <p className="project-section-body">
                  {project.solution || "We designed a streamlined, high-contrast architecture with interactive WebGL shaders and optimized component structures."}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Full-Bleed Main Interface Showcase Card */}
          <motion.div
            className="project-main-showcase"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            whileHover="hover"
          >
            <div className="project-main-showcase-wrapper">
              <motion.img
                src="/project-detail-interface.png"
                alt={`${project.title} Web Interface Showcase`}
                className="project-main-showcase-img"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.04 }
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
          </motion.div>

          {/* Showcase Gallery Grid (3 Mockup Shots) */}
          <div className="project-gallery-stack">
            <motion.div
              className="project-gallery-item-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              whileHover="hover"
            >
              <motion.img
                src="/project-detail-card-stacks.png"
                alt="Business Card Stacks Mockup"
                className="project-gallery-img"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.04 }
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            <motion.div
              className="project-gallery-item-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              whileHover="hover"
            >
              <motion.img
                src="/project-detail-wood.png"
                alt="Oak Wood Cards Mockup"
                className="project-gallery-img"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.04 }
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            <motion.div
              className="project-gallery-item-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              whileHover="hover"
            >
              <motion.img
                src="/project-detail-phone.png"
                alt="Smartphone Slat Backdrop Mockup"
                className="project-gallery-img"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.04 }
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Next Projects Section */}
          <section className="project-next-section">
            <div className="project-next-header">
              <div className="project-next-left">
                <span className="project-brand-tag">QuolyTech®</span>
                <h2 className="project-next-title">Next projects.</h2>
                <span className="project-year-stamp">(2016-25©)</span>
              </div>

              <motion.button
                className="project-all-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                onClick={() => {
                  navigate('/projects');
                  window.scrollTo(0, 0);
                }}
              >
                <span>All projects</span>
                <span className="project-btn-dot"></span>
              </motion.button>
            </div>

            <motion.div
              className="project-next-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {nextProjects.map((p) => (
                <motion.div
                  key={p.id}
                  variants={itemVariants}
                  className="project-replica-card"
                  onClick={() => {
                    navigate(`/projects/${p.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  whileHover="hover"
                >
                  <div className="project-card-top-bar">
                    <span className="project-card-title">{p.title}</span>
                    <span className="project-card-year">/{p.year}</span>
                  </div>

                  <div className="project-card-img-wrapper">
                    <motion.img
                      src={p.heroImage}
                      alt={p.title}
                      className="project-card-bg-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (p.fallbackImage) {
                          e.target.src = p.fallbackImage;
                        }
                      }}
                      variants={{
                        initial: { scale: 1 },
                        hover: { scale: 1.06 }
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    />
                    <div className="project-card-gradient-overlay" />
                    <div className="pm-logo-overlay">
                      {getProjectLogo(p.slug, p.title)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </section>
      </div>

      {/* Trailing Section: "Let's talk." Contact Section */}
      <ContactSection />
    </div>
  );
}
