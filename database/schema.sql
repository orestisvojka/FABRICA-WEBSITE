-- ============================================================
-- QuolyTech® Studio — Database Schema (plain SQL / SQLite)
-- ============================================================
-- Canonical schema for database/quolytech.db, shared by:
--   · backend/server.mjs        (this project — raw SQL, no ORM)
--   · quolytech-admin dashboard (the CMS at localhost:4400)
--
-- Conventions:
--   · All id columns are opaque TEXT strings (uuid/cuid).
--   · All date columns store INTEGER milliseconds since the Unix
--     epoch (e.g. 1787309712284) — write Date.now()-style values,
--     NOT datetime strings, or the dashboard cannot read them.
--   · JSON payloads (props, variants, snapshot, value) are TEXT.
-- ============================================================

CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,                    -- bcrypt ($2b$10$…)
    "role" TEXT NOT NULL DEFAULT 'EDITOR',           -- ADMIN | EDITOR | VIEWER
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,                  -- 64-char hex token (also the cookie value)
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "ogTitle" TEXT NOT NULL DEFAULT '',
    "ogDescription" TEXT NOT NULL DEFAULT '',
    "ogImage" TEXT NOT NULL DEFAULT '',
    "template" TEXT NOT NULL DEFAULT 'default',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',          -- DRAFT | PUBLISHED | ARCHIVED
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedSnapshot" TEXT,                        -- frozen JSON served publicly
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "Page_slug_key" ON "Page"("slug");

CREATE TABLE IF NOT EXISTS "Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT NOT NULL,
    "type" TEXT NOT NULL,                            -- hero | features | stats | testimonials | pricing | team | faq | cta | logos | custom
    "props" TEXT NOT NULL DEFAULT '{}',              -- JSON
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "Section_pageId_order_idx" ON "Section"("pageId", "order");

CREATE TABLE IF NOT EXISTS "MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT NOT NULL DEFAULT '',
    "folder" TEXT NOT NULL DEFAULT 'general',
    "tags" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL,
    "variants" TEXT NOT NULL DEFAULT '{}',           -- JSON: { webp, srcset: [{w,url}] }
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "MediaAsset_filename_key" ON "MediaAsset"("filename");

CREATE TABLE IF NOT EXISTS "Revision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "snapshot" TEXT NOT NULL,                        -- JSON of { meta, sections }
    "authorId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Revision_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Revision_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "Revision_pageId_createdAt_idx" ON "Revision"("pageId", "createdAt");

CREATE TABLE IF NOT EXISTS "SiteSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,                           -- JSON
    "updatedAt" DATETIME NOT NULL
);
