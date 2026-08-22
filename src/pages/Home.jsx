import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { testimonials, faqs } from '../data/faqs';
import { ArrowRight, ChevronLeft, ChevronRight, Check, ArrowUpRight } from 'lucide-react';
import CtaCard from '../components/CtaCard';
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
  const [openFaq, setOpenFaq] = useState(null);

  const selectedProjects = projects.slice(0, 4);

  // Hero Scroll-linked Recession Parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8, 1], [1, 0.9, 0.75]);
  const ctaParallaxY = useTransform(heroScrollProgress, [0, 1], [0, -35]);

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

  return (
    <div>
      {/* High-Contrast Architectural Dark Hero Island */}
      <div className="hero-wrapper" ref={heroRef}>
        <motion.section 
          className="hero-island"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Kinetic Background Texture */}
          <img 
            src="/hero-texture.png" 
            alt="Dark atmospheric background" 
            className="hero-texture-bg"
          />

          {/* Swiss Crosshair Grid Overlay (4 anchors) */}
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
                  Studio
                </motion.span>
              </div>

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
                <Link to="/contact" className="hero-action-cta-btn">
                  <span>Let's talk</span>
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>

              <div className="hero-copyright-col">
                © 2026 QuolyTech® Studio
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Social Proof Validation Matrix: Our Clients (2016-25©) */}
      <ClientLogos />

      {/* Curated Portfolio Matrix: Projects. (6 Case Studies) */}
      <ProjectsMatrix />

      {/* Kinetic Statistics & Metric Module: Why Choose Us */}
      <WhyChooseUsSection />

      {/* Kinetic Services Section: What We Do */}
      <ServicesSection />

      {/* About Us / How We Launch Section */}
      <AboutUsSection />

      {/* Experiences & Testimonials Section */}
      <ExperiencesSection />

      {/* Dark Architectural Pricing Section */}
      <PricingSection />

      {/* The Faces Behind The Projects (Team) Section */}
      <TeamSection />

      {/* Asymmetrical 40/60 FLIP FAQ Section */}
      <FaqSection />

      {/* Editorial Insights / Blog Section */}
      <InsightsSection />

      {/* Atmospheric Dark "Let's talk." Contact Section */}
      <ContactSection />
    </div>
  );
}
