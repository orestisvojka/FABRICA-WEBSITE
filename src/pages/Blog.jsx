import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blog';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = [
    'All',
    'Programming & Careers',
    'Startups & Business',
    'AI & Emerging Trends',
    'AI Regulation & Ethics',
    'Cybersecurity & Privacy',
    'AI & Automation',
    'Web Development',
    'SEO & Digital Growth'
  ];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory);

  const featuredPost = filteredPosts[0];
  const topRightPosts = filteredPosts.slice(1, 3);
  const bottomPosts = filteredPosts.slice(3);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <div className="blog-page-outer">
      <SEOHead
        title="Engineering & Technology Publications | QuolyTech Insights"
        description="Read in-depth editorial analysis on AI agents, model collapse, junior developer hiring, EU AI Act regulations, and enterprise architecture by QuolyTech."
        canonicalPath="/blog/"
      />
      <div className="blog-container">
        {/* Header Section */}
        <section className="blog-hero-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="blog-hero-top-eyebrow">
              <span className="blog-eyebrow-pill">
                <Sparkles size={13} style={{ display: 'inline', marginRight: 6, color: '#10b981' }} />
                QuolyTech Editorial & Research
              </span>
            </div>
            <h1 className="blog-main-title">
              Technology Debates & Systems Insights.
            </h1>
          </motion.div>

          <motion.div
            className="blog-header-subgrid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="blog-badge-col">
              <div className="blog-badge-row">
                <span className="blog-badge-dot">●</span>
                <span className="blog-badge-label">Publications</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="blog-center-text-col">
              <p className="blog-header-center-text">
                Rigorous, independent perspectives on software engineering, generative AI, enterprise regulation, and the economics of modern tech.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="blog-right-text-col">
              <p className="blog-header-right-text">
                Written by engineers, founders, and practitioners building software for the international digital economy.
              </p>
            </motion.div>
          </motion.div>

          {/* Interactive Category Filter Pills */}
          <div className="blog-category-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Asymmetrical Insights Grid */}
          <div className="blog-insights-grid-wrapper">
            {/* Top Row: Featured 2-col card + 2 stacked 1-col cards */}
            <motion.div
              className="blog-top-asym-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={selectedCategory}
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
                        hover: { scale: 1.04 }
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    />
                    <div className="blog-featured-gradient-overlay" />

                    <div className="blog-card-arrow-badge">
                      <ArrowUpRight size={14} />
                    </div>

                    <div className="blog-featured-content">
                      <div className="blog-card-meta-tags">
                        <span className="blog-card-category-badge">{featuredPost.category}</span>
                        <span className="blog-card-readtime">
                          <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
                          {featuredPost.readTime}
                        </span>
                      </div>
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
                      <div className="blog-card-meta-tags">
                        <span className="blog-card-category-badge">{post.category}</span>
                        <span className="blog-card-readtime">{post.readTime}</span>
                      </div>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Row: 4 Equal Columns Grid for all remaining posts */}
            {bottomPosts.length > 0 && (
              <motion.div
                className="blog-bottom-4col-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
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
                      <div className="blog-card-meta-tags">
                        <span className="blog-card-category-badge">{post.category}</span>
                        <span className="blog-card-readtime">{post.readTime}</span>
                      </div>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
