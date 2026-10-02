import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';

// Dynamic DOM Patching Number Ticker Counter Component
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

  const capabilitiesList = [
    { id: '001', name: 'AI Systems & AI Agents', nom: 'Support Agents, Lead Qualifiers, Process Automation', category: 'AI' },
    { id: '002', name: 'Startup & SaaS Development', nom: 'MVPs, Technical Architecture, Cloud SaaS Platforms, Launch', category: 'Product' },
    { id: '003', name: 'Web & Mobile Apps', nom: 'React, Next.js, React Native, iOS & Android', category: 'Apps' },
    { id: '004', name: 'UI/UX Design & Branding', nom: 'Interfaces, Prototypes, Design Systems, Brand Identity', category: 'Design' },
    { id: '005', name: 'Systems Management', nom: 'Administration, Optimization, Maintenance', category: 'Infrastructure' },
    { id: '006', name: 'Social Media Marketing', nom: 'Strategy, Content, Digital Campaigns', category: 'Marketing' }
  ];

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QuolyTech",
    "url": "https://quolytech.com/about/",
    "logo": "https://quolytech.com/quolytech-logo.jpg",
    "description": "QuolyTech is a technology and design agency based in Tiranë, Albania. We help businesses grow with AI systems and agents, startup and SaaS development, web and mobile apps, UI/UX design, systems management and social media marketing.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tiranë",
      "addressCountry": "AL"
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
        "name": "About",
        "item": "https://quolytech.com/about/"
      }
    ]
  };

  return (
    <div className="studio-page-outer">
      <SEOHead
        title="About QuolyTech | Technology & Design Agency in Albania"
        description="QuolyTech is a technology & design agency in Tiranë, Albania: AI agents, startup & SaaS development, web & mobile apps, UI/UX design and social media marketing."
        canonicalPath="/about/"
        jsonLd={[organizationJsonLd, breadcrumbJsonLd]}
      />

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
              <h1 className="studio-hero-main-title">About.</h1>
            </motion.div>

            {/* Right Mission & Description */}
            <motion.div variants={itemVariants} className="studio-hero-text-box">
              <div className="studio-badge-row">
                <span className="studio-dot-badge"></span>
                <span className="studio-badge-text">QuolyTech • Tiranë, Albania</span>
              </div>

              <p className="studio-hero-paragraph">
                QuolyTech is a technology and design agency based in Tiranë, Albania. We help businesses grow through modern technology, smart innovation and premium design: AI systems and agents, startup and SaaS development, web and mobile apps, UI/UX design, systems management and social media marketing. We turn ideas into products.
              </p>

              <div className="studio-hero-sub-row">
                <span className="studio-sub-accent">What We Build:</span>
                <span className="studio-sub-desc">
                  AI Agents • Startups & SaaS • Web & Mobile Apps • UI/UX Design • Systems Management • Social Media Marketing
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Hero Visual Canvas Showcase */}
      <section className="studio-media-section">
        <div className="studio-container">
          <motion.div
            className="studio-media-wrapper"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <img
              src="/studio-hero-laptop.png"
              alt="QuolyTech software development workstation in Tiranë"
              className="studio-main-banner-img"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Technical Capabilities Grid */}
      <section className="studio-awards-section">
        <div className="studio-container">
          <motion.div
            className="studio-awards-header-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariants} className="studio-badge-row">
              <span className="studio-dot-badge"></span>
              <span className="studio-badge-text">Technical Capabilities</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="studio-awards-heading">
              Capabilities & Focus Areas.
            </motion.h2>
          </motion.div>

          <div className="studio-awards-list">
            {capabilitiesList.map((item) => (
              <motion.div
                key={item.id}
                className="studio-award-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="award-col-idx">{item.id}</span>
                <span className="award-col-name">{item.name}</span>
                <span className="award-col-nom">{item.nom}</span>
                <span className="award-col-year">{item.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Studio Overview Images */}
      <section className="studio-gallery-section">
        <div className="studio-container">
          <div className="studio-gallery-grid">
            <motion.div
              className="studio-gallery-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="/studio-team-collab.png"
                alt="QuolyTech engineering and design workspace"
                className="studio-gallery-img"
              />
            </motion.div>

            <motion.div
              className="studio-gallery-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <img
                src="/studio-team-group.png"
                alt="QuolyTech software development workflow"
                className="studio-gallery-img"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Core Focus Metrics */}
      <section className="studio-metrics-section">
        <div className="studio-container">
          <div className="studio-metrics-grid">
            <motion.div
              className="studio-metric-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedMetric targetValue={100} suffix="%" />
              <span className="studio-metric-label">Client Focus</span>
            </motion.div>

            <motion.div
              className="studio-metric-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AnimatedMetric targetValue={7} suffix=" Services" />
              <span className="studio-metric-label">Web, Apps, AI & Growth</span>
            </motion.div>

            <motion.div
              className="studio-metric-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedMetric targetValue={24} suffix="/7" />
              <span className="studio-metric-label">System Availability</span>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
