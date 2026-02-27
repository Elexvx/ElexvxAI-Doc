---
title: Getting Started
description: Learn the file structure, routing rules, and authoring flow.
nav:
  order: 1
---

## Folder structure

All docs live under the repository root `docs/` folder, split by language and version:

- `docs/zh/v1/...`
- `docs/en/v1/...`

## Add a new page

1. Create a new `.md` file under the correct folder
2. Add Frontmatter:

```yaml
---
title: Title
description: Short description
nav:
  order: 10
---
```

3. Use folders to express your IA, e.g.

- `docs/en/v1/guides/xxx.md`
- `docs/en/v1/reference/yyy.md`

## Routing

The page URL follows the file path:

- `docs/en/v1/getting-started/intro.md` → `/en/docs/v1/getting-started/intro`
