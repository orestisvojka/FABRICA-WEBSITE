import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { ExternalLink, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.slug === slug) || projects[0];
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="section-dark" style={{ paddingTop: '160px' }}>
      <div className="container">
        {/* Back Link */}
        <Link 
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '40px'
          }}
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Header Metadata */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: '800', lineHeight: '0.95' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: 'rgba(255,255,255,0.8)', marginTop: '16px', maxWidth: '760px' }}>
            {project.tagline}
          </p>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              margin: '60px 0 40px',
              padding: '32px 0',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Year</span>
              <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>{project.year}</div>
            </div>
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Industry</span>
              <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>{project.industry}</div>
            </div>
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Timeline</span>
              <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>{project.timeline}</div>
            </div>
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Scope of Work</span>
              <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '4px' }}>{project.scope}</div>
            </div>
            <div>
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary"
                style={{ padding: '12px 20px', fontSize: '13px' }}
              >
                Live Project <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '24px', overflow: 'hidden', marginBottom: '80px' }}>
          <img src={project.heroImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Narrative & Case Study Sections */}
        <div style={{ maxWidth: '840px', margin: '0 auto 100px' }}>
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>Project Overview</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
              {project.overview}
            </p>
          </div>

          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>The Challenge</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
              {project.challenge}
            </p>
          </div>

          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>Our Solution</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
              {project.solution}
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Key Impact & Results</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {project.results.map((res, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '20px 24px',
                    borderRadius: '16px',
                    fontSize: '17px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}
                >
                  <Check size={20} color="#10b981" /> {res}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', marginBottom: '120px' }}>
            {project.gallery.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${project.title} visual ${idx}`}
                style={{ width: '100%', aspectRatio: '16/10', borderRadius: '16px', objectFit: 'cover' }}
              />
            ))}
          </div>
        )}

        {/* Next Projects Section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: '800' }}>Next Projects to Explore</h3>
            <Link to="/projects" className="btn-primary" style={{ padding: '12px 24px' }}>
              View All (27) <ArrowRight size={16} />
            </Link>
          </div>

          <div className="projects-grid">
            {otherProjects.map((p) => (
              <div 
                key={p.id}
                className="project-card"
                onClick={() => {
                  navigate(`/projects/${p.slug}`);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="project-image-wrapper">
                  <img src={p.heroImage} alt={p.title} className="project-image" />
                </div>
                <div className="project-meta">
                  <span className="project-title">{p.title}</span>
                  <span className="project-year">{p.category} · {p.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
