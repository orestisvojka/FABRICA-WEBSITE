import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blog';
import { Copy, Check, Clock, Calendar, ArrowRight, Bookmark } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function BlogPostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const post = blogPosts[postIndex >= 0 ? postIndex : 0];

  // Get next post preview
  const nextPost = blogPosts[(postIndex + 1) % blogPosts.length];

  // Get related articles
  const relatedPosts = (post.relatedSlugs && post.relatedSlugs.length > 0)
    ? post.relatedSlugs.map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean).slice(0, 3)
    : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage.startsWith('http') ? post.coverImage : `https://quolytech.com${post.coverImage}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuolyTech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quolytech.com/quolytech-logo.jpg"
      }
    },
    "datePublished": "2026-09-01",
    "mainEntityOfPage": `https://quolytech.com/blog/${post.slug}/`
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quolytech.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://quolytech.com/blog/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://quolytech.com/blog/${post.slug}/`
      }
    ]
  };

  return (
    <div className="blog-detail-outer">
      <SEOHead
        title={`${post.title} | QuolyTech Insights`}
        description={post.metaDescription || post.excerpt}
        canonicalPath={`/blog/${post.slug}/`}
        ogType="article"
        ogImage={post.coverImage}
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      />
      <div className="blog-detail-container">
        {/* Dark Island Card Container */}
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

              {/* Visual Concept Tag */}
              {post.featuredImageConcept && (
                <div className="blog-visual-concept-card">
                  <span className="blog-concept-label">Visual Concept</span>
                  <p className="blog-concept-desc">{post.featuredImageConcept}</p>
                </div>
              )}
            </div>

            {/* Right Column: Editorial Reading Area */}
            <motion.div
              className="blog-editorial-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Category, Date & Read Time Bar */}
              <div className="blog-detail-meta-pill-bar">
                <span className="blog-detail-cat-badge">{post.category}</span>
                <span className="blog-meta-dot">•</span>
                <span className="blog-detail-date">
                  <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {post.date}
                </span>
                <span className="blog-meta-dot">•</span>
                <span className="blog-detail-readtime">
                  <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {post.readTime}
                </span>
              </div>

              {/* Headline */}
              <h1 className="blog-detail-headline">{post.title}</h1>

              {/* Subtitle Excerpt */}
              <p className="blog-detail-subtitle">{post.subtitle || post.excerpt}</p>

              {/* Professional Author Lockup (Initials Monogram — No Person Photos) */}
              <div className="blog-author-lockup">
                <div className="blog-author-monogram-box">
                  {post.authorInitials || "QT"}
                </div>
                <div className="blog-author-meta">
                  <span className="blog-author-name">{post.author}</span>
                  <span className="blog-author-role">{post.authorRole || "Specialist"} at QuolyTech®</span>
                </div>
              </div>

              <div className="blog-editorial-divider" />

              {/* Relevance Rationale Callout */}
              {post.relevanceRationale && (
                <div className="blog-relevance-callout-box">
                  <div className="blog-relevance-header">
                    <Bookmark size={14} className="blog-relevance-icon" />
                    <span>Why This Topic Matters Now</span>
                  </div>
                  <p className="blog-relevance-text">{post.relevanceRationale}</p>
                </div>
              )}

              {/* Rich Article Body Content */}
              <div
                className="blog-article-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Keywords / SEO Tags */}
              {post.keywords && post.keywords.length > 0 && (
                <div className="blog-article-tags-wrapper">
                  <span className="blog-tags-heading">Key Topics & Discussions:</span>
                  <div className="blog-tags-flex">
                    {post.keywords.map((kw, i) => (
                      <span key={i} className="blog-tag-badge">#{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles Section */}
              {relatedPosts.length > 0 && (
                <div className="blog-related-insights-section">
                  <h3 className="blog-related-heading">Related Analysis & Debates</h3>
                  <div className="blog-related-cards-grid">
                    {relatedPosts.map((rel) => (
                      <div
                        key={rel.id}
                        className="blog-related-insight-card"
                        onClick={() => {
                          navigate(`/blog/${rel.slug}`);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <span className="blog-related-card-category">{rel.category}</span>
                        <h4 className="blog-related-card-title">{rel.title}</h4>
                        <div className="blog-related-card-bottom">
                          <span className="blog-related-card-time">{rel.readTime}</span>
                          <span className="blog-related-card-arrow">Read →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                    <span className="blog-next-category">{nextPost.category}</span>
                    <h4 className="blog-next-card-title">{nextPost.title}</h4>
                  </div>
                  <div className="blog-next-badge">
                    <span>Next Article</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.div>
              )}

              {/* Author Bio & Social Share Section */}
              <div className="blog-footer-author-box">
                <h3 className="blog-footer-touch-title">Share this perspective.</h3>
                <p className="blog-footer-touch-desc">
                  Join the technology discussion. Share this article with your team or follow QuolyTech for technical insights.
                </p>

                {/* Social Share Buttons */}
                <div className="blog-social-share-row">
                  <button
                    onClick={handleCopyLink}
                    className="blog-social-btn"
                    title="Copy Article Link"
                  >
                    {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span style={{ fontSize: 11, marginLeft: 6, fontWeight: 600 }}>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://quolytech.com/blog/${post.slug}/`)}`}
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
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://quolytech.com/blog/${post.slug}/`)}`}
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
    </div>
  );
}
