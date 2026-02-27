# ElexvxAI Docs

## Source Of Truth

- Docs content source: `src/content/docs/**`
- Blog content source: `src/content/blog/**`

## Legacy Content

- Old root `docs/` has been moved to `legacy/docs/`.
- `legacy/docs/` is archival only and is not used by build/runtime.

## UI Conventions

- Page/component code should not use raw `<button class="...">` outside UI primitives.
- Reuse `src/components/ui/Button.astro` and `src/components/ui/IconButton.astro`.
- Validate with:

```bash
npm run lint:ui-buttons
```

## React Islands Conventions

- React components must live under `src/components/ui-react/**`.
- Default hydration strategy: `client:visible`.
- Do not import React islands in global/docs layout layers.
- Use `src/pages/ui.astro` as the showcase entry for interactive demos.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Run local dev server |
| `npm run build` | Build production artifacts |
| `npm run preview` | Preview production build |
| `npm run lint:ui-buttons` | Enforce UI button and islands conventions |
