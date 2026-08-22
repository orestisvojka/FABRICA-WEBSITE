/**
 * QuolyTech® Studio — Unified Backend API
 * ---------------------------------------
 * Plain Node.js + raw SQL (node:sqlite). No ORM, no framework.
 * One API connected to all three surfaces:
 *
 *   LOGIN      /api/auth/*          — the website's AuthModal signs in here;
 *                                     sessions are shared with the dashboard
 *   DASHBOARD  /api/pages, /api/settings, /api/users, /api/stats, /api/media
 *                                   — full CRUD over the SAME database the
 *                                     dashboard (localhost:4400) manages;
 *                                     protected by the shared session cookie
 *   WEBSITE    /api/public/*        — open, read-only published content for
 *                                     the site to render (CORS: any origin)
 *
 * Run:   node backend/server.mjs        (from the project root)
 * Port:  4500 (override with PORT env var)
 * DB:    database/quolytech.db — plain SQL schema in database/schema.sql
 *
 * IMPORTANT: all date columns store INTEGER milliseconds since epoch
 * (Date.now()) — the dashboard reads them in that format.
 */

import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { randomBytes, randomUUID } from "node:crypto";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ------------------------------ configuration ------------------------------ */
const PORT = Number(process.env.PORT || 4500);
const DB_PATH = process.env.QT_DB_PATH || path.join(__dirname, "..", "database", "quolytech.db");
const SCHEMA_PATH = path.join(__dirname, "..", "database", "schema.sql");
const SESSION_COOKIE = "qt_admin_session"; // must match the dashboard's cookie name
const SESSION_DAYS = 30;
const DASHBOARD_URL = process.env.DASHBOARD_URL || "http://localhost:4400/dashboard";
const MEDIA_BASE_URL = process.env.MEDIA_BASE_URL || "http://localhost:4400"; // files are served by the dashboard app
const ALLOW_PUBLIC_SIGNUP = process.env.ALLOW_PUBLIC_SIGNUP === "true";
const SECURE_COOKIES = process.env.NODE_ENV === "production";
// Vite uses 5173 by default but hops to 5174/5175 when the port is busy —
// allow the whole local range so the site's login works on any of them.
const ALLOWED_ORIGINS = (
  process.env.SITE_ORIGINS ||
  "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:5175"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const ROLE_RANK = { VIEWER: 0, EDITOR: 1, ADMIN: 2 };
const BLOCK_TYPES = new Set([
  "hero", "features", "stats", "testimonials", "pricing",
  "team", "faq", "cta", "logos", "custom",
]);
const PAGE_META_FIELDS = ["title", "description", "ogTitle", "ogDescription", "ogImage", "template"];

/* ------------------------------ database setup ------------------------------ */
mkdirSync(path.dirname(DB_PATH), { recursive: true });
const isNewDb = !existsSync(DB_PATH);
const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");

if (isNewDb) {
  console.log("No database found — initializing from schema.sql");
  db.exec(readFileSync(SCHEMA_PATH, "utf8"));
  const email = process.env.SEED_ADMIN_EMAIL || "admin@quolytech.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "quoly-admin-2026";
  db.prepare(
    `INSERT INTO "User" (id, email, name, passwordHash, role, createdAt) VALUES (?, ?, ?, ?, 'ADMIN', ?)`
  ).run(randomUUID(), email, "QuolyTech Admin", bcrypt.hashSync(password, 10), Date.now());
  console.log(`Created admin account: ${email}`);
}

/* prepared statements (raw SQL) */
const q = {
  /* auth */
  userByEmail: db.prepare(`SELECT * FROM "User" WHERE email = ?`),
  insertUser: db.prepare(
    `INSERT INTO "User" (id, email, name, passwordHash, role, createdAt) VALUES (?, ?, ?, ?, ?, ?)`
  ),
  insertSession: db.prepare(
    `INSERT INTO "Session" (id, userId, expiresAt, createdAt) VALUES (?, ?, ?, ?)`
  ),
  sessionWithUser: db.prepare(
    `SELECT s.id AS sessionId, s.expiresAt, u.id, u.email, u.name, u.role
       FROM "Session" s JOIN "User" u ON u.id = s.userId
      WHERE s.id = ?`
  ),
  deleteSession: db.prepare(`DELETE FROM "Session" WHERE id = ?`),
  deleteExpired: db.prepare(`DELETE FROM "Session" WHERE expiresAt < ?`),

  /* pages */
  pagesList: db.prepare(
    `SELECT p.id, p.slug, p.title, p.description, p.status, p.template, p."order",
            p.publishedAt, p.updatedAt,
            (SELECT COUNT(*) FROM "Section" s WHERE s.pageId = p.id) AS sectionCount
       FROM "Page" p ORDER BY p."order" ASC, p.createdAt ASC`
  ),
  pageById: db.prepare(`SELECT * FROM "Page" WHERE id = ?`),
  pageBySlug: db.prepare(`SELECT * FROM "Page" WHERE slug = ?`),
  pageSlugClash: db.prepare(`SELECT id FROM "Page" WHERE slug = ? AND id != ?`),
  pageCount: db.prepare(`SELECT COUNT(*) AS n FROM "Page"`),
  insertPage: db.prepare(
    `INSERT INTO "Page" (id, slug, title, description, ogTitle, ogDescription, ogImage,
                         template, status, "order", createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'DRAFT', ?, ?, ?)`
  ),
  deletePage: db.prepare(`DELETE FROM "Page" WHERE id = ?`),
  touchPage: db.prepare(`UPDATE "Page" SET updatedAt = ? WHERE id = ?`),
  publishPage: db.prepare(
    `UPDATE "Page" SET status = 'PUBLISHED', publishedSnapshot = ?, publishedAt = ?, updatedAt = ? WHERE id = ?`
  ),
  unpublishPage: db.prepare(`UPDATE "Page" SET status = 'DRAFT', updatedAt = ? WHERE id = ?`),

  /* sections */
  sectionsByPage: db.prepare(
    `SELECT id, type, props, "order", visible FROM "Section" WHERE pageId = ? ORDER BY "order" ASC`
  ),
  deleteSectionsByPage: db.prepare(`DELETE FROM "Section" WHERE pageId = ?`),
  insertSection: db.prepare(
    `INSERT INTO "Section" (id, pageId, type, props, "order", visible) VALUES (?, ?, ?, ?, ?, ?)`
  ),

  /* revisions */
  insertRevision: db.prepare(
    `INSERT INTO "Revision" (id, pageId, label, snapshot, authorId, createdAt) VALUES (?, ?, ?, ?, ?, ?)`
  ),
  revisionsByPage: db.prepare(
    `SELECT r.id, r.label, r.createdAt, COALESCE(u.name, 'System') AS author
       FROM "Revision" r LEFT JOIN "User" u ON u.id = r.authorId
      WHERE r.pageId = ? ORDER BY r.createdAt DESC LIMIT 50`
  ),

  /* settings, media, users, stats */
  settingsAll: db.prepare(`SELECT key, value FROM "SiteSetting"`),
  upsertSetting: db.prepare(
    `INSERT INTO "SiteSetting" (key, value, updatedAt) VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updatedAt = excluded.updatedAt`
  ),
  mediaAll: db.prepare(`SELECT * FROM "MediaAsset" ORDER BY createdAt DESC`),
  usersAll: db.prepare(`SELECT id, email, name, role, createdAt FROM "User" ORDER BY createdAt ASC`),
  publicPages: db.prepare(
    `SELECT slug, title, description, publishedAt FROM "Page" WHERE status = 'PUBLISHED' ORDER BY "order" ASC`
  ),
  counts: db.prepare(
    `SELECT (SELECT COUNT(*) FROM "User")  AS users,
            (SELECT COUNT(*) FROM "Page")  AS pages,
            (SELECT COUNT(*) FROM "Page" WHERE status = 'PUBLISHED') AS published,
            (SELECT COUNT(*) FROM "MediaAsset") AS media,
            (SELECT COUNT(*) FROM "Revision")   AS revisions,
            (SELECT COUNT(*) FROM "Session" WHERE expiresAt > ?) AS activeSessions`
  ),
};

/* ------------------------------ small helpers ------------------------------ */
const parseJson = (raw, fallback) => {
  try { return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
};
const slugify = (s) =>
  String(s).toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "").replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-").replace(/^-|-$/g, "");

function credCors(req) {
  const origin = req.headers.origin || "";
  if (!ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}
const PUBLIC_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, max-age=30",
};

/* Chat endpoint: open CORS incl. POST (site widget + dashboard test panel) */
const CHAT_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function send(res, status, body, extraHeaders = {}) {
  const data = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(data),
    ...extraHeaders,
  });
  res.end(data);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > 5 * 1024 * 1024) { reject(new Error("Body too large")); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => {
      try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {}); }
      catch { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function sessionCookie(token, expiresAt) {
  const parts = [
    `${SESSION_COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax",
    `Expires=${new Date(expiresAt).toUTCString()}`,
  ];
  if (SECURE_COOKIES) parts.push("Secure");
  return parts.join("; ");
}
const clearCookie = () => `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;

const publicUser = (r) => ({ id: r.id, email: r.email, name: r.name, role: r.role });

function createSession(userId) {
  const token = randomBytes(32).toString("hex");
  const now = Date.now();
  const expiresAt = now + SESSION_DAYS * 24 * 60 * 60 * 1000;
  q.insertSession.run(token, userId, expiresAt, now);
  return { token, expiresAt };
}

function getSession(req) {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  const row = q.sessionWithUser.get(token);
  if (!row) return null;
  if (Number(row.expiresAt) < Date.now()) { q.deleteSession.run(token); return null; }
  return row;
}

/** Auth gate: returns the session user, or sends 401/403 and returns null. */
function requireUser(req, res, cors, minRole = "VIEWER") {
  const session = getSession(req);
  if (!session) { send(res, 401, { error: "Not authenticated" }, cors); return null; }
  if (ROLE_RANK[session.role] < ROLE_RANK[minRole]) {
    send(res, 403, { error: `Requires ${minRole} role` }, cors);
    return null;
  }
  return session;
}

/** Serialize a page's current state — used by publish, revisions, and reads. */
function pageState(page) {
  const sections = q.sectionsByPage.all(page.id);
  return {
    meta: {
      slug: page.slug, title: page.title, description: page.description,
      ogTitle: page.ogTitle, ogDescription: page.ogDescription,
      ogImage: page.ogImage, template: page.template,
    },
    sections: sections.map((s) => ({
      id: s.id, type: s.type, props: parseJson(s.props, {}), visible: Boolean(s.visible),
    })),
  };
}

/* ------------------------------ auth handlers ------------------------------ */
async function handleLogin(req, res, cors) {
  const body = await readBody(req);
  const email = String(body.email || "").toLowerCase().trim();
  const password = String(body.password || "");
  if (!email || !password) return send(res, 400, { error: "Email and password are required" }, cors);
  const user = q.userByEmail.get(email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return send(res, 401, { error: "Invalid email or password" }, cors);
  }
  const { token, expiresAt } = createSession(user.id);
  send(res, 200, { user: publicUser(user), dashboardUrl: DASHBOARD_URL },
    { ...cors, "Set-Cookie": sessionCookie(token, expiresAt) });
}

async function handleRegister(req, res, cors) {
  if (!ALLOW_PUBLIC_SIGNUP) {
    return send(res, 403,
      { error: "Public signup is disabled. Ask an administrator to create your account." }, cors);
  }
  const body = await readBody(req);
  const name = String(body.name || "").trim();
  const email = String(body.email || "").toLowerCase().trim();
  const password = String(body.password || "");
  if (!name || !email) return send(res, 400, { error: "Name and email are required" }, cors);
  if (password.length < 8) return send(res, 400, { error: "Password must be at least 8 characters" }, cors);
  if (q.userByEmail.get(email)) return send(res, 409, { error: "An account with this email already exists" }, cors);
  const id = randomUUID();
  q.insertUser.run(id, email, name, bcrypt.hashSync(password, 10), "VIEWER", Date.now());
  const { token, expiresAt } = createSession(id);
  send(res, 201, { user: { id, email, name, role: "VIEWER" }, dashboardUrl: DASHBOARD_URL },
    { ...cors, "Set-Cookie": sessionCookie(token, expiresAt) });
}

function handleMe(req, res, cors) {
  const session = getSession(req);
  if (!session) return send(res, 401, { error: "Not authenticated" }, cors);
  send(res, 200, { user: publicUser(session), dashboardUrl: DASHBOARD_URL }, cors);
}

function handleLogout(req, res, cors) {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (token) q.deleteSession.run(token);
  send(res, 200, { ok: true }, { ...cors, "Set-Cookie": clearCookie() });
}

/* --------------------------- public (website) handlers --------------------------- */
/* Signature note: the router always passes (req, res, cors, ...captures). */
function handlePublicPages(_req, res, _cors) {
  send(res, 200, { pages: q.publicPages.all() }, PUBLIC_CORS);
}

function handlePublicPage(_req, res, _cors, slug) {
  const page = q.pageBySlug.get(slug);
  if (!page || page.status !== "PUBLISHED" || !page.publishedSnapshot) {
    return send(res, 404, { error: "Page not found" }, PUBLIC_CORS);
  }
  send(res, 200,
    { slug: page.slug, publishedAt: page.publishedAt, ...parseJson(page.publishedSnapshot, {}) },
    PUBLIC_CORS);
}

function handlePublicSettings(_req, res, _cors) {
  const settings = {};
  for (const row of q.settingsAll.all()) {
    // chatbot config (API key!) and training stay private; the site uses
    // POST /api/chatbot/ask instead of reading these directly.
    if (row.key.startsWith("chatbot")) continue;
    settings[row.key] = parseJson(row.value, {});
  }
  send(res, 200, { settings }, PUBLIC_CORS);
}

/* --------------------------- QuolyBot chat engine --------------------------- */

function chatbotSettings() {
  const out = { config: {}, knowledge: {} };
  for (const row of q.settingsAll.all()) {
    if (row.key === "chatbot") out.config = parseJson(row.value, {});
    if (row.key === "chatbotKnowledge") out.knowledge = parseJson(row.value, {});
  }
  return out;
}

/* Offline knowledge fallback: first training rule whose keywords match. */
function knowledgeAnswer(knowledge, message) {
  const query = String(message).toLowerCase();
  for (const entry of knowledge.entries ?? []) {
    const keywords = String(entry.keywords ?? "").split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    if (keywords.some((k) => query.includes(k))) return entry.response;
  }
  return knowledge.defaultResponse || "How can we help you today?";
}

async function queryGemini(config, knowledge, message, history) {
  const models = String(config.models ?? "gemini-3.6-flash,gemini-2.5-flash,gemini-1.5-flash")
    .split(",").map((m) => m.trim()).filter(Boolean);
  const contents = [];
  for (const turn of Array.isArray(history) ? history.slice(-12) : []) {
    if (!turn || typeof turn.text !== "string") continue;
    contents.push({ role: turn.role === "user" ? "user" : "model", parts: [{ text: turn.text }] });
  }
  contents.push({ role: "user", parts: [{ text: String(message) }] });

  const body = JSON.stringify({
    system_instruction: { parts: [{ text: String(knowledge.systemInstruction ?? "") }] },
    contents,
    generationConfig: {
      temperature: Number(config.temperature ?? 0.7),
      // Newer Gemini models spend internal "thinking" tokens from this
      // budget, so it must be generous or replies arrive truncated.
      maxOutputTokens: Number(config.maxTokens ?? 1024),
    },
  });

  for (const model of models) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body }
      );
      if (!r.ok) continue;
      const data = await r.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return { reply: text.trim(), model };
    } catch { /* try next model */ }
  }
  return null;
}

