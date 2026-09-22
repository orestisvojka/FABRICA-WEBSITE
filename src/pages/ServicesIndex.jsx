import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';
import ServicesSection from '../components/ServicesSection';
import FaqSection from '../components/FaqSection';

export default function ServicesIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "QuolyTech Services",
    "description": "Comprehensive digital technology services provided by QuolyTech in Tiranë, Albania.",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": service.title,
      "url": `https://quolytech.com/services/${service.slug}/`
    }))
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
      }
    ]
  };

  return (
    <div>
      <SEOHead
        title="Services | Web Development, AI Agents & Custom Software | QuolyTech"
        description="Explore QuolyTech's services: Web Development, AI Agent Development, Mobile App Development, Custom Software, Business Automation, SEO, and Branding."
        canonicalPath="/services/"
        jsonLd={[jsonLd, breadcrumbJsonLd]}
      />

      {/* Hero Header Section preserving existing page style */}
      <section className="legal-hero-section" style={{ paddingTop: '140px', paddingBottom: '40px' }}>
        <div className="legal-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'inline-block' }}></span>
              <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', color: '#a1a1aa' }}>Capabilities & Expertise</span>
            </div>
            <div>
              <span style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>QuolyTech</span>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.05', margin: 0, color: '#ffffff' }}>
                Services & Technology Solutions.
              </h1>
            </div>
            <p style={{ fontSize: '16px', color: '#a1a1aa', maxWidth: '680px', lineHeight: '1.6', margin: 0 }}>
              QuolyTech is a digital technology studio based in Tiranë, Albania. We build websites, mobile applications, AI agents, custom software and digital solutions that help businesses operate and grow online.
            </p>
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)', margin: '36px 0 0 0' }} />
        </div>
      </section>

      {/* Reusing existing visual Services section */}
      <ServicesSection />

      {/* Detailed Service Directory Grid */}
      <section style={{ backgroundColor: '#050505', padding: '60px 0 100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="legal-container">
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff', marginBottom: '32px', letterSpacing: '-0.02em' }}>
            Explore Dedicated Service Areas
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Service {service.number}
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#ffffff', margin: '12px 0 14px 0' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6', margin: 0 }}>
                    {service.subtitle}
                  </p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <Link
                    to={`/services/${service.slug}/`}
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#ffffff',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    View Details & Capabilities →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
      <ContactSection />
    </div>
  );
}
