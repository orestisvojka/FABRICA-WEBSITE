import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { services, industries } from '../data/services';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';
import FaqSection from '../components/FaqSection';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug || s.id === slug);
  const navigate = useNavigate();

  if (!service) {
    return <NotFound />;
  }

  // SEO Titles per prompt requirements
  const seoTitles = {
    'web-development': 'Web Development Services | QuolyTech',
    'ai-agents': 'AI Agent Development for Businesses | QuolyTech',
    'mobile-app-development': 'Mobile App Development | QuolyTech',
    'software-development': 'Custom Software Development | QuolyTech',
    'business-automation': 'Business Process Automation Services | QuolyTech',
    'seo': 'SEO & Digital Growth Services | QuolyTech',
    'branding': 'Branding & Digital Identity Services | QuolyTech'
  };

  const currentTitle = seoTitles[service.slug] || `${service.heading} | QuolyTech`;
  const canonicalPath = `/services/${service.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "QuolyTech",
      "url": "https://quolytech.com/",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tiranë",
        "addressCountry": "AL"
      }
    },
    "serviceType": service.title,
    "areaServed": "Global"
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
        "name": "Services",
        "item": "https://quolytech.com/services/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://quolytech.com/services/${service.slug}/`
      }
    ]
  };

  const faqJsonLd = service.faqs && service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  const relatedIndustries = industries.filter((i) => i.relevantServices.includes(service.title));

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh' }}>
      <SEOHead
        title={currentTitle}
        description={service.metaDescription || service.description}
        canonicalPath={canonicalPath}
        jsonLd={[jsonLd, breadcrumbJsonLd, faqJsonLd].filter(Boolean)}
      />

      {/* Hero Section */}
      <section style={{ paddingTop: '150px', paddingBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Breadcrumb Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#a1a1aa', marginBottom: '24px' }}>
            <Link to="/" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/services/" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Services</Link>
            <span>/</span>
            <span style={{ color: '#ffffff', fontWeight: '600' }}>{service.title}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', color: '#a1a1aa' }}>
              Service {service.number} • QuolyTech Tiranë
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.08', margin: '0 0 20px 0', maxWidth: '900px' }}>
            {service.heading}
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#d4d4d8', lineHeight: '1.6', maxWidth: '800px', margin: 0 }}>
            {service.subtitle}
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
              Start a Project →
            </button>
            <button
              onClick={() => navigate('/projects')}
              style={{
                backgroundColor: '#18181b',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '999px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Explore Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
            
            {/* Overview Column */}
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-0.02em' }}>
                Service Overview
              </h2>
              <p style={{ fontSize: '16px', color: '#a1a1aa', lineHeight: '1.8', margin: 0 }}>
                {service.description}
              </p>

              <div style={{ marginTop: '40px', backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>
                  Who Is This Service For?
                </h3>
                <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6', margin: 0 }}>
                  {service.whoIsItFor}
                </p>
              </div>
            </div>

            {/* Key Capabilities Column */}
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-0.02em' }}>
                Key Capabilities & Features
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {service.capabilities.map((cap, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px', borderRadius: '12px' }}>
                    <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px' }}>✓</span>
                    <span style={{ fontSize: '15px', color: '#d4d4d8', fontWeight: '500' }}>{cap}</span>
                  </div>
                ))}
              </div>

              {service.technologies && service.technologies.length > 0 && (
                <div style={{ marginTop: '36px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#a1a1aa', uppercase: 'true', letterSpacing: '0.08em', marginBottom: '16px' }}>
                    TECHNOLOGIES USED
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} style={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '13px', fontWeight: '600', padding: '6px 14px', borderRadius: '999px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* How It Works: Numbered Process Steps */}
      {service.process && service.process.length > 0 && (
        <section style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-0.02em' }}>
              How It Works
            </h2>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {service.process.map((step, idx) => {
                const [num, ...label] = step.split(' ');
                return (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px', borderRadius: '12px' }}>
                    <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px' }}>{num}</span>
                    <span style={{ fontSize: '15px', color: '#d4d4d8', fontWeight: '500' }}>{label.join(' ')}</span>
                  </li>
                );
              })}
            </ol>

            {relatedIndustries.length > 0 && (
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>
                  Industries We Build This For
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {relatedIndustries.map((ind) => (
                    <Link key={ind.slug} to={`/industries/${ind.slug}/`} style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '14px', fontWeight: '600', padding: '10px 20px', borderRadius: '12px', textDecoration: 'none' }}>
                      {ind.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Service FAQs Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#050505' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '36px', letterSpacing: '-0.02em', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '840px', margin: '0 auto' }}>
              {service.faqs.map((faq, idx) => (
                <div key={idx} style={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '28px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '12px', margin: 0 }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#a1a1aa', lineHeight: '1.7', margin: '12px 0 0 0' }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </div>
  );
}