/* naive per-IP rate limit: 20 messages/minute */
const chatHits = new Map();
function chatRateLimited(ip) {
  const now = Date.now();
  const rec = chatHits.get(ip) ?? { count: 0, windowStart: now };
  if (now - rec.windowStart > 60_000) { rec.count = 0; rec.windowStart = now; }
  rec.count++;
  chatHits.set(ip, rec);
  return rec.count > 20;
}

async function handleChatAsk(req, res) {
  const ip = req.socket.remoteAddress ?? "unknown";
  if (chatRateLimited(ip)) {
    return send(res, 429, { error: "Too many messages — please slow down." }, CHAT_CORS);
  }
  const body = await readBody(req);
  const message = String(body.message ?? "").trim();
  if (!message) return send(res, 400, { error: "Message is required" }, CHAT_CORS);
  if (message.length > 2000) return send(res, 400, { error: "Message too long" }, CHAT_CORS);

  const { config, knowledge } = chatbotSettings();
  if (config.enabled === false) {
    return send(res, 200, { reply: "QuolyBot is taking a short break. Please use the contact form!", source: "disabled" }, CHAT_CORS);
  }

  if (config.apiKey) {
    const ai = await queryGemini(config, knowledge, message, body.history);
    if (ai) return send(res, 200, { reply: ai.reply, source: "gemini", model: ai.model }, CHAT_CORS);
  }
  return send(res, 200, { reply: knowledgeAnswer(knowledge, message), source: "knowledge" }, CHAT_CORS);
}

