import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teamMembers, getTeamMember } from '../data/team';
import { projects } from '../data/projects';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';
import TeamVisualHub from '../components/TeamVisualHubs';
import { getProjectLogo } from '../components/ProjectLogos';
import { 
  Crown, Terminal, Layers, Users, 
  ArrowUpRight, Mail, Compass, Briefcase, 
  TrendingUp, ShieldCheck, Server, Cpu, 
  Database, Shield, Layout, Box, Sparkles, 
  Gauge, UserCheck, GitPullRequest, CheckCircle2, 
  HeartHandshake, Check, Quote
} from 'lucide-react';

// Icon map for responsibility items
const iconMap = {
  compass: Compass,
  briefcase: Briefcase,
  trendingUp: TrendingUp,
  shieldCheck: ShieldCheck,
  server: Server,
  cpu: Cpu,
  database: Database,
  shield: Shield,
  layout: Layout,
  box: Box,
  sparkles: Sparkles,
  gauge: Gauge,
  userCheck: UserCheck,
  gitPullRequest: GitPullRequest,
  checkCircle: CheckCircle2,
  heartHandshake: HeartHandshake
};

// Role Icon map for cards
const roleIconMap = {
  crown: Crown,
  terminal: Terminal,
  layers: Layers,
  users: Users
};

