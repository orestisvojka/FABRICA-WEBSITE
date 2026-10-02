import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Terminal, Layers, Users } from 'lucide-react';

const teamMembers = [
  {
    id: 'oresti',
    slug: 'oresti-vojka',
    name: 'Oresti Vojka',
    role: 'CEO',
    subtext: 'steering company vision & strategy',
    description: 'Founder and Chief Executive Officer spearheading strategic tech vision, enterprise partnerships, and high-ROI digital systems.',
    Icon: Crown,
    color: '#d97706'
  },
  {
    id: 'kris',
    slug: 'kris-sipri',
    name: 'Kris Sipri',
    role: 'Programmer',
    subtext: 'building core backend & cloud architecture',
    description: 'Lead systems and backend engineer architecting high-concurrency APIs, resilient microservices, and database infrastructure.',
    Icon: Terminal,
    color: '#10b981'
  },
  {
    id: 'daniel',
    slug: 'daniel-kademi',
    name: 'Daniel Kademi',
    role: 'Programmer',
    subtext: 'crafting interactive 3D & 60fps interfaces',
    description: 'Frontend and creative tech programmer developing reactive React apps, WebGL shaders, kinetic physics, and responsive design systems.',
    Icon: Layers,
    color: '#8b5cf6'
  },
  {
    id: 'henri',
    slug: 'henri-bajramaj',
    name: 'Henri Bajramaj',
    role: 'Client Manager',
    subtext: 'guiding client success & project delivery',
    description: 'Client Manager and partnership lead orchestrating transparent milestone delivery, executive communication, and post-launch account growth.',
    Icon: Users,
    color: '#3b82f6'
  }
];

export default function TeamSection() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [activeCardId, setActiveCardId] = useState(null);

  const isInView = useInView(containerRef, { once: true, amount: 0.15, margin: "-100px 0px" });

  const handleCardClick = (slugOrId) => {
    navigate(`/team/${slugOrId}`);
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 45, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <section className="team-section-outer" ref={containerRef}>
      <div className="team-container">
        <motion.div
          className="team-split-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Column (50% Width) - Typography & CTA */}
          <div className="team-left-col">
            <div className="team-left-top">
              <motion.div variants={itemVariants} className="team-brand-badge">
                QuolyTech®
              </motion.div>

              <motion.h2 variants={itemVariants} className="team-main-title">
                <span className="team-title-bold">The minds</span>{' '}
                <span className="team-title-muted">behind the projects.</span>
              </motion.h2>
            </div>

            {/* Middle crosshairs grid accents */}
            <div className="team-left-crosshairs">
              <span className="team-crosshair">+</span>
              <span className="team-crosshair">+</span>
            </div>

            {/* Bottom 2-Column Lockup */}
            <div className="team-left-bottom">
              {/* Mission & Apply Button */}
              <motion.div variants={itemVariants} className="team-mission-box">
                <h3 className="team-mission-heading">Be part of our mission</h3>
                <p className="team-mission-desc">
                  If you're ready to create and collaborate, we'd love to hear from you.
                </p>
                <motion.button
                  className="team-apply-btn"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => navigate('/contact')}
                >
                  <span>Apply now</span>
                  <span className="team-apply-dot"></span>
                </motion.button>
              </motion.div>

              {/* Collaboration Statement */}
              <motion.div variants={itemVariants} className="team-statement-box">
                <p className="team-statement-text">
                  We believe great work comes{' '}
                  <strong className="team-highlight">from collaboration.</strong> That's why we work
                  closely with each other to ensure every project meets your goals and exceeds
                  expectations.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column (50% Width) - 2x2 Matrix of Role Icon Cards */}
          <div className="team-right-grid">
            {teamMembers.map((member) => {
              const isActive = activeCardId === member.id;
              return (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  className={`team-card team-icon-card ${isActive ? 'is-touch-active' : ''}`}
                  initial="initial"
                  animate={isActive ? "hover" : "initial"}
                  whileHover="hover"
                  whileTap="hover"
                  onClick={() => handleCardClick(member.slug || member.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Dark Glassmorphic Large Icon Backdrop */}
                  <div className="team-icon-card-bg">
                    <div className="team-icon-circle-glow"></div>
                    <member.Icon className="team-role-main-icon" size={76} strokeWidth={1.5} />
                  </div>

                  {/* Top Left Micro-Icon (+ Badge with 90° Rotation) */}
                  <motion.div
                    className="team-card-plus-btn"
                    variants={{
                      initial: { rotate: 0, scale: 1 },
                      hover: { rotate: 90, scale: 1.1 }
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.div>

                  {/* Top Right Role Overlay */}
                  <div className="team-card-role-tag">
                    <span className="team-card-role-title">{member.role}</span>
                    <span className="team-card-role-sub">at QuolyTech®</span>
                  </div>

                  {/* Bottom Left Info & Hover/Touch Description Reveal */}
                  <div className="team-card-info">
                    <h3 className="team-card-name">
                      {member.name}
                      {member.subtext && (
                        <span className="team-card-subtext-inline"> {member.subtext}</span>
                      )}
                    </h3>
                    
                    {/* Description Text Revealed on Hover/Touch */}
                    <motion.p
                      className="team-card-description"
                      variants={{
                        initial: { opacity: 0, y: 12, height: 0 },
                        hover: { opacity: 1, y: 0, height: 'auto' }
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    >
                      {member.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
