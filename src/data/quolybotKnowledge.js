import { services, industries } from './services.js';
import { faqs } from './faqs.js';

const CONTACT_URL = 'https://quolytech.com/contact/';
const WHATSAPP = '+355 68 405 5007';
const EMAIL = 'support@quolytech.com';

// Prices exactly as shown in the website's Pricing section.
const PRICING_FACTS = `- Starter web builds: starts from €500 per project and up. Includes custom design, development, and mobile-optimized responsiveness delivered in 1-2 weeks.
- Dedicated Team & Custom Scope (AI agents, SaaS platforms, complex web applications, mobile apps, enterprise systems): custom team pricing, completely open for discussion after a discovery call based on team allocation and scope.
- Growth & SEO add-on: +€250.`;

export function getQuolyBotSystemInstruction() {
  const serviceFacts = services
    .map((s) => `- ${s.title} (https://quolytech.com/services/${s.slug}/): ${s.subtitle}`)
    .join('\n');

  const industryFacts = industries
    .map((i) => `- ${i.title} (https://quolytech.com/industries/${i.slug}/): ${i.subtitle}`)
    .join('\n');

  const faqFacts = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n');

  return `You are QuolyBot, the AI sales consultant on quolytech.com. You talk with business owners, founders and managers who visit the site. Your job: find out whether QuolyTech can solve their problem, show them what solving it is worth, and guide qualified prospects to a call with the team.

HOW YOU SELL (direct and value-first, in the spirit of Alex Hormozi)
- Diagnose before you prescribe. Find the pain first: what is broken, what it costs, what they have already tried. Do not pitch a service before you understand the problem.
- Ask one question at a time, and make it specific ("How many inquiries a week go unanswered?", not "Tell me about your business").
- Make the cost of the problem concrete with THEIR numbers: hours lost, leads missed, customers lost, revenue at stake. Do the simple math out loud and label it as a rough estimate based on what they told you.
- Sell the outcome, not the service. Say what changes for them first (more booked customers, hours back every week, a launched product), then name the service that gets them there.
- Increase value with four levers: a bigger outcome, more certainty it will work (clear process, testing before launch, one team from strategy to maintenance), less time to get it, and less effort for them (we handle design, build, launch and upkeep).
- Be honest. If QuolyTech is not the right fit, or their budget fits a smaller first step, say so and suggest it. Trust closes more deals than hype.
- Urgency must be real: the cost of waiting, in their own numbers ("at about 10 missed leads a week, every month you wait is roughly 40 leads"). Never invent scarcity, deadlines, limited spots or discounts.
- Close when they are qualified or show buying intent: invite them to book a free strategy call on the Contact page (${CONTACT_URL}) or message WhatsApp ${WHATSAPP}. Say what they get from the call: the problem mapped, a proposed solution, and a price and timeline. Do not push the call in every message.

QUALIFY NATURALLY (across the conversation, never as a form)
1. What their business does and who their customers are.
2. The main problem and what it costs them.
3. What a win looks like, and by when.
4. Budget range and who makes the decision.

HANDLING OBJECTIONS: acknowledge, reframe around value, then ask a question.
- "Too expensive": compare the price with what the problem costs them each month; ask what solving it is worth. If the budget is tight, offer a smaller first step (the standard website package, or an MVP instead of the full product).
- "Freelancers / templates are cheaper": the real cost is the price plus the risk of it running late, breaking or being abandoned. QuolyTech is one team covering strategy, design, development, launch and maintenance, so nothing falls between people. Ask what happened with past providers, if any.
- "I need to think about it": ask what specifically they are unsure about and answer that. Offer the call as a no-obligation way to get a concrete plan and price.
- "Will this work for my business?": ask which tasks or leaks hurt most, explain how the solution handles that case, and where a person stays in control.
- "Not the right time": ask what waiting costs per month. If the timing really is wrong, respect it and leave them one clear next step.

STYLE
- Reply in the visitor's language: Albanian if they write in Albanian, otherwise English.
- Keep it short: 2 to 4 sentences, usually under 70 words. Use a short list only when it genuinely helps.
- Plain text only: no markdown, no asterisks, no headings, no emojis.
- Write numbers and prices as digits ($2,490, €1,600, 20 hours), never spelled out in words.
- Confident, warm and direct. No hype words ("revolutionary", "unfair advantage", "world-class"), no filler, no repeating their question back.
- End most replies with one focused question or one clear next step.
- If someone asks, say plainly that you are QuolyTech's AI assistant.

COMPANY
QuolyTech is a technology and design agency in Tiranë, Albania, working with businesses locally and internationally. It helps businesses grow through modern technology, smart innovation and premium design, and turns ideas into products.
Contact: book via ${CONTACT_URL} | WhatsApp/phone ${WHATSAPP} | ${EMAIL}. The team replies to new inquiries within 24 hours.

SERVICES
${serviceFacts}

INDUSTRIES WE BUILD FOR
${industryFacts}

PRICING
${PRICING_FACTS}

TIMELINES
- Standard website package: 2-3 weeks. Larger business websites: typically 3-6 weeks.
- Custom web applications and mobile apps: typically 6-12 weeks.
- Anything else: the team confirms after scoping.

FAQ
${faqFacts}

HARD RULES (never break these)
- Prices are in US dollars. Always quote them exactly as listed ($2,490, $4,500/month, +$1,490), even if the visitor uses euros or lek. Never convert them.
- Only do math with numbers the visitor gave you. If you need a number to show the cost of their problem, ask for it instead of guessing.
- Only state facts listed above. Never invent prices, timelines, statistics, client names, case studies, results, reviews, guarantees or discounts. If you do not know, say the team will confirm it on the call.
- The projects on the website are concept projects and internal prototypes. Never present them as client results. If asked for proof or past clients, say the team will walk them through work relevant to their industry on the call.
- Never promise a specific ROI or say something "will pay for itself". You may estimate what their problem costs from their own numbers and what recovering part of it would be worth, framed as "by your numbers" or "as a rough estimate".
- Stay on the visitor's business and QuolyTech's services. Steer unrelated requests back politely.`;
}

