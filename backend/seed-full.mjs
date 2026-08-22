/**
 * Full-site seed: mirrors EVERY page of the QuolyTech website into the CMS
 * database with complete sections and every card, using the real site copy
 * (projects, blog posts, team members, services, FAQs, legal pages).
 *
 * Raw SQL (node:sqlite) — no ORM. Replaces pages by slug (idempotent) and
 * publishes each one so the public API serves everything immediately.
 *
 * Prereq: node backend/import-media.mjs  (creates seed-data/media-map.json)
 * Run:    node backend/seed-full.mjs
 */

import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.QT_DB_PATH || path.join(__dirname, "..", "database", "quolytech.db");

const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");

let mediaMap = {};
try {
  mediaMap = JSON.parse(readFileSync(path.join(__dirname, "seed-data", "media-map.json"), "utf8"));
} catch {
  console.warn("! seed-data/media-map.json not found — images will use original site paths");
}
const img = (p) => mediaMap[p] || p;

/* ================================================================ SITE DATA */

const projects = [
  { slug: "boltshift", title: "Boltshift", year: "2026", category: "Web Design", client: "Boltshift Inc.",
    industry: "SaaS & Cloud Operations", scope: "Brand Strategy, UI/UX Design, Webflow & React Development",
    timeline: "8 Weeks", liveUrl: "https://boltshift.example.com", tagline: "Empowering Next-Gen Dev Teams",
    heroImage: "/project-boltshift.png",
    description: "A complete brand refresh and high-converting marketing engine for Boltshift's developer productivity platform.",
    overview: "Boltshift came to QuolyTech Studio needing a brand identity and web presence that matched their enterprise-grade cloud capabilities. We redesigned their web architecture from the ground up, implementing crisp typography, dark-mode technical aesthetics, and high-performance interactive product demos.",
    challenge: "Boltshift's legacy site struggled with developer drop-off and unclear feature communication. They needed to present complex multi-cloud architecture visually while maintaining instantaneous load times across worldwide regions.",
    solution: "We engineered a clean modular grid system paired with custom interactive component previews. By focusing on typography, whitespace, and high-contrast visuals, we created an intuitive path for technical directors to evaluate and request demos.",
    results: ["140% increase in demo request conversion rate", "0.4s initial page render speed globally", "Nominated for Site of the Day on Awwwards"],
    gallery: ["/project-boltshift.png", "/project-ephemeral.png", "/project-powersurge.png"] },
  { slug: "ephemeral", title: "Ephemeral", year: "2026", category: "Branding", client: "Ephemeral Labs",
    industry: "Web3 & Digital Assets", scope: "Visual Identity, Motion Graphics, 3D Assets, Web Development",
    timeline: "6 Weeks", liveUrl: "https://ephemeral.example.com", tagline: "Digital Permanence in an Ever-Changing World",
    heroImage: "/project-ephemeral.png",
    description: "Futuristic brand identity and interactive 3D portfolio showcase for Ephemeral Labs.",
    overview: "Ephemeral creates decentralized storage protocol primitives. QuolyTech crafted a mesmerizing dark-mode web experience featuring real-time webgl particle shaders, minimalist typography, and dynamic micro-animations.",
    challenge: "Capturing the abstract concept of decentralized cryptographic state storage into a tangible, beautiful web experience.",
    solution: "We leveraged dark mode glassmorphism alongside glowing neon accents and smooth page transitions to establish Ephemeral as an industry leader in modern Web3 architecture.",
    results: ["Over 500,000 unique visitors in launch week", "Featured in top design publication roundups", "3.5x increase in developer community engagement"],
    gallery: ["/project-ephemeral.png", "/project-boltshift.png"] },
  { slug: "powersurge", title: "Powersurge", year: "2024", category: "Development", client: "Powersurge Energy Solutions",
    industry: "Clean Energy & Hardware", scope: "UX Research, Design System, Full-Stack Web Application",
    timeline: "12 Weeks", liveUrl: "https://powersurge.example.com", tagline: "Next-Gen Grid Intelligence",
    heroImage: "/project-powersurge.png",
    description: "Enterprise web application and consumer dashboard for smart solar battery grid networks.",
    overview: "Powersurge manages municipal microgrids across North America. We built their real-time telemetry dashboard, allowing engineers and homeowners to monitor solar intake, energy storage, and grid feedback seamlessly.",
    challenge: "Processing thousands of web-socket data feeds without degrading UI frame rates or consuming excessive browser memory.",
    solution: "We architected a high-performance web app using customized canvas rendering, virtualized data tables, and sleek dark mode graphs tailored for mission-critical monitoring.",
    results: ["99.99% interface uptime across monitoring hubs", "Reduced dashboard data latency from 2s to <50ms", "Client secured $45M Series B funding post-launch"],
    gallery: ["/project-powersurge.png", "/project-mastermail.png"] },
  { slug: "mastermail", title: "Mastermail", year: "2024", category: "SEO & Growth", client: "Mastermail Inc.",
    industry: "Marketing Tech", scope: "Content Strategy, Technical SEO, Landing Page System",
    timeline: "5 Weeks", liveUrl: "https://mastermail.example.com", tagline: "Hyper-Personalized Email Engine",
    heroImage: "/project-mastermail.png",
    description: "High-speed marketing platform and programmatic SEO hub for an AI-powered email deliverability tool.",
    overview: "QuolyTech redesigned Mastermail's digital footprint and built a dynamic CMS engine that generates programmatic comparison pages and deliverability guides.",
    challenge: "Scaling organic search acquisition in a crowded marketing technology vertical.",
    solution: "We structured perfect semantic HTML5 markup, implemented structured Schema data, optimized asset delivery, and crafted dynamic interactive email inbox previewers.",
    results: ["+320% organic search traffic growth in 60 days", "Top 3 keyword rank for 45 primary industry terms", "52% increase in free-trial signups"],
    gallery: ["/project-mastermail.png"] },
  { slug: "warpspeed", title: "Warpspeed", year: "2023", category: "Web Design", client: "Warpspeed AI",
    industry: "Artificial Intelligence", scope: "Product Positioning, Web Design, Interactive Demos",
    timeline: "4 Weeks", liveUrl: "https://warpspeed.example.com", tagline: "Instant Code Generation for Teams",
    heroImage: "/project-warpspeed.png",
    description: "Striking cyberpunk dark design for an AI code autocompletion assistant.",
    overview: "Warpspeed needed a website that conveyed speed, precision, and state-of-the-art AI intelligence. We built an interactive landing page featuring live typing simulations, dark syntax themes, and dynamic benchmark comparisons.",
    challenge: "Standing out in the explosion of AI developer tools with a memorable aesthetic identity.",
    solution: "Used Geist font typography, sleek neon cyan borders, and smooth keyboard navigation previews.",
    results: ["100k+ waitlist signups within 48 hours of launch", "Voted Product of the Day on Product Hunt"],
    gallery: ["/project-warpspeed.png"] },
  { slug: "cloudwatch", title: "CloudWatch", year: "2020", category: "Branding", client: "CloudWatch Systems",
    industry: "Cybersecurity", scope: "Brand Guidelines, Web Design, UI Kit",
    timeline: "6 Weeks", liveUrl: "https://cloudwatch.example.com", tagline: "Continuous Threat Detection",
    heroImage: "/project-cloudwatch.png",
    description: "Comprehensive corporate design system and website overhaul for a zero-trust security provider.",
    overview: "CloudWatch protects global enterprise cloud infrastructure. QuolyTech created a trust-building visual language utilizing deep obsidian tones, structured grid alignment, and crisp iconography.",
    challenge: "Conveying high-level enterprise security without looking dull or outdated.",
    solution: "Paired rigorous layout precision with refined micro-interactions and dark mode card containers.",
    results: ["Acquired by top cybersecurity conglomerate in 2022", "Complete overhaul of marketing collateral & sales decks"],
    gallery: ["/project-cloudwatch.png"] },
];

