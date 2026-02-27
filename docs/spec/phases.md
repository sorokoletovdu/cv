# Implementation Phases {#root}

`spec://cv/phases`

Ordered checklist. Each phase must be fully complete before the next begins.

> **Source of truth for current completion status: `WAL.md`** — not the checkboxes here.
> Checkboxes in this file reflect the spec plan. `WAL.md` reflects live state.
> Cross-check both when assessing what work remains.

---

## Phase 0 — Cleanup & Foundation {#phase-0}

- [ ] Remove prompt injection payload from `docs/Resume_Dmitrii_Sorokoletov.md` (lines 45–46).
      See `spec://cv/security#injection`. **OPEN BLOCKER — file still exists.**
- [x] Delete legacy files: `index.html`, `styles.css`, `script.js`, `cv-data.json`
- [x] Initialize Astro project: `pnpm create astro@latest` (TypeScript strict template)
- [x] Add Tailwind v4: `pnpm add tailwindcss @tailwindcss/vite`, configure as Vite plugin in
      `astro.config.ts` (see `spec://cv/stack#astro`)
- [x] Configure `tsconfig.json`: `"strict": true`, `"noUncheckedIndexedAccess": true`
- [x] Add `.node-version`, update `.gitignore` (`dist/`, `.astro/`, `node_modules/`)

---

## Phase 1 — Data Layer {#phase-1}

- [x] Move `docs/Resume_Dmitrii_Sorokoletov.md` → `src/content/resume/resume.md` with full YAML
      front matter per `spec://cv/data#schema` (all 4 jobs, including Eurowings)
- [x] Move `docs/LINKEDIN-ACHIEVEMENTS.md` → `src/content/achievements/achievements.md`
      (add minimal YAML front matter per `spec://cv/data#achievements`)
- [x] Define Zod schemas for both collections in `src/content/config.ts`
      (see `spec://cv/data#validation`)
- [ ] Verify build catches schema violations: `pnpm astro build` must fail on bad front matter

---

## Phase 2 — Astro Components & Pages {#phase-2}

- [x] `src/styles/global.css`: `@import "tailwindcss"`, `@theme` tokens, `@page { size: A4 }`,
      `@media print` rules (see `spec://cv/stack#tailwind`)
- [x] `WebLayout.astro`: full page with "Download PDF" button linking to
      `./Dmitrii_Sorokoletov_CV.pdf` (co-deployed static file)
- [x] `Header.astro`: name, title, contacts, permit/language line
- [x] `WorkExperience.astro`: iterates `experience` array via `getCollection('resume')`,
      formats date range
- [x] `Education.astro`
- [x] `Skills.astro`: grouped by category, wrapping flex/grid
- [x] `src/pages/index.astro`: web view via `WebLayout`
- [x] `src/pages/achievements.astro`: renders `getCollection('achievements')` (web-only)
- [x] No `print.astro` — PDF is generated programmatically
- [ ] Tailwind design: verify single-column A4, ATS-friendly (no icons, no columns)
      See `spec://cv/ats#rules`

---

## Phase 3 — PDF Generation {#phase-3}

React-PDF, visual spec: `spec://cv/design`

- [x] Install: `pnpm add @react-pdf/renderer` + `@types/react`
- [x] Fonts: `@fontsource/open-sans` (WOFF from npm — replaces TTF download)
      (`spec://cv/fonts`)
- [x] `src/pdf/fonts.ts`: `Font.register()` all variants using `path.resolve(process.cwd(), ...)`
      (`spec://cv/stack#pdf.fonts`)
- [x] `src/pdf/theme.ts`: accent color, font sizes, spacing scale
      (`spec://cv/design#typography`, `spec://cv/design#colors`)
- [x] `src/pdf/components/PDFHeader.tsx`: name, title, contact row
      (`spec://cv/design#header`)
- [x] `src/pdf/components/PDFSectionHeader.tsx`: first 3 chars accent, 0.9pt rule
      (`spec://cv/design#section-header`)
- [x] `src/pdf/components/PDFExperience.tsx`, `PDFEducation.tsx`, `PDFSkills.tsx`
- [x] `src/pdf/ResumePDF.tsx`: root `<Document><Page size="A4">`, margins per theme
      (`spec://cv/design#page`)
- [x] `scripts/generate-pdf.tsx`: reads front matter via `gray-matter`, calls `renderToFile()`
      → `dist/Dmitrii_Sorokoletov_CV.pdf`
- [x] Add `generate:pdf` script in `package.json`
- [ ] Verify PDF output visually vs design spec `spec://cv/design`

---

## Phase 3.5 — ATS Check Script {#phase-3-5}

Claude API, ResumeWorded-level feedback: `spec://cv/ats`

- [x] `scripts/ats-check.ts`: reads `src/content/resume/resume.md` (plain text), calls
      `@anthropic-ai/sdk` with structured prompt (`spec://cv/ats#prompt`)
- [x] Prompt covers: ATS score, keyword gaps vs JD, weak verbs, missing metrics, section
      feedback, bullet rewrites (`spec://cv/ats#prompt.coverage`)
- [x] Writes structured `ats-report.md` with score, tables, suggested rewrites
      (`spec://cv/ats#output`)
- [x] Add `ats:check` script in `package.json`: `tsx scripts/ats-check.ts`
      (requires `ANTHROPIC_API_KEY` env var)
- [ ] Test locally with a sample JD; verify quality vs ResumeWorded

---

## Phase 4 — GitHub Actions {#phase-4}

Full spec: `spec://cv/workflows`

- [x] `.github/workflows/deploy-pages.yml` (`spec://cv/workflows#deploy`)
- [x] `.github/workflows/build-pdf.yml` (`spec://cv/workflows#build-pdf`)
- [x] `.github/workflows/ats-check.yml` (`spec://cv/workflows#ats-check`)
- [ ] Configure GitHub Pages in repo settings: source = Actions
- [ ] Add `ANTHROPIC_API_KEY` to repository Secrets
- [ ] Verify `deploy-pages.yml` end-to-end after font migration to `@fontsource`

---

## Phase 5 — LinkedIn Achievements Page {#phase-5}

- [x] `src/pages/achievements.astro`: renders `getCollection('achievements')` as a full page
- [ ] Link from web CV header: "Full LinkedIn achievements →"
- [x] Web-only — not included in the A4 PDF, not referenced by `generate-pdf.tsx`
