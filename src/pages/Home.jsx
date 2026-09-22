import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ClientLogos from '../components/ClientLogos';
import ProjectsMatrix from '../components/ProjectsMatrix';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import ServicesSection from '../components/ServicesSection';
import AboutUsSection from '../components/AboutUsSection';
import ExperiencesSection from '../components/ExperiencesSection';
import PricingSection from '../components/PricingSection';
import TeamSection from '../components/TeamSection';
import FaqSection from '../components/FaqSection';
import InsightsSection from '../components/InsightsSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const navigate = useNavigate();

  // Hero Scroll-linked Recession Parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8, 1], [1, 0.9, 0.75]);

  // Character stagger animation variants
  const titleText = "QuolyTech";
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };
  const letterVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 350, damping: 25 }
    }
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QuolyTech",
    "url": "https://quolytech.com/",
    "logo": "https://quolytech.com/quolytech-logo.jpg",
    "description": "QuolyTech is a digital technology studio based in Tiranë, Albania, building websites, mobile applications, AI agents and custom digital solutions for businesses.",
    "email": "support@quolytech.com",
    "telephone": "+355684055007",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tiranë",
      "addressCountry": "AL"
    },
    "sameAs": [
      "https://quolytech.com"
    ],
    "knowsAbout": [
      "Web Development",
      "AI Agent Development",
      "Mobile App Development",
      "Custom Software Development",
      "Business Automation",
      "SEO",
      "Digital Marketing",
      "Branding"
    ]
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "QuolyTech",
    "url": "https://quolytech.com/",
    "description": "We Build Websites, Apps & AI Solutions for Growing Businesses.",
    "publisher": {
      "@type": "Organization",
      "name": "QuolyTech"
    }
  };

  return (
    <div>
      <SEOHead
        title="QuolyTech | Web Development, AI Agents & Digital Solutions"
        description="QuolyTech is a digital technology studio in Tiranë, Albania building websites, mobile apps, AI agents and custom digital solutions for businesses."
        canonicalPath="/"
        jsonLd={[organizationJsonLd, webSiteJsonLd]}
      />

      {/* Architectural Dark Hero Island */}
      <div className="hero-wrapper" ref={heroRef}>
        <motion.section 
          className="hero-island"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Kinetic Background Texture */}
          <img 
            src="/hero-texture.png" 
            alt="QuolyTech digital technology studio background texture" 
            className="hero-texture-bg"
          />

          {/* Swiss Crosshair Grid Overlay */}
          <div className="hero-crosshair-grid">
            <div className="crosshair-item" style={{ top: '58%', left: '8%' }}></div>
            <div className="crosshair-item" style={{ top: '58%', left: '33%' }}></div>
            <div className="crosshair-item" style={{ top: '58%', left: '58%' }}></div>
            <div className="crosshair-item" style={{ top: '58%', left: '83%' }}></div>
          </div>

          <div className="hero-content">
            {/* Top Echelon */}
            <div className="hero-top-echelon">
              <div className="hero-title-lockup">
                <motion.h1 
                  className="hero-title-main"
                  variants={titleContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {titleText.split('').map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                  <motion.sup variants={letterVariants}>®</motion.sup>
                </motion.h1>
                
                <motion.span 
                  className="hero-title-sub"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  Technology Studio
                </motion.span>
              </div>

              <motion.div 
                className="hero-services-column"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="hero-service-item">Web Development</div>
                <div className="hero-service-item">AI Agent Development</div>
                <div className="hero-service-item">Mobile App Development</div>
                <div className="hero-service-item">Custom Software & SEO</div>
              </motion.div>
            </div>

            {/* Bottom Echelon Layout */}
            <div className="hero-bottom-echelon">
              <motion.div 
                className="hero-statement-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="hero-statement-text">
                  QuolyTech is a digital technology studio based in <strong>Tiranë, Albania</strong>, building websites, mobile applications, AI agents and custom digital solutions for businesses locally and internationally.
                </p>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link to="/contact" className="hero-action-cta-btn">
                    <span>Start a Project</span>
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link to="/projects" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '600', textDecoration: 'none', padding: '10px 16px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)' }}>
                    Explore Our Work
                  </Link>
                </div>
              </motion.div>

              <div className="hero-copyright-col">
                © QuolyTech • Tiranë, Albania
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <ClientLogos />
      <ProjectsMatrix />
      <WhyChooseUsSection />
      <ServicesSection />
      <AboutUsSection />
      <ExperiencesSection />
      <PricingSection />
      <TeamSection />
      <FaqSection />
      <InsightsSection />
      <ContactSection />
    </div>
  );
}