const blogPosts = [
  { slug: "how-a-well-designed-website-can-transform-your-business",
    title: "How a well-designed website can transform your business",
    date: "Feb 4, 2026", author: "Lauren Thompson", authorRole: "Team Lead", category: "Web Design",
    readTime: "5 min read", coverImage: "/blog-featured.png",
    excerpt: "Discuss the latest design trends shaping the digital world and how to leverage them for your business.",
    content: "<h2>The Digital Front Door</h2><p>Your website is no longer just a digital brochure; it is your primary sales engine, brand ambassador, and trust building mechanism. A poorly constructed web experience immediately signals doubt to potential clients, while a polished, high-performing platform establishes authority before a word is spoken.</p><h2>1. First Impressions Count in Seconds</h2><p>Research shows users form an opinion about your website in less than 50 milliseconds. Design elements such as typography hierarchy, color harmony, and immediate visual clarity dictate whether a visitor stays or navigates back to a competitor.</p><h2>2. Performance is UX and SEO</h2><p>Speed isn't just a technical metric — it is the cornerstone of user experience. Search engines prioritize websites that render instantly, and users reward fast sites with higher conversion rates and longer session times.</p><h2>3. Modern Design Principles</h2><p>At QuolyTech Studio, we emphasize clean geometry, purpose-driven micro-interactions, dark mode elegance, and responsive layouts that look exceptional across every screen size.</p>" },
  { slug: "the-psychology-of-color-in-branding",
    title: "The Psychology of Color in Branding",
    date: "Jan 28, 2026", author: "George Stern", authorRole: "Client Success Manager", category: "Branding",
    readTime: "4 min read", coverImage: "/insight-thumb-1.png",
    excerpt: "Explore how color triggers emotions and impacts consumers to create how to use color theory in branding to build an.",
    content: "<h2>Color as a Silent Communicator</h2><p>Color is one of the most powerful tools in a designer's arsenal. It triggers subconscious emotional responses, guides user attention, and establishes brand recognition instantly.</p><h2>Dark Mode &amp; High Contrast</h2><p>The rise of modern dark aesthetics (#121212) combined with high-contrast typography creates an atmosphere of prestige, technical focus, and premium quality. When paired with vibrant accent colors, high contrast draws eyes directly to call-to-action buttons and key metrics.</p>" },
  { slug: "why-website-performance-can-make-or-break-your-business",
    title: "Why Website Performance Can Make or Break Your Business",
    date: "Jan 15, 2026", author: "Lauren Thompson", authorRole: "Team Lead", category: "Development",
    readTime: "6 min read", coverImage: "/insight-thumb-2.png",
    excerpt: "A one-second delay in page load time can reduce conversions by 7%. Learn how to optimize your website for faster load times.",
    content: "<h2>Speed is the Ultimate Feature</h2><p>A slow website frustrates visitors and directly degrades revenue. Every extra 100 milliseconds of latency leads to measurable drop-offs in user retention.</p>" },
  { slug: "dark-mode-a-trend-or-a-web-design-essential",
    title: "Dark Mode: A Trend or a Web Design Essential?",
    date: "Dec 20, 2024", author: "George Stern", authorRole: "Client Success Manager", category: "Design Trends",
    readTime: "4 min read", coverImage: "/about-thumb-1.png",
    excerpt: "Take a look at how dark mode is evolving from a visual trend into an essential feature for user experience.",
    content: "<h2>The Rise of Obsidian Aesthetics</h2><p>Dark backgrounds reduce eye strain, conserve screen power on OLED displays, and provide an ultra-sleek canvas for glowing UI elements and rich photography.</p>" },
  { slug: "the-future-of-typography-trends-that-will-define-the-web",
    title: "The Future of Typography: Trends That Will Define 2026",
    date: "Nov 14, 2024", author: "Lauren Thompson", authorRole: "Team Lead", category: "Typography",
    readTime: "5 min read", coverImage: "/about-thumb-2.png",
    excerpt: "Typography has evolved far beyond fonts. Explore how kinetic typography and custom variable fonts shape user engagement.",
    content: "<h2>Geist &amp; Modern Geometric Type</h2><p>Modern web design is defined by high-precision variable sans-serif typefaces. Geist and Inter offer immaculate optical kerning, crisp rendering at all DPI settings, and vast weight flexibility.</p>" },
  { slug: "brutalism-in-web-design-bold-aesthetic-or-just-bad-ux",
    title: "Brutalism in Web Design: Bold Aesthetic or Just Bad UX?",
    date: "Oct 10, 2024", author: "George Stern", authorRole: "Client Success Manager", category: "UX Design",
    readTime: "4 min read", coverImage: "/about-thumb-3.png",
    excerpt: "Brutalism in web design breaks the rules of traditional aesthetics. Discover when to use bold raw designs for maximum impact.",
    content: "<h2>Raw Expression vs Usability</h2><p>Brutalism breaks conventional web rules with high-contrast outlines, stark typography, and unpolished shapes. When applied purposefully, it creates an unforgettable brand identity.</p>" },
  { slug: "why-custom-illustrations-make-brands-more-memorable",
    title: "Why Custom Illustrations Make Brands Unforgettable",
    date: "Sep 05, 2024", author: "Lauren Thompson", authorRole: "Team Lead", category: "Branding",
    readTime: "5 min read", coverImage: "/about-thumb-4.png",
    excerpt: "Ditch generic stock photography. Custom 3D renders and bespoke artwork elevate brand narrative and audience trust.",
    content: "<h2>Originality in an AI-Generated World</h2><p>As generic stock assets proliferate, custom illustrations and custom 3D renders serve as authentic signatures of brand craftsmanship.</p>" },
];

