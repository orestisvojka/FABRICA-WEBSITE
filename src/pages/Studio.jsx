import React from 'react';
import { teamMembers } from '../data/team';
import { services } from '../data/services';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Studio() {
  const navigate = useNavigate();

  const clients = [
    "Boltshift Inc.", "Ephemeral Labs", "Powersurge Energy",
    "Mastermail", "Warpspeed AI", "CloudWatch Systems",
    "Apex Global", "Vanguard Web3", "Hyperion Analytics"
  ];

  const awards = [
    { year: "2025", title: "Site of the Day", org: "Awwwards", work: "Boltshift" },
    { year: "2024", title: "Developer Award", org: "FWA", work: "Powersurge" },
    { year: "2024", title: "Best UI/UX Design", org: "SiteInspire", work: "Ephemeral" },
    { year: "2023", title: "Design Excellence", org: "Mindsparkle Mag", work: "Warpspeed" }
  ];

  return (
    <div>
      {/* Studio Hero */}
      <section className="section-dark" style={{ paddingTop: '180px', paddingBottom: '100px' }}>
        <div className="container">
          <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
            About Fabrica Studio
          </span>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 110px)', fontWeight: '800', marginTop: '16px', lineHeight: '0.95', maxWidth: '1100px' }}>
            A small team with big architectural ideas.
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginTop: '80px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Our Philosophy</h3>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                We believe great websites are engineered at the intersection of precision typography, performance architecture, and purposeful visual identity. We don't build generic templates; we build digital growth engines.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>How We Work</h3>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                Direct access to senior founders. No account manager telephone games. Fast 48-hour iteration cycles and relentless focus on measurable conversion impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-light">
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '60px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>
              Meet The Team
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginTop: '8px', color: '#000' }}>
              Leadership behind every project.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                style={{
                  background: '#fff',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  style={{ width: '100%', aspectRatio: '1/1', borderRadius: '16px', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#000' }}>{member.name}</h3>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>{member.role} {member.company}</span>
                  <p style={{ fontSize: '15px', color: '#555', marginTop: '12px', lineHeight: '1.5' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Services Breakdown */}
      <section className="section-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '60px' }}>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
              Our Capabilities
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginTop: '8px' }}>
              End-to-end digital services.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {services.map((srv) => (
              <div 
                key={srv.id}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#888' }}>{srv.number}</span>
                <h3 style={{ fontSize: '22px', fontWeight: '700' }}>{srv.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                  {srv.subtitle}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  {srv.deliverables.map((item, idx) => (
                    <div key={idx} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '6px 0', display: 'flex', gap: '6px' }}>
                      <Check size={14} color="#10b981" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients & Industry Recognition */}
      <section className="section-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
            <div>
              <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>
                Client Roster
              </span>
              <h2 style={{ fontSize: '36px', fontWeight: '800', marginTop: '8px', marginBottom: '32px', color: '#000' }}>
                Trusted by high-growth startups & category leaders.
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {clients.map((client, idx) => (
                  <div key={idx} style={{ padding: '16px', background: '#fff', borderRadius: '12px', fontWeight: '600', fontSize: '15px', color: '#111', border: '1px solid rgba(0,0,0,0.06)' }}>
                    {client}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>
                Industry Awards
              </span>
              <h2 style={{ fontSize: '36px', fontWeight: '800', marginTop: '8px', marginBottom: '32px', color: '#000' }}>
                Recognized worldwide for digital design excellence.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {awards.map((award, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      justifySpace: 'between',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      background: '#fff',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#000' }}>{award.title}</h4>
                      <span style={{ fontSize: '13px', color: '#666' }}>{award.org} — {award.work}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#888' }}>{award.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <button className="btn-primary btn-dark" onClick={() => navigate('/contact')}>
              Start a Project With Us <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
