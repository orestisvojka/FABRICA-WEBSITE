# QuolyTech Unified Backend API

Plain **Node.js + raw SQL** — no ORM, no framework. One dependency (`bcryptjs`).
The database is a standard SQL (SQLite) file at
[`database/quolytech.db`](../database/quolytech.db); the full schema is
[`database/schema.sql`](../database/schema.sql).

One API on **port 4500**, connected to all three surfaces:

```
            ┌────────────────────────── backend :4500 ──────────────────────────┐
 LOGIN      │ /api/auth/*      the website's AuthModal signs in here            │
 DASHBOARD  │ /api/pages …     full CRUD on the same DB the dashboard manages   │
 WEBSITE    │ /api/public/*    open read-only published content for the site    │
            └──────────────────────────┬────────────────────────────────────────┘
                                       │ raw SQL
                             database/quolytech.db   ◄── also read/written by the
                                                         dashboard at :4400
```

Because the API and the dashboard share the database **and** the session cookie
(`qt_admin_session`, host-scoped so it spans localhost ports), everything is
interchangeable: log in on the website → you're logged into the dashboard;
create or publish a page through this API → it appears in the dashboard
instantly, and vice versa.

## Run

```bash
cd backend && npm install     # one-time
node backend/server.mjs       # from the project root
```

If `database/quolytech.db` is missing, the server recreates it from
`schema.sql` and seeds a default admin.

## Endpoints

### Login (credentialed CORS for the website origin)

| Method & path | Body | Result |
|---|---|---|
| `POST /api/auth/login` | `{email, password}` | Sets shared session cookie; returns `{user, dashboardUrl}` |
| `POST /api/auth/register` | `{name, email, password}` | VIEWER account + auto-login. Disabled unless `ALLOW_PUBLIC_SIGNUP=true` |
| `GET /api/auth/me` | — | Current user |
| `POST /api/auth/logout` | — | Ends the session everywhere (dashboard included) |

### Website (public, `Access-Control-Allow-Origin: *`, no auth)

| Method & path | Result |
|---|---|
| `GET /api/public/pages` | Published pages list (slug, title, description) |
| `GET /api/public/pages/:slug` | Published page snapshot: `{meta, sections:[{id,type,props}]}` — only what was explicitly published, never drafts |
| `GET /api/public/settings` | Global site settings (brand, contact, footer) |

Example from the website:

```js
const CMS = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4500';
const page = await fetch(`${CMS}/api/public/pages/home`).then(r => r.json());
// page.sections -> [{type:'hero', props:{heading:…}}, {type:'faq', …}, …]
```

### Dashboard data (session cookie, role-gated)

| Method & path | Min role | Purpose |
|---|---|---|
| `GET /api/stats` | VIEWER | Counts: users, pages, published, media, revisions, active sessions |
| `GET /api/pages` | VIEWER | All pages with status + section counts |
| `POST /api/pages` | EDITOR | Create page `{title, slug?, description?, blocks?:["hero",…]}` |
| `GET /api/pages/:id` | VIEWER | Full page: meta + sections (props as JSON objects) |
| `PATCH /api/pages/:id` | EDITOR | Update meta / slug / status / order |
| `DELETE /api/pages/:id` | ADMIN | Delete (sections + revisions cascade) |
| `PUT /api/pages/:id/sections` | EDITOR | Replace the section set `{meta?, sections:[{id?,type,props,visible}]}` |
| `POST /api/pages/:id/publish` | EDITOR | `{action:"publish"\|"unpublish"}` — freezes/hides the public snapshot |
| `GET /api/pages/:id/revisions` | VIEWER | Revision history |
| `GET /api/settings` / `PUT /api/settings` | VIEWER / EDITOR | Global settings (`{key, value}`) |
| `GET /api/media` | VIEWER | Media records (+`absoluteUrl`; files are hosted by the dashboard app, which owns the upload/optimization pipeline) |
| `GET /api/users` | ADMIN | User accounts |
| `GET /api/health` | — | Liveness + DB path + counts |

Valid section `type` values: `hero`, `features`, `stats`, `testimonials`,
`pricing`, `team`, `faq`, `cta`, `logos`, `custom`.

## Environment variables (all optional)

| Var | Default | Purpose |
|---|---|---|
| `PORT` | `4500` | API port |
| `QT_DB_PATH` | `../database/quolytech.db` | SQL database file |
| `DASHBOARD_URL` | `http://localhost:4400/dashboard` | Login hand-off target |
| `MEDIA_BASE_URL` | `http://localhost:4400` | Host that serves `/uploads/*` files |
| `SITE_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Origins allowed to use credentialed endpoints |
| `ALLOW_PUBLIC_SIGNUP` | disabled | `"true"` enables the Sign-Up tab |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | admin@quolytech.com / quoly-admin-2026 | Bootstrap admin for a fresh DB |

## Connecting the AuthModal

Already done — `src/components/AuthModal.jsx` posts to `/api/auth/login` and
`/api/auth/register` (see [CONNECT-LOGIN.md](./CONNECT-LOGIN.md) for the
history and production notes).