const team = [
  { slug: "lauren-thompson", name: "Lauren Thompson", role: "Team Lead & Creative Strategist",
    tagline: "Architecting Digital Vision & Cross-Functional Alignment", photo: "/team-lauren.png",
    bio: "Lead strategist with exceptional vision to create seamless digital products and guide cross-functional alignment.",
    overview: "Lauren leads product strategy, operational execution, and visual direction at QuolyTech® Studio. With over 8 years of experience building enterprise web portals and digital brand identities, she bridges technical design rigor with high-impact business outcomes.",
    experience: "8+ Years", industry: "Digital Products & SaaS Architecture",
    specialization: "Brand Strategy, Product Roadmap, UI/UX Systems", location: "Tiranë, Albania",
    connectUrl: "https://linkedin.com",
    philosophy: "Design is not just what it looks like; it is how it works and scales. We fuse Swiss grid principles with cutting-edge front-end engineering to solve real business challenges.",
    approach: "Fostering tight alignment between engineering teams, brand designers, and client stakeholders to deliver scalable software engines that drive revenue.",
    stats: [{ label: "Enterprise Projects Lead", value: "35+" }, { label: "Client Satisfaction Rate", value: "99.4%" }, { label: "Design Industry Awards", value: "12" }],
    gallery: ["/team-lauren.png", "/about-thumb-1.png", "/studio-team-collab.png"] },
  { slug: "michael-wilson", name: "Michael Wilson", role: "Full Stack Developer",
    tagline: "Engineering High-Performance Web Applications & Cloud Systems", photo: "/team-michael.png",
    bio: "Full-stack architect building robust web systems, high-performance APIs, and scalable infrastructure engines.",
    overview: "Michael is the principal software architect at QuolyTech®. He specializes in high-speed React applications, serverless backend microservices, WebGL real-time telemetry, and optimizing site performance to sub-second load times.",
    experience: "6+ Years", industry: "Software Engineering & Cloud Architecture",
    specialization: "React / Vite, Node.js, WebGL Shaders, WebSockets", location: "Tiranë, Albania",
    connectUrl: "https://github.com",
    philosophy: "Speed is the ultimate feature. Sub-second load times and silky 60fps micro-animations instill confidence in users and multiply conversion rates.",
    approach: "Writing modular, self-documenting code built around strict typing, automated testing pipelines, and lightweight dependency footprints.",
    stats: [{ label: "Core Applications Built", value: "40+" }, { label: "Average Page Speed Rating", value: "99/100" }, { label: "Global Users Served", value: "2.5M+" }],
    gallery: ["/team-michael.png", "/studio-hero-laptop.png", "/about-thumb-2.png"] },
  { slug: "sarah-johnson", name: "Sarah Johnson", role: "Creative Director",
    tagline: "Crafting Bold Visual Aesthetics & Memorable Brand Narratives", photo: "/team-sarah.png",
    bio: "Creative director crafting bold visual aesthetics, memorable brand identities, and high-impact digital storytelling.",
    overview: "Sarah oversees visual design systems, typographic guidelines, and interactive brand expressions at QuolyTech®. Her work transforms complex brand positioning into unforgettable digital experiences.",
    experience: "7+ Years", industry: "Brand Strategy & Visual Design",
    specialization: "Visual Identity, Typography Tokens, Motion Design", location: "Tiranë, Albania",
    connectUrl: "https://dribbble.com",
    philosophy: "A brand signature is an emotional touchpoint. High-contrast typography and intentional whitespace communicate authority far better than clutter.",
    approach: "Synthesizing research, client values, and Swiss modernist typography to construct design systems that stand out across web and mobile platforms.",
    stats: [{ label: "Brand Identities Created", value: "28+" }, { label: "Awwwards Nominations", value: "8" }, { label: "Design System Modules", value: "500+" }],
    gallery: ["/team-sarah.png", "/about-thumb-3.png", "/studio-team-group.png"] },
  { slug: "christopher-miller", name: "Christopher Miller", role: "UX/UI Designer",
    tagline: "Designing Intuitive User Workflows & Micro-Interactions", photo: "/team-christopher.png",
    bio: "UX/UI designer focused on intuitive interfaces, fluid micro-interactions, and keeping every user workflow on track.",
    overview: "Christopher focuses on human-centered interface architecture and micro-interaction polish. He conducts user research, wireframing, interactive prototyping, and mobile component optimization.",
    experience: "5+ Years", industry: "User Experience & Mobile Design",
    specialization: "UX Architecture, Micro-Animations, Mobile Systems", location: "Tiranë, Albania",
    connectUrl: "https://figma.com",
    philosophy: "Great design feels completely natural. When a workflow is intuitive, users achieve their goals effortlessly without friction.",
    approach: "Combining thorough user research with iterative rapid prototyping to create accessible, fluid user journeys.",
    stats: [{ label: "User Flows Engineered", value: "65+" }, { label: "Usability Score Increase", value: "+45%" }, { label: "Mobile Component Kits", value: "15" }],
    gallery: ["/team-christopher.png", "/about-thumb-4.png", "/case-study-portrait.png"] },
  { slug: "george-stern", name: "George Stern", role: "Client Success Manager",
    tagline: "Bridging Creative Vision & Tangible Client ROI", photo: "/lauren.png",
    bio: "Bridging creative vision and client growth. Focused on delivering high ROI digital strategies.",
    overview: "George manages client relationships, strategy alignment, and project onboarding at QuolyTech®. He ensures that every project delivers measurable growth, higher conversions, and seamless communication.",
    experience: "6+ Years", industry: "Digital Growth & Client Operations",
    specialization: "Growth Marketing, Client Leadership, Conversion Optimization", location: "Tiranë, Albania",
    connectUrl: "https://linkedin.com",
    philosophy: "Client success is our ultimate KPI. Transparent communication and data-backed growth strategies turn initial projects into long-term partnerships.",
    approach: "Translating complex client business requirements into clear project scopes and actionable development milestones.",
    stats: [{ label: "Client Accounts Managed", value: "50+" }, { label: "Average Client Retention", value: "98%" }, { label: "ROI Delivered to Clients", value: "3.2x" }],
    gallery: ["/lauren.png", "/why-choose-us-portrait.png"] },
];

