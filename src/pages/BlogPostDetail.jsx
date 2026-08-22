import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blog';
import { Copy, Check } from 'lucide-react';

export default function BlogPostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const post = blogPosts[postIndex >= 0 ? postIndex : 0];

  // Get next post preview
  const nextPost = blogPosts[(postIndex + 1) % blogPosts.length];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="blog-detail-outer">
      <div className="blog-detail-container">
        {/* Dark Island Card Container (CTA Card Aesthetic) */}
        <motion.div
          className="blog-island-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Atmospheric Texture Background Overlay */}
          <img
            src="/hero-texture.png"
            alt="Dark atmospheric background"
            className="blog-texture-bg"
          />

          {/* 50/50 Split Desktop Grid */}
          <div className="blog-detail-grid">
            {/* Left Column: Sticky Media Portrait Card */}
            <div className="blog-sticky-media-col">
              <motion.div
                className="blog-sticky-img-card"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="blog-sticky-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    if (post.fallbackImage) {
                      e.target.src = post.fallbackImage;
                    }
                  }}
                />
              </motion.div>
            </div>

            {/* Right Column: Editorial Reading Area */}
            <motion.div
              className="blog-editorial-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Date Tag */}
              <span className="blog-detail-date">{post.date}</span>

              {/* Headline */}
              <h1 className="blog-detail-headline">{post.title}</h1>

              {/* Subtitle Excerpt */}
              <p className="blog-detail-subtitle">{post.excerpt}</p>

              {/* Author Lockup */}
              <div className="blog-author-lockup">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="blog-author-avatar"
                />
                <div className="blog-author-meta">
                  <span className="blog-author-name">{post.author}</span>
                  <span className="blog-author-role">{post.authorRole || "Team Lead"} at QuolyTech®</span>
                </div>
              </div>

              <div className="blog-editorial-divider" />

              {/* Lead Paragraph Callout */}
              <p className="blog-lead-callout">
                At QuolyTech® Studio, we specialize in crafting high-performance websites that not only look great, but also deliver measurable results.
              </p>

              {/* Rich Article Body Content */}
              <div
                className="blog-article-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Next Article Floating Preview Card */}
              {nextPost && (
                <motion.div
                  className="blog-next-article-card"
                  onClick={() => {
                    navigate(`/blog/${nextPost.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="blog-next-card-thumb-box">
                    <img
                      src={nextPost.coverImage}
                      alt={nextPost.title}
                      className="blog-next-card-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (nextPost.fallbackImage) {
                          e.target.src = nextPost.fallbackImage;
                        }
                      }}
                    />
                  </div>
                  <div className="blog-next-card-info">
                    <h4 className="blog-next-card-title">{nextPost.title}</h4>
                  </div>
                  <div className="blog-next-badge">
                    <span>Next</span>
                  </div>
                </motion.div>
              )}

              {/* Author Bio & Social Share Section */}
              <div className="blog-footer-author-box">
                <h3 className="blog-footer-touch-title">Let's keep in touch.</h3>
                <p className="blog-footer-touch-desc">
                  Learn more about web design and performance. Follow us on Twitter or Instagram.
                </p>

                {/* Social Share Buttons */}
                <div className="blog-social-share-row">
                  <button
                    onClick={handleCopyLink}
                    className="blog-social-btn"
                    title="Copy Article Link"
                  >
                    {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  </button>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="blog-social-btn"
                    title="Share on Twitter / X"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="blog-social-btn"
                    title="Share on Instagram"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="blog-social-btn"
                    title="Share on LinkedIn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Trailing Section: Shared <Footer /> is rendered globally by App.jsx */}
    </div>
  );
}
