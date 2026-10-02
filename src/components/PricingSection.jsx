import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, animate, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, Users, MessageSquare, ArrowUpRight } from 'lucide-react';

function AnimatedPrice({ value, prefix = '€', suffix = '/project' }) {
  const nodeRef = useRef(null);
  const prevValRef = useRef(value);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (typeof value !== 'number') {
      node.textContent = value;
      return;
    }

    if (shouldReduceMotion) {
      node.textContent = `${prefix}${value.toLocaleString()}`;
      return;
    }

    const startVal = typeof prevValRef.current === 'number' ? prevValRef.current : 0;
    const controls = animate(startVal, value, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${prefix}${Math.round(latest).toLocaleString()}`;
      }
    });

    prevValRef.current = value;
    return () => controls.stop();
  }, [value, prefix, shouldReduceMotion]);

  if (typeof value !== 'number') {
    return (
      <span className="pricing-num-display pricing-custom-display">
        <span>{value}</span>
        <span className="pricing-suffix">{suffix}</span>
      </span>
    );
  }

  return (
    <span className="pricing-num-display">
      <span className="pricing-from-prefix">from </span>
      <span ref={nodeRef}>{prefix}{value.toLocaleString()}</span>
      <span className="pricing-suffix">{suffix}</span>
    </span>
  );
}

export default function PricingSection() {
  const navigate = useNavigate();
  // 'starter' (from €500) | 'team' (Custom / Open for Discussion)
  const [pricingMode, setPricingMode] = useState('starter');
  const [addOnActive, setAddOnActive] = useState(false);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15, margin: "-100px 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const islandScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);

  const isStarter = pricingMode === 'starter';
  const basePrice = 500;
  const addOnPrice = 250;

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
                <span className="pricing-badge-text">Transparent Investment</span>
              </motion.div>

              <motion.div variants={itemVariants} className="pricing-headline-box">
                <h2 className="pricing-headline">Pricing.</h2>

                {/* Global Interactive Toggle Pill */}
                <div className="pricing-mode-toggle">
                  <button
                    className={`pricing-toggle-btn ${pricingMode === 'starter' ? 'active' : ''}`}
                    onClick={() => setPricingMode('starter')}
                  >
                    <span>Starter Builds (from €500)</span>
                    {pricingMode === 'starter' && (
                      <motion.div 
                        layoutId="activePricingPill" 
                        className="pricing-active-indicator"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </button>

                  <button
                    className={`pricing-toggle-btn ${pricingMode === 'team' ? 'active' : ''}`}
                    onClick={() => setPricingMode('team')}
                  >
                    <span>Dedicated Team / Custom Scope</span>
                    {pricingMode === 'team' && (
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
                  <h3 className="pricing-addon-title">Want more traffic and conversion?</h3>
                  <p className="pricing-addon-desc">
                    Add full search engine optimization, semantic schema, and conversion tracking aligned with your business goals.
                  </p>
                </div>

                <div className="pricing-addon-bottom">
                  <span className="pricing-addon-price">+€{addOnPrice}</span>
                  
                  {/* Interactive Toggle Switch */}
                  <div 
                    className={`pricing-switch-track ${addOnActive ? 'switch-on' : ''}`}
                    onClick={() => setAddOnActive(!addOnActive)}
                    role="button"
                    tabIndex={0}
                    aria-label="Toggle SEO & Growth add-on"
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
                    {isStarter ? (
                      <AnimatedPrice 
                        value={basePrice + (addOnActive ? addOnPrice : 0)} 
                        prefix="€" 
                        suffix="/project & up" 
                      />
                    ) : (
                      <div className="pricing-discuss-wrap">
                        <span className="pricing-discuss-heading">Team Scope</span>
                        <span className="pricing-discuss-sub">Open for Discussion</span>
                      </div>
                    )}
                  </div>

                  <div className="pricing-features-col">
                    <ul className="pricing-feature-list">
                      {isStarter ? (
                        <>
                          <li>
                            <span className="pricing-feature-dot">•</span>
                            <span>Starts from <strong>€500</strong> for landing page & core web presence</span>
                          </li>
                          <li>
                            <span className="pricing-feature-dot">•</span>
                            <span>Modern custom React / Next.js architecture & UI</span>
                          </li>
                          <li>
                            <span className="pricing-feature-dot">•</span>
                            <span>Sub-second mobile optimization & Core Web Vitals</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <span className="pricing-feature-dot">•</span>
                            <span>Dedicated engineering team allocation (Frontend, Backend, UI/UX)</span>
                          </li>
                          <li>
                            <span className="pricing-feature-dot">•</span>
                            <span>Tailored architecture for complex SaaS, AI pipelines & mobile apps</span>
                          </li>
                          <li>
                            <span className="pricing-feature-dot">•</span>
                            <span>Flexible team pricing & sprint milestones open for discussion</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Bottom Compartment (1px Divider Line Separation) */}
                <div className="pricing-main-bottom">
                  <div className="pricing-delivery-info">
                    <span className="pricing-delivery-label">
                      {isStarter ? "Delivery time" : "Engagement model"}
                    </span>
                    <span className="pricing-delivery-val">
                      {isStarter ? "1-2 weeks sprint" : "Custom Team Agreement"}
                    </span>
                  </div>

                  <motion.button 
                    className="pricing-cta-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/contact?topic=' + (isStarter ? 'starter-project' : 'team-discussion'))}
                  >
                    <span>{isStarter ? "Start from €500" : "Discuss Team Scope"}</span>
                    <ArrowUpRight size={15} />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Bottom Subtext & Client Success Manager Lockup */}
            <motion.div variants={itemVariants} className="pricing-footer-lockup">
              <p className="pricing-footer-text">
                <strong>Base web projects start from €500 and up.</strong> For larger platforms, custom enterprise SaaS, and multi-engineer teams, pricing is customized and completely open for discussion based on your specific requirements.
              </p>

              <div className="pricing-manager-stamp" onClick={() => navigate('/team/henri-bajramaj')} style={{ cursor: 'pointer' }}>
                <div className="pricing-manager-icon-box">
                  <ShieldCheck size={18} color="#10b981" />
                </div>
                <span>Henri Bajramaj — Client Success & Team Partnerships</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
