import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teamMembers, getTeamMember } from '../data/team';
import { projects } from '../data/projects';
import ContactSection from '../components/ContactSection';
import { ArrowUpRight } from 'lucide-react';

export default function TeamDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Retrieve matching team member or default to first member
  const member = getTeamMember(slug);

  // Get next team members for bottom navigation carousel
  const otherMembers = teamMembers.filter(
    (m) => m.id !== member.id && m.slug !== member.slug
  );

  // Get projects associated with this team member
  const memberProjects = projects.filter((p) =>
    member.featuredProjects?.includes(p.slug) || member.featuredProjects?.includes(p.id)
  );
  // Fallback to first 2 projects if none matched directly
  const displayProjects = memberProjects.length > 0 ? memberProjects : projects.slice(0, 2);

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
    <div className="project-detail-outer team-detail-outer">
      <div className="project-detail-container team-detail-container">
        {/* Title & Hero Section */}
        <section className="project-detail-hero">
          {/* Header Title Lockup */}
          <div className="team-detail-title-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="team-detail-role-pill"
            >
              <span>{member.role}</span>
              <span className="team-detail-role-dot">●</span>
              <span className="team-detail-company">{member.company}</span>
            </motion.div>

            <motion.h1
              className="project-detail-main-title team-detail-main-title"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
            >
              {member.name}.
            </motion.h1>

            {member.tagline && (
              <motion.p
                className="team-detail-tagline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {member.tagline}
              </motion.p>
            )}
          </div>

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
                <span className="project-badge-label">Biography</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="project-overview-text-col">
              <p className="project-overview-description">
                {member.overview || member.bio}
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
                <span className="project-spec-label">Role</span>
                <span className="project-spec-value">{member.role}</span>
              </motion.div>
            </div>

            <div className="project-spec-row-wrapper">
              <div className="project-spec-line" />
              <motion.div variants={itemVariants} className="project-spec-row">
                <span className="project-spec-label">Experience</span>
                <span className="project-spec-value">{member.experience || "6+ Years"}</span>
              </motion.div>
            </div>

            <div className="project-spec-row-wrapper">
              <div className="project-spec-line" />
              <motion.div variants={itemVariants} className="project-spec-row">
                <span className="project-spec-label">Specialization</span>
                <span className="project-spec-value">{member.specialization}</span>
              </motion.div>
            </div>

            <div className="project-spec-row-wrapper">
              <div className="project-spec-line" />
              <motion.div variants={itemVariants} className="project-spec-row">
                <span className="project-spec-label">Location & Contact</span>
                <motion.button
                  className="project-visit-pill-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  onClick={() => {
                    navigate('/contact');
                    window.scrollTo(0, 0);
                  }}
                >
                  <span>Work with {member.name.split(' ')[0]}</span>
                  <span className="project-btn-arrow">↗</span>
                </motion.button>
              </motion.div>
              <div className="project-spec-line" />
            </div>
          </motion.div>

          {/* Philosophy & Approach Section */}
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
                <span className="project-badge-label">Philosophy</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="project-challenge-text-col">
              <div className="project-challenge-block">
                <h3 className="project-section-subhead">Core Philosophy</h3>
                <p className="project-section-body">
                  "{member.philosophy}"
                </p>
              </div>

              <div className="project-challenge-block" style={{ marginTop: '40px' }}>
                <h3 className="project-section-subhead">Work Methodology</h3>
                <p className="project-section-body">
                  {member.approach}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Full-Bleed Main Portrait Showcase Card */}
          <motion.div
            className="project-main-showcase team-main-showcase"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            whileHover="hover"
          >
            <div className="project-main-showcase-wrapper team-portrait-wrapper">
              <motion.img
                src={member.heroImage || member.avatar}
                alt={`${member.name} Portrait Showcase`}
                className="project-main-showcase-img team-portrait-img"
                onError={(e) => {
                  e.target.onerror = null;
                  if (member.fallbackAvatar) {
                    e.target.src = member.fallbackAvatar;
                  }
                }}
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.03 }
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              />
              <div className="team-portrait-badge">
                <span className="team-portrait-name">{member.name}</span>
                <span className="team-portrait-role">{member.role} at QuolyTech®</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Matrix */}
          {member.stats && member.stats.length > 0 && (
            <motion.div
              className="team-stats-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {member.stats.map((stat, idx) => (
                <motion.div key={idx} variants={itemVariants} className="team-stat-card">
                  <span className="team-stat-value">{stat.value}</span>
                  <span className="team-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Featured Contributions / Projects Section */}
          {displayProjects.length > 0 && (
            <div className="team-contributions-section">
              <div className="team-contributions-header">
                <div className="project-badge-row">
                  <span className="project-badge-dot">●</span>
                  <span className="project-badge-label">Key Project Contributions</span>
                </div>
                <h3 className="team-contributions-title">Selected Case Studies</h3>
              </div>

              <motion.div
                className="project-next-grid team-projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
              >
                {displayProjects.map((p) => (
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
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Next / Other Team Members Carousel */}
          <section className="project-next-section team-next-section">
            <div className="project-next-header">
              <div className="project-next-left">
                <span className="project-brand-tag">QuolyTech®</span>
                <h2 className="project-next-title">Other team members.</h2>
                <span className="project-year-stamp">(2016-25©)</span>
              </div>

              <motion.button
                className="project-all-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const teamElem = document.querySelector('.team-section-outer');
                    if (teamElem) teamElem.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <span>View all team</span>
                <span className="project-btn-dot"></span>
              </motion.button>
            </div>

            <motion.div
              className="team-next-members-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {otherMembers.map((m) => (
                <motion.div
                  key={m.id}
                  variants={itemVariants}
                  className="team-next-card"
                  onClick={() => {
                    navigate(`/team/${m.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  whileHover="hover"
                >
                  <div className="team-next-card-img-wrapper">
                    <motion.img
                      src={m.avatar}
                      alt={m.name}
                      className="team-next-card-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (m.fallbackAvatar) {
                          e.target.src = m.fallbackAvatar;
                        }
                      }}
                      variants={{
                        initial: { scale: 1 },
                        hover: { scale: 1.06 }
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    />
                    <div className="team-next-card-overlay" />
                  </div>
                  <div className="team-next-card-info">
                    <div className="team-next-card-name-row">
                      <h4 className="team-next-card-name">{m.name}</h4>
                      <ArrowUpRight size={18} className="team-next-card-arrow" />
                    </div>
                    <p className="team-next-card-role">{m.role}</p>
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
