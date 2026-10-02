// Generates public/llms.txt and public/llms-full.txt from the same data the
// site renders, so what AI crawlers read never drifts from the pages.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { services, industries } from '../src/data/services.js';
import { blogPosts } from '../src/data/blog.js';
import { projects } from '../src/data/projects.js';
import { teamMembers } from '../src/data/team.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = 'https://quolytech.com';

const summary =
  'QuolyTech is a technology and design agency in Tiranë, Albania. It helps businesses grow ' +
  'with AI systems and agents, startup and SaaS development, web and mobile apps, UI/UX design, ' +
  'systems management and social media marketing, for clients in Albania and internationally.';

const contact = [
  '## Contact',
  `- [Contact page](${site}/contact/): start a project`,
  '- Email: support@quolytech.com',
  '- Phone / WhatsApp: +355 68 405 5007',
  '- Location: Tiranë, Albania',
];

const llms = [
  '# QuolyTech',
  '',
  `> ${summary}`,
  '',
  '## Services',
  ...services.map((s) => `- [${s.title}](${site}/services/${s.slug}/): ${s.metaDescription}`),
  '',
  '## Industries',
  ...industries.map((i) => `- [${i.title}](${site}/industries/${i.slug}/): ${i.metaDescription}`),
  '',
  '## Portfolio & Case Studies',
  ...projects.map((p) => `- [${p.title}](${site}/projects/${p.slug}/): ${p.description} (Live: ${p.liveUrl})`),
  '',
  '## Leadership & Team',
  ...teamMembers.map((m) => `- [${m.name} — ${m.role}](${site}/team/${m.slug}/): ${m.bio}`),
  '',
  '## Guides',
  `- [Blog](${site}/blog/): guides on AI agents, business websites and technical SEO`,
  ...blogPosts.map((p) => `- [${p.title}](${site}/blog/${p.slug}/)`),
  '',
  '## Company',
  `- [About QuolyTech](${site}/about/): who we are and how we work`,
  '',
  ...contact,
  '',
  '## Optional',
  `- [Full context](${site}/llms-full.txt): every service and industry with FAQs`,
  '',
];

const faqBlock = (faqs = []) =>
  faqs.flatMap((f) => [`**${f.question}**`, f.answer, '']);

const llmsFull = [
  '# QuolyTech — full context',
  '',
  `> ${summary}`,
  '',
  ...contact,
  '',
  '## Services',
  '',
  ...services.flatMap((s) => [
    `### ${s.heading}`,
    `URL: ${site}/services/${s.slug}/`,
    '',
    s.subtitle,
    '',
    s.description,
    '',
    `Who it is for: ${s.whoIsItFor}`,
    '',
    `Capabilities: ${s.capabilities.join('; ')}.`,
    `Technologies: ${s.technologies.join(', ')}.`,
    `Process: ${s.process.map((step) => step.replace(/^\d+\s*/, '')).join(' → ')}.`,
    '',
    ...faqBlock(s.faqs),
  ]),
  '## Industries',
  '',
  ...industries.flatMap((i) => [
    `### ${i.heading}`,
    `URL: ${site}/industries/${i.slug}/`,
    '',
    i.subtitle,
    '',
    i.description,
    '',
    `Services used: ${i.relevantServices.join(', ')}.`,
    '',
    ...faqBlock(i.faqs),
  ]),
  '## Portfolio & Case Studies',
  '',
  ...projects.flatMap((p) => [
    `### ${p.title}`,
    `URL: ${site}/projects/${p.slug}/`,
    `Live Project URL: ${p.liveUrl}`,
    `Category: ${p.category} | Industry: ${p.industry}`,
    '',
    p.tagline,
    '',
    p.description,
    '',
    `Overview: ${p.overview}`,
    `Challenge: ${p.challenge}`,
    `Solution: ${p.solution}`,
    `Technologies: ${p.technologies.join(', ')}.`,
    `Results: ${p.results.join('; ')}.`,
    '',
  ]),
  '## Guides',
  '',
  ...blogPosts.map((p) => `- [${p.title}](${site}/blog/${p.slug}/): ${p.excerpt}`),
  '',
];

fs.writeFileSync(path.join(root, 'public', 'llms.txt'), llms.join('\n'));
fs.writeFileSync(path.join(root, 'public', 'llms-full.txt'), llmsFull.join('\n'));
console.log('Generated public/llms.txt and public/llms-full.txt');
