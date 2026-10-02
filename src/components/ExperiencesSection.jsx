import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Terminal, 
  Trees, 
  Smile, 
  Car, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

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

  const cardHoverProps = {
    whileHover: { y: -4, boxShadow: "0 16px 36px rgba(0, 0, 0, 0.07)" },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  // 6 Verified Client Reviews (Icons only, zero person photos)
  const reviews = [
    {
      id: "pavlos-kolias",
      author: "Pavlos Kolias",
      role: "Professor & Academic Researcher",
      sector: "Mathematics & Statistics",
      icon: <GraduationCap size={18} />,
      iconBg: "rgba(59, 130, 246, 0.1)",
      iconColor: "#3b82f6",
      quote: "QuolyTech engineered my scholarly portal with exceptional academic precision. The Google Scholar integration and publications archive elevated my international research visibility immediately.",
      projectSlug: "pavlos-kolias",
      metrics: "Ranked #1 for specialized academic queries"
    },
    {
      id: "codequilters",
      author: "CodeQuilters",
      role: "Engineering Collective",
      sector: "Software Development",
      icon: <Terminal size={18} />,
      iconBg: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981",
      quote: "Collaborating with QuolyTech's engineering team was a masterclass in clean architecture. Their code quality, WebGL performance, and component modularity are second to none in the industry.",
      projectSlug: "quolix",
      metrics: "60fps WebGL rendering across devices"
    },
    {
      id: "forestal",
      author: "Forestal",
      role: "Sustainable Living Studio",
      sector: "Eco Materials & Woodcraft",
      icon: <Trees size={18} />,
      iconBg: "rgba(234, 179, 8, 0.1)",
      iconColor: "#eab308",
      quote: "They translated our natural, eco-responsible materials into a breathtaking digital experience. Our client inquiries and custom woodwork orders surged by over 200% within the first month.",
      projectSlug: "omega-architecture",
      metrics: "+220% qualified customer inquiries"
    },
    {
      id: "happy-dent",
      author: "Happy Dent",
      role: "Dental Tourism Clinic",
      sector: "Healthcare & Orthodontics",
      icon: <Smile size={18} />,
      iconBg: "rgba(14, 165, 233, 0.1)",
      iconColor: "#0ea5e9",
      quote: "The patient care portal and online consultation booking engine transformed our clinic workflow. Both local and international medical travelers consistently praise how clear and effortless the booking is.",
      projectSlug: "hypocrates-dental",
      metrics: "+300% online appointment surge"
    },
    {
      id: "autobuba",
      author: "Autobuba",
      role: "Fleet Management & Sales",
      sector: "Automotive Dealership",
      icon: <Car size={18} />,
      iconBg: "rgba(239, 68, 68, 0.1)",
      iconColor: "#ef4444",
      quote: "The vehicle search speed and digital test-drive reservation engine built by QuolyTech set a brand new benchmark in the automotive sector. Smooth, high-converting, and blazing fast.",
      projectSlug: "quolywheels",
      metrics: "Booking time reduced to under 60s"
    },
    {
      id: "kristos-s",
      author: "Kristos S.",
      role: "Managing Partner",
      sector: "Enterprise SaaS & Tech",
      icon: <Sparkles size={18} />,
      iconBg: "rgba(168, 85, 247, 0.1)",
      iconColor: "#a855f7",
      quote: "Direct value, zero fluff, and extraordinary velocity. QuolyTech identified our operational bottlenecks, shipped our custom enterprise platform in record time, and produced measurable ROI from day one.",
      projectSlug: "flowpilot",
      metrics: "Saved 14+ hours/week on operations"
    }
  ];

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
              <span className="exp-badge-text">Client Testimonials</span>
            </motion.div>

            <motion.div variants={itemVariants} className="exp-headline-box">
              <h2 className="exp-headline">Experiences.</h2>
              <span className="exp-year-stamp">©2026</span>
            </motion.div>
          </div>

          {/* Testimonials Master Grid: Summary Card + 6 Client Review Cards */}
          <div className="exp-testimonials-master-grid">
            {/* Left Anchor: Rating Summary Card (Icons only, no photos) */}
            <motion.div variants={itemVariants} className="exp-summary-col">
              <motion.div className="exp-testi-card summary-card" {...cardHoverProps}>
                <div className="exp-rating-top-badge">
                  <ShieldCheck size={16} className="exp-shield-icon" />
                  <span>Verified Client Reviews</span>
                </div>

                <div className="exp-rating-row">
                  <span className="exp-big-num">4.9</span>
                  <span className="exp-num-denom">/5</span>
                </div>
                <p className="exp-summary-desc">
                  We've delivered <strong>50+ production systems</strong> that help companies generate real, measurable ROI.
                </p>
                
                <div className="exp-summary-footer">
                  <span className="exp-brand-logo">QuolyTech®</span>
                  <div className="exp-trust-row">
                    <div className="exp-icon-trust-stack">
                      <span className="exp-trust-icon-pill" title="Verified Security"><ShieldCheck size={14} /></span>
                      <span className="exp-trust-icon-pill" title="5-Star Track Record"><Sparkles size={14} /></span>
                      <span className="exp-trust-icon-pill" title="Award Winning Architecture"><Award size={14} /></span>
                    </div>
                    <div className="exp-trust-text">
                      <span className="exp-stars">★★★★★</span>
                      <span>Trusted by 50+ clients worldwide</span>
                    </div>
                  </div>
                  <button className="exp-review-btn" onClick={() => navigate('/contact')}>
                    <span>Start a Project</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: 6 Verified Client Review Cards Grid */}
            <div className="exp-reviews-subgrid">
              {reviews.map((rev) => (
                <motion.div 
                  key={rev.id} 
                  variants={itemVariants} 
                  className="exp-review-card"
                  {...cardHoverProps}
                  onClick={() => rev.projectSlug && navigate(`/projects/${rev.projectSlug}`)}
                  title={rev.projectSlug ? `View related case study: ${rev.author}` : undefined}
                >
                  <div className="exp-review-card-top">
                    <div className="exp-author-icon-strip">
                      <div 
                        className="exp-author-icon-circle"
                        style={{ backgroundColor: rev.iconBg, color: rev.iconColor }}
                      >
                        {rev.icon}
                      </div>
                      <div className="exp-author-details">
                        <div className="exp-author-name-row">
                          <span className="exp-author-name">{rev.author}</span>
                          <span className="exp-verified-check" title="Verified Client">
                            <CheckCircle2 size={13} />
                          </span>
                        </div>
                        <span className="exp-author-role">{rev.role}</span>
                      </div>
                    </div>

                    <div className="exp-stars-row">
                      <span className="exp-stars">★★★★★</span>
                    </div>
                  </div>

                  <p className="exp-review-quote">"{rev.quote}"</p>

                  <div className="exp-review-card-footer">
                    <span className="exp-review-sector">{rev.sector}</span>
                    <span className="exp-review-metrics">{rev.metrics}</span>
                  </div>
                </motion.div>
              ))}
            </div>
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
              <span className="exp-metric-label">Successful<br />deployments shipped</span>
            </motion.div>

            <motion.div variants={itemVariants} className="exp-metric-block">
              <div className="exp-metric-num">
                <AnimatedNumber value={99} suffix="%" />
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
                Every project we take on is engineered for long-term compounding growth.
              </p>
            </div>
            <div className="exp-narrative-right">
              <p className="exp-narrative-lead">
                Our approach is simple: <strong>we focus on functionality, speed, and conversion clarity, ensuring that every project serves a clear business purpose without unnecessary complexity.</strong>
              </p>
              <p className="exp-narrative-text">
                We don't overpromise or use fluffy jargon. We build rigorously tested, high-performance software and digital flagships that help our clients dominate their markets.
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
                onClick={() => navigate('/projects/valence')}
              >
                <motion.img 
                  src="/portfolio-screenshots/valence.png" 
                  alt="Valence Architecture Case Study" 
                  className="exp-case-img"
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.05, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } }
                  }}
                />
                <div className="exp-case-overlay" />

                {/* Top Meta Strip */}
                <div className="exp-case-header">
                  <div>
                    <span className="exp-case-tag">Case study</span>
                    <span className="exp-case-subtitle">Valence Spatial Studio — Monolithic Digital Archive.</span>
                  </div>
                  <span className="exp-case-plus">+</span>
                </div>

                {/* Center Title Lockup */}
                <div className="exp-case-center-title">
                  <span>QuolyTech®</span>
                </div>

                {/* Bottom Footer Strip */}
                <div className="exp-case-footer">
                  <span className="exp-case-desc">From branding to WebGL architecture and full-stack deployment.</span>
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
                  <p className="exp-sub-quote">"Thanks to QuolyTech's strategy, we've seen a steady 40% increase in inbound qualified leads."</p>
                  <div className="exp-sub-author">
                    <span className="exp-sub-author-badge">
                      <ShieldCheck size={14} color="#10b981" />
                    </span>
                    <span>Verified Project Lead</span>
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
                    We prioritize lightning performance without sacrificing visual aesthetic or functional complexity.
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
