---
title: Site Configuration
description: Where languages, versions, and site title are configured.
nav:
  order: 10
---

## Site-level config

Default language, supported languages, and versions are maintained in `src/config/site.ts`.

## Add a new version

1. Add `v2` to `versions` in `src/config/site.ts`
2. Create matching docs under `docs/zh/v2` and `docs/en/v2`
3. Rebuild and the version switcher will show it