function handleChatInfo(_req, res) {
  const { config } = chatbotSettings();
  send(res, 200, {
    enabled: config.enabled !== false,
    greeting: config.greeting ?? "Hello! I'm QuolyBot, your AI Assistant at QuolyTech® Studio.",
  }, PUBLIC_CORS);
}

/* --------------------------- dashboard-data handlers --------------------------- */
function handleStats(req, res, cors) {
  if (!requireUser(req, res, cors, "VIEWER")) return;
  const c = q.counts.get(Date.now());
  send(res, 200, { stats: c, dashboardUrl: DASHBOARD_URL }, cors);
}

function handlePagesList(req, res, cors) {
  if (!requireUser(req, res, cors, "VIEWER")) return;
  send(res, 200, { pages: q.pagesList.all() }, cors);
}

async function handlePageCreate(req, res, cors) {
  if (!requireUser(req, res, cors, "EDITOR")) return;
  const body = await readBody(req);
  const title = String(body.title || "").trim();
  if (!title) return send(res, 400, { error: "Title is required" }, cors);
  const slug = slugify(body.slug || title);
  if (!slug) return send(res, 400, { error: "Slug is required" }, cors);
  if (q.pageBySlug.get(slug)) return send(res, 409, { error: `Slug "${slug}" already exists` }, cors);

  const id = randomUUID();
  const now = Date.now();
  const order = q.pageCount.get().n;
  db.exec("BEGIN");
  try {
    q.insertPage.run(
      id, slug, title,
      String(body.description || ""), String(body.ogTitle || ""),
      String(body.ogDescription || ""), String(body.ogImage || ""),
      String(body.template || "default"), order, now, now
    );
    const blocks = Array.isArray(body.blocks) && body.blocks.length ? body.blocks : ["hero"];
    blocks.forEach((type, i) => {
      if (!BLOCK_TYPES.has(type)) throw new Error(`Unknown block type "${type}"`);
      q.insertSection.run(randomUUID(), id, type,
        JSON.stringify({ heading: title, subheading: "", theme: "dark" }), i, 1);
    });
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    return send(res, 400, { error: err.message }, cors);
  }
  send(res, 201, { page: q.pageById.get(id) }, cors);
}

