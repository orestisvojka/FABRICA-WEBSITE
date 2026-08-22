import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';

// High-Performance Dynamic Ticker Component
function AnimatedNumber({ value, suffix = '', duration = 2.2 }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-40px 0px' });
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

    // Cubic-bezier deceleration timing (rapid ascension, exponential brake near terminus)
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

export default function WhyChooseUsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2, margin: "-80px 0px" });

  // Staggered Waterfall Variants
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
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Card Hover Scale Variants for Image
  const portraitHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const cardHoverProps = {
    whileHover: { y: -4, boxShadow: "0 16px 32px rgba(0, 0, 0, 0.06)" },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <section className="why-choose-us-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="why-wrapper"
        >
          {/* Top Header Block */}
          <div className="why-header-grid">
            <motion.div variants={itemVariants} className="why-badge-pill">
              <span className="why-badge-plus">+</span>
              <span className="why-badge-text">Why choose us</span>
            </motion.div>

            <motion.div variants={itemVariants} className="why-headline-box">
              <h2 className="why-headline">
                <span className="why-headline-dark">Proven results for every project,</span>{" "}
                <span className="why-headline-muted">with a focus on design and functionality.</span>
              </h2>
            </motion.div>
          </div>

          {/* Main Content Layout Grid */}
          <div className="why-content-grid">
            {/* Left Column: Bounded Scaling Portrait Card */}
            <motion.div variants={itemVariants} className="why-portrait-card-wrapper">
              <motion.div 
                className="why-portrait-card"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.img 
                  src="/why-choose-us-portrait.png" 
                  alt="QuolyTech Creative Studio Model" 
                  className="why-portrait-img"
                  variants={portraitHoverVariants}
                />
                
                {/* Top Right Floating Badge */}
                <div className="why-portrait-badge">
                  <span className="why-portrait-plus">+</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Philosophy Text + Bento Metrics Grid */}
            <div className="why-right-column">
              {/* Top Philosophy Paragraph */}
              <motion.div variants={itemVariants} className="why-narrative-block">
                <p className="why-narrative-text">
                  <strong className="why-narrative-bold">No fluff, just results.</strong>{" "}
                  Thoughtful design and tools that make your work easier. We focus on smart design and useful features, project after project.
                </p>
              </motion.div>

              {/* Bento Grid Metrics (2 Split Columns) */}
              <div className="why-bento-grid">
                {/* Column 1: Projects Completed */}
                <motion.div className="why-bento-column" variants={itemVariants}>
                  {/* Top Metric Card */}
                  <motion.div className="why-card-top" {...cardHoverProps}>
                    <div className="why-metric-number">
                      <AnimatedNumber value={50} suffix="+" />
                    </div>
                    <span className="why-metric-index">01</span>
                  </motion.div>

                  {/* Bottom Detail Card */}
                  <motion.div className="why-card-bottom" {...cardHoverProps}>
                    <div className="why-card-label-row">
                      <h3 className="why-card-label">
                        Successful projects<br />completed
                      </h3>
                    </div>
                    <div className="why-card-footer-row">
                      <p className="why-card-desc">
                        We've delivered 50+ projects that help companies generate real results.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Column 2: Satisfaction Rate */}
                <motion.div className="why-bento-column" variants={itemVariants}>
                  {/* Top Metric Card */}
                  <motion.div className="why-card-top" {...cardHoverProps}>
                    <div className="why-metric-number">
                      <AnimatedNumber value={95} suffix="%" />
                    </div>
                    <span className="why-metric-index">02</span>
                  </motion.div>

                  {/* Bottom Detail Card */}
                  <motion.div className="why-card-bottom" {...cardHoverProps}>
                    <div className="why-card-label-row">
                      <h3 className="why-card-label">
                        Customer<br />satisfaction rate
                      </h3>
                    </div>
                    <div className="why-card-footer-row">
                      <div className="why-client-logos">
                        {/* Logo 1: logoipsum* stacked shapes + text */}
                        <div className="why-logo-stacked">
                          <div className="why-logo-shapes">
                            <span className="shape-rect"></span>
                            <span className="shape-circle"></span>
                            <span className="shape-circle"></span>
                          </div>
                          <span className="why-logo-text">logoipsum*</span>
                        </div>

                        {/* Logo 2: logoipsum wave */}
                        <div className="why-logo-inline">
                          <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="#777777" strokeWidth="2">
                            <path d="M1 5C4 2 7 2 10 5C13 8 16 8 19 5" />
                            <path d="M1 10C4 7 7 7 10 10C13 13 16 13 19 10" opacity="0.6"/>
                          </svg>
                          <span className="why-logo-text">logoipsum</span>
                        </div>

                        {/* Logo 3: Logoipsum bolt badge */}
                        <div className="why-logo-inline">
                          <div className="why-bolt-badge">
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="#ffffff">
                              <path d="M6 0L0 7H4.5L3.5 12L10 5H5.5L6 0Z"/>
                            </svg>
                          </div>
                          <span className="why-logo-text-bold">Logoipsum</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
