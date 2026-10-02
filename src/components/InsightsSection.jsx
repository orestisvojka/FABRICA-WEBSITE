import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog';

export default function InsightsSection() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Scroll-triggered Entrance with margin offset "-100px 0px"
  const isInView = useInView(containerRef, { once: true, amount: 0.15, margin: "-100px 0px" });

  const post1 = blogPosts[0];
  const post2 = blogPosts[1];
  const featuredPost = blogPosts[2];

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
                Controversial debates, deep-dive technical research, and systems analysis from our engineering and strategy team.
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
                <span>View all publications</span>
                <span className="insights-seeall-dot"></span>
              </motion.button>
            </motion.div>
          </div>

          {/* Asymmetrical 3-Card Grid */}
          <div className="insights-cards-grid">
            {/* Standard Card 1 */}
            {post1 && (
              <motion.div
                variants={itemVariants}
                className="insights-standard-card"
                initial="initial"
                whileHover="hover"
                onClick={() => navigate(`/blog/${post1.slug}`)}
              >
                <div className="insights-card-top">
                  <div className="insights-thumb-wrapper">
                    <motion.img
                      src={post1.coverImage}
                      alt={post1.title}
                      className="insights-thumb-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (post1.fallbackImage) e.target.src = post1.fallbackImage;
                      }}
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
                  <span className="insights-card-date">{post1.date} • {post1.category}</span>
                  <h3 className="insights-card-title">
                    {post1.title}
                  </h3>
                  <p className="insights-card-excerpt">
                    {post1.excerpt}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Standard Card 2 */}
            {post2 && (
              <motion.div
                variants={itemVariants}
                className="insights-standard-card"
                initial="initial"
                whileHover="hover"
                onClick={() => navigate(`/blog/${post2.slug}`)}
              >
                <div className="insights-card-top">
                  <div className="insights-thumb-wrapper">
                    <motion.img
                      src={post2.coverImage}
                      alt={post2.title}
                      className="insights-thumb-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (post2.fallbackImage) e.target.src = post2.fallbackImage;
                      }}
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
                  <span className="insights-card-date">{post2.date} • {post2.category}</span>
                  <h3 className="insights-card-title">
                    {post2.title}
                  </h3>
                  <p className="insights-card-excerpt">
                    {post2.excerpt}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Featured Card 3 (Massive Right Anchor Card) */}
            {featuredPost && (
              <motion.div
                variants={itemVariants}
                className="insights-featured-card"
                initial="initial"
                whileHover="hover"
                onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              >
                <div className="insights-featured-img-wrapper">
                  <motion.img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="insights-featured-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      if (featuredPost.fallbackImage) e.target.src = featuredPost.fallbackImage;
                    }}
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
                  <span className="insights-featured-brand">{featuredPost.category}</span>

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
                  <span className="insights-featured-date" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8, display: 'block' }}>
                    {featuredPost.date}
                  </span>
                  <h3 className="insights-featured-headline" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', lineHeight: 1.25 }}>
                    {featuredPost.title}
                  </h3>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