function handlePageGet(req, res, cors, id) {
  if (!requireUser(req, res, cors, "VIEWER")) return;
  const page = q.pageById.get(id);
  if (!page) return send(res, 404, { error: "Page not found" }, cors);
  const state = pageState(page);
  send(res, 200, {
    page: {
      id: page.id, status: page.status, order: page.order,
      publishedAt: page.publishedAt, createdAt: page.createdAt, updatedAt: page.updatedAt,
      ...state.meta,
      sections: state.sections,
    },
  }, cors);
}

async function handlePagePatch(req, res, cors, id) {
  if (!requireUser(req, res, cors, "EDITOR")) return;
  const page = q.pageById.get(id);
  if (!page) return send(res, 404, { error: "Page not found" }, cors);
  const body = await readBody(req);

  const sets = [];
  const vals = [];
  for (const key of PAGE_META_FIELDS) {
    if (typeof body[key] === "string") { sets.push(`"${key}" = ?`); vals.push(body[key]); }
  }
  if (typeof body.order === "number") { sets.push(`"order" = ?`); vals.push(body.order); }
  if (typeof body.status === "string" && ["DRAFT", "PUBLISHED", "ARCHIVED"].includes(body.status)) {
    sets.push(`status = ?`); vals.push(body.status);
  }
  if (typeof body.slug === "string") {
    const slug = slugify(body.slug);
    if (!slug) return send(res, 400, { error: "Invalid slug" }, cors);
    if (q.pageSlugClash.get(slug, id)) return send(res, 409, { error: `Slug "${slug}" already exists` }, cors);
    sets.push(`slug = ?`); vals.push(slug);
  }
  sets.push(`updatedAt = ?`); vals.push(Date.now());
  vals.push(id);
  db.prepare(`UPDATE "Page" SET ${sets.join(", ")} WHERE id = ?`).run(...vals);
  send(res, 200, { page: q.pageById.get(id) }, cors);
}

