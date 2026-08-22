import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function InsightsSection() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Scroll-triggered Entrance with margin offset "-100px 0px"
  const isInView = useInView(containerRef, { once: true, amount: 0.15, margin: "-100px 0px" });

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

  return (
    <section className="insights-section-outer" ref={containerRef}>
      <div className="insights-container">
        <motion.div
          className="insights-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header Row */}
          <div className="insights-header-grid">
            <motion.div variants={itemVariants} className="insights-header-left">
              <h2 className="insights-main-title">
                <span className="insights-title-bold">Newest trends</span>{' '}
                <span className="insights-title-muted">and</span>
                <br />
                <span className="insights-title-muted">insights from our team.</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="insights-header-mid">
              <p className="insights-header-subtext">
                Stay informed about our latest projects, trends, and industry insights.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="insights-header-right">
              <motion.button
                className="insights-seeall-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => navigate('/blog')}
              >
                <span>See all</span>
                <span className="insights-seeall-dot"></span>
              </motion.button>
            </motion.div>
          </div>

          {/* Asymmetrical 3-Card Grid */}
          <div className="insights-cards-grid">
            {/* Standard Card 1 */}
            <motion.div
              variants={itemVariants}
              className="insights-standard-card"
              initial="initial"
              whileHover="hover"
              onClick={() => navigate('/blog/transform-your-business')}
            >
              <div className="insights-card-top">
                <div className="insights-thumb-wrapper">
                  <motion.img
                    src="/insight-thumb-1.png"
                    alt="How a well-designed website can transform your business"
                    className="insights-thumb-img"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.12 }
                    }}
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  />
                </div>

                <motion.div
                  className="insights-plus-btn"
                  variants={{
                    initial: { rotate: 0, scale: 1 },
                    hover: { rotate: 90, scale: 1.1 }
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              <div className="insights-card-bottom">
                <span className="insights-card-date">February 2, 2026</span>
                <h3 className="insights-card-title">
                  How a well-designed website can transform your business
                </h3>
                <p className="insights-card-excerpt">
                  Discover the latest design trends shaping the digital world and how they impact business.
                </p>
              </div>
            </motion.div>

            {/* Standard Card 2 */}
            <motion.div
              variants={itemVariants}
              className="insights-standard-card"
              initial="initial"
              whileHover="hover"
              onClick={() => navigate('/blog/psychology-of-color')}
            >
              <div className="insights-card-top">
                <div className="insights-thumb-wrapper">
                  <motion.img
                    src="/insight-thumb-2.png"
                    alt="The Psychology of Color in Branding"
                    className="insights-thumb-img"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.12 }
                    }}
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  />
                </div>

                <motion.div
                  className="insights-plus-btn"
                  variants={{
                    initial: { rotate: 0, scale: 1 },
                    hover: { rotate: 90, scale: 1.1 }
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              <div className="insights-card-bottom">
                <span className="insights-card-date">January 26, 2026</span>
                <h3 className="insights-card-title">
                  The Psychology of Color in Branding
                </h3>
                <p className="insights-card-excerpt">
                  Colors influence emotions and decisions. Here's how to use them strategically in branding.
                </p>
              </div>
            </motion.div>

            {/* Featured Card 3 (Massive Right Anchor Card) */}
            <motion.div
              variants={itemVariants}
              className="insights-featured-card"
              initial="initial"
              whileHover="hover"
              onClick={() => navigate('/blog/whats-new-in-digital')}
            >
              <div className="insights-featured-img-wrapper">
                <motion.img
                  src="/insight-featured.png"
                  alt="What's new in digital?"
                  className="insights-featured-img"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.06 }
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
                <div className="insights-featured-gradient" />
              </div>

              {/* Top Row: Brand Tag & Plus Button */}
              <div className="insights-featured-top">
                <span className="insights-featured-brand">QuolyTech®</span>

                <motion.div
                  className="insights-featured-plus-btn"
                  variants={{
                    initial: { rotate: 0, scale: 1 },
                    hover: { rotate: 90, scale: 1.1 }
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              {/* Bottom Right Headline Overlay */}
              <div className="insights-featured-bottom">
                <h3 className="insights-featured-headline">
                  What's new<br />in digital?
                </h3>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
