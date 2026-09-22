import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { industries } from '../data/services';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';

export default function IndustriesIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Industries Served by QuolyTech",
    "description": "Industry digital solutions provided by QuolyTech in Tiranë, Albania.",
    "itemListElement": industries.map((ind, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": ind.title,
      "url": `https://quolytech.com/industries/${ind.slug}/`
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
        "name": "Industries",
        "item": "https://quolytech.com/industries/"
      }
    ]
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh' }}>
      <SEOHead
        title="Industries Served | Digital Solutions | QuolyTech"
        description="Explore how QuolyTech applies web development, AI agents, mobile apps, and custom software solutions across various industry sectors."
        canonicalPath="/industries/"
        jsonLd={[jsonLd, breadcrumbJsonLd]}
      />

      {/* Hero Header */}
      <section style={{ paddingTop: '150px', paddingBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', color: '#a1a1aa' }}>
              Industry Expertise • QuolyTech Tiranë
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.08', margin: '0 0 20px 0' }}>
            Industries We Serve.
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#d4d4d8', lineHeight: '1.6', maxWidth: '800px', margin: 0 }}>
            QuolyTech builds custom websites, mobile applications, AI agents, and software tools tailored to specific industry operational requirements.
          </p>
        </div>
      </section>

      {/* Industry Directory Grid */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {industries.map((ind) => (
              <motion.div
                key={ind.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#ffffff', margin: '0 0 12px 0' }}>
                    {ind.title}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                    {ind.subtitle}
                  </p>
                </div>

                <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <Link
                    to={`/industries/${ind.slug}/`}
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
                    View Industry Solutions →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
