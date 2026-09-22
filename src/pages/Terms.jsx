import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';

export default function Terms() {
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

  const termsData = [
    {
      id: 'sec-1',
      index: '01',
      title: 'Executive Overview & Agreement to Terms',
      content: `These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client", "User", or "you") and QuolyTech® Studio ("QuolyTech", "Company", "we", "us", or "our"), headquartered in Tiranë, Albania (support@quolytech.com).

By accessing our website (quolytech.com), commissioning digital products, subscribing to monthly retainer services, or engaging our software development and AI engineering capabilities, you acknowledge that you have read, understood, and agree to be bound by these Terms.`
    },
    {
      id: 'sec-2',
      index: '02',
      title: 'Service Portfolio & Delivery Model (CREATE. HELP. GROW.)',
      content: `QuolyTech operates around three foundational service pillars:
• CREATE: Custom Web Design & Development, Mobile Applications (iOS, Android, Cross-platform), Brand Identity, and UI/UX Systems.
• HELP: Custom Enterprise Software, Autonomous AI Agents, Customer Support Chatbots, Code Generation Tools, and Workflow Automation.
• GROW: Data-Driven Digital Marketing, Paid Ad Campaign Strategy, SEO Optimization, and Conversion Rate Engine Tuning.

All project engagements follow our structured 7-step delivery methodology: (01 Discover → 02 Plan → 03 Design → 04 Build → 05 Test → 06 Launch → 07 Grow). Both parties commit to timely communication and milestone sign-offs.`
    },
    {
      id: 'sec-3',
      index: '03',
      title: 'Intellectual Property Rights & Deliverable Ownership',
      content: `Upon 100% full payment of all contracted invoice fees, QuolyTech assigns to the Client exclusive copyright ownership of final bespoke design assets, frontend code, and custom software created specifically for the project.

QuolyTech retains ownership of pre-existing core software libraries, general UI frameworks, reusable code modules, and developer tooling utilized in building the solution. Unless an explicit Non-Disclosure Agreement (NDA) is executed prior to project kickoff, QuolyTech reserves the right to display completed project screenshots, case study metrics, and visual demonstrations within our public portfolio.`
    },
    {
      id: 'sec-4',
      index: '04',
      title: 'Website Packages, Subscriptions & Payment Terms',
      content: `QuolyTech offers fixed-scope website packages (Starter, Business, Pro, Enterprise) and custom software quotes:
• Milestone Payments: Project fees are billed according to agreed deposit and milestone release schedules (e.g., 50% deposit, 50% upon final QA deployment).
• Monthly Retainers & Subscriptions: Recurring maintenance, AI agent hosting, and marketing retainers are billed in advance on a monthly basis.
• Payment Due Dates: Invoices are payable within 7 business days of issuance. Late payments exceeding 14 calendar days may incur temporary suspension of active development sprints or hosted staging instances.`
    },
    {
      id: 'sec-5',
      index: '05',
      title: 'AI & Autonomous Agent Technology Disclaimer',
      content: `QuolyTech builds, integrates, and fine-tunes artificial intelligence agents and automated content workflows using leading AI models (including OpenAI, Google Gemini, and custom frameworks).

While we implement rigorous QA testing and content guardrails, AI solutions generate probabilistic outputs. Clients are responsible for reviewing automated customer support responses and critical business workflows. QuolyTech is not liable for indirect losses resulting from third-party AI API service downtime or model outputs.`
    },
    {
      id: 'sec-6',
      index: '06',
      title: 'Client Obligations & Acceptable Use',
      content: `Clients agree to provide required digital assets, branding assets, copy, and credential access in a timely manner. Clients guarantee that all provided content (text, graphics, trademarks) does not violate third-party intellectual property rights.

Clients shall not use QuolyTech software, websites, or AI agents for illegal activities, spamming, unauthorized web scraping, distribution of malicious software, or attempt reverse engineering of studio technology.`
    },
    {
      id: 'sec-7',
      index: '07',
      title: 'Limitation of Liability & SLA Guarantees',
      content: `QuolyTech strives for maximum operational excellence, aiming for 99.9% uptime on managed client infrastructure. However, services are provided on an "as-is" and "as-available" basis without implied warranties of merchantability.

To the maximum extent permitted by law, QuolyTech's total aggregate liability for any claims arising from these Terms or project execution shall not exceed the total amount paid by the Client to QuolyTech in the preceding three (3) months.`
    },
    {
      id: 'sec-8',
      index: '08',
      title: 'Termination, Sprints & Dispute Resolution',
      content: `Either party may terminate a project contract with 14 calendar days' written notice. Upon termination, the Client is responsible for payment for all work completed up to the termination date.

These Terms are governed by and construed in accordance with the laws of Albania. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in Tiranë, Albania.`
    },
    {
      id: 'sec-9',
      index: '09',
      title: 'Contact Information & Inquiries',
      content: `For legal notices, contract inquiries, or questions regarding these Terms of Service, please contact our legal and support desk:

QuolyTech® Studio
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
      <SEOHead
        title="Terms of Service | QuolyTech"
        description="Terms of service governing web development, AI agent deployment, software services, and client contracts with QuolyTech in Tiranë, Albania."
        canonicalPath="/terms/"
      />
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
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', color: '#a1a1aa' }}>Legal & Compliance</span>
              </div>
              <span style={{ fontSize: '13px', color: '#71717a', fontWeight: '600' }}>(2016-26©)</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <span style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>QuolyTech® Studio</span>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.05', margin: 0 }}>
                Terms of Service.
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} style={{ fontSize: '16px', color: '#a1a1aa', maxWidth: '640px', lineHeight: '1.6', margin: 0 }}>
              Official terms governing project engagements, software deliverables, website packages, AI agent technologies, and client services provided by QuolyTech® Studio.
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
              {termsData.map((item) => (
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

            {/* Terms Articles Content Column */}
            <div className="legal-articles-col">
              {termsData.map((item) => (
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