function handlePageDelete(req, res, cors, id) {
  if (!requireUser(req, res, cors, "ADMIN")) return;
  const page = q.pageById.get(id);
  if (!page) return send(res, 404, { error: "Page not found" }, cors);
  q.deletePage.run(id); // sections + revisions cascade via foreign keys
  send(res, 200, { ok: true }, cors);
}

async function handleSectionsPut(req, res, cors, id) {
  if (!requireUser(req, res, cors, "EDITOR")) return;
  const page = q.pageById.get(id);
  if (!page) return send(res, 404, { error: "Page not found" }, cors);
  const body = await readBody(req);
  const sections = Array.isArray(body.sections) ? body.sections : [];
  for (const s of sections) {
    if (!BLOCK_TYPES.has(s.type)) return send(res, 400, { error: `Unknown block type "${s.type}"` }, cors);
  }

  db.exec("BEGIN");
  try {
    q.deleteSectionsByPage.run(id);
    sections.forEach((s, i) => {
      const sid = typeof s.id === "string" && /^[a-zA-Z0-9_-]{6,64}$/.test(s.id) ? s.id : randomUUID();
      q.insertSection.run(sid, id, s.type, JSON.stringify(s.props ?? {}), i, s.visible === false ? 0 : 1);
    });
    if (body.meta && typeof body.meta === "object") {
      const sets = [];
      const vals = [];
      for (const key of PAGE_META_FIELDS) {
        if (typeof body.meta[key] === "string") { sets.push(`"${key}" = ?`); vals.push(body.meta[key]); }
      }
      if (sets.length) {
        vals.push(Date.now(), id);
        db.prepare(`UPDATE "Page" SET ${sets.join(", ")}, updatedAt = ? WHERE id = ?`).run(...vals);
      } else {
        q.touchPage.run(Date.now(), id);
      }
    } else {
      q.touchPage.run(Date.now(), id);
    }
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    return send(res, 500, { error: err.message }, cors);
  }
  send(res, 200, { ok: true, savedAt: new Date().toISOString() }, cors);
}

