import React from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { ArrowRight, Clock } from 'lucide-react';

export default function Blog() {
  const navigate = useNavigate();

  return (
    <section className="section-dark" style={{ paddingTop: '180px', minHeight: '85vh' }}>
      <div className="container">
        <div style={{ marginBottom: '60px' }}>
          <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
            Journal & Perspectives
          </span>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: '800', marginTop: '12px' }}>
            Studio Blog
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginTop: '16px', maxWidth: '600px' }}>
            Thoughts on digital strategy, performance engineering, dark mode aesthetics, and modern web design trends.
          </p>
        </div>

        {/* Featured First Post */}
        {blogPosts.length > 0 && (
          <div 
            onClick={() => navigate(`/blog/${blogPosts[0].slug}`)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '60px',
              cursor: 'pointer'
            }}
          >
            <img 
              src={blogPosts[0].coverImage} 
              alt={blogPosts[0].title}
              style={{ width: '100%', aspectRatio: '16/10', borderRadius: '16px', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '13px', color: '#888', marginBottom: '12px' }}>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px', color: '#fff' }}>
                  {blogPosts[0].category}
                </span>
                <span>{blogPosts[0].date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {blogPosts[0].readTime}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: '800', lineHeight: '1.2' }}>
                {blogPosts[0].title}
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', margin: '16px 0 24px', lineHeight: '1.6' }}>
                {blogPosts[0].excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '15px' }}>
                Read Full Article <ArrowRight size={16} />
              </div>
            </div>
          </div>
        )}

        {/* Grid of Remaining Posts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {blogPosts.slice(1).map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <img 
                src={post.coverImage} 
                alt={post.title}
                style={{ width: '100%', aspectRatio: '16/10', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#888' }}>
                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', color: '#fff' }}>
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', lineHeight: '1.3' }}>
                {post.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
