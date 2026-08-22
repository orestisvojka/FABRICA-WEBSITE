import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ContactSection from '../components/ContactSection';

// Dynamic DOM Patching Number Ticker Counter Component with Fallback Safety
function AnimatedMetric({ targetValue, suffix = '', prefix = '' }) {
  const nodeRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (!isInView) {
      node.textContent = `${prefix}${targetValue}${suffix}`;
      return;
    }

    const controls = animate(0, targetValue, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });

    return () => controls.stop();
  }, [isInView, targetValue, prefix, suffix]);

  return (
    <span ref={containerRef} className="studio-metric-num">
      <span ref={nodeRef}>{prefix}{targetValue}{suffix}</span>
    </span>
  );
}

export default function Studio() {
  const navigate = useNavigate();

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

  const awards = [
    { id: '001', name: 'Best web design agency', nom: 'Web Excellence Awards', year: '2026' },
    { id: '002', name: 'Top digital marketing firm', nom: 'Clutch Top Agencies', year: '2024' },
    { id: '003', name: 'Best web design agency', nom: 'Awwwards Honorable Mention', year: '2024' },
    { id: '004', name: 'Top UI/UX Innovation', nom: 'CSS Design Awards', year: '2023' }
  ];

  const clientLogos = [
    { id: 1, name: 'LOOM', year: '/2026', slug: 'boltshift' },
    { id: 2, name: 'LOQO', year: '/2026', slug: 'mastermail' },
    { id: 3, name: 'APEX', year: '/2024', slug: 'ephemeral' },
    { id: 4, name: 'POWERSURGE', year: '/2024', slug: 'powersurge' },
    { id: 5, name: 'CLOUDWATCH', year: '/2023', slug: 'cloudwatch' },
    { id: 6, name: 'LOGOIPSUM', year: '/2020', slug: 'warpspeed' }
  ];

  return (
    <div className="studio-page-outer">
      {/* SECTION 1: Studio Hero & Mission */}
      <section className="studio-hero-section">
        <div className="studio-container">
          <motion.div
            className="studio-hero-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {/* Left Title */}
            <motion.div variants={itemVariants} className="studio-hero-title-box">
              <h1 className="studio-hero-main-title">Studio.</h1>
            </motion.div>

            {/* Right Mission & Review Lockup */}
            <motion.div variants={itemVariants} className="studio-hero-text-box">
              <div className="studio-badge-row">
                <span className="studio-badge-dot">●</span>
                <span className="studio-badge-label">About us</span>
              </div>

              <p className="studio-hero-mission-statement">
                QuolyTech® is built around a simple promise: <strong>CREATE. HELP. GROW.</strong> We combine software development, UI/UX design, artificial intelligence, and digital marketing to build modern digital products that solve real problems and create sustainable growth.
              </p>

              <p className="studio-hero-subcaption">
                Digital Products • AI • Web • Mobile • Design • Growth (2026 Edition)
              </p>

              {/* Star Rating Badge */}
              <div className="studio-review-stamp">
                <div className="studio-stars">★★★★★</div>
                <span className="studio-review-text"><strong>5.0</strong> rating · 500+ projects completed (99.9% satisfaction)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Full-width Wide Landscape Hero Image Card */}
          <motion.div
            className="studio-hero-img-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            whileHover="hover"
          >
            <div className="studio-hero-img-wrapper">
              <motion.img
                src="/studio-hero-laptop.png"
                alt="QuolyTech Studio Team at Work"
                className="studio-hero-img"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.06 }
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              />
              <div className="studio-hero-img-gradient" />
            </div>
            <motion.span
              className="studio-hero-brand-tag"
              variants={{
                initial: { y: 0, opacity: 0.9 },
                hover: { y: -4, opacity: 1 }
              }}
            >
              QuolyTech®
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Metrics, Animated Line Drawings & Client Bento Grid */}
      <section className="studio-metrics-section">
        <div className="studio-container">
          {/* Top Line Drawing */}
          <motion.div
            className="studio-drawn-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* 4-Column Dynamic Metric Grid with Number Counting */}
          <motion.div
            className="studio-metrics-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div variants={itemVariants} className="studio-metric-item">
              <AnimatedMetric targetValue={3} suffix="m+" />
              <span className="studio-metric-label">Ad impressions managed</span>
            </motion.div>

            <motion.div variants={itemVariants} className="studio-metric-item">
              <AnimatedMetric targetValue={500} suffix="+" />
              <span className="studio-metric-label">Projects completed</span>
            </motion.div>

            <motion.div variants={itemVariants} className="studio-metric-item">
              <AnimatedMetric targetValue={99} suffix=".9%" />
              <span className="studio-metric-label">Client satisfaction rate</span>
            </motion.div>

            <motion.div variants={itemVariants} className="studio-metric-item">
              <AnimatedMetric targetValue={50} suffix="k+" />
              <span className="studio-metric-label">Monthly visitors driven through SEO</span>
            </motion.div>
          </motion.div>

          {/* Middle Line Drawing Animation */}
          <motion.div
            className="studio-drawn-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Approach Mission Statement Lockup */}
          <motion.div
            className="studio-approach-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div variants={itemVariants} className="studio-approach-left">
              <span className="studio-brand-watermark">QuolyTech®</span>
              <p className="studio-approach-tagline">
                CREATE. HELP. GROW. — One partner for your entire digital ecosystem.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="studio-approach-right">
              <p className="studio-approach-main-text">
                Our vision is to make technology simpler, faster, smarter, and more competitive: <strong>we combine Web Development, Mobile Apps, AI Agents, Custom Software, and Digital Marketing under one roof so businesses can avoid managing multiple disconnected suppliers.</strong>
              </p>
              <p className="studio-approach-sub-text">
                From discovery to design, development, launch, and AI integration, our objective is to create one connected digital journey that builds measurable business value.
              </p>

              <motion.button
                className="studio-portfolio-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                onClick={() => navigate('/projects')}
              >
                <span>Portfolio</span>
                <span className="studio-btn-dot"></span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Client Bento Grid (3x2 Grid) */}
          <div className="studio-clients-block">
            {/* Bento Grid Top Line Drawing */}
            <motion.div
              className="studio-drawn-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
            />

            <div className="studio-clients-header">
              <div className="studio-badge-row">
                <span className="studio-badge-dot">●</span>
                <span className="studio-badge-label">Our clients</span>
              </div>
              <span className="studio-year-stamp">(2016-25©)</span>
            </div>

            <motion.div
              className="studio-bento-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {clientLogos.map((logo) => (
                <motion.div
                  key={logo.id}
                  variants={itemVariants}
                  className="studio-bento-card studio-bento-card-interactive"
                  onClick={() => {
                    navigate(`/projects/${logo.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  style={{ cursor: 'pointer' }}
                  whileHover={{
                    y: -8,
                    scale: 1.025,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  <motion.div
                    className="studio-logo-display"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="studio-logo-name">{logo.name}</span>
                  </motion.div>
                  <div className="studio-card-footer-row">
                    <span className="studio-card-year">{logo.year}</span>
                    <span className="studio-card-arrow">↗</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Awards Table & 50/50 Team Landscape Cards */}
      <section className="studio-awards-section">
        <div className="studio-container">
          {/* Top Line Drawing */}
          <motion.div
            className="studio-drawn-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Header */}
          <motion.div
            className="studio-awards-header-block"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <div className="studio-badge-row">
              <span className="studio-badge-dot">●</span>
              <span className="studio-badge-label">Our achievements</span>
            </div>

            <h2 className="studio-awards-title">
              Awards.
            </h2>
            <span className="studio-year-stamp">(2016-25©)</span>
          </motion.div>

          {/* Tabular Accordion Awards List */}
          <motion.div
            className="studio-awards-table"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <div className="studio-table-header-row">
              <span>Award</span>
              <span className="text-right">Nomination</span>
              <span className="text-right">Year</span>
            </div>

            {awards.map((award) => (
              <motion.div key={award.id} variants={itemVariants} className="studio-table-row-wrapper">
                <motion.div
                  className="studio-table-row"
                  whileHover={{
                    x: 6,
                    backgroundColor: "rgba(0, 0, 0, 0.03)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="studio-row-id">({award.id})</span>
                  <span className="studio-row-title">
                    <motion.svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="studio-row-icon"
                      whileHover={{ rotate: 180, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </motion.svg>
                    {award.name}
                  </span>
                  <span className="studio-row-nom">{award.nom}</span>
                  <span className="studio-row-year">{award.year}</span>
                </motion.div>

                {/* Animated Line Drawing under each Row */}
                <motion.div
                  className="studio-drawn-line-thin"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* 50/50 Spatial Split Landscape Team Cards */}
          <div className="studio-team-split-grid">
            {/* Team Card 1 */}
            <motion.div
              className="studio-landscape-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              whileHover="hover"
            >
              <div className="studio-landscape-img-wrapper">
                <motion.img
                  src="/studio-team-group.png"
                  alt="Meet the team"
                  className="studio-landscape-img"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.06 }
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
              <motion.div
                className="studio-landscape-footer"
                variants={{
                  initial: { y: 0 },
                  hover: { y: -4 }
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="studio-landscape-title">Meet the team</span>
                <span className="studio-landscape-year">/2024</span>
              </motion.div>
            </motion.div>

            {/* Team Card 2 */}
            <motion.div
              className="studio-landscape-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
              whileHover="hover"
            >
              <div className="studio-landscape-img-wrapper">
                <motion.img
                  src="/studio-team-collab.png"
                  alt="How work gets done"
                  className="studio-landscape-img"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.06 }
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
              <motion.div
                className="studio-landscape-footer"
                variants={{
                  initial: { y: 0 },
                  hover: { y: -4 }
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="studio-landscape-title">How work gets done</span>
                <span className="studio-landscape-year">/2026</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Philosophy Lockup */}
          <motion.div
            className="studio-philosophy-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div variants={itemVariants} className="studio-phil-badge-col">
              <div className="studio-badge-row">
                <span className="studio-badge-dot">●</span>
                <span className="studio-badge-label">What else?</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="studio-phil-text-col">
              <p className="studio-phil-main-text">
                We believe a successful digital product is more than an attractive interface—<strong>it should solve real business problems, automate repetitive work, provide a great user experience, and generate measurable revenue.</strong>
              </p>
              <p className="studio-phil-sub-text">
                Whether you need a modern web application, custom AI tools, mobile platform, or lead-generation marketing strategy, QuolyTech provides technology built to scale with your business.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trailing Section: "Let's talk." Contact Section */}
      <ContactSection />
    </div>
  );
}