async function handlePublish(req, res, cors, id) {
  const user = requireUser(req, res, cors, "EDITOR");
  if (!user) return;
  const page = q.pageById.get(id);
  if (!page) return send(res, 404, { error: "Page not found" }, cors);
  const body = await readBody(req).catch(() => ({}));
  const now = Date.now();

  if (body.action === "unpublish") {
    q.unpublishPage.run(now, id);
    return send(res, 200, { page: q.pageById.get(id) }, cors);
  }

  const state = pageState(page);
  // The public snapshot contains only visible sections — same shape the
  // dashboard produces, so both publishers are interchangeable.
  const snapshot = {
    meta: state.meta,
    sections: state.sections.filter((s) => s.visible).map(({ id: sid, type, props }) => ({ id: sid, type, props })),
  };
  db.exec("BEGIN");
  try {
    q.publishPage.run(JSON.stringify(snapshot), now, now, id);
    q.insertRevision.run(randomUUID(), id, "Publish (API)", JSON.stringify(state), user.id, now);
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    return send(res, 500, { error: err.message }, cors);
  }
  send(res, 200, { page: q.pageById.get(id) }, cors);
}

function handleRevisions(req, res, cors, id) {
  if (!requireUser(req, res, cors, "VIEWER")) return;
  send(res, 200, { revisions: q.revisionsByPage.all(id) }, cors);
}

function handleSettingsGet(req, res, cors) {
  if (!requireUser(req, res, cors, "VIEWER")) return;
  const settings = {};
  for (const row of q.settingsAll.all()) settings[row.key] = parseJson(row.value, {});
  send(res, 200, { settings }, cors);
}

async function handleSettingsPut(req, res, cors) {
  if (!requireUser(req, res, cors, "EDITOR")) return;
  const body = await readBody(req);
  const key = String(body.key || "").trim();
  if (!key) return send(res, 400, { error: "Key is required" }, cors);
  q.upsertSetting.run(key, JSON.stringify(body.value ?? {}), Date.now());
  send(res, 200, { key, value: body.value ?? {} }, cors);
}