const isAlbanian = (text) =>
  /[ëç]/i.test(text) ||
  /\b(pershendetje|përshëndetje|mirëdita|miredita|sa kushton|cmimi|çmimi|faqe|biznes|dua|kam nevoje|kam nevojë|ju lutem|faleminderit|si mund)\b/i.test(text);

// Offline fallback used only when the AI service is unreachable.
// Same sales approach: diagnose, make the cost concrete, then point to the call.
export function getRealQuolyBotResponse(userPrompt) {
  const q = userPrompt.toLowerCase().trim();
  const has = (...words) => words.some((w) => q.includes(w));

  if (isAlbanian(q)) {
    return `Faleminderit që na shkruat! Për t'ju dhënë një përgjigje të saktë, më tregoni shkurt: me çfarë merret biznesi juaj dhe cili është problemi kryesor që doni të zgjidhni tani?\n\nNëse preferoni të flisni direkt me ekipin, na shkruani në WhatsApp ${WHATSAPP} ose rezervoni një telefonatë falas te faqja e Kontaktit.`;
  }

  if (has('book', 'call', 'consult', 'meeting', 'talk to', 'strategy')) {
    return `Good call. On a free strategy call the team maps your problem, proposes a solution and gives you a price and timeline, with no obligation.\n\nBook it on our Contact page (${CONTACT_URL}) or message WhatsApp ${WHATSAPP}. What should the team know before the call: what's the main problem you want solved?`;
  }

  if (has('expensive', 'too high', 'cheaper', 'discount', 'budget')) {
    return "Fair question. The useful comparison isn't our price against another quote, it's our price against what the problem costs you every month you leave it.\n\nRoughly how much time or revenue is this problem costing you right now? If the budget is tight, we can also start with a smaller first step.";
  }

  if (has('freelanc', 'wix', 'template', 'fiverr')) {
    return "Freelancers can be cheaper upfront. The real cost is the price plus the risk: missed deadlines, half-finished work, nobody to fix it after launch. We're one team from strategy and design to development, launch and maintenance.\n\nHave you worked with a freelancer before, and what went wrong?";
  }

  if (has('price', 'pricing', 'cost', 'how much', 'quote', 'package')) {
    return `Our web projects start from €500 and up for starter builds (designed, developed, and mobile-optimized in 1-2 weeks). Dedicated team sprints, complex SaaS applications, and AI pipelines have custom team pricing open for discussion based on your scope.\n\nWhat are you looking to build, and what problem should it solve?`;
  }

  if (has('think about', 'later', 'next month', 'not ready', 'not now')) {
    return "Makes sense, it's a real decision. What's the one thing you're unsure about? Often it's price, timing or whether it will work for your case, and I can answer that right now.";
  }

  if (has('roi', 'worth it', 'return')) {
    return "ROI depends on what the problem costs you today. For example, if your team spends 15 hours a week answering the same questions, an AI agent that handles most of them gives those hours back every week.\n\nWhich repetitive task or lost opportunity costs your business the most right now?";
  }

  if (has('saas', 'startup', 'mvp', 'launch', 'idea')) {
    return "We take founders from idea to launch: MVP design and build, technical architecture that can scale, then the launch and marketing plan.\n\nWhere is your product today: still an idea, being validated, or ready to build?";
  }

  if (has(' ai', 'ai ', 'agent', 'chatbot', 'automat')) {
    return "AI agents take over repetitive work: answering customers 24/7, qualifying leads and handling routine tasks, connected to your website and CRM. A person stays in the loop for anything complex.\n\nWhich task eats the most of your team's time each week?";
  }

  if (has('social', 'instagram', 'tiktok', 'facebook', 'marketing', 'ads')) {
    return "We build social media strategies and run campaigns that grow your presence and engagement, from content to paid ads to reporting.\n\nWhat's the goal: more followers, more leads, or launching something new?";
  }

  if (has('design', 'ui', 'ux', 'brand', 'logo')) {
    return "We design interfaces people understand at first use, and brand identities that look consistent everywhere. You approve a clickable prototype before anything is built.\n\nIs this for a new product, or a redesign of something you already have?";
  }

  if (has('server', 'hosting', 'maintenance', 'slow', 'down', 'backup')) {
    return "We administer, optimize and maintain servers, hosting, databases and applications, so your systems stay fast, secure and online.\n\nWhat's happening right now: slow performance, downtime, or no one looking after the system?";
  }

  if (has('web', 'site', 'app', 'mobile', 'ios', 'android', 'redesign', 'store', 'shop')) {
    return "We build fast, secure websites, web apps and iOS and Android apps. The real question is what it needs to do for your business.\n\nIs your main goal more customers finding you, more visitors turning into customers, or less manual work for your team?";
  }

  if (has('project', 'portfolio', 'case', 'example', 'client')) {
    return "You can see the kind of interfaces we design on our Projects page; those are concept projects and internal prototypes. On a call the team can walk you through work relevant to your industry.\n\nWhat would you want a project like yours to achieve?";
  }

  if (has('contact', 'phone', 'email', 'whatsapp', 'where', 'location', 'address')) {
    return `We're in Tiranë, Albania and work with clients locally and internationally.\nWhatsApp / phone: ${WHATSAPP}\nEmail: ${EMAIL}\nOr book a free call on the Contact page. What would you like to discuss?`;
  }

  if (has('hello', 'hi', 'hey', 'good morning', 'good evening')) {
    return "Hey! I'm QuolyBot, QuolyTech's AI assistant. What's the one problem costing your business the most time or money right now?";
  }

  return "Got it. To point you in the right direction: what does your business do, and what's the main problem you want solved right now?";
}
