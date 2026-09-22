import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { industries } from '../data/services';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';
import NotFound from './NotFound';

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = industries.find((i) => i.slug === slug || i.id === slug);
  const navigate = useNavigate();

  if (!industry) {
    return <NotFound />;
  }

  const title = `${industry.heading} | QuolyTech`;
  const canonicalPath = `/industries/${industry.slug}/`;

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
        "name": "Industries",
        "item": "https://quolytech.com/industries/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": industry.title,
        "item": `https://quolytech.com/industries/${industry.slug}/`
      }
    ]
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh' }}>
      <SEOHead
        title={title}
        description={industry.description}
        canonicalPath={canonicalPath}
        jsonLd={breadcrumbJsonLd}
      />

      {/* Hero Section */}
      <section style={{ paddingTop: '150px', paddingBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#a1a1aa', marginBottom: '24px' }}>
            <Link to="/" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/industries/" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Industries</Link>
            <span>/</span>
            <span style={{ color: '#ffffff', fontWeight: '600' }}>{industry.title}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', color: '#a1a1aa' }}>
              Industry Solutions • QuolyTech Tiranë
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.08', margin: '0 0 20px 0', maxWidth: '900px' }}>
            {industry.heading}
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#d4d4d8', lineHeight: '1.6', maxWidth: '800px', margin: 0 }}>
            {industry.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}>
            <button
              onClick={() => navigate('/contact')}
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '999px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Discuss Your Project →
            </button>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '840px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Tailored Solutions for {industry.title}
            </h2>
            <p style={{ fontSize: '16px', color: '#a1a1aa', lineHeight: '1.8', margin: '0 0 40px 0' }}>
              {industry.description}
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>
              Relevant Core Services Applied:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {industry.relevantServices.map((serv, idx) => (
                <span key={idx} style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '14px', fontWeight: '600', padding: '10px 20px', borderRadius: '12px' }}>
                  {serv}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