export default function TeamDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Retrieve matching team member or default to first member
  const member = getTeamMember(slug);

  // Get next team members for navigation
  const otherMembers = teamMembers.filter(
    (m) => m.id !== member.id && m.slug !== member.slug
  );

  // Get projects associated with this team member
  const memberProjects = projects.filter((p) =>
    member.featuredProjects?.includes(p.slug) || 
    member.featuredProjects?.includes(p.id) ||
    (p.aliases && p.aliases.some((a) => member.featuredProjects?.includes(a)))
  );
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quolytech.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Team",
        "item": "https://quolytech.com/#team"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": member.name,
        "item": `https://quolytech.com/team/${member.slug}/`
      }
    ]
  };

  const RoleIcon = roleIconMap[member.iconType] || Crown;

  return (
    <div className="project-detail-outer team-detail-outer">
      <SEOHead
        title={`${member.name} — ${member.role} | QuolyTech`}
        description={`${member.bio} QuolyTech technology and design agency in Tiranë, Albania.`}
        canonicalPath={`/team/${member.slug}/`}
        jsonLd={breadcrumbJsonLd}
      />
      
      <div className="project-detail-container team-detail-container">
        {/* Hero Section */}
        <section className="project-detail-hero">
          <div className="team-detail-title-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="team-detail-role-pill"
              style={{ borderColor: `${member.themeColor}40` }}
            >
              <RoleIcon size={14} style={{ color: member.themeColor }} />
              <span style={{ color: member.themeColor }}>{member.role}</span>
              <span className="team-detail-role-dot">●</span>
              <span className="team-detail-company">{member.company}</span>
            </motion.div>

            <div className="team-detail-main-header-row">
              <motion.h1
                className="project-detail-main-title team-detail-main-title"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
              >
                {member.name}.
              </motion.h1>

              <motion.button
                className="project-visit-pill-btn team-hero-cta-btn"
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
            </div>

            {member.tagline && (
              <motion.p
                className="team-detail-tagline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {member.tagline}
              </motion.p>
            )}
          </div>

          {/* Professional Introduction Grid */}
          <motion.div
            className="project-overview-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div variants={itemVariants} className="project-overview-badge-col">
              <div className="project-badge-row">
                <span className="project-badge-dot" style={{ color: member.themeColor }}>●</span>
                <span className="project-badge-label">Executive Bio</span>
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
                <span className="project-spec-label">Role & Focus</span>
                <span className="project-spec-value">{member.role}</span>
              </motion.div>
            </div>

            <div className="project-spec-row-wrapper">
              <div className="project-spec-line" />
              <motion.div variants={itemVariants} className="project-spec-row">
                <span className="project-spec-label">Experience</span>
                <span className="project-spec-value">{member.experience}</span>
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
                <span className="project-spec-label">Location & Email</span>
                <div className="team-spec-email-group">
                  <span className="project-spec-value">{member.location}</span>
                  <a href={`mailto:${member.email}`} className="team-spec-email-link">
                    <Mail size={13} />
                    <span>{member.email}</span>
                  </a>
                </div>
              </motion.div>
              <div className="project-spec-line" />
            </div>
          </motion.div>

          {/* ROLE-SPECIFIC VISUAL HUB (NO PERSON PHOTOS, 100% UI / TYPOGRAPHY / CONSOLE) */}
          <motion.div
            className="team-hub-wrapper-section"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <TeamVisualHub member={member} />
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
                  <span className="team-stat-value" style={{ color: member.themeColor }}>
                    {stat.value}
                  </span>
                  <span className="team-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Responsibilities Section */}
          {member.responsibilities && (
            <section className="team-responsibilities-section">
              <div className="team-section-header-block">
                <div className="project-badge-row">
                  <span className="project-badge-dot" style={{ color: member.themeColor }}>●</span>
                  <span className="project-badge-label">Key Responsibilities</span>
                </div>
                <h3 className="team-section-headline">
                  Role at QuolyTech
                </h3>
                <p className="team-section-subhead-text">
                  Direct operational and strategic duties {member.name.split(' ')[0]} oversees across all client projects.
                </p>
              </div>

              <motion.div 
                className="team-resp-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
              >
                {member.responsibilities.map((resp, idx) => {
                  const IconComp = iconMap[resp.icon] || ShieldCheck;
                  return (
                    <motion.div 
                      key={idx} 
                      className="team-resp-card"
                      variants={itemVariants}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <div className="team-resp-icon-box" style={{ color: member.themeColor, backgroundColor: `${member.themeColor}15` }}>
                        <IconComp size={22} />
                      </div>
                      <h4 className="team-resp-title">{resp.title}</h4>
                      <p className="team-resp-desc">{resp.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </section>
          )}

          {/* Skills & Expertise Section */}
          {member.skills && (
            <section className="team-skills-section">
              <div className="team-section-header-block">
                <div className="project-badge-row">
                  <span className="project-badge-dot" style={{ color: member.themeColor }}>●</span>
                  <span className="project-badge-label">Domain Proficiency</span>
                </div>
                <h3 className="team-section-headline">
                  Skills & Technical Mastery
                </h3>
              </div>

              <motion.div 
                className="team-skills-categories-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
              >
                {member.skills.map((group, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="team-skill-category-card">
                    <h4 className="team-skill-cat-title">{group.category}</h4>
                    <div className="team-skill-pills-wrap">
                      {group.items.map((skill, sIdx) => (
                        <span key={sIdx} className="team-skill-pill">
                          <Check size={12} className="team-skill-check" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {/* Professional Strengths Section */}
          {member.strengths && (
            <section className="team-strengths-section">
              <div className="team-section-header-block">
                <div className="project-badge-row">
                  <span className="project-badge-dot" style={{ color: member.themeColor }}>●</span>
                  <span className="project-badge-label">Execution Style</span>
                </div>
                <h3 className="team-section-headline">
                  Professional Strengths
                </h3>
              </div>

              <motion.div 
                className="team-strengths-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
              >
                {member.strengths.map((str, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="team-strength-card">
                    <div className="team-strength-num">0{idx + 1}</div>
                    <h4 className="team-strength-headline">{str.headline}</h4>
                    <p className="team-strength-detail">{str.detail}</p>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {/* Personal Statement & Philosophy Section */}
          <motion.div
            className="team-statement-banner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
          >
            <div className="team-statement-icon-wrap">
              <Quote size={32} style={{ color: member.themeColor }} />
            </div>
            <div className="team-statement-quote-body">
              <p className="team-statement-quote-text">
                "{member.personalStatement}"
              </p>
              <div className="team-statement-author-lockup">
                <span className="team-statement-author-name">{member.name}</span>
                <span className="team-statement-author-role">{member.role} • QuolyTech®</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Contributions / Projects Section */}
          {displayProjects.length > 0 && (
            <div className="team-contributions-section">
              <div className="team-contributions-header">
                <div className="project-badge-row">
                  <span className="project-badge-dot" style={{ color: member.themeColor }}>●</span>
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
                      <div className="project-card-title-group">
                        <span className="project-card-title">{p.title}</span>
                        <span className="project-card-year">/{p.year}</span>
                      </div>
                      <a
                        href={p.liveUrl || p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-live-btn"
                        onClick={(e) => e.stopPropagation()}
                        title={`Visit live site: ${p.title}`}
                      >
                        <span className="project-card-live-dot" />
                        <span>Live Site</span>
                        <span className="project-card-arrow">↗</span>
                      </a>
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

                    <div className="project-card-bottom-bar">
                      <span className="project-card-category">{p.category}</span>
                      <span className="project-card-view-case">Case Study &rarr;</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Next / Other Team Members Carousel (STRICTLY NO PHOTOS - ICON & TYPOGRAPHY DRIVEN) */}
          <section className="project-next-section team-next-section">
            <div className="project-next-header">
              <div className="project-next-left">
                <span className="project-brand-tag">QuolyTech®</span>
                <h2 className="project-next-title">Other team members.</h2>
                <span className="project-year-stamp">(2024-26©)</span>
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
              {otherMembers.map((m) => {
                const OtherIcon = roleIconMap[m.iconType] || Users;
                return (
                  <motion.div
                    key={m.id}
                    variants={itemVariants}
                    className="team-next-card team-next-card-typographic"
                    onClick={() => {
                      navigate(`/team/${m.slug}`);
                      window.scrollTo(0, 0);
                    }}
                    whileHover="hover"
                  >
                    <div className="team-next-card-icon-box" style={{ backgroundColor: `${m.themeColor}12` }}>
                      <OtherIcon size={38} style={{ color: m.themeColor }} />
                    </div>
                    <div className="team-next-card-info">
                      <div className="team-next-card-name-row">
                        <h4 className="team-next-card-name">{m.name}</h4>
                        <ArrowUpRight size={18} className="team-next-card-arrow" />
                      </div>
                      <p className="team-next-card-role" style={{ color: m.themeColor }}>{m.role}</p>
                      <p className="team-next-card-sub">{m.subtext}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* Personalized Contact / CTA Section */}
          <section className="team-personal-cta-section">
            <div className="team-personal-cta-card">
              <div className="team-personal-cta-left">
                <span className="team-cta-badge">Direct Collaboration</span>
                <h3 className="team-cta-title">
                  Ready to work with <span style={{ color: member.themeColor }}>{member.name}</span>?
                </h3>
                <p className="team-cta-desc">
                  Whether you're exploring autonomous AI systems, enterprise software, or category-defining digital flagships, connect directly with our leadership team.
                </p>
              </div>

              <div className="team-personal-cta-right">
                <motion.button
                  className="team-cta-primary-btn"
                  style={{ backgroundColor: member.themeColor }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    navigate('/contact');
                    window.scrollTo(0, 0);
                  }}
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={16} />
                </motion.button>

                <a 
                  href={`mailto:${member.email}`} 
                  className="team-cta-secondary-link"
                >
                  <Mail size={15} />
                  <span>Email {member.name.split(' ')[0]}</span>
                </a>
              </div>
            </div>
          </section>
        </section>
      </div>

      {/* Trailing Section: "Let's talk." Contact Section */}
      <ContactSection />
    </div>
  );
}
