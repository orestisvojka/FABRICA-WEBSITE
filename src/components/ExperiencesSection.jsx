import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// High-Performance Dynamic Ticker Component
function AnimatedNumber({ value, suffix = '', duration = 2.4 }) {
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

    // Steep exponential deceleration curve
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

export default function ExperiencesSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1, margin: "-100px 0px" });

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

  const cardHoverProps = {
    whileHover: { y: -4, boxShadow: "0 16px 36px rgba(0, 0, 0, 0.06)" },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const caseStudyZoomVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section className="experiences-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="exp-wrapper"
        >
          {/* Top Header Block */}
          <div className="exp-header-grid">
            <motion.div variants={itemVariants} className="exp-badge-pill">
              <span className="exp-badge-plus">+</span>
              <span className="exp-badge-text">Testimonials</span>
            </motion.div>

            <motion.div variants={itemVariants} className="exp-headline-box">
              <h2 className="exp-headline">Experiences.</h2>
              <span className="exp-year-stamp">©2026</span>
            </motion.div>
          </div>

          {/* Tier 1: 4 Testimonial Columns (Split & Single Layout) */}
          <div className="exp-testimonials-grid">
            {/* Column 1: Single Tall Rating Summary Card */}
            <motion.div variants={itemVariants} className="exp-testi-col single-col">
              <motion.div className="exp-testi-card summary-card" {...cardHoverProps}>
                <div className="exp-rating-row">
                  <span className="exp-big-num">4.9</span>
                  <span className="exp-num-denom">/5</span>
                </div>
                <p className="exp-summary-desc">
                  We've delivered <strong>50+ projects</strong> that help companies generate real results.
                </p>
                
                <div className="exp-summary-footer">
                  <span className="exp-brand-logo">QuolyTech®</span>
                  <div className="exp-trust-row">
                    <div className="exp-avatar-stack">
                      <img src="/avatar-1.png" alt="Client avatar" />
                      <img src="/avatar-2.png" alt="Client avatar" />
                      <img src="/avatar-3.png" alt="Client avatar" />
                    </div>
                    <div className="exp-trust-text">
                      <span className="exp-stars">★★★★★</span>
                      <span>Trusted by 50+ clients worldwide</span>
                    </div>
                  </div>
                  <button className="exp-review-btn" onClick={() => navigate('/contact')}>
                    Leave a review
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Column 2: Split Cards (James Carter) */}
            <motion.div variants={itemVariants} className="exp-testi-col split-col">
              <motion.div className="exp-testi-card split-top-card" {...cardHoverProps}>
                <div className="exp-card-author-strip">
                  <img src="/avatar-1.png" alt="James Carter" className="exp-author-avatar" />
                  <div className="exp-author-info">
                    <span className="exp-author-name">James Carter</span>
                    <span className="exp-author-role">Woven & Co</span>
                  </div>
                </div>
                <div className="exp-stars-row">
                  <span className="exp-stars">★★★★★</span>
                  <span className="exp-plus-icon">+</span>
                </div>
              </motion.div>

              <motion.div className="exp-testi-card split-bottom-card" {...cardHoverProps}>
                <p className="exp-review-quote">
                  Incredible team! They delivered exactly what we needed, on time and beyond expectations.
                </p>
              </motion.div>
            </motion.div>

            {/* Column 3: Split Cards (Emily Davis) */}
            <motion.div variants={itemVariants} className="exp-testi-col split-col">
              <motion.div className="exp-testi-card split-top-card" {...cardHoverProps}>
                <p className="exp-review-quote">
                  A smooth process from start to finish. Highly professional team!
                </p>
              </motion.div>

              <motion.div className="exp-testi-card split-bottom-card" {...cardHoverProps}>
                <div className="exp-stars-row" style={{ marginTop: 0, marginBottom: '12px' }}>
                  <span className="exp-stars">★★★★★</span>
                  <span className="exp-plus-icon">+</span>
                </div>
                <div className="exp-card-author-strip">
                  <img src="/avatar-2.png" alt="Emily Davis" className="exp-author-avatar" />
                  <div className="exp-author-info">
                    <span className="exp-author-name">Emily Davis</span>
                    <span className="exp-author-role">Startup Hub</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Column 4: Split Cards (Anna Martinez) */}
            <motion.div variants={itemVariants} className="exp-testi-col split-col">
              <motion.div className="exp-testi-card split-top-card" {...cardHoverProps}>
                <div className="exp-card-author-strip">
                  <img src="/avatar-3.png" alt="Anna Martinez" className="exp-author-avatar" />
                  <div className="exp-author-info">
                    <span className="exp-author-name">Anna Martinez</span>
                    <span className="exp-author-role">Marketing Director</span>
                  </div>
                </div>
                <div className="exp-stars-row">
                  <span className="exp-stars">★★★★★</span>
                  <span className="exp-plus-icon">+</span>
                </div>
              </motion.div>

              <motion.div className="exp-testi-card split-bottom-card" {...cardHoverProps}>
                <p className="exp-review-quote">
                  Our new branding is exactly what we envisioned—clean, modern, and unique. #1 in our industry.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Tier 2: Middle Free-Floating Metrics Row */}
          <div className="exp-metrics-row">
            <motion.div variants={itemVariants} className="exp-metric-block">
              <div className="exp-metric-num">
                <AnimatedNumber value={3} suffix="m+" />
              </div>
              <span className="exp-metric-label">Ad impressions<br />managed</span>
            </motion.div>

            <motion.div variants={itemVariants} className="exp-metric-block">
              <div className="exp-metric-num">
                <AnimatedNumber value={500} suffix="+" />
              </div>
              <span className="exp-metric-label">Successful<br />projects launched</span>
            </motion.div>

            <motion.div variants={itemVariants} className="exp-metric-block">
              <div className="exp-metric-num">
                <AnimatedNumber value={98} suffix="%" />
              </div>
              <span className="exp-metric-label">Client<br />satisfaction rate</span>
            </motion.div>

            <motion.div variants={itemVariants} className="exp-metric-block">
              <div className="exp-metric-num">
                <AnimatedNumber value={50} suffix="k+" />
              </div>
              <span className="exp-metric-label">Monthly visitors<br />driven through SEO</span>
            </motion.div>
          </div>

          {/* Tier 3: Narrative Philosophy Block */}
          <motion.div variants={itemVariants} className="exp-narrative-section">
            <div className="exp-narrative-left">
              <span className="exp-narrative-stamp">QuolyTech®</span>
              <p className="exp-narrative-sub">
                Every project we take on is designed for long-term success.
              </p>
            </div>
            <div className="exp-narrative-right">
              <p className="exp-narrative-lead">
                Our approach is simple: <strong>we focus on functionality, speed, and clarity, ensuring that every project serves a clear purpose without unnecessary complexity.</strong>
              </p>
              <p className="exp-narrative-text">
                We don't overpromise or use flashy marketing language. We simply build well-designed, functional websites and strategies that help businesses succeed.
              </p>
            </div>
          </motion.div>

          {/* Tier 4: Bottom Asymmetric Case Study Bento Grid */}
          <div className="exp-bento-section">
            {/* Left Dominant Dark Case Study Card */}
            <motion.div variants={itemVariants} className="exp-bento-left">
              <motion.div 
                className="exp-case-card"
                initial="rest"
                whileHover="hover"
                animate="rest"
                onClick={() => navigate('/projects')}
              >
                <motion.img 
                  src="/case-study-portrait.png" 
                  alt="Case Study Featured Client" 
                  className="exp-case-img"
                  variants={caseStudyZoomVariants}
                />
                <div className="exp-case-overlay" />

                {/* Top Meta Strip */}
                <div className="exp-case-header">
                  <div>
                    <span className="exp-case-tag">Case study</span>
                    <span className="exp-case-subtitle">2026 Redesign, Frontend Optimization.</span>
                  </div>
                  <span className="exp-case-plus">+</span>
                </div>

                {/* Center Title Lockup */}
                <div className="exp-case-center-title">
                  <span>QuolyTech®</span>
                </div>

                {/* Bottom Footer Strip */}
                <div className="exp-case-footer">
                  <span className="exp-case-desc">From branding to web development and marketing.</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side: 2 Sub-Columns Grid */}
            <div className="exp-bento-right">
              {/* Sub-Column 1: Middle Tall Single Card */}
              <motion.div variants={itemVariants} className="exp-bento-middle-card" {...cardHoverProps}>
                <div className="exp-sub-meta-group">
                  <span className="exp-sub-meta-label">Performance Boost:</span>
                  <h4 className="exp-sub-highlight">Page speed +48%,<br />Bounce rate -23%</h4>
                </div>

                <div className="exp-sub-meta-group" style={{ marginTop: '24px' }}>
                  <span className="exp-sub-meta-label">Conversion Rate Improvement:</span>
                  <h4 className="exp-sub-metric-val">4.2% → 5.9%</h4>
                </div>

                <div className="exp-sub-testimonial-footer">
                  <span className="exp-stars">★★★★★</span>
                  <p className="exp-sub-quote">"Thanks to the strategy, we've seen a steady 40% increase in leads."</p>
                  <div className="exp-sub-author">
                    <img src="/avatar-1.png" alt="Project Lead" />
                    <span>Project Lead</span>
                  </div>
                </div>
              </motion.div>

              {/* Sub-Column 2: Rightmost Stacked Cards */}
              <div className="exp-bento-rightmost-col">
                {/* Top Card: 100 Pagespeed Score Gauge */}
                <motion.div variants={itemVariants} className="exp-sub-card gauge-card" {...cardHoverProps}>
                  <div className="exp-gauge-circle">
                    <svg viewBox="0 0 100 100" className="exp-gauge-svg">
                      <circle cx="50" cy="50" r="42" stroke="#eeeeee" strokeWidth="8" fill="none" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="42" 
                        stroke="#0a0a0a" 
                        strokeWidth="8" 
                        fill="none" 
                        strokeDasharray="264" 
                        strokeDashoffset="0"
                        strokeLinecap="round" 
                      />
                    </svg>
                    <span className="exp-gauge-val">100</span>
                  </div>
                  <h4 className="exp-gauge-title">Pagespeed score</h4>
                  <p className="exp-gauge-desc">
                    We prioritize performance without sacrificing visual appeal or functionality.
                  </p>
                </motion.div>

                {/* Bottom Card: 38K Bar Chart */}
                <motion.div variants={itemVariants} className="exp-sub-card chart-card" {...cardHoverProps}>
                  <div className="exp-chart-header">
                    <div>
                      <div className="exp-chart-metric-row">
                        <span className="exp-chart-big">38K</span>
                        <span className="exp-chart-badge">+160%</span>
                      </div>
                      <span className="exp-chart-label">Quarterly visits</span>
                    </div>
                  </div>

                  {/* Vertical Bar Chart with Icons */}
                  <div className="exp-chart-container">
                    <div className="exp-bar-chart">
                      <div className="exp-bar-item">
                        <div className="exp-bar" style={{ height: '28%' }}></div>
                        <span className="exp-bar-dot"></span>
                      </div>
                      <div className="exp-bar-item">
                        <div className="exp-bar" style={{ height: '42%' }}></div>
                        <span className="exp-bar-dot"></span>
                      </div>
                      <div className="exp-bar-item">
                        <div className="exp-bar" style={{ height: '58%' }}></div>
                        <span className="exp-bar-dot"></span>
                      </div>
                      <div className="exp-bar-item">
                        <div className="exp-bar" style={{ height: '76%' }}></div>
                        <span className="exp-bar-dot"></span>
                      </div>
                      <div className="exp-bar-item">
                        <div className="exp-bar active-bar" style={{ height: '100%' }}></div>
                        <span className="exp-bar-dot active-dot"></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