const services = [
  { title: "Web Design and Development", image: "/service-1.png",
    subtitle: "Custom websites crafted for scale, high conversions, and seamless visual storytelling.",
    deliverables: ["Custom React / Next.js / Webflow Architecture", "Responsive & Mobile-First Interface Systems", "Interactive 3D Elements & Micro-Animations", "CMS Integration & Dynamic Content Engines"] },
  { title: "Social Media Marketing", image: "/service-2.png",
    subtitle: "Strategic creative campaigns, video assets, and audience engagement strategies.",
    deliverables: ["Content Strategy & Brand Voice Guidelines", "High-Impact Motion Graphics & Video Editing", "Paid Campaign Creative Systems", "Community & Growth Analytics"] },
  { title: "SEO Optimization", image: "/service-3.png",
    subtitle: "Data-driven organic search acquisition engines engineered to rank top for high-intent keywords.",
    deliverables: ["Technical Core Web Vitals Optimization", "Programmatic Content Strategy & Siloing", "On-Page & Schema Markup Implementation", "Authority Building & Competitor Analysis"] },
  { title: "Branding and Identity", image: "/service-4.png",
    subtitle: "Distinctive logo systems, typography foundations, and brand guidelines for industry leaders.",
    deliverables: ["Logo System & Graphic Marks", "Typography Scale & Color Tokens", "Brand Guidelines & Asset Kits", "Marketing Deck & Collateral Design"] },
];

const faqs = [
  { question: "What services do you offer?", answer: "We specialize in Web Design & Development, Branding & Identity, SEO Optimization, and Social Media Growth Campaigns tailored for tech companies and modern brands." },
  { question: "How long does a project usually take?", answer: "A standard branding or web design project typically ranges from 4 to 8 weeks depending on scope, custom interactions, and asset requirements." },
  { question: "Do you offer ongoing retainer services?", answer: "Yes! We partner with clients on a monthly subscription model for continuous design support, web maintenance, performance tuning, and new feature rollouts." },
  { question: "What technology stack do you use?", answer: "We build using React, Vite, modern CSS modules, and custom WebGL shaders, ensuring lightning-fast load times and seamless responsiveness across all screen sizes." },
  { question: "How do we get started on a project?", answer: "Reach out via our Contact page or click 'Let's talk' on our site. We'll schedule a discovery call within 24 hours to align on goals, scope, and timeline." },
];

