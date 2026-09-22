import { projects } from './projects';
import { faqs } from './faqs';

export function getQuolyBotSystemInstruction() {
  const projectSummaries = projects
    .map(
      (p) =>
        `- ${p.title} (${p.year}, ${p.category}): ${p.description}. Type: ${p.statusLabel || 'Project'}. Tech: ${p.technologies ? p.technologies.join(', ') : 'React, HTML5, CSS3'}.`
    )
    .join('\n');

  const faqSummaries = faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

  return `You are QuolyBot, the official AI Assistant for QuolyTech.
QuolyTech is a digital technology studio based in Tiranë, Albania, building websites, mobile applications, AI agents and custom digital solutions for businesses locally and internationally.

COMPANY OVERVIEW:
Name: QuolyTech
Category: Digital technology studio / technology company
Location: Tiranë, Albania
Email: support@quolytech.com
Phone / WhatsApp: +355 68 405 5007
Website: https://quolytech.com/
Positioning: QuolyTech builds websites, mobile applications, AI agents, custom software and digital solutions that help businesses operate, grow and improve their online presence.

PRIMARY SERVICES:
1. WEB DEVELOPMENT: Custom websites and web applications designed for performance, usability, mobile devices and business growth (React, Next.js, HTML, CSS, JavaScript, PHP, MySQL, WordPress).
2. AI AGENT DEVELOPMENT: AI-powered agents and automation systems that help businesses handle customer support, lead qualification, internal workflows and repetitive tasks.
3. MOBILE APP DEVELOPMENT: Mobile applications for businesses, startups and digital products, including cross-platform applications (React Native) and AI-powered experiences.
4. CUSTOM SOFTWARE: Custom digital platforms and business software designed around specific operational requirements, workflows and integrations.
5. BUSINESS AUTOMATION: Automated software workflows and system integrations that eliminate repetitive manual tasks and improve operational efficiency.
6. SEO & DIGITAL GROWTH: Technical SEO, content strategy, website performance optimization and digital growth services designed to improve organic visibility and user experience.
7. BRANDING & DIGITAL IDENTITY: Brand identity systems, visual direction, typography, digital design and marketing assets for businesses building a consistent online presence.

DELIVERY PROCESS:
01 Discover → 02 Plan → 03 Design → 04 Build → 05 Test → 06 Launch

PROJECTS & PROTOTYPES:
${projectSummaries}

FREQUENTLY ASKED QUESTIONS:
${faqSummaries}

BEHAVIOR INSTRUCTIONS:
- Never mention "Gemini" or "Gemini AI" to the user. You are simply QuolyBot.
- Be concise, professional, factual, warm, and helpful.
- Answer user questions accurately based on QuolyTech's official profile, location in Tiranë, Albania, services, and realistic timelines.
- Encourage visitors to click "Start a Project" or visit the Contact page to discuss their requirements.
- Keep responses relatively brief (1 to 3 short paragraphs max).`;
}

export function getRealQuolyBotResponse(userPrompt) {
  const query = userPrompt.toLowerCase().trim();

  if (query.includes('location') || query.includes('where') || query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('tirana') || query.includes('albania')) {
    return "QuolyTech is a digital technology studio based in Tiranë, Albania.\n• Email: support@quolytech.com\n• Phone / WhatsApp: +355 68 405 5007\n• Website: https://quolytech.com/\nYou can reach out directly via our Contact page or click 'Start a Project' to discuss your requirements!";
  }

  if (query.includes('ai') || query.includes('bot') || query.includes('agent') || query.includes('automation')) {
    return "We develop AI-powered agents and automation systems for businesses:\n• Customer Support AI Agents: 24/7 inquiry handling & ticket resolution.\n• Lead Qualification Agents: Automated engagement and lead scoring.\n• Internal Knowledge Assistants: Instant search across company documentation.\n• Business Automation Workflows: API and CRM integrations to eliminate repetitive tasks.";
  }

  if (query.includes('service') || query.includes('do') || query.includes('offer') || query.includes('build') || query.includes('capabilities')) {
    return "QuolyTech builds custom digital solutions for growing businesses:\n1. Web Development (React, Next.js, WordPress, PHP, MySQL)\n2. AI Agent Development (Support, Lead Qualification, Automation)\n3. Mobile App Development (iOS & Android Cross-Platform)\n4. Custom Software Development (Dashboards, Admin Portals, APIs)\n5. Business Automation (Workflow integrations & webhooks)\n6. SEO & Digital Growth (Technical SEO, Core Web Vitals, Schema.org)\n7. Branding & Digital Identity (Logo design, visual systems, assets)";
  }

  if (query.includes('project') || query.includes('work') || query.includes('portfolio') || query.includes('prototype') || query.includes('case')) {
    return "Our portfolio features web applications, developer tool interfaces, monitoring dashboards, and brand identity systems such as Boltshift, Ephemeral, Powersurge, Mastermail, Warpspeed, and CloudWatch. Explore our Projects page for complete details!";
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('greetings')) {
    return "Hello! I'm QuolyBot, the official AI Assistant for QuolyTech. We are a digital technology studio based in Tiranë, Albania, building websites, mobile apps, AI agents, custom software, and digital growth solutions. How can we help your business today?";
  }

  return "QuolyTech is a digital technology studio based in Tiranë, Albania. We build websites, mobile applications, AI agents, custom software, and digital growth solutions for businesses. How can we assist you today?";
}
