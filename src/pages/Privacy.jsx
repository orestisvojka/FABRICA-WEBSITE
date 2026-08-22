import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactSection from '../components/ContactSection';

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('sec-1');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const privacyData = [
    {
      id: 'sec-1',
      index: '01',
      title: 'Information We Collect',
      content: `QuolyTech® Studio ("QuolyTech", "we", "us", or "our"), based in Tiranë, Albania (support@quolytech.com), respects your privacy and is committed to protecting your personal data. We collect data through three primary mechanisms:

1. Voluntarily Provided Data: Name, work email address, phone number, company name, project specifications, and payment details when you submit inquiry forms, book a discovery call, or purchase digital packages.
2. Technical & Device Data: IP addresses, browser fingerprint types, operating system details, time zones, and referral URLs gathered automatically via lightweight, privacy-preserving website analytics.
3. AI Chatbot Interactions: Text prompts, service inquiries, and project preferences submitted to QuolyBot during chat sessions to provide real-time responses and improve our customer care workflows.`
    },
    {
      id: 'sec-2',
      index: '02',
      title: 'How We Use Your Information',
      content: `We process collected personal data for specific, transparent, and legitimate business purposes:
• Delivering Web, Mobile, AI, and Software Services: Executing contracts, deploying web platforms, configuring AI chatbots, and managing software development sprints.
• Client Support & Communication: Responding to project inquiries within 24 hours, sending milestone updates, and providing technical maintenance.
• Studio Journal & Newsletters: Delivering curated digital growth insights, AI tech developments, and company updates (only with explicit opt-in consent).
• Security & Abuse Prevention: Protecting our web infrastructure against DDoS attacks, unauthorized scraping, or malicious API exploitation.`
    },
    {
      id: 'sec-3',
      index: '03',
      title: 'Data Protection, Encryption & Zero Data Sale Guarantee',
      content: `QuolyTech implements industry-standard administrative, physical, and technological safeguards to prevent unauthorized access, loss, or disclosure of client data:
• Encryption: All website traffic and API communications are encrypted in transit via Transport Layer Security (TLS 1.3/SSL) and at rest using AES-256 standards.
• Zero Data Broker Sales: QuolyTech NEVER sells, rents, monetizes, or trades client personal information or AI conversation logs to third-party data brokers or marketing lists.`
    },
    {
      id: 'sec-4',
      index: '04',
      title: 'Third-Party Service Providers & Cloud Hosting',
      content: `To deliver high-performance digital products, we collaborate with trusted third-party infrastructure providers subject to strict confidentiality and data protection agreements:
• Cloud Infrastructure & Hosting: AWS, Vercel, and Cloudflare for global content delivery networks (CDNs).
• Artificial Intelligence Engines: Google Cloud Gemini and OpenAI APIs for processing AI assistant query interactions under enterprise non-training privacy tiers.
• Analytics & Communications: Privacy-focused analytics engines and secure email routing platforms.`
    },
    {
      id: 'sec-5',
      index: '05',
      title: 'Cookies & Local Storage Technologies',
      content: `Our website utilizes essential cookies and browser local storage strictly required for core functionality, such as maintaining user session preferences, modal states, and security tokens.

You can manage or disable cookie preferences directly through your browser settings. Note that disabling essential cookies may impact certain interactive site features or preloader animations.`
    },
    {
      id: 'sec-6',
      index: '06',
      title: 'Your Data Rights & GDPR Compliance',
      content: `Under applicable European General Data Protection Regulation (GDPR) and international privacy frameworks, you hold full authority over your personal information:
• Right to Access: Request copies of all personal data held by QuolyTech.
• Right to Rectification: Correct inaccurate or incomplete contact records.
• Right to Erasure ("Right to be Forgotten"): Request permanent deletion of your contact records and project files, subject to statutory tax retention obligations.
• Right to Opt-Out: Unsubscribe instantly from studio marketing communications via footer link or email request.`
    },
    {
      id: 'sec-7',
      index: '07',
      title: 'Data Retention & International Storage',
      content: `We retain client contact records and project documentation for as long as necessary to fulfill the operational purposes outlined in this policy or comply with legal, tax, and accounting standards.

Data is securely processed and hosted within European Union (EU) data centers and global cloud instances governed by standard contractual clauses (SCCs).`
    },
    {
      id: 'sec-8',
      index: '08',
      title: 'Protection of Minors',
      content: `QuolyTech® Studio services, products, and website platforms are tailored exclusively for commercial business entities, professionals, and adults. We do not knowingly solicit or collect personal data from individuals under 16 years of age.`
    },
    {
      id: 'sec-9',
      index: '09',
      title: 'Data Protection Contact & Inquiries',
      content: `If you wish to exercise your data privacy rights, request data deletion, or ask questions regarding our privacy practices, please reach out directly to our Data Protection Officer:

QuolyTech® Studio
Attn: Data Privacy Officer
Email: support@quolytech.com
Website: quolytech.com
Location: Tiranë, Albania`
    }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="legal-page-outer">
      {/* Hero Header Section */}
      <section className="legal-hero-section">
        <div className="legal-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'inline-block' }}></span>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', color: '#a1a1aa' }}>Data Privacy & Security</span>
              </div>
              <span style={{ fontSize: '13px', color: '#71717a', fontWeight: '600' }}>(2016-26©)</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <span style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>QuolyTech® Studio</span>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.05', margin: 0 }}>
                Privacy Policy.
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} style={{ fontSize: '16px', color: '#a1a1aa', maxWidth: '640px', lineHeight: '1.6', margin: 0 }}>
              How QuolyTech® Studio collects, protects, processes, and respects personal information across our website, web products, and AI agent solutions.
            </motion.p>
          </motion.div>

          {/* Animated Line Drawing */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)', margin: '36px 0', transformOrigin: 'left center' }}
          />
        </div>
      </section>

      {/* Main Content Layout with Responsive Sidebar */}
      <section className="legal-body-section" style={{ paddingBottom: '120px' }}>
        <div className="legal-container">
          <div className="legal-layout-grid">
            
            {/* Table of Contents Responsive Navigation */}
            <motion.aside
              className="legal-sidebar"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="legal-sidebar-title">Contents</span>
              {privacyData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`legal-sidebar-btn ${activeSection === item.id ? 'active' : ''}`}
                >
                  <span className="legal-sidebar-idx">{item.index}</span>
                  <span className="legal-sidebar-text">{item.title}</span>
                </button>
              ))}
            </motion.aside>

            {/* Privacy Articles Content Column */}
            <div className="legal-articles-col">
              {privacyData.map((item) => (
                <motion.div
                  key={item.id}
                  id={item.id}
                  className="legal-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="legal-card-header">
                    <span className="legal-card-badge">
                      {item.index}
                    </span>
                    <h2 className="legal-card-title">
                      {item.title}
                    </h2>
                  </div>

                  <div className="legal-card-content">
                    {item.content}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Trailing Contact Section */}
      <ContactSection />
    </div>
  );
}