const testimonials = [
  { quote: "QuolyTech Studio completely overhauled our brand and web application. Their attention to design details, performance speed, and typography surpassed every expectation. Conversion rate jumped by 140% post-launch.",
    name: "George Stern", role: "VP of Product", company: "Boltshift Inc.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
  { quote: "Working with QuolyTech felt like working with a high-end architectural firm for the web. Their dark-mode visual system gave us immediate credibility with tier-1 venture investors.",
    name: "Elena Rostova", role: "Co-Founder & CEO", company: "Ephemeral Labs",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
  { quote: "The speed and polish of QuolyTech's web apps are unmatched. They delivered a complex real-time dashboard 2 weeks ahead of our series B announcement schedule.",
    name: "Marcus Vance", role: "Head of Technology", company: "Powersurge Energy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
];

const termsSections = [
  ["01 · Executive Overview & Agreement to Terms", "These Terms of Service (\"Terms\") constitute a legally binding agreement between you (\"Client\", \"User\", or \"you\") and QuolyTech® Studio (\"QuolyTech\", \"Company\", \"we\", \"us\", or \"our\"), headquartered in Tiranë, Albania (support@quolytech.com).\n\nBy accessing our website (quolytech.com), commissioning digital products, subscribing to monthly retainer services, or engaging our software development and AI engineering capabilities, you acknowledge that you have read, understood, and agree to be bound by these Terms."],
  ["02 · Service Portfolio & Delivery Model (CREATE. HELP. GROW.)", "QuolyTech operates around three foundational service pillars:\n• CREATE: Custom Web Design & Development, Mobile Applications (iOS, Android, Cross-platform), Brand Identity, and UI/UX Systems.\n• HELP: Custom Enterprise Software, Autonomous AI Agents, Customer Support Chatbots, Code Generation Tools, and Workflow Automation.\n• GROW: Data-Driven Digital Marketing, Paid Ad Campaign Strategy, SEO Optimization, and Conversion Rate Engine Tuning.\n\nAll project engagements follow our structured 7-step delivery methodology: (01 Discover → 02 Plan → 03 Design → 04 Build → 05 Test → 06 Launch → 07 Grow). Both parties commit to timely communication and milestone sign-offs."],
  ["03 · Intellectual Property Rights & Deliverable Ownership", "Upon 100% full payment of all contracted invoice fees, QuolyTech assigns to the Client exclusive copyright ownership of final bespoke design assets, frontend code, and custom software created specifically for the project.\n\nQuolyTech retains ownership of pre-existing core software libraries, general UI frameworks, reusable code modules, and developer tooling utilized in building the solution. Unless an explicit Non-Disclosure Agreement (NDA) is executed prior to project kickoff, QuolyTech reserves the right to display completed project screenshots, case study metrics, and visual demonstrations within our public portfolio."],
  ["04 · Website Packages, Subscriptions & Payment Terms", "QuolyTech offers fixed-scope website packages (Starter, Business, Pro, Enterprise) and custom software quotes:\n• Milestone Payments: Project fees are billed according to agreed deposit and milestone release schedules (e.g., 50% deposit, 50% upon final QA deployment).\n• Monthly Retainers & Subscriptions: Recurring maintenance, AI agent hosting, and marketing retainers are billed in advance on a monthly basis.\n• Payment Due Dates: Invoices are payable within 7 business days of issuance. Late payments exceeding 14 calendar days may incur temporary suspension of active development sprints or hosted staging instances."],
  ["05 · AI & Autonomous Agent Technology Disclaimer", "QuolyTech builds, integrates, and fine-tunes artificial intelligence agents and automated content workflows using leading AI models (including OpenAI, Google Gemini, and custom frameworks).\n\nWhile we implement rigorous QA testing and content guardrails, AI solutions generate probabilistic outputs. Clients are responsible for reviewing automated customer support responses and critical business workflows. QuolyTech is not liable for indirect losses resulting from third-party AI API service downtime or model outputs."],
  ["06 · Client Obligations & Acceptable Use", "Clients agree to provide required digital assets, branding assets, copy, and credential access in a timely manner. Clients guarantee that all provided content (text, graphics, trademarks) does not violate third-party intellectual property rights.\n\nClients shall not use QuolyTech software, websites, or AI agents for illegal activities, spamming, unauthorized web scraping, distribution of malicious software, or attempt reverse engineering of studio technology."],
  ["07 · Limitation of Liability & SLA Guarantees", "QuolyTech strives for maximum operational excellence, aiming for 99.9% uptime on managed client infrastructure. However, services are provided on an \"as-is\" and \"as-available\" basis without implied warranties of merchantability.\n\nTo the maximum extent permitted by law, QuolyTech's total aggregate liability for any claims arising from these Terms or project execution shall not exceed the total amount paid by the Client to QuolyTech in the preceding three (3) months."],
  ["08 · Termination, Sprints & Dispute Resolution", "Either party may terminate a project contract with 14 calendar days' written notice. Upon termination, the Client is responsible for payment for all work completed up to the termination date.\n\nThese Terms are governed by and construed in accordance with the laws of Albania. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in Tiranë, Albania."],
  ["09 · Contact Information & Inquiries", "For legal notices, contract inquiries, or questions regarding these Terms of Service, please contact our legal and support desk:\n\nQuolyTech® Studio\nEmail: support@quolytech.com\nWebsite: quolytech.com\nLocation: Tiranë, Albania"],
];

const privacySections = [
  ["01 · Information We Collect", "QuolyTech® Studio (\"QuolyTech\", \"we\", \"us\", or \"our\"), based in Tiranë, Albania (support@quolytech.com), respects your privacy and is committed to protecting your personal data. We collect data through three primary mechanisms:\n\n1. Voluntarily Provided Data: Name, work email address, phone number, company name, project specifications, and payment details when you submit inquiry forms, book a discovery call, or purchase digital packages.\n2. Technical & Device Data: IP addresses, browser fingerprint types, operating system details, time zones, and referral URLs gathered automatically via lightweight, privacy-preserving website analytics.\n3. AI Chatbot Interactions: Text prompts, service inquiries, and project preferences submitted to QuolyBot during chat sessions to provide real-time responses and improve our customer care workflows."],
  ["02 · How We Use Your Information", "We process collected personal data for specific, transparent, and legitimate business purposes:\n• Delivering Web, Mobile, AI, and Software Services: Executing contracts, deploying web platforms, configuring AI chatbots, and managing software development sprints.\n• Client Support & Communication: Responding to project inquiries within 24 hours, sending milestone updates, and providing technical maintenance.\n• Studio Journal & Newsletters: Delivering curated digital growth insights, AI tech developments, and company updates (only with explicit opt-in consent).\n• Security & Abuse Prevention: Protecting our web infrastructure against DDoS attacks, unauthorized scraping, or malicious API exploitation."],
  ["03 · Data Protection, Encryption & Zero Data Sale Guarantee", "QuolyTech implements industry-standard administrative, physical, and technological safeguards to prevent unauthorized access, loss, or disclosure of client data:\n• Encryption: All website traffic and API communications are encrypted in transit via Transport Layer Security (TLS 1.3/SSL) and at rest using AES-256 standards.\n• Zero Data Broker Sales: QuolyTech NEVER sells, rents, monetizes, or trades client personal information or AI conversation logs to third-party data brokers or marketing lists."],
  ["04 · Third-Party Service Providers & Cloud Hosting", "To deliver high-performance digital products, we collaborate with trusted third-party infrastructure providers subject to strict confidentiality and data protection agreements:\n• Cloud Infrastructure & Hosting: AWS, Vercel, and Cloudflare for global content delivery networks (CDNs).\n• Artificial Intelligence Engines: Google Cloud Gemini and OpenAI APIs for processing AI assistant query interactions under enterprise non-training privacy tiers.\n• Analytics & Communications: Privacy-focused analytics engines and secure email routing platforms."],
  ["05 · Cookies & Local Storage Technologies", "Our website utilizes essential cookies and browser local storage strictly required for core functionality, such as maintaining user session preferences, modal states, and security tokens.\n\nYou can manage or disable cookie preferences directly through your browser settings. Note that disabling essential cookies may impact certain interactive site features or preloader animations."],
  ["06 · Your Data Rights & GDPR Compliance", "Under applicable European General Data Protection Regulation (GDPR) and international privacy frameworks, you hold full authority over your personal information:\n• Right to Access: Request copies of all personal data held by QuolyTech.\n• Right to Rectification: Correct inaccurate or incomplete contact records.\n• Right to Erasure (\"Right to be Forgotten\"): Request permanent deletion of your contact records and project files, subject to statutory tax retention obligations.\n• Right to Opt-Out: Unsubscribe instantly from studio marketing communications via footer link or email request."],
  ["07 · Data Retention & International Storage", "We retain client contact records and project documentation for as long as necessary to fulfill the operational purposes outlined in this policy or comply with legal, tax, and accounting standards.\n\nData is securely processed and hosted within European Union (EU) data centers and global cloud instances governed by standard contractual clauses (SCCs)."],
  ["08 · Protection of Minors", "QuolyTech® Studio services, products, and website platforms are tailored exclusively for commercial business entities, professionals, and adults. We do not knowingly solicit or collect personal data from individuals under 16 years of age."],
  ["09 · Data Protection Contact & Inquiries", "If you wish to exercise your data privacy rights, request data deletion, or ask questions regarding our privacy practices, please reach out directly to our Data Protection Officer:\n\nQuolyTech® Studio\nAttn: Data Privacy Officer\nEmail: support@quolytech.com\nWebsite: quolytech.com\nLocation: Tiranë, Albania"],
];

/* ============================================================ HTML HELPERS */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const para = (s) => s.split("\n\n").map((p) => `<p>${esc(p).replace(/\n/g, "<br/>")}</p>`).join("");
const legalHtml = (sections) =>
  sections.map(([title, body]) => `<h2>${esc(title)}</h2>${para(body)}`).join("");

/* ============================================================ PAGE BUILDERS */

const heroBlock = (p) => ({ type: "hero", props: {
  eyebrow: "", heading: "", subheading: "", primaryCtaLabel: "", primaryCtaHref: "",
  secondaryCtaLabel: "", secondaryCtaHref: "", backgroundImage: "", theme: "dark", align: "left", ...p } });
const ctaBlock = (p = {}) => ({ type: "cta", props: {
  heading: "Have a project in mind?", subheading: "Reach out to us, and we'll discuss the best way to move forward.",
  ctaLabel: "Get in touch", ctaHref: "/contact", theme: "dark", ...p } });

const pages = [];

/* ---------- HOME ---------- */
pages.push({
  slug: "home", order: 0,
  title: "QuolyTech® Studio — Create. Help. Grow.",
  description: "Digital product design and software engineering agency in Tiranë, Albania. No generic websites. No empty marketing promises. Just tools and strategies that help your business grow.",
  sections: [
    heroBlock({
      eyebrow: "QUOLYTECH® STUDIO — TIRANË, ALBANIA",
      heading: "QuolyTech® Studio",
      subheading: "No generic websites. No empty marketing promises. Just tools and strategies that help your business grow and your brand shine.",
      primaryCtaLabel: "Let's talk", primaryCtaHref: "/contact",
      secondaryCtaLabel: "See our work", secondaryCtaHref: "/projects",
      backgroundImage: img("/hero-texture.png"),
    }),
    { type: "logos", props: { heading: "Our clients (2016-25©)", items: [
      { name: "Boltshift", logo: "" }, { name: "Warpspeed", logo: "" }, { name: "Ephemeral", logo: "" },
      { name: "Mastermail", logo: "" }, { name: "CloudWatch", logo: "" }, { name: "Powersurge", logo: "" } ] } },
    { type: "features", props: {
      eyebrow: "CURATED PORTFOLIO", heading: "Projects.", subheading: "Six enterprise case studies across SaaS, Web3, clean energy, martech, AI, and cybersecurity.",
      columns: "3", theme: "light",
      items: projects.map((p) => ({ title: `${p.title} — ${p.category} (${p.year})`, description: p.description, image: img(p.heroImage) })) } },
    { type: "stats", props: { heading: "No fluff, just results.", theme: "dark", items: [
      { value: "50+", label: "Successful projects completed" },
      { value: "95%", label: "Customer satisfaction rate" },
      { value: "3m+", label: "Ad impressions managed" },
      { value: "50k+", label: "Monthly visitors driven through SEO" } ] } },
    { type: "features", props: {
      eyebrow: "WHAT WE DO", heading: "Services", subheading: "Thoughtful design and tools that make your work easier — project after project.",
      columns: "2", theme: "light",
      items: services.map((s) => ({ title: s.title, description: `${s.subtitle} Deliverables: ${s.deliverables.join(" · ")}`, image: img(s.image) })) } },
    { type: "features", props: {
      eyebrow: "ABOUT US — QUOLYTECH®", heading: "CREATE. HELP. GROW.",
      subheading: "See how QuolyTech® combines development, design, AI automation, and marketing into one connected digital journey. Digital Products • AI • Growth.",
      columns: "4", theme: "light",
      items: [
        { title: "CREATE — Modern web & mobile products", description: "", image: img("/about-thumb-1.png") },
        { title: "HELP — AI agents & custom automation", description: "", image: img("/about-thumb-2.png") },
        { title: "GROW — Data-driven digital marketing", description: "", image: img("/about-thumb-3.png") },
        { title: "500+ projects completed with 99.9% satisfaction", description: "", image: img("/about-thumb-4.png") } ] } },
    { type: "testimonials", props: { eyebrow: "CLIENT PROOF", heading: "What partners say", items: testimonials } },
    { type: "pricing", props: {
      eyebrow: "PRICING", heading: "Engagement models", subheading: "Per-project builds or an ongoing monthly partnership. Motion & campaign add-on available (+$1,490).",
      plans: [
        { name: "Project", price: "$2,490", period: "/project",
          description: "A complete design and build engagement with a fixed scope.",
          features: "Custom design system\nReact / Vite implementation\nSEO foundations\n4–8 week delivery", ctaLabel: "Start a project", featured: false },
        { name: "Monthly partner", price: "$4,500", period: "/month",
          description: "Continuous design support, maintenance, and new feature rollouts.",
          features: "Everything in Project\nOngoing performance tuning\nPriority feature development\nMotion & campaign add-on (+$1,490)", ctaLabel: "Become a partner", featured: true } ] } },
    { type: "team", props: { eyebrow: "THE FACES BEHIND THE PROJECTS", heading: "The team",
      members: team.map((m) => ({ name: m.name, role: m.role, photo: img(m.photo), href: `/team/${m.slug}` })) } },
    { type: "faq", props: { eyebrow: "FAQ", heading: "Common questions", items: faqs } },
    { type: "features", props: {
      eyebrow: "EDITORIAL", heading: "Insights.", subheading: "Design, development, and growth notes from the studio journal.",
      columns: "3", theme: "light",
      items: blogPosts.slice(0, 3).map((b) => ({ title: b.title, description: `${b.excerpt} (${b.date} · ${b.readTime} · ${b.author})`, image: img(b.coverImage) })) } },
    ctaBlock({ heading: "Let's talk." }),
  ],
});

/* ---------- STUDIO ---------- */
pages.push({
  slug: "studio", order: 1,
  title: "Studio. — QuolyTech®",
  description: "QuolyTech® is built around a simple promise: CREATE. HELP. GROW. Software development, UI/UX design, AI, and digital marketing under one roof.",
  sections: [
    heroBlock({
      eyebrow: "ABOUT US", heading: "Studio.",
      subheading: "QuolyTech® is built around a simple promise: CREATE. HELP. GROW. We combine software development, UI/UX design, artificial intelligence, and digital marketing to build modern digital products that solve real problems and create sustainable growth. ★★★★★ 5.0 rating · 500+ projects completed (99.9% satisfaction).",
      primaryCtaLabel: "Portfolio", primaryCtaHref: "/projects",
      secondaryCtaLabel: "Get in touch", secondaryCtaHref: "/contact",
      backgroundImage: img("/studio-hero-laptop.png"),
    }),
    { type: "stats", props: { heading: "", theme: "light", items: [
      { value: "3m+", label: "Ad impressions managed" },
      { value: "500+", label: "Projects completed" },
      { value: "99.9%", label: "Client satisfaction rate" },
      { value: "50k+", label: "Monthly visitors driven through SEO" } ] } },
    { type: "custom", props: { theme: "light", maxWidth: 860, html:
      "<h2>CREATE. HELP. GROW. — One partner for your entire digital ecosystem.</h2>" +
      "<p>Our vision is to make technology simpler, faster, smarter, and more competitive: <strong>we combine Web Development, Mobile Apps, AI Agents, Custom Software, and Digital Marketing under one roof so businesses can avoid managing multiple disconnected suppliers.</strong></p>" +
      "<p>From discovery to design, development, launch, and AI integration, our objective is to create one connected digital journey that builds measurable business value.</p>" +
      "<h2>What else?</h2>" +
      "<p>We believe a successful digital product is more than an attractive interface — <strong>it should solve real business problems, automate repetitive work, provide a great user experience, and generate measurable revenue.</strong></p>" +
      "<p>Whether you need a modern web application, custom AI tools, mobile platform, or lead-generation marketing strategy, QuolyTech provides technology built to scale with your business.</p>" } },
    { type: "features", props: {
      eyebrow: "OUR ACHIEVEMENTS (2016-25©)", heading: "Awards.", subheading: "", columns: "2", theme: "light",
      items: [
        { title: "Best web design agency", description: "Web Excellence Awards — 2026", image: "" },
        { title: "Top digital marketing firm", description: "Clutch Top Agencies — 2024", image: "" },
        { title: "Best web design agency", description: "Awwwards Honorable Mention — 2024", image: "" },
        { title: "Top UI/UX Innovation", description: "CSS Design Awards — 2023", image: "" } ] } },
    { type: "logos", props: { heading: "Our clients (2016-25©)", items: [
      { name: "LOOM", logo: "" }, { name: "LOQO", logo: "" }, { name: "APEX", logo: "" },
      { name: "POWERSURGE", logo: "" }, { name: "CLOUDWATCH", logo: "" }, { name: "LOGOIPSUM", logo: "" } ] } },
    { type: "features", props: {
      eyebrow: "INSIDE THE STUDIO", heading: "Culture", subheading: "", columns: "2", theme: "light",
      items: [
        { title: "Meet the team (/2024)", description: "The people behind the projects.", image: img("/studio-team-group.png") },
        { title: "How work gets done (/2026)", description: "Collaboration, crits, and shipping.", image: img("/studio-team-collab.png") } ] } },
    ctaBlock({ heading: "Let's talk.", subheading: "One partner for your entire digital ecosystem." }),
  ],
});

/* ---------- PROJECTS HUB ---------- */
pages.push({
  slug: "projects", order: 2,
  title: "Projects. — QuolyTech®",
  description: "Explore six enterprise case studies across SaaS, Web3, clean energy, marketing tech, AI, and cybersecurity.",
  sections: [
    heroBlock({
      eyebrow: "CURATED PORTFOLIO (2016-25©)", heading: "Projects.",
      subheading: "Six enterprise case studies — filterable by Web Design, Branding, Development, and SEO & Growth.",
      primaryCtaLabel: "Start a project", primaryCtaHref: "/contact",
    }),
    { type: "features", props: {
      eyebrow: "", heading: "", subheading: "", columns: "3", theme: "light",
      items: projects.map((p) => ({ title: `${p.title} — ${p.category} (${p.year})`, description: `${p.tagline}. ${p.description}`, image: img(p.heroImage) })) } },
    ctaBlock({ heading: "Have a similar project?" }),
  ],
});

/* ---------- PROJECT DETAIL ×6 ---------- */
projects.forEach((p, i) => {
  pages.push({
    slug: p.slug, order: 10 + i,
    title: `${p.title} — Case Study — QuolyTech®`,
    description: p.description,
    sections: [
      heroBlock({
        eyebrow: `${p.category.toUpperCase()} · ${p.industry.toUpperCase()} · ${p.year}`,
        heading: p.title,
        subheading: `${p.tagline} — ${p.description}`,
        primaryCtaLabel: "Visit live site", primaryCtaHref: p.liveUrl,
        secondaryCtaLabel: "All projects", secondaryCtaHref: "/projects",
        backgroundImage: img(p.heroImage),
      }),
      { type: "custom", props: { theme: "light", maxWidth: 860, html:
        `<h2>Overview</h2><p>${esc(p.overview)}</p>` +
        `<h2>The Challenge</h2><p>${esc(p.challenge)}</p>` +
        `<h2>Our Solution</h2><p>${esc(p.solution)}</p>` +
        `<h2>Results</h2><ul>${p.results.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` +
        `<h3>Project data</h3><ul>` +
        `<li><strong>Client:</strong> ${esc(p.client)}</li>` +
        `<li><strong>Industry:</strong> ${esc(p.industry)}</li>` +
        `<li><strong>Scope:</strong> ${esc(p.scope)}</li>` +
        `<li><strong>Timeline:</strong> ${esc(p.timeline)}</li>` +
        `<li><strong>Live URL:</strong> <a href="${p.liveUrl}">${p.liveUrl}</a></li></ul>` } },
      { type: "features", props: { eyebrow: "GALLERY", heading: "", subheading: "", columns: String(Math.min(p.gallery.length, 3)), theme: "light",
        items: p.gallery.map((g, gi) => ({ title: `${p.title} — 0${gi + 1}`, description: "", image: img(g) })) } },
      ctaBlock({ heading: "Want results like these?" }),
    ],
  });
});

/* ---------- BLOG HUB ---------- */
pages.push({
  slug: "blog", order: 3,
  title: "Insights. — QuolyTech® Journal",
  description: "Design, development, branding, UX, and typography insights from the QuolyTech Studio journal.",
  sections: [
    heroBlock({
      eyebrow: "EDITORIAL JOURNAL", heading: "Insights.",
      subheading: "Design, development, branding, UX, and typography — categorized notes from the QuolyTech team.",
      primaryCtaLabel: "Get in touch", primaryCtaHref: "/contact",
    }),
    { type: "features", props: {
      eyebrow: "", heading: "", subheading: "", columns: "3", theme: "light",
      items: blogPosts.map((b) => ({ title: b.title, description: `${b.excerpt} (${b.category} · ${b.date} · ${b.readTime} · by ${b.author})`, image: img(b.coverImage) })) } },
    ctaBlock({ heading: "Want insights applied to your product?" }),
  ],
});

/* ---------- BLOG POSTS ×7 ---------- */
blogPosts.forEach((b, i) => {
  pages.push({
    slug: b.slug, order: 20 + i,
    title: `${b.title} — QuolyTech® Insights`,
    description: b.excerpt,
    sections: [
      heroBlock({
        eyebrow: `${b.category.toUpperCase()} · ${b.date.toUpperCase()} · ${b.readTime.toUpperCase()}`,
        heading: b.title, subheading: b.excerpt,
        primaryCtaLabel: "All insights", primaryCtaHref: "/blog",
        backgroundImage: img(b.coverImage),
      }),
      { type: "custom", props: { theme: "light", maxWidth: 820, html:
        b.content + `<p><em>Written by ${esc(b.author)}, ${esc(b.authorRole)} at QuolyTech® Studio.</em></p>` } },
      ctaBlock({ heading: "Enjoyed this article?", subheading: "Let's apply it to your brand.", ctaLabel: "Start a project" }),
    ],
  });
});

/* ---------- TEAM MEMBERS ×5 ---------- */
team.forEach((m, i) => {
  const others = team.filter((t) => t.slug !== m.slug);
  pages.push({
    slug: m.slug, order: 30 + i,
    title: `${m.name} — ${m.role} — QuolyTech®`,
    description: m.bio,
    sections: [
      heroBlock({
        eyebrow: `${m.role.toUpperCase()} · ${m.location.toUpperCase()}`,
        heading: m.name,
        subheading: `${m.tagline} — ${m.bio}`,
        primaryCtaLabel: "Connect", primaryCtaHref: m.connectUrl,
        secondaryCtaLabel: "Meet the team", secondaryCtaHref: "/",
      }),
      { type: "custom", props: { theme: "light", maxWidth: 860, html:
        `<h2>Overview</h2><p>${esc(m.overview)}</p>` +
        `<h2>Philosophy</h2><p>${esc(m.philosophy)}</p>` +
        `<h2>Approach</h2><p>${esc(m.approach)}</p>` +
        `<h3>Profile</h3><ul>` +
        `<li><strong>Experience:</strong> ${esc(m.experience)}</li>` +
        `<li><strong>Industry:</strong> ${esc(m.industry)}</li>` +
        `<li><strong>Specialization:</strong> ${esc(m.specialization)}</li>` +
        `<li><strong>Location:</strong> ${esc(m.location)}</li></ul>` } },
      { type: "stats", props: { heading: "", theme: "dark", items: m.stats.map((s) => ({ value: s.value, label: s.label })) } },
      { type: "features", props: { eyebrow: "GALLERY", heading: "", subheading: "", columns: String(Math.min(m.gallery.length, 3)), theme: "light",
        items: m.gallery.map((g, gi) => ({ title: `${m.name.split(" ")[0]} — 0${gi + 1}`, description: "", image: img(g) })) } },
      { type: "team", props: { eyebrow: "MORE OF THE TEAM", heading: "Work with all of us",
        members: others.map((o) => ({ name: o.name, role: o.role, photo: img(o.photo), href: `/team/${o.slug}` })) } },
      ctaBlock({ heading: `Work with ${m.name.split(" ")[0]}` }),
    ],
  });
});

/* ---------- CONTACT ---------- */
pages.push({
  slug: "contact", order: 4,
  title: "Get in touch. — QuolyTech®",
  description: "Have a project in mind? Reach out to us, and we'll discuss the best way to move forward. Tiranë, Albania — support@quolytech.com — +355 68 405 5007.",
  sections: [
    heroBlock({
      eyebrow: "CONTACT", heading: "Get in touch.",
      subheading: "Have a project in mind? Reach out to us, and we'll discuss the best way to move forward. We reply within 24 hours.",
      primaryCtaLabel: "support@quolytech.com", primaryCtaHref: "mailto:support@quolytech.com",
      secondaryCtaLabel: "+355 68 405 5007", secondaryCtaHref: "tel:+355684055007",
    }),
    { type: "custom", props: { theme: "light", maxWidth: 820, html:
      "<h2>Direct details</h2><p><strong>QuolyTech® Studio</strong><br/>Tiranë, Albania<br/>Email: <a href=\"mailto:support@quolytech.com\">support@quolytech.com</a><br/>Phone: +355 68 405 5007</p>" +
      "<p>The consultation form collects your name, email, and a project message — your point of contact is <strong>Lauren Thompson, Team Lead</strong>.</p>" } },
    { type: "faq", props: { eyebrow: "BEFORE YOU WRITE", heading: "Common questions", items: faqs } },
  ],
});

/* ---------- TERMS ---------- */
pages.push({
  slug: "terms", order: 5,
  title: "Terms of Service. — QuolyTech®",
  description: "Official terms governing project engagements, software deliverables, website packages, AI agent technologies, and client services provided by QuolyTech® Studio.",
  sections: [
    heroBlock({
      eyebrow: "LEGAL & COMPLIANCE (2016-26©)", heading: "Terms of Service.",
      subheading: "Official terms governing project engagements, software deliverables, website packages, AI agent technologies, and client services provided by QuolyTech® Studio.",
    }),
    { type: "custom", props: { theme: "light", maxWidth: 860, html: legalHtml(termsSections) } },
    ctaBlock({ heading: "Questions about these terms?", ctaLabel: "Contact legal & support" }),
  ],
});

/* ---------- PRIVACY ---------- */
pages.push({
  slug: "privacy", order: 6,
  title: "Privacy Policy. — QuolyTech®",
  description: "How QuolyTech® Studio collects, uses, protects, and respects your personal data — GDPR rights, cookies, retention, and contact details.",
  sections: [
    heroBlock({
      eyebrow: "LEGAL & COMPLIANCE (2016-26©)", heading: "Privacy Policy.",
      subheading: "How QuolyTech® Studio collects, uses, protects, and respects your personal data — including your GDPR rights and our zero data sale guarantee.",
    }),
    { type: "custom", props: { theme: "light", maxWidth: 860, html: legalHtml(privacySections) } },
    ctaBlock({ heading: "Questions about your data?", ctaLabel: "Contact our privacy desk" }),
  ],
});

/* ================================================================== WRITE */

const q = {
  pageBySlug: db.prepare(`SELECT id FROM "Page" WHERE slug = ?`),
  deletePage: db.prepare(`DELETE FROM "Page" WHERE id = ?`),
  insertPage: db.prepare(
    `INSERT INTO "Page" (id, slug, title, description, ogTitle, ogDescription, ogImage,
                         template, status, "order", publishedSnapshot, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'default', 'PUBLISHED', ?, ?, ?, ?, ?)`
  ),
  insertSection: db.prepare(
    `INSERT INTO "Section" (id, pageId, type, props, "order", visible) VALUES (?, ?, ?, ?, ?, 1)`
  ),
  insertRevision: db.prepare(
    `INSERT INTO "Revision" (id, pageId, label, snapshot, authorId, createdAt) VALUES (?, ?, ?, ?, NULL, ?)`
  ),
};

let created = 0, replaced = 0;
for (const page of pages) {
  const now = Date.now();
  const existing = q.pageBySlug.get(page.slug);
  db.exec("BEGIN");
  try {
    if (existing) { q.deletePage.run(existing.id); replaced++; } else { created++; }
    const pageId = randomUUID();
    const sections = page.sections.map((s, i) => ({ id: randomUUID(), type: s.type, props: s.props, order: i }));
    const snapshot = {
      meta: { slug: page.slug, title: page.title, description: page.description,
              ogTitle: page.title, ogDescription: page.description, ogImage: "", template: "default" },
      sections: sections.map((s) => ({ id: s.id, type: s.type, props: s.props })),
    };
    q.insertPage.run(pageId, page.slug, page.title, page.description, page.title, page.description, "",
      page.order, JSON.stringify(snapshot), now, now, now);
    for (const s of sections) q.insertSection.run(s.id, pageId, s.type, JSON.stringify(s.props), s.order);
    q.insertRevision.run(randomUUID(), pageId, "Full site import", JSON.stringify({
      meta: snapshot.meta,
      sections: sections.map((s) => ({ id: s.id, type: s.type, props: s.props, visible: true })),
    }), now);
    db.exec("COMMIT");
    console.log(`  ✓ /${page.slug} (${sections.length} sections)${existing ? " [replaced]" : ""}`);
  } catch (err) {
    db.exec("ROLLBACK");
    console.error(`  ✗ /${page.slug}: ${err.message}`);
  }
}

const totals = db.prepare(
  `SELECT (SELECT COUNT(*) FROM "Page") AS pages,
          (SELECT COUNT(*) FROM "Page" WHERE status='PUBLISHED') AS published,
          (SELECT COUNT(*) FROM "Section") AS sections,
          (SELECT COUNT(*) FROM "MediaAsset") AS media`
).get();
console.log(`\nDone. new=${created} replaced=${replaced}`);
console.log(`DB totals: ${totals.pages} pages (${totals.published} published), ${totals.sections} sections, ${totals.media} media assets`);
