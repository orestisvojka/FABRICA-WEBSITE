# QuolyTech® Studio — Website + Backend + CMS

**CREATE. HELP. GROW.** — The official web platform of QuolyTech® Studio
(Tiranë, Albania): a React SPA agency website, a dependency-light Node.js
API backend, a shared SQL database, and a companion admin dashboard (CMS).

| Part | Tech | Where | Port |
|---|---|---|---|
| **Website (frontend)** | React 19 + Vite, vanilla CSS design system | `src/`, `public/` | 5173/5174 |
| **Backend API** | Plain Node.js, raw SQL (`node:sqlite`), bcryptjs — no ORM, no framework | `backend/` | 4500 |
| **Database** | SQLite (plain SQL schema) | `database/` | — |
| **Admin dashboard (CMS)** | Next.js 15 + Tailwind + Prisma | sibling repo/folder `../quolytech-admin` | 4400 |

## Quick start

```bash
# 1. Website
npm install
npm run dev                      # http://localhost:5173 (or 5174)

# 2. Backend API (one-time: cd backend && npm install)
node backend/server.mjs          # http://localhost:4500

# 3. Admin dashboard (separate folder ../quolytech-admin)
cd ../quolytech-admin && npm install && npm run setup && npm run dev   # http://localhost:4400
```

Create a `.env` in the project root (it is git-ignored — never commit it):

```
VITE_GEMINI_API_KEY=your-google-ai-key     # used by seed-chatbot.mjs
VITE_BACKEND_URL=http://localhost:4500     # where AuthModal sends logins
```

If `database/quolytech.db` is missing, the backend recreates it from
[`database/schema.sql`](database/schema.sql) and seeds a default admin
(`admin@quolytech.com` / `quoly-admin-2026` — **change it after first login**
in the dashboard's Users & Roles).

## How the pieces connect

```
            login (AuthModal)                     content JSON
Website ───────────────────────► Backend :4500 ◄──────────────── Website
                                    │  raw SQL
                                    ▼
                          database/quolytech.db  ◄── also read/written by
                                    ▲                the dashboard (:4400)
                              shared sessions
              (one cookie → website login = dashboard login)
```

- **Single sign-on**: logging in through the website's Login modal creates a
  session in the shared database using the same cookie as the dashboard —
  admins/editors land in the CMS already authenticated.
- **Headless content**: the CMS manages 25 pages / 109 sections mirroring the
  whole site (home, studio, projects + 6 case studies, blog + 7 articles,
  5 team profiles, contact, terms, privacy). Published snapshots are served
  at `GET /api/public/pages/:slug` — drafts never leak.
- **QuolyBot**: the AI assistant's API key, model, persona, and training
  rules are edited in the dashboard and served by
  `POST /api/chatbot/ask` (Gemini `gemini-3.6-flash` with an offline
  knowledge fallback). The key lives server-side only.

Full endpoint reference: [`backend/README.md`](backend/README.md).
AuthModal wiring notes: [`backend/CONNECT-LOGIN.md`](backend/CONNECT-LOGIN.md).

## Website features

- Swiss architectural dark-mode design (`#0a0a0a` hero islands, 32px radii,
  Inter/Geist typography, emerald `#10b981` accents)
- 12 route templates / 25+ views incl. dynamic project case studies
  (`/projects/:slug`), blog articles (`/blog/:slug`), and staff profiles
  (`/team/:slug`)
- Lenis inertial scrolling + Framer Motion parallax and stagger reveals
- QuolyBot floating AI assistant with smart offline fallback
- Login / Sign-Up modal connected to the backend (sign-up is disabled
  server-side by default; enable with `ALLOW_PUBLIC_SIGNUP=true`)
- SEO: sitemap.xml, robots.txt, ai.txt, per-page meta

## Admin dashboard highlights (../quolytech-admin)

- Split-screen editor: click-to-edit canvas + real-time browser-framed
  live page preview (updates keystroke-by-keystroke, two-way selection)
- Block builder: 10 section types, drag-reorder, duplicate, hide/show,
  per-section entrance animations (type/duration/delay) and spacing
- Media library with automatic compression, WebP, and responsive srcset
- Publish/unpublish with frozen snapshots, revisions, undo/redo, autosave
- QuolyBot AI manager: API key/model/params, persona, training rules,
  live test chat
- Role-based access (Admin / Editor / Viewer) over shared SQL sessions

## Repository history (what each commit is)

1. **`chore(security): ignore .env secrets and local SQL database files`**
   — protects the Gemini API key (`.env`) and the runtime database
   (`database/*.db*`, which contains the key and password hashes) from ever
   being committed. Only `database/schema.sql` is versioned.
2. **`feat(frontend): QuolyTech Studio website — full rebrand, team pages,
   connected login`** — the complete website: QuolyTech rebrand of the
   Fabrica clone, 58 image assets, staff detail pages, QuolyBot widget,
   mobile optimization, SEO files, and the AuthModal wired to the backend.
3. **`feat(backend): unified API server with raw SQL, SSO auth, and QuolyBot
   engine`** — the entire backend: auth + SSO sessions, content CRUD,
   public content API, the QuolyBot chat engine, the SQL schema, and the
   seed/import scripts that populated the CMS from the site's real content.
4. **`docs: project README`** — this file.

## Security notes

- `.env` and `database/*.db*` are git-ignored on purpose. If a key was ever
  exposed, rotate it in Google AI Studio and update the dashboard's
  QuolyBot settings.
- Passwords are bcrypt-hashed; sessions are httpOnly cookies; page deletion
  and user management require the ADMIN role.
