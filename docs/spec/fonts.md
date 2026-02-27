# Fonts {#root}

`spec://cv/fonts`

Single font family across all outputs: **Open Sans** (sans-serif, humanist).
Web and PDF use the same typeface loaded from different sources to suit each rendering context.

---

## Font Family {#family}

| Property | Value |
|---|---|
| Family name | Open Sans |
| Classification | Humanist sans-serif |
| Designer | Steve Matteson |
| License | SIL Open Font License 1.1 |
| npm package | `@fontsource/open-sans` |
| Google Fonts URL | `https://fonts.googleapis.com/css2?family=Open+Sans:...` |

---

## Registered Weights & Styles {#weights}

| Weight | Numeric | Style | Used for |
|---|---|---|---|
| Light | 300 | normal | Secondary meta text (dates, location) |
| Light | 300 | italic | — (registered to satisfy font resolver) |
| Regular | 400 | normal | Body text, bullets, contact row |
| Regular | 400 | italic | Italic spans (e.g. degree location) |
| SemiBold | 600 | normal | Entry titles (company / role) |
| Bold | 700 | normal | Name, section headers, subheadings |

Weight 800 is available in the package but not used.

---

## Web Output {#web}

**Source:** Google Fonts CDN
**File:** `src/layouts/WebLayout.astro`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap"
  rel="stylesheet"
/>
```

**Tailwind theme** (`src/styles/global.css`):

```css
@theme {
  --font-sans:    "Open Sans", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Open Sans", ui-sans-serif, system-ui, sans-serif;
}
```

**Usage in components (Tailwind v4 syntax rules):**

| Goal | Correct class | Incorrect (do not use) |
|---|---|---|
| Set font-family to `--font-sans` | `font-sans` | `font-[--font-sans]`, `font-(--font-sans)` |
| Set font-family to `--font-heading` | `font-heading` | `font-[--font-heading]`, `font-(--font-heading)` |
| Reference a color CSS variable | `text-(--color-dark)` | `text-[--color-dark]` |

> **Tailwind v4 caveat:** `font-[--var]` emits the raw string `--var` (not `var()`).
> `font-(--var)` is parsed as a font-weight utility, not font-family.
> Named utilities (`font-sans`, `font-heading`) are the only correct way to apply
> a custom font-family defined in `@theme`.
>
> For other CSS properties: `(--var)` syntax correctly emits `var(--var)`.
> `[--var]` does **not** — always use parentheses for color/border/etc. variables.

---

## PDF Output {#pdf}

**Source:** `@fontsource/open-sans` WOFF files bundled in `node_modules`
**Registration:** `src/pdf/fonts.ts` — called once before `renderToFile()`

```ts
const OS = path.resolve(process.cwd(), 'node_modules/@fontsource/open-sans/files');

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: path.join(OS, 'open-sans-latin-300-normal.woff'), fontWeight: 300 },
    { src: path.join(OS, 'open-sans-latin-300-italic.woff'), fontWeight: 300, fontStyle: 'italic' },
    { src: path.join(OS, 'open-sans-latin-400-normal.woff'), fontWeight: 400 },
    { src: path.join(OS, 'open-sans-latin-400-italic.woff'), fontWeight: 400, fontStyle: 'italic' },
    { src: path.join(OS, 'open-sans-latin-600-normal.woff'), fontWeight: 600 },
    { src: path.join(OS, 'open-sans-latin-700-normal.woff'), fontWeight: 700 },
  ],
});

Font.registerHyphenationCallback((word) => [word]); // disable hyphenation
```

**Why WOFF and not TTF?**
`@react-pdf/renderer` v4+ accepts WOFF files. `@fontsource` packages bundle WOFF
(not WOFF2 or TTF). Using `@fontsource` avoids a separate download step and keeps
font files versioned alongside the code.

**Why absolute paths?**
React-PDF resolves font paths at runtime, not at bundle time. Relative paths fail when
the script is executed from a different working directory. `path.resolve(process.cwd(), ...)`
anchors to the project root regardless of invocation location.

**Theme reference** (`src/pdf/theme.ts`):

```ts
fonts: {
  heading: 'Open Sans',   // used in PDFSectionHeader, PDFHeader name
  body:    'Open Sans',   // used in all other PDF components
}
```

All PDF components read font family exclusively through `theme.fonts.*` — no hardcoded
family strings in component files.

---

## Hyphenation {#hyphenation}

Disabled for both outputs:

- **PDF:** `Font.registerHyphenationCallback((word) => [word])` in `src/pdf/fonts.ts`
- **Web:** No explicit setting needed — browsers do not hyphenate by default without
  `hyphens: auto` and a `lang` attribute

---

## Changing the Font {#change}

To replace Open Sans with a different `@fontsource` family:

1. `pnpm remove @fontsource/open-sans && pnpm add @fontsource/<new-family>`
2. Update the WOFF file paths and family name string in `src/pdf/fonts.ts`
3. Update `theme.fonts.heading` and `theme.fonts.body` in `src/pdf/theme.ts`
4. Update `--font-sans` and `--font-heading` values in `src/styles/global.css`
5. Update the Google Fonts `<link>` URL in `src/layouts/WebLayout.astro`
6. Run `pnpm tsx scripts/generate-pdf.tsx` to verify no font-resolver errors

If the new font has no WOFF files in `@fontsource`, use TTF/OTF from `public/fonts/`
and update the paths accordingly — React-PDF supports both formats.
