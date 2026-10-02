import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
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
    "description": "QuolyTech is a technology and design agency based in Tiranë, Albania. We help businesses grow with AI systems and agents, startup and SaaS development, web and mobile apps, UI/UX design, systems management and social media marketing.",
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
      "AI Agent Development",
      "Business Process Automation",
      "Startup MVP Development",
      "SaaS Development",
      "Web Development",
      "Mobile App Development",
      "UI/UX Design",
      "IT Systems Management",
      "Social Media Marketing",
      "Custom Software Development",
      "SEO",
      "Branding"
    ]
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "QuolyTech",
    "url": "https://quolytech.com/",
    "description": "Technology & design agency: AI agents, startup & SaaS development, web & mobile apps, UI/UX design and social media marketing.",
    "publisher": {
      "@type": "Organization",
      "name": "QuolyTech"
    }
  };

  return (
    <div>
      <SEOHead
        title="QuolyTech | Technology & Design Agency in Tiranë, Albania"
        description="QuolyTech is a technology & design agency in Tiranë, Albania: AI agents, startup & SaaS development, web & mobile apps, UI/UX design and social media marketing."
        canonicalPath="/"
        jsonLd={[organizationJsonLd, webSiteJsonLd]}
      />

      {/* Architectural Dark Hero Island */}
      <div className="hero-wrapper" ref={heroRef}>
        <motion.section 
          className="hero-island"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Background Video */}
          <video 
            className="hero-video-bg"
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
          >
            <source src="/qtech-bg-video.mp4" type="video/mp4" />
          </video>

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
                  {/* Kept as one text run so the font's kerning applies */}
                  <motion.span variants={letterVariants}>{titleText}</motion.span>
                  <motion.sup variants={letterVariants}>®</motion.sup>
                </motion.h1>
                
                <motion.span 
                  className="hero-title-sub"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  Studio
                </motion.span>
              </div>
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
                  No generic websites. No empty <strong>marketing promises.</strong> Just tools and strategies that help your business grow and your brand shine.
                </p>
              </motion.div>

              <motion.div
                className="hero-services-column"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="hero-service-item">Branding and Identity</div>
                <div className="hero-service-item">Social Media Marketing</div>
                <div className="hero-service-item">Web Design and Development</div>
                <div className="hero-service-item">SEO Optimization</div>
              </motion.div>
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
