import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, animate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe } from '@/components/ui/cobe-globe';

// High-Performance Dynamic Ticker Component for Numbers
function AnimatedNumber({ value, suffix = '', duration = 2.0 }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-20px 0px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    
    if (shouldReduceMotion) {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${value}${suffix}`;
      }
      return;
    }

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${Math.round(latest)}${suffix}`;
      }
    });

    return () => controls.stop();
  }, [isInView, value, suffix, duration, shouldReduceMotion]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

const servicesData = [
  {
    id: '001',
    index: '(001)',
    title: 'Web development & modernization',
    description: 'Corporate websites, e-commerce, customer portals, dashboards, and custom web applications built for performance.',
    image: '/service-1.png',
    categories: ['Corporate websites', 'Landing pages', 'E-commerce', 'Portals & Dashboards', 'API integrations', 'Redesigns'],
    count: 6
  },
  {
    id: '002',
    index: '(002)',
    title: 'AI & AI Agents technology',
    description: 'AI customer assistants, lead qualification agents, code generation tools, internal knowledge assistants, and automated workflows.',
    image: '/service-2.png',
    categories: ['AI Chatbots', 'Sales Assistants', 'Lead Qualification', 'Knowledge Tools', 'Code Generation', 'Automated QA'],
    count: 6
  },
  {
    id: '003',
    index: '(003)',
    title: 'Mobile app development',
    description: 'Full product lifecycle for iOS, Android, and cross-platform apps for businesses, marketplaces, and enterprise platforms.',
    image: '/service-3.png',
    categories: ['iOS & Android', 'Cross-platform', 'Marketplaces', 'Booking apps', 'Auth & Payments', 'Analytics'],
    count: 6
  },
  {
    id: '004',
    index: '(004)',
    title: 'Digital marketing & SMMA',
    description: 'Paid advertising, social media management, content strategy, and conversion optimization that turn traffic into business growth.',
    image: '/service-4.png',
    categories: ['Paid Advertising', 'Social Media', 'Lead Generation', 'Conversion UX', 'Campaign Strategy'],
    count: 5
  }
];

const globalMarkers = [
  { id: "sf", location: [37.7595, -122.4367], label: "San Francisco" },
  { id: "nyc", location: [40.7128, -74.006], label: "New York" },
  { id: "london", location: [51.5074, -0.1278], label: "London" },
  { id: "zurich", location: [47.3769, 8.5417], label: "Zurich" },
  { id: "dubai", location: [25.2048, 55.2708], label: "Dubai" },
  { id: "tokyo", location: [35.6762, 139.6503], label: "Tokyo" },
  { id: "singapore", location: [1.3521, 103.8198], label: "Singapore" },
  { id: "sydney", location: [-33.8688, 151.2093], label: "Sydney" },
];

const globalArcs = [
  { id: "sf-london", from: [37.7595, -122.4367], to: [51.5074, -0.1278], label: "SF → London" },
  { id: "london-zurich", from: [51.5074, -0.1278], to: [47.3769, 8.5417], label: "London → Zurich" },
  { id: "zurich-dubai", from: [47.3769, 8.5417], to: [25.2048, 55.2708], label: "Zurich → Dubai" },
  { id: "dubai-tokyo", from: [25.2048, 55.2708], to: [35.6762, 139.6503], label: "Dubai → Tokyo" },
  { id: "tokyo-singapore", from: [35.6762, 139.6503], to: [1.3521, 103.8198], label: "Tokyo → Singapore" },
];