function handleMediaList(req, res, cors) {
  if (!requireUser(req, res, cors, "VIEWER")) return;
  const items = q.mediaAll.all().map((m) => ({
    ...m,
    variants: parseJson(m.variants, {}),
    absoluteUrl: `${MEDIA_BASE_URL}${m.url}`, // files are hosted by the dashboard app
  }));
  send(res, 200, { items, note: "Uploads happen in the dashboard (it runs the image pipeline)" }, cors);
}

function handleUsersList(req, res, cors) {
  if (!requireUser(req, res, cors, "ADMIN")) return;
  send(res, 200, { users: q.usersAll.all() }, cors);
}

function handleHealth(_req, res, cors) {
  const c = q.counts.get(Date.now());
  send(res, 200, { ok: true, db: DB_PATH, ...c }, cors);
}

/* ------------------------------ router ------------------------------ */
/* [method, regex, handler(req,res,cors,...captures), corsMode] */
const ROUTES = [
  ["POST", /^\/api\/auth\/login$/, handleLogin],
  ["POST", /^\/api\/auth\/register$/, handleRegister],
  ["GET", /^\/api\/auth\/me$/, handleMe],
  ["POST", /^\/api\/auth\/logout$/, handleLogout],

  ["GET", /^\/api\/public\/pages$/, handlePublicPages, "public"],
  ["GET", /^\/api\/public\/pages\/([a-z0-9-]+)$/, handlePublicPage, "public"],
  ["GET", /^\/api\/public\/settings$/, handlePublicSettings, "public"],
  ["GET", /^\/api\/public\/chatbot$/, handleChatInfo, "public"],
  ["POST", /^\/api\/chatbot\/ask$/, handleChatAsk, "public"],

  ["GET", /^\/api\/stats$/, handleStats],
  ["GET", /^\/api\/pages$/, handlePagesList],
  ["POST", /^\/api\/pages$/, handlePageCreate],
  ["GET", /^\/api\/pages\/([\w-]+)$/, handlePageGet],
  ["PATCH", /^\/api\/pages\/([\w-]+)$/, handlePagePatch],
  ["DELETE", /^\/api\/pages\/([\w-]+)$/, handlePageDelete],
  ["PUT", /^\/api\/pages\/([\w-]+)\/sections$/, handleSectionsPut],
  ["POST", /^\/api\/pages\/([\w-]+)\/publish$/, handlePublish],
  ["GET", /^\/api\/pages\/([\w-]+)\/revisions$/, handleRevisions],
  ["GET", /^\/api\/settings$/, handleSettingsGet],
  ["PUT", /^\/api\/settings$/, handleSettingsPut],
  ["GET", /^\/api\/media$/, handleMediaList],
  ["GET", /^\/api\/users$/, handleUsersList],
  ["GET", /^\/api\/health$/, handleHealth],
];

const server = createServer(async (req, res) => {
  const cors = credCors(req);
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (req.method === "OPTIONS") {
      const isOpen = url.pathname.startsWith("/api/public/") || url.pathname.startsWith("/api/chatbot/");
      res.writeHead(204, isOpen ? CHAT_CORS : cors);
      return res.end();
    }
    for (const [method, pattern, handler, mode] of ROUTES) {
      if (req.method !== method) continue;
      const m = url.pathname.match(pattern);
      if (!m) continue;
      return await handler(req, res, mode === "public" ? PUBLIC_CORS : cors, ...m.slice(1));
    }
    send(res, 404, { error: `No route: ${req.method} ${url.pathname}` }, cors);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Server error";
    const status = msg === "Invalid JSON" || msg === "Body too large" ? 400 : 500;
    send(res, status, { error: msg }, cors);
  }
});

/* housekeeping: purge expired sessions hourly */
setInterval(() => q.deleteExpired.run(Date.now()), 60 * 60 * 1000).unref();

server.listen(PORT, () => {
  console.log(`QuolyTech unified API    →  http://localhost:${PORT}`);
  console.log(`Database (raw SQL)       →  ${DB_PATH}`);
  console.log(`Dashboard hand-off       →  ${DASHBOARD_URL}`);
  console.log(`Public content API       →  /api/public/pages, /api/public/settings`);
  console.log(`Public signup            →  ${ALLOW_PUBLIC_SIGNUP ? "ENABLED" : "disabled (set ALLOW_PUBLIC_SIGNUP=true)"}`);
});
