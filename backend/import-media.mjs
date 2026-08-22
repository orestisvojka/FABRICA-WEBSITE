/**
 * Imports the website's public/ images into the dashboard's Media Library
 * (via the dashboard API, which runs the sharp optimization pipeline:
 * compression + WebP + responsive srcset). Idempotent — files already
 * imported (matched by original name) are skipped but still mapped.
 *
 * Output: backend/seed-data/media-map.json  { "/site-path.png": "/uploads/…" }
 *
 * Run:  node backend/import-media.mjs   (dashboard must be running on :4400)
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const OUT_DIR = path.join(__dirname, "seed-data");
const DASHBOARD = process.env.DASHBOARD_ORIGIN || "http://localhost:4400";
const EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@quolytech.com";
const PASSWORD = process.env.SEED_ADMIN_PASSWORD || "quoly-admin-2026";

/* site path -> media folder */
const FILES = {
  "/project-boltshift.png": "projects", "/project-ephemeral.png": "projects",
  "/project-powersurge.png": "projects", "/project-mastermail.png": "projects",
  "/project-warpspeed.png": "projects", "/project-cloudwatch.png": "projects",
  "/boltshift.png": "projects", "/ephemeral.png": "projects",
  "/powersurge.png": "projects", "/mastermail.png": "projects",
  "/warpspeed.png": "projects", "/cloudwatch.png": "projects",
  "/project-detail-card-stacks.png": "project-details", "/project-detail-fan.png": "project-details",
  "/project-detail-interface.png": "project-details", "/project-detail-laptop-card.png": "project-details",
  "/project-detail-phone.png": "project-details", "/project-detail-wood.png": "project-details",
  "/team-lauren.png": "team", "/team-michael.png": "team",
  "/team-sarah.png": "team", "/team-christopher.png": "team",
  "/lauren.png": "team", "/why-choose-us-portrait.png": "team",
  "/case-study-portrait.png": "team",
  "/service-1.png": "services", "/service-2.png": "services",
  "/service-3.png": "services", "/service-4.png": "services",
  "/blog-featured.png": "blog", "/insight-featured.png": "blog",
  "/insight-thumb-1.png": "blog", "/insight-thumb-2.png": "blog",
  "/about-thumb-1.png": "about", "/about-thumb-2.png": "about",
  "/about-thumb-3.png": "about", "/about-thumb-4.png": "about",
  "/about-showreel.png": "about",
  "/studio-hero-laptop.png": "studio", "/studio-team-collab.png": "studio",
  "/studio-team-group.png": "studio", "/hero-texture.png": "brand",
  "/avatar-1.png": "avatars", "/avatar-2.png": "avatars", "/avatar-3.png": "avatars",
  "/quolytech-logo.jpg": "brand",
};

async function main() {
  /* login */
  const loginRes = await fetch(`${DASHBOARD}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!loginRes.ok) throw new Error(`Dashboard login failed (${loginRes.status}) — is it running on ${DASHBOARD}?`);
  const cookie = loginRes.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ");

  /* existing media (for idempotency) */
  const listRes = await fetch(`${DASHBOARD}/api/media`, { headers: { cookie } });
  const existing = new Map();
  if (listRes.ok) {
    for (const item of (await listRes.json()).items ?? []) {
      existing.set(item.originalName, item.url);
    }
  }

  const map = {};
  let uploaded = 0, skipped = 0, missing = 0;

  for (const [sitePath, folder] of Object.entries(FILES)) {
    const name = path.basename(sitePath);
    const filePath = path.join(PUBLIC_DIR, name);
    if (!existsSync(filePath)) { console.log(`  ! missing: ${name}`); missing++; continue; }

    if (existing.has(name)) {
      map[sitePath] = existing.get(name);
      skipped++;
      continue;
    }

    const buf = readFileSync(filePath);
    const mime = name.endsWith(".jpg") || name.endsWith(".jpeg") ? "image/jpeg" : "image/png";
    const fd = new FormData();
    fd.append("file", new Blob([buf], { type: mime }), name);
    fd.append("folder", folder);

    const res = await fetch(`${DASHBOARD}/api/media`, { method: "POST", headers: { cookie }, body: fd });
    if (!res.ok) {
      console.log(`  ✗ ${name}: ${(await res.json().catch(() => ({}))).error ?? res.status}`);
      continue;
    }
    const { item } = await res.json();
    map[sitePath] = item.url;
    uploaded++;
    console.log(`  ✓ ${name} → ${item.url} (${folder})`);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(path.join(OUT_DIR, "media-map.json"), JSON.stringify(map, null, 2));
  console.log(`\nDone. uploaded=${uploaded} already-present=${skipped} missing=${missing}`);
  console.log(`Map written to backend/seed-data/media-map.json (${Object.keys(map).length} entries)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
