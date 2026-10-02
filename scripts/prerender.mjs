// Writes a static HTML file for every route after `vite build`, so each URL
// ships its own <title>, meta description, canonical, JSON-LD and page copy.
// The client bundle still boots normally on top of it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, routes } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const setMeta = (html, attr, key, content) => {
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  const pattern = new RegExp(`<meta ${attr}="${key}"[^>]*>`);
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
};

function buildPage(url) {
  const { html: appHtml, head } = render(url);
  let page = template;

  if (head.title) {
    page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(head.title)}</title>`);
    page = setMeta(page, 'property', 'og:title', head.title);
    page = setMeta(page, 'name', 'twitter:title', head.title);
  }
  if (head.description) {
    page = setMeta(page, 'name', 'description', head.description);
    page = setMeta(page, 'property', 'og:description', head.description);
    page = setMeta(page, 'name', 'twitter:description', head.description);
  }
  if (head.canonical) {
    page = setMeta(page, 'property', 'og:url', head.canonical);
    page = page.replace('</head>', `    <link rel="canonical" href="${escapeAttr(head.canonical)}" />\n  </head>`);
  }
  if (head.ogType) page = setMeta(page, 'property', 'og:type', head.ogType);
  if (head.ogImage) {
    page = setMeta(page, 'property', 'og:image', head.ogImage);
    page = setMeta(page, 'name', 'twitter:image', head.ogImage);
  }
  if (head.jsonLd) {
    // Same id SEOHead uses, so the client updates this tag instead of adding a second one.
    const json = JSON.stringify(head.jsonLd).replace(/</g, '\\u003c');
    page = page.replace(
      '</head>',
      `    <script type="application/ld+json" id="dynamic-jsonld">${json}</script>\n  </head>`
    );
  }

  return page.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

let count = 0;
for (const url of routes) {
  const outFile = url === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, url, 'index.html');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buildPage(url));
  count += 1;
}

// Static hosts serve this for unknown URLs; the app then renders the right route.
fs.writeFileSync(
  path.join(distDir, '404.html'),
  buildPage('/__not-found__/').replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>')
);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${count} routes + 404.html`);
