# UI Button Conventions

- Do not introduce legacy button classes like `icon-btn` or `copy-page-btn`.
- Reuse `src/components/ui/Button.astro` and `src/components/ui/IconButton.astro` for new button work.
- If a special button style is required, add or extend variants in the UI components first.

Validation command:

```bash
npm run lint:ui-buttons
```
