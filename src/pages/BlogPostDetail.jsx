import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';

export default function BlogPostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const post = blogPosts[postIndex >= 0 ? postIndex : 0];

  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <div className="section-dark" style={{ paddingTop: '160px' }}>
      <div className="container">
        {/* Back Link */}
        <Link 
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '40px'
          }}
        >
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          {/* Category & Meta */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '14px', color: '#888', marginBottom: '16px' }}>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '12px', color: '#fff', fontWeight: '600' }}>
              {post.category}
            </span>
            <span>{post.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {post.readTime}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: '800', lineHeight: '1.08', marginBottom: '32px' }}>
            {post.title}
          </h1>

          {/* Author Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '32px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <img 
              src={post.authorAvatar} 
              alt={post.author} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700' }}>{post.author}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{post.authorRole} at fabrica®</div>
            </div>
          </div>

          {/* Cover Image */}
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', marginBottom: '60px' }}>
            <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Article HTML Content */}
          <div 
            style={{
              fontSize: '18px',
              lineHeight: '1.7',
              color: 'rgba(255,255,255,0.85)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Next / Previous Navigation */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '24px',
              marginTop: '80px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {prevPost ? (
              <div 
                onClick={() => { navigate(`/blog/${prevPost.slug}`); window.scrollTo(0,0); }}
                style={{ cursor: 'pointer', maxWidth: '360px' }}
              >
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowLeft size={12} /> Previous Article
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: '6px' }}>{prevPost.title}</h4>
              </div>
            ) : <div />}

            {nextPost ? (
              <div 
                onClick={() => { navigate(`/blog/${nextPost.slug}`); window.scrollTo(0,0); }}
                style={{ cursor: 'pointer', textAlign: 'right', maxWidth: '360px' }}
              >
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                  Next Article <ArrowRight size={12} />
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: '6px' }}>{nextPost.title}</h4>
              </div>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
