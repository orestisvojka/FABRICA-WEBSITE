import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { testimonials, faqs } from '../data/faqs';
import { ArrowRight, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [openService, setOpenService] = useState('web-design');
  const [openFaq, setOpenFaq] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [pricingPlan, setPricingPlan] = useState('monthly');

  const selectedProjects = projects.slice(0, 4);
  const currentTestimonial = testimonials[testimonialIdx];

  const handleNextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="section-dark hero">
        <div className="container">
          <div className="hero-main">
            <div>
              <h1 className="hero-title">fabrica<sup>®</sup></h1>
              <span className="hero-title-sub">Studio</span>
            </div>
            
            <div className="hero-services-list">
              <div className="hero-service-item"><Check size={16} /> Branding and Identity</div>
              <div className="hero-service-item"><Check size={16} /> Social Media Marketing</div>
              <div className="hero-service-item"><Check size={16} /> Web Design and Development</div>
              <div className="hero-service-item"><Check size={16} /> SEO Optimization</div>
            </div>
          </div>

          <div className="hero-grid-markers">
            <span className="marker">+</span>
            <span className="marker">+</span>
            <span className="marker">+</span>
            <span className="marker">+</span>
          </div>

          <div className="hero-footer">
            <p className="hero-statement">
              No generic websites. No empty marketing promises. Just tools and strategies that help your business grow and your brand shine.
            </p>
            <div className="hero-copyright">
              © {new Date().getFullYear()} fabrica® Studio
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="section-dark" style={{ paddingTop: '80px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
                Featured Case Studies
              </span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginTop: '8px' }}>Selected Work</h2>
            </div>
            <Link to="/projects" className="btn-primary">
              View All Projects (27) <ArrowRight size={18} />
            </Link>
          </div>

          <div className="projects-grid">
            {selectedProjects.map((project) => (
              <div 
                key={project.id} 
                className="project-card"
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                <div className="project-image-wrapper">
                  <img src={project.heroImage} alt={project.title} className="project-image" />
                </div>
                <div className="project-meta">
                  <span className="project-title">{project.title}</span>
                  <span className="project-year">{project.category} · {project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expandable Services Section (Light Background) */}
      <section className="section-light">
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>
              What We Do Best
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginTop: '8px', color: '#000' }}>
              Comprehensive design & growth capabilities.
            </h2>
          </div>

          <div className="accordion-list">
            {services.map((srv) => {
              const isOpen = openService === srv.id;
              return (
                <div 
                  key={srv.id} 
                  className={`accordion-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenService(isOpen ? null : srv.id)}
                >
                  <div className="accordion-header">
                    <div className="accordion-title-group">
                      <span className="accordion-number">{srv.number}</span>
                      <h3 className="accordion-title">{srv.title}</h3>
                    </div>
                    <span className="accordion-icon">+</span>
                  </div>

                  {isOpen && (
                    <div className="accordion-content">
                      <p className="accordion-subtitle">{srv.subtitle}</p>
                      <div className="deliverables-grid">
                        {srv.deliverables.map((item, idx) => (
                          <div key={idx} className="deliverable-item">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
              Client Trust & Impact
            </span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handlePrevTestimonial}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextTestimonial}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: '#fff',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div style={{ maxWidth: '960px' }}>
            <p style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: '600', lineHeight: '1.25', marginBottom: '32px' }}>
              "{currentTestimonial.quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src={currentTestimonial.avatar} 
                alt={currentTestimonial.author} 
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700' }}>{currentTestimonial.author}</h4>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{currentTestimonial.role}, {currentTestimonial.company}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-light">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>
              Transparent Engagement Models
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginTop: '8px', color: '#000' }}>
              Flexible pricing for ambitious projects.
            </h2>
            
            <div style={{ display: 'inline-flex', background: '#e5e5e5', borderRadius: '30px', padding: '4px', marginTop: '24px' }}>
              <button
                onClick={() => setPricingPlan('project')}
                style={{
                  background: pricingPlan === 'project' ? '#0a0a0a' : 'transparent',
                  color: pricingPlan === 'project' ? '#ffffff' : '#555555',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '24px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Project-Based
              </button>
              <button
                onClick={() => setPricingPlan('monthly')}
                style={{
                  background: pricingPlan === 'monthly' ? '#0a0a0a' : 'transparent',
                  color: pricingPlan === 'monthly' ? '#ffffff' : '#555555',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '24px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Monthly Retainer
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', border: '1px solid rgba(0,0,0,0.08)' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: '#888' }}>
                {pricingPlan === 'monthly' ? 'Growth Core' : 'Brand Identity'}
              </span>
              <h3 style={{ fontSize: '42px', fontWeight: '800', margin: '16px 0 24px', color: '#000' }}>
                {pricingPlan === 'monthly' ? '$4,500/mo' : '$8,500'}
              </h3>
              <p style={{ fontSize: '15px', color: '#555', marginBottom: '32px' }}>
                {pricingPlan === 'monthly' 
                  ? 'Continuous design support, Webflow updates, and monthly conversion tuning.'
                  : 'Complete brand system, typography scale, logo mark, and guidelines kit.'}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <li style={{ display: 'flex', gap: '8px', fontSize: '14px' }}><Check size={16} color="#10b981" /> Dedicated Slack channel</li>
                <li style={{ display: 'flex', gap: '8px', fontSize: '14px' }}><Check size={16} color="#10b981" /> 48-hour turnarounds</li>
                <li style={{ display: 'flex', gap: '8px', fontSize: '14px' }}><Check size={16} color="#10b981" /> Unlimited revisions</li>
              </ul>
              <button className="btn-primary btn-dark" style={{ width: '100%' }} onClick={() => navigate('/contact')}>
                Get Started
              </button>
            </div>

            <div style={{ background: '#0a0a0a', color: '#fff', borderRadius: '24px', padding: '40px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                {pricingPlan === 'monthly' ? 'Full Scale Studio' : 'Full Web Overhaul'}
              </span>
              <h3 style={{ fontSize: '42px', fontWeight: '800', margin: '16px 0 24px' }}>
                {pricingPlan === 'monthly' ? '$8,900/mo' : '$16,000'}
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
                {pricingPlan === 'monthly' 
                  ? 'Complete dedicated product team handling design, code, SEO, and video campaign assets.'
                  : 'Bespoke React web app build, 3D interactive graphics, full CMS, and launch campaign.'}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <li style={{ display: 'flex', gap: '8px', fontSize: '14px' }}><Check size={16} color="#10b981" /> Priority sprint queue</li>
                <li style={{ display: 'flex', gap: '8px', fontSize: '14px' }}><Check size={16} color="#10b981" /> Senior lead designer & engineer</li>
                <li style={{ display: 'flex', gap: '8px', fontSize: '14px' }}><Check size={16} color="#10b981" /> Weekly strategy call</li>
              </ul>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate('/contact')}>
                Book Discovery Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
              Common Questions
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginTop: '8px' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '24px 0', cursor: 'pointer' }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600' }}>{faq.question}</h3>
                    <span style={{ fontSize: '24px', transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '16px', fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '720px' }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
