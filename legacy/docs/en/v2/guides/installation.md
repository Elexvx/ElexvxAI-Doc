---
title: Installation & Local Dev
description: Run locally, understand the folder conventions, and build the site.
nav:
  order: 5
---

## Requirements

- Node.js 18+
- npm (or pnpm)

## Repo conventions

| Folder | Purpose |
| --- | --- |
| `src/` | Astro site code |
| `docs/` | Real Markdown docs (content source) |
| `public/` | Static assets |

## Run locally

```bash
npm install
npm run dev
```

Key routes:

- `/` home
- `/en/docs/v2/` docs
- `/en/search/` search

## Build & search index

Build outputs static files to `dist/` and then generates Pagefind index:

```bash
npm run build
```
