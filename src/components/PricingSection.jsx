import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, animate, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function AnimatedPrice({ value, prefix = '$', suffix = '/project' }) {
  const nodeRef = useRef(null);
  const prevValRef = useRef(value);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (shouldReduceMotion) {
      node.textContent = `${prefix}${value.toLocaleString()}`;
      return;
    }

    const controls = animate(prevValRef.current, value, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${prefix}${Math.round(latest).toLocaleString()}`;
      }
    });

    prevValRef.current = value;
    return () => controls.stop();
  }, [value, prefix, shouldReduceMotion]);

  return (
    <span className="pricing-num-display">
      <span ref={nodeRef}>{prefix}{value.toLocaleString()}</span>
      <span className="pricing-suffix">{suffix}</span>
    </span>
  );
}

export default function PricingSection() {
  const navigate = useNavigate();
  const [pricingMode, setPricingMode] = useState('project'); // 'project' | 'monthly'
  const [addOnActive, setAddOnActive] = useState(false);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15, margin: "-100px 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const islandScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);

  const currentPrice = pricingMode === 'project' ? 2490 : 4500;
  const currentSuffix = pricingMode === 'project' ? '/project' : '/monthly';

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

  const cardHoverProps = {
    whileHover: { y: -4, borderColor: "rgba(255, 255, 255, 0.2)" },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <div className="pricing-outer-wrapper" ref={containerRef}>
      <motion.section 
        className="pricing-island-card"
        style={{ scale: islandScale }}
      >
        {/* Kinetic Background Atmosphere */}
        <img 
          src="/hero-texture.png" 
          alt="Dark background texture" 
          className="pricing-texture-bg"
        />

        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="pricing-wrapper"
          >
            {/* Top Header Block */}
            <div className="pricing-header-grid">
              <motion.div variants={itemVariants} className="pricing-badge-pill">
                <span className="pricing-badge-plus">+</span>
                <span className="pricing-badge-text">Simple pricing</span>
              </motion.div>

              <motion.div variants={itemVariants} className="pricing-headline-box">
                <h2 className="pricing-headline">Pricing.</h2>

                {/* Global Interactive Toggle Pill */}
                <div className="pricing-mode-toggle">
                  <button
                    className={`pricing-toggle-btn ${pricingMode === 'project' ? 'active' : ''}`}
                    onClick={() => setPricingMode('project')}
                  >
                    Per project
                    {pricingMode === 'project' && (
                      <motion.div 
                        layoutId="activePricingPill" 
                        className="pricing-active-indicator"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </button>

                  <button
                    className={`pricing-toggle-btn ${pricingMode === 'monthly' ? 'active' : ''}`}
                    onClick={() => setPricingMode('monthly')}
                  >
                    Monthly
                    {pricingMode === 'monthly' && (
                      <motion.div 
                        layoutId="activePricingPill" 
                        className="pricing-active-indicator"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Two-Column Asymmetrical Pricing Grid */}
            <div className="pricing-cards-grid">
              {/* Left Card: Add-on Upsell Card */}
              <motion.div 
                variants={itemVariants} 
                className={`pricing-addon-card ${addOnActive ? 'addon-enabled' : ''}`}
                {...cardHoverProps}
              >
                <div className="pricing-addon-top">
                  <h3 className="pricing-addon-title">Want more traffic and leads?</h3>
                  <p className="pricing-addon-desc">
                    Add marketing and SEO tools aligned with your goals.
                  </p>
                </div>

                <div className="pricing-addon-bottom">
                  <span className="pricing-addon-price">+$1,490</span>
                  
                  {/* Interactive Toggle Switch */}
                  <div 
                    className={`pricing-switch-track ${addOnActive ? 'switch-on' : ''}`}
                    onClick={() => setAddOnActive(!addOnActive)}
                  >
                    <motion.div 
                      className="pricing-switch-knob"
                      animate={{ x: addOnActive ? 22 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Card: Main Architectural Pricing Card */}
              <motion.div 
                variants={itemVariants} 
                className="pricing-main-card"
                {...cardHoverProps}
              >
                {/* Top Compartment */}
                <div className="pricing-main-top">
                  <div className="pricing-price-col">
                    <AnimatedPrice 
                      value={currentPrice + (addOnActive ? 1490 : 0)} 
                      prefix="$" 
                      suffix={currentSuffix} 
                    />
                  </div>

                  <div className="pricing-features-col">
                    <ul className="pricing-feature-list">
                      <li>
                        <span className="pricing-feature-dot">•</span>
                        <span>Homepage and up to 5 inner pages</span>
                      </li>
                      <li>
                        <span className="pricing-feature-dot">•</span>
                        <span>Design and Development</span>
                      </li>
                      <li>
                        <span className="pricing-feature-dot">•</span>
                        <span>Mobile Optimized Design</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Compartment (1px Divider Line Separation) */}
                <div className="pricing-main-bottom">
                  <div className="pricing-delivery-info">
                    <span className="pricing-delivery-label">Delivery time</span>
                    <span className="pricing-delivery-val">2-3 weeks</span>
                  </div>

                  <motion.button 
                    className="pricing-cta-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/contact')}
                  >
                    Get in touch
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Bottom Subtext & Client Success Manager Lockup */}
            <motion.div variants={itemVariants} className="pricing-footer-lockup">
              <p className="pricing-footer-text">
                <strong>Add marketing, SEO, or content creation</strong>—flexible tools to strengthen your project. We'll shape a solution that fits your business, not ours.
              </p>

              <div className="pricing-manager-stamp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>logoipsum Client Success Manager</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
