// Build-time renderer used by scripts/prerender.mjs.
// Renders a route to static HTML so crawlers (Google, GPTBot, ClaudeBot,
// PerplexityBot) get the page copy without running JavaScript.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppContent } from './App.jsx';
import { HeadContext } from './components/HeadContext';
import { services, industries } from './data/services';
import { projects } from './data/projects';
import { blogPosts } from './data/blog';
import { teamMembers } from './data/team';

export const routes = [
  '/',
  '/about/',
  '/studio/',
  '/services/',
  ...services.map((s) => `/services/${s.slug}/`),
  '/industries/',
  ...industries.map((i) => `/industries/${i.slug}/`),
  '/projects/',
  ...projects.map((p) => `/projects/${p.slug}/`),
  '/blog/',
  ...blogPosts.map((p) => `/blog/${p.slug}/`),
  ...teamMembers.map((m) => `/team/${m.slug}/`),
  '/contact/',
  '/terms/',
  '/privacy/',
];

export function render(url) {
  const head = {};
  const html = renderToString(
    <HeadContext.Provider value={head}>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </HeadContext.Provider>
  );
  return { html, head };
}
