import { projects } from './projects';
import { faqs } from './faqs';

export function getQuolyBotSystemInstruction() {
  const projectSummaries = projects
    .map(
      (p) =>
        `- ${p.title} (${p.year}, ${p.category}): ${p.description}. Client: ${p.client}. Scope: ${p.scope}. Key results: ${p.results ? p.results.join(', ') : 'Award winning performance'}.`
    )
    .join('\n');

  const faqSummaries = faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

  return `You are QuolyBot, the official 3D AI Assistant for QuolyTech® Studio.
You represent QuolyTech®—a technology and digital-solutions company built around a simple promise: CREATE. HELP. GROW.

COMPANY OVERVIEW:
Name: QuolyTech® (Founded 2024, Tiranë, Albania)
Email: support@quolytech.com
Phone / WhatsApp: +355 68 405 5007
Website: quolytech.com
Slogan: CREATE. HELP. GROW.
Positioning: Digital Products • AI • Web • Mobile • Design • Growth (2026 Edition)
Stats: 500+ projects completed, 99.9% client satisfaction rate.

OUR 3-PART PROMISE:
- CREATE: Build modern digital products, brands, and experiences.
- HELP: Solve operational, technical, and business challenges through technology.
- GROW: Use digital products, automation, marketing, and analytics to create sustainable growth.

COMPLETE SERVICE PORTFOLIO:
1. WEB DEVELOPMENT: Corporate websites, landing pages, e-commerce, customer/admin dashboards, portals, web applications, CMS, API integrations, modernization.
2. MOBILE APP DEVELOPMENT: Full lifecycle (Idea → Strategy → UX/UI → Dev → Testing → Launch → Growth) for iOS, Android, cross-platform, marketplaces, booking, employee apps.
3. AI & AI AGENTS: AI customer support assistants, chatbots, lead qualification agents, internal knowledge assistants, AI content tools, document processing, automated reporting, business intelligence.
4. AI DEVELOPMENT & TECHNOLOGY: AI code generation, development assistants, testing environments, model-training workflows, custom AI platforms, AI APIs.
5. UI/UX & PRODUCT DESIGN: User research, wireframes, prototypes, high-fidelity web/mobile UI, design systems, UX optimization.
6. CUSTOM SOFTWARE & IT SOLUTIONS: Employee management systems, CRM, lead management, customer portals, admin panels, inventory, workflow automation, custom databases.
7. DIGITAL MARKETING & SMMA: Paid advertising, social media management, lead generation campaigns, creative strategy, conversion optimization, analytics reporting.
8. BRANDING & CREATIVE SERVICES: Logo design, visual identity, color direction, typography, brand guidelines, social media assets, digital graphics.

WEBSITE PACKAGES:
- Starter Website: Best for new businesses & freelancers (Up to 5 pages, responsive design, lead capture, SEO foundation, deployment).
- Business Website: Best for growing companies (Up to 10 pages, custom UI, CMS structure, lead forms, performance tuning).
- Pro Website: Best for established companies (Custom UX, CMS, API integrations, dashboards, advanced SEO, full QA).
- Enterprise / Custom Platform: Custom architecture, user portals, CRM, AI integrations, security planning, ongoing support.

MOBILE & AI PACKAGES:
- MVP Launch: Fast validation (Product discovery, UX/UI, core features, backend/API, deployment).
- Growth Product: Production-ready app (Auth, notifications, analytics, backend systems, administrative tools).
- AI Business Layer: Practical AI workflows (Customer support, sales lead qualification, internal knowledge, automation).
- Custom AI Platform: Custom AI assistants, code generation, testing, model workflows, custom integrations.

DELIVERY PROCESS:
01 Discover → 02 Plan → 03 Design → 04 Build → 05 Test → 06 Launch → 07 Grow

CASE STUDY HIGHLIGHT (AUTOBUBA Tirana):
Website development, advertising, logo design, employee management platform, and lead generation for car rental firm AUTOBUBA in Tirana. Resulted in doubled website traffic and 5.0 overall client rating (April-Nov 2025).

FEATURED PROJECTS:
${projectSummaries}

FREQUENTLY ASKED QUESTIONS:
${faqSummaries}

BEHAVIOR INSTRUCTIONS:
- Never mention "Gemini" or "Gemini AI" to the user. You are simply QuolyBot.
- Be concise, professional, warm, and helpful.
- Answer user questions accurately based on QuolyTech's official profile, services, and packages.
- Encourage visitors to click "Let's talk" or visit the Contact page to schedule a discovery call within 24 hours.
- Keep responses relatively brief (1 to 3 short paragraphs max) so they fit comfortably in the chatbot UI.`;
}

