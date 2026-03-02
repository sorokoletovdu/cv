# Tech Stack {#root}

`spec://cv/stack`

## Invariants {#invariants}

- Package manager is **pnpm** — never npm or yarn.
- TypeScript **strict mode** throughout: `tsconfig.json` must have `"strict": true`.
- Tailwind is v4 — no `tailwind.config.js` exists. Configuration is CSS-only via `@theme` in
  `src/styles/global.css`.
- React-PDF fonts **must** use `path.resolve()` absolute paths. Relative paths break in CI.

---

## Astro {#astro}

docs.astro.build

- Static site generator with zero JS by default — no hydration overhead for a CV page.
- Content Collections: MD files in `src/content/` are Zod-validated at build time via `getCollection()`.
- Outputs pure HTML/CSS → GitHub Pages compatible without a server.
- Tailwind v4 integrated via `@tailwindcss/vite` Vite plugin declared in `astro.config.ts`.
  Do **not** use `@astrojs/tailwind` — that is the Tailwind v3 integration.

```ts
// astro.config.ts
// Implements: spec://cv/stack#astro
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});
```

---

## Tailwind CSS v4 {#tailwind}

tailwindcss.com/docs/v4

- Single CSS file as the entire config: `src/styles/global.css`.
- `@import "tailwindcss"` replaces the old `@tailwind base/components/utilities` directives.
- `@theme { ... }` block replaces `tailwind.config.js` for custom tokens.
- Custom utility classes defined with `@utility cv-<name> { ... }` directly in `global.css`.
- `@page { size: A4; }` and `@media print { ... }` rules live in `global.css` for print fidelity.

```css
/* src/styles/global.css */
/* Implements: spec://cv/stack#tailwind */
@import "tailwindcss";

@theme {
  --color-accent: #0395de;
  --font-sans: 'Open Sans', sans-serif;
}
```

---

## TypeScript {#typescript}

- Strict mode: `tsconfig.json` → `"strict": true`, `"noUncheckedIndexedAccess": true`.
- All `scripts/` files are `.ts` or `.tsx`, run via `tsx` (no `ts-node`).
- Resume data types are inferred from Zod schemas — no manual `interface` duplication.

---

## PDF Generation: `@react-pdf/renderer` {#pdf}

react-pdf.org

**Architecture decision**: PDF and web page are separate visual implementations sharing the same
data source. Rendering a web page to PDF via a browser produces font-loading artifacts,
unpredictable page breaks, and CI inconsistencies. `@react-pdf/renderer` avoids all of these.

Key properties:
- Pure Node.js — no browser binary, no Playwright, no Chromium in CI.
- Deterministic: same input always produces byte-identical output.
- Proper font embedding: TTF/OTF registered via `Font.register()`, embedded in the PDF binary.
- Full layout control: margins, line heights, page breaks are all explicit in React components.

Entry point: `scripts/generate-pdf.tsx` reads YAML data via `gray-matter`, renders
`<ResumePDF />`, writes directly via `renderToFile()`. No `astro preview` server needed.

### Font registration — absolute paths {#pdf.fonts}

**Gotcha**: `Font.register()` resolves paths relative to CWD at runtime. CWD differs between local
dev (`cv/`) and CI (runner's workspace). Always use `path.resolve()`:

```ts
// src/pdf/fonts.ts
// Implements: spec://cv/stack#pdf.fonts
import path from 'path';
Font.register({
  family: 'Roboto',
  src: path.resolve(__dirname, '../../public/fonts/Roboto-Regular.ttf'),
});
```

Relative paths like `'../../public/fonts/...'` without `path.resolve()` will work locally and
silently fail in CI, producing a PDF with a fallback font.

### Playwright role {#pdf.playwright}

Playwright is **dev preview only**: `playwright open http://localhost:4321` for visual inspection
of the web page. It is not used for PDF production and must not appear in any CI workflow.

### Typst alternative {#pdf.typst}

If higher typographic quality is needed in the future: Typst (~25MB single binary) reads YAML
natively via `yaml()`, has professional CV templates, and can replace `@react-pdf/renderer`.
Noted for future consideration — not in current scope.
