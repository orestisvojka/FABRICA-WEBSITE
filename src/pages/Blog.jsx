import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blog';
import { ArrowUpRight } from 'lucide-react';

export default function Blog() {
  const navigate = useNavigate();

  const featuredPost = blogPosts[0];
  const topRightPosts = blogPosts.slice(1, 3);
  const bottomPosts = blogPosts.slice(3, 7);

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

  return (
    <div className="blog-page-outer">
      <div className="blog-container">
        {/* Header Section */}
        <section className="blog-hero-section">
          <motion.h1
            className="blog-main-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
          >
            Expert Insights.
          </motion.h1>

          <motion.div
            className="blog-header-subgrid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div variants={itemVariants} className="blog-badge-col">
              <div className="blog-badge-row">
                <span className="blog-badge-dot">●</span>
                <span className="blog-badge-label">Blog</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="blog-center-text-col">
              <p className="blog-header-center-text">
                Expert insights on web design, branding, and digital strategy to help your business stand out.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="blog-right-text-col">
              <p className="blog-header-right-text">
                From design principles to technical optimization — everything you need for digital success.
              </p>
            </motion.div>
          </motion.div>

          {/* Asymmetrical Insights Grid */}
          <div className="blog-insights-grid-wrapper">
            {/* Top Row: Featured 2-col card + 2 stacked 1-col cards */}
            <motion.div
              className="blog-top-asym-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {/* Featured Card (Left) */}
              {featuredPost && (
                <motion.div
                  variants={itemVariants}
                  className="blog-featured-card"
                  onClick={() => {
                    navigate(`/blog/${featuredPost.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  whileHover="hover"
                >
                  <div className="blog-featured-img-wrapper">
                    <motion.img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="blog-featured-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (featuredPost.fallbackImage) {
                          e.target.src = featuredPost.fallbackImage;
                        }
                      }}
                      variants={{
                        initial: { scale: 1 },
                        hover: { scale: 1.05 }
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    />
                    <div className="blog-featured-gradient-overlay" />

                    <div className="blog-card-arrow-badge">
                      <ArrowUpRight size={14} />
                    </div>

                    <div className="blog-featured-content">
                      <span className="blog-card-date">{featuredPost.date}</span>
                      <h2 className="blog-featured-title">{featuredPost.title}</h2>
                      <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2 Stacked Cards (Right) */}
              <div className="blog-top-right-col">
                {topRightPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className="blog-standard-card"
                    onClick={() => {
                      navigate(`/blog/${post.slug}`);
                      window.scrollTo(0, 0);
                    }}
                    whileHover="hover"
                  >
                    <div className="blog-card-top-row">
                      <div className="blog-card-thumb-wrapper">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="blog-card-thumb-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            if (post.fallbackImage) {
                              e.target.src = post.fallbackImage;
                            }
                          }}
                        />
                      </div>
                      <div className="blog-card-arrow-badge">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                    <div className="blog-card-body">
                      <span className="blog-card-date">{post.date}</span>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Row: 4 Equal Columns */}
            <motion.div
              className="blog-bottom-4col-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {bottomPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="blog-standard-card"
                  onClick={() => {
                    navigate(`/blog/${post.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  whileHover="hover"
                >
                  <div className="blog-card-top-row">
                    <div className="blog-card-thumb-wrapper">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="blog-card-thumb-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          if (post.fallbackImage) {
                            e.target.src = post.fallbackImage;
                          }
                        }}
                      />
                    </div>
                    <div className="blog-card-arrow-badge">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <div className="blog-card-body">
                    <span className="blog-card-date">{post.date}</span>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
      {/* Note: Global <Footer /> is rendered directly after this div by App.jsx */}
    </div>
  );
}
