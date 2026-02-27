---
title: Troubleshooting
description: Quick checks for build, routing, and search issues.
nav:
  order: 90
---

## Search returns no results

Checklist:

1. Run `npm run build` (Pagefind index is generated post-build)
2. Make sure doc pages include the `data-pagefind-body` element (this site does)
3. Confirm you’re searching under the correct language/version

## New Markdown page not found

- Ensure the file is under `docs/{lang}/{version}/.../*.md`
- Ensure frontmatter includes at least `title`
- Use kebab-case names like `my-page.md`

## TOC is empty

TOC is generated from headings (h2/h3). Add:

```md
## Heading
### Subheading
```
