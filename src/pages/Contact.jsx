import React, { useState } from 'react';
import { Send, Check, Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Web Design', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', service: 'Web Design', message: '' });
      }, 1000);
    }
  };

  return (
    <section className="section-dark" style={{ paddingTop: '180px', minHeight: '90vh' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px' }}>
          <div>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
              Start a Conversation
            </span>
            <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: '800', marginTop: '12px', lineHeight: '0.95' }}>
              Let's build something great.
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', margin: '24px 0 48px', maxWidth: '480px' }}>
              Have a new project, brand redesign, or high-performance web app in mind? Tell us about your goals and timeline.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '50%' }}>
                  <Mail size={20} color="#fff" />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>Email Us</span>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}><a href="mailto:hello@fabrica.com">hello@fabrica.com</a></div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '50%' }}>
                  <Phone size={20} color="#fff" />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>Call Us</span>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}><a href="tel:+14155550199">+1 (415) 555-0199</a></div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '50%' }}>
                  <MapPin size={20} color="#fff" />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>HQ Studio</span>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>San Francisco, CA & Remote Worldwide</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '28px',
              padding: '40px'
            }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work Email</label>
                <input
                  type="email"
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Service Required</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="form-input"
                  style={{ background: '#1a1a1a' }}
                >
                  <option value="Web Design">Web Design & Development</option>
                  <option value="Branding">Branding & Identity</option>
                  <option value="SEO">SEO Optimization</option>
                  <option value="Social Media">Social Media Marketing</option>
                  <option value="Full Retainer">Full Monthly Retainer</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details & Budget</label>
                <textarea
                  placeholder="Tell us about your project goals, scope, and expected timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                {loading ? (
                  'Sending Inquiry...'
                ) : submitted ? (
                  <>
                    Sent! We'll reach out within 24h <Check size={18} color="#10b981" />
                  </>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