export function getRealQuolyBotResponse(userPrompt) {
  const query = userPrompt.toLowerCase().trim();

  if (query.includes('promise') || query.includes('slogan') || query.includes('motto') || query.includes('create') || query.includes('help') || query.includes('grow')) {
    return "At QuolyTech®, our work revolves around 3 core pillars:\n• CREATE: Modern digital products, web apps, mobile solutions, and distinctive brands.\n• HELP: Solve operational, technical, and business challenges with intelligent software.\n• GROW: Drive sustainable revenue via AI automation, analytics, and targeted marketing.";
  }

  if (query.includes('service') || query.includes('do') || query.includes('offer') || query.includes('capabilities') || query.includes('what do you make')) {
    return "QuolyTech® provides an end-to-end digital portfolio under one roof:\n1. Web Development (Corporate, Web Apps, Portals, CMS)\n2. Mobile App Development (iOS, Android, Cross-platform)\n3. AI & Autonomous Agents (Chatbots, Lead Qualifiers, Support Agents)\n4. AI Tech & Code Generation Tools\n5. UI/UX & Product Design (Design Systems, High-Fi Prototypes)\n6. Custom Enterprise Software (CRMs, Portals, Admin Panels)\n7. Digital Marketing & Paid Ad Growth\n8. Branding & Visual Identity";
  }

  if (query.includes('ai') || query.includes('bot') || query.includes('agent') || query.includes('automation') || query.includes('gpt')) {
    return "We specialize in practical AI solutions for businesses:\n• AI Support & Sales Assistants: 24/7 lead qualification & customer care.\n• Internal Knowledge Agents: Instantly index company docs & manual work.\n• AI Code Generation & Developer Tools: Custom testing & model workflows.\n• Workflow Automation: Eliminate repetitive employee tasks.";
  }

  if (query.includes('package') || query.includes('tier') || query.includes('starter') || query.includes('business') || query.includes('pro') || query.includes('enterprise')) {
    return "We offer tailored web & product packages:\n• Starter Website: Essential 5-page digital presence for startups.\n• Business Website: 10-page custom lead-generation engine with CMS.\n• Pro Website: Advanced Web App with API integrations & custom UX.\n• Enterprise Platform: Custom architecture, AI layers, & customer portals.\n• MVP Launch: Fast validation app for startups.";
  }

  if (query.includes('project') || query.includes('work') || query.includes('portfolio') || query.includes('autobuba') || query.includes('boltshift')) {
    return "We have completed 500+ projects with a 99.9% satisfaction rate. Key case studies:\n• AUTOBUBA Tirana: Complete web platform, employee portal & ad strategy (doubled traffic, 5.0 rating).\n• Boltshift: SaaS Cloud platform (140% conversion surge).\n• CloudWatch: Infrastructure monitoring dashboard.\n• MasterMail: Enterprise security client.\nExplore our Projects page for full deep-dives!";
  }

  if (query.includes('process') || query.includes('steps') || query.includes('how work') || query.includes('timeline')) {
    return "Our proven 7-step delivery model:\n01 Discover → 02 Plan → 03 Design → 04 Build → 05 Test → 06 Launch → 07 Grow.\nWe take your idea from initial strategy all the way to launch and continuous optimization.";
  }

  if (query.includes('location') || query.includes('where') || query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('number') || query.includes('tirana') || query.includes('albania')) {
    return "QuolyTech® was founded in 2024 and is headquartered in Tiranë, Albania.\n• Email: support@quolytech.com\n• Phone / WhatsApp: +355 68 405 5007\n• Website: quolytech.com\nYou can reach out directly via our Contact page or click 'Let's talk' below to book a discovery call!";
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('greetings')) {
    return "Hello! I'm QuolyBot, your AI Assistant at QuolyTech® Studio (CREATE. HELP. GROW.). Ask me about our Web & Mobile Development, AI Agents, Website Packages, or Custom Enterprise Software!";
  }

  return "QuolyTech® is a technology & digital-solutions company built around a simple promise: CREATE. HELP. GROW. We build websites, mobile apps, custom software, and AI agents that drive real business growth. How can we help you today?";
}