export default function ServicesSection() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0); // 001 open by default
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15, margin: "-80px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const cardScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.97, 1, 1, 0.97]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08
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

  const imageZoomVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const pillHoverVariants = {
    rest: { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.06)", color: "rgba(255, 255, 255, 0.85)" },
    hover: {
      scale: 1.03,
      backgroundColor: "#ffffff",
      color: "#0a0a0a",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  return (
    <div className="services-outer-wrapper" ref={sectionRef}>
      <motion.section 
        className="services-island-card"
        style={{ scale: cardScale }}
      >
        {/* Kinetic Atmospheric Background Texture */}
        <img 
          src="/hero-texture.png" 
          alt="Dark atmospheric background" 
          className="services-texture-bg"
        />

        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="services-wrapper"
          >
            {/* Top Header Block */}
            <div className="services-header-grid">
              <motion.div variants={itemVariants} className="services-badge-pill">
                <span className="services-badge-plus">+</span>
                <span className="services-badge-text">What we do</span>
              </motion.div>

              <motion.div variants={itemVariants} className="services-headline-box">
                <h2 className="services-headline">
                  Services.<sup>(<AnimatedNumber value={4} />)</sup>
                </h2>
              </motion.div>
            </div>

            {/* Stacked Full-Width Accordion Rows */}
            <div className="services-accordion-list">
              {servicesData.map((service, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={service.id}
                    className={`services-row-item ${isOpen ? 'is-open' : ''}`}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    {/* Row Outer Header */}
                    <div className="services-row-header">
                      <span className="services-row-index">{service.index}</span>

                      <div className="services-row-title-wrap">
                        <h3 className="services-title-text">{service.title}</h3>
                      </div>

                      <div className="services-icon-wrapper">
                        <motion.span
                          className="services-plus-icon"
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          +
                        </motion.span>
                      </div>
                    </div>

                    {/* Smooth Accordion Expansion */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="services-expanded-content"
                        >
                          <div className="services-expanded-grid">
                            {/* Left Block: Image Thumbnail & Description */}
                            <div className="services-main-block">
                              <motion.div 
                                className="services-image-box"
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                              >
                                <motion.img 
                                  src={service.image} 
                                  alt={service.title}
                                  className="services-thumb-img"
                                  variants={imageZoomVariants}
                                />
                              </motion.div>

                              <div className="services-text-box">
                                <p className="services-expanded-desc">{service.description}</p>
                              </div>
                            </div>

                            {/* Right Block: Pill-Shaped Category Tags */}
                            <div className="services-categories-block">
                              <span className="services-cat-label">Categories</span>
                              <div className="services-pills-wrap">
                                {service.categories.map((cat, cIdx) => (
                                  <motion.span
                                    key={cIdx}
                                    className="services-category-pill"
                                    variants={pillHoverVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    animate="rest"
                                  >
                                    {cat}
                                  </motion.span>
                                ))}
                                
                                {/* Counter Pill Tag */}
                                <motion.span 
                                  className="services-category-pill pill-counter"
                                  variants={pillHoverVariants}
                                  initial="rest"
                                  whileHover="hover"
                                  animate="rest"
                                >
                                  <AnimatedNumber value={service.count} suffix="+" />
                                </motion.span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Global Network Showcase Block ("We Are Everywhere") */}
            <motion.div variants={itemVariants} className="services-globe-showcase">
              <div className="services-globe-grid">
                <div className="services-globe-info">
                  <h3 className="services-globe-title">
                    We are everywhere.
                  </h3>

                  <p className="services-globe-desc">
                    Operating across key digital epicenters worldwide — delivering high-performance platforms, AI agent architectures, and custom web engines with 24/7 continuous engineering.
                  </p>

                  <div className="services-globe-stats">
                    <div className="globe-stat-item">
                      <span className="globe-stat-value">12+</span>
                      <span className="globe-stat-label">Global Hubs</span>
                    </div>
                    <div className="globe-stat-item">
                      <span className="globe-stat-value">99.99%</span>
                      <span className="globe-stat-label">Uptime SLA</span>
                    </div>
                    <div className="globe-stat-item">
                      <span className="globe-stat-value">24/7</span>
                      <span className="globe-stat-label">Active Support</span>
                    </div>
                  </div>
                </div>

                <div className="services-globe-canvas-wrapper">
                  <Globe
                    markers={globalMarkers}
                    arcs={globalArcs}
                    className="services-globe-canvas"
                    markerColor={[0.1, 0.85, 0.95]}
                    baseColor={[0.85, 0.9, 1.0]}
                    arcColor={[0.3, 0.75, 1.0]}
                    glowColor={[0.15, 0.3, 0.5]}
                    dark={1}
                    mapBrightness={7}
                    markerSize={0.03}
                    markerElevation={0.01}
                    speed={0.0035}
                  />
                </div>
              </div>
            </motion.div>

            {/* Bottom Call-To-Action Pill Button */}
            <motion.div variants={itemVariants} className="services-footer-cta">
              <button className="services-cta-btn" onClick={() => navigate('/contact')}>
                Get started
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

