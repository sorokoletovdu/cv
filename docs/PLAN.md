# CV Builder — Implementation Plan

## Overview

Transform the current static HTML CV into a TypeScript + Astro + Tailwind CSS driven system where:
- **Source of truth** = Markdown files in `src/content/` (Astro Content Collections)
- **Web output** = Astro static site deployed to GitHub Pages
- **PDF output** = `@react-pdf/renderer` programmatic PDF (separate visual implementation, same data source)
- **ATS check** = Claude API (`@anthropic-ai/sdk`) — ResumeWorded-level feedback, no Docker/Java

---

## Agent Skills (skills.sh)

Install command format: `npx skills add <owner/repo@skill>`

Discovered via `npx skills find`:

| Skill | Install command | Why |
|---|---|---|
| `astrolicious/agent-skills@astro` (1.3K) | `npx skills add astrolicious/agent-skills@astro` | **Core stack** — Astro framework patterns, content collections, static output |
| `josiahsiegel/claude-plugin-marketplace@tailwindcss-advanced-layouts` (1.7K) | `npx skills add josiahsiegel/claude-plugin-marketplace@tailwindcss-advanced-layouts` | A4 print layout, `@media print`, page sizing |
| `jezweb/claude-skills@tailwind-patterns` (1.1K) | `npx skills add jezweb/claude-skills@tailwind-patterns` | Tailwind component patterns for CV sections |
| `bobmatnyc/claude-mpm-skills@github-actions` (141) | `npx skills add bobmatnyc/claude-mpm-skills@github-actions` | Writing the 3 CI/CD workflows |
| `bobmatnyc/claude-mpm-skills@github-actions` (141) | `npx skills add bobmatnyc/claude-mpm-skills@github-actions` | Writing the 3 CI/CD workflows |
| `jwynia/agent-skills@pdf-generator` (91) | `npx skills add jwynia/agent-skills@pdf-generator` | PDF generation patterns |

**Optional / alternative**:
- `terrylica/cc-skills@pandoc-pdf-generation` (52) — Pandoc MD→PDF approach; useful if a pure-Markdown-to-PDF fallback is ever needed alongside the Playwright route

---

## Open-Source Tools — Evaluation Summary

### OpenResume (`xitanggg/open-resume`) — AGPL-3.0
- Tech: Next.js 13 + React + TypeScript + Tailwind + Redux + React-PDF
- **Cannot be used as a library or CLI** — it is a standalone web app only
- PDF is generated client-side via `@react-pdf/renderer`
- ATS checker uses `PDF.js` to parse an uploaded PDF and score it
- **Decision**: Not integrated directly (AGPL copyleft, Next.js/React-heavy, no API/CLI surface).
  Use as **design reference** for CV layout and ATS check heuristics only.

### ResumeLM (`olyaiy/resume-lm`) — AGPL-3.0
- Tech: Next.js 15 + React 19 + TypeScript + Tailwind + Supabase + React-PDF + Shadcn UI
- AI-powered content generation (OpenAI, Claude, Gemini, DeepSeek, Groq — API keys required)
- ATS scoring is AI-driven (keyword analysis + improvement recommendations)
- Full Docker Compose stack (Supabase + PostgreSQL + Redis) — very heavy infrastructure
- PDF via `@react-pdf/renderer` (same as OpenResume)
- **No CLI or API surface** — standalone web app only; AI features require Supabase backend + paid API keys
- **Decision**: Not integrated. Infrastructure cost (Supabase + DB + Redis + AI keys) is excessive for a
  CV CI pipeline. Same AGPL-3.0 copyleft concern as OpenResume. The React-PDF approach is identical to
  OpenResume; our Playwright approach is simpler and fits the existing toolchain. Use as a **UI/UX
  reference** for layout patterns and ATS scoring heuristics.

### Awesome-CV (`posquit0/Awesome-CV`) — LPPL-1.3c
- Tech: LaTeX (XeLaTeX), FontAwesome6, Docker for compilation
- **This is the layout the user's current resume is based on**
- Design specs extracted for use as the React-PDF visual reference:
  - Fonts: **Source Sans 3** (body), **Roboto** (headers) — both available as Google Fonts TTF
  - Name: 32pt bold, position title: 7.6pt, section headers: 16pt bold, body: 9pt, entry titles: 10pt
  - Section header style: bold, first 3 characters in accent color, rest dark gray, followed by a 0.9pt horizontal rule
  - Colors: Dark gray `#333333`, Gray `#5D5D5D`, Light gray `#999999`
  - Built-in accent themes: `#0395DE` (skyblue), `#00A388` (emerald), `#DC3522` (red), `#131A28` (darknight)
  - Header structure: large name → position/title → contact row (phone, email, LinkedIn, GitHub with icons)
- **Decision**: Not integrated (LaTeX stack, incompatible with our TypeScript pipeline). Used as the **design specification** for React-PDF components — replicate the visual output, not the LaTeX source.

### ResumeAtsChecker (`Joseph24x7/ResumeAtsChecker`) — MIT
- Tech: Spring Boot + Java 17 + Apache OpenNLP, Dockerfile included
- Exposes a REST API on port 8001; basic keyword matching via NLP
- **Decision**: **Replaced by Claude API** (see ATS workflow below). ResumeAtsChecker only does keyword
  frequency matching; Claude provides bullet-point feedback, section analysis, and weighted scoring
  comparable to ResumeWorded — with no Docker/Java overhead.

### ResumeWorded (`resumeworded.com`) — SaaS, no API
- Used by the user to clean up the resume and improve ATS score
- Features: instant score, keyword gap analysis vs JD, line-by-line bullet point feedback, LinkedIn optimization
- **No API available** — web-only service
- **Decision**: Replicate the core feedback features via Claude API in `ats-check.yml`.
  Our implementation covers: ATS score, missing JD keywords, weak action verbs, missing metrics,
  section-level feedback, bullet point rewrites — without requiring a paid subscription.

---

## Project Structure (Target)

```
cv/
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml       # Build Astro site + generate PDF → deploy both to GitHub Pages (push to main)
│       ├── build-pdf.yml          # PDF only, no deploy (manual workflow_dispatch)
│       └── ats-check.yml          # Claude API ATS score report (manual workflow_dispatch)
│
├── src/
│   ├── content/
│   │   ├── config.ts              # Astro content collection schemas (Zod) — validates MD front matter
│   │   ├── resume/
│   │   │   └── resume.md          # CV data: YAML front matter + narrative body (source of truth)
│   │   └── achievements/
│   │       └── achievements.md    # LinkedIn achievements data (web-only, not in PDF)
│   ├── components/
│   │   ├── Header.astro
│   │   ├── WorkExperience.astro
│   │   ├── Education.astro
│   │   └── Skills.astro
│   ├── layouts/
│   │   └── WebLayout.astro        # Full page: nav, "Download PDF" button, footer
│   ├── pages/
│   │   ├── index.astro            # Web view (via WebLayout)
│   │   └── achievements.astro     # LinkedIn achievements page (web-only)
│   ├── pdf/
│   │   ├── ResumePDF.tsx          # Root React-PDF document component (Awesome-CV inspired)
│   │   ├── theme.ts               # Design tokens: accent color, font sizes (matching Awesome-CV)
│   │   ├── fonts.ts               # Font.register() — Source Sans 3 + Roboto, absolute paths
│   │   └── components/
│   │       ├── PDFHeader.tsx      # Name 32pt, title 7.6pt, contact row
│   │       ├── PDFSectionHeader.tsx  # 16pt bold, first 3 chars accent color, 0.9pt rule
│   │       ├── PDFExperience.tsx
│   │       ├── PDFEducation.tsx
│   │       └── PDFSkills.tsx
│   └── styles/
│       └── global.css             # Tailwind import + theme vars
│
├── docs/
│   └── PLAN.md                    # Project planning documentation (this file)
│
├── scripts/
│   ├── generate-pdf.tsx           # Reads resume data (gray-matter), renders ResumePDF → dist/CV.pdf
│   └── ats-check.ts               # Reads resume.md + JD input → calls Claude API → writes ats-report.md
│
├── public/
│   └── fonts/
│       ├── SourceSans3-Regular.ttf
│       ├── SourceSans3-Bold.ttf
│       ├── SourceSans3-Light.ttf
│       ├── Roboto-Regular.ttf
│       └── Roboto-Bold.ttf
│
├── package.json
├── astro.config.ts                 # TypeScript config (uses @tailwindcss/vite plugin for Tailwind v4)
├── tsconfig.json
└── .node-version                   # Pins Node.js version for CI and local dev
```

**Key structural decisions:**
- `src/content/` is the Astro Content Collections directory — MD files here get Zod validation via `getCollection()`. `docs/Resume_Dmitrii_Sorokoletov.md` and `docs/LINKEDIN-ACHIEVEMENTS.md` **move** to `src/content/resume/` and `src/content/achievements/` respectively.
- `src/pdf/` holds React-PDF components — completely separate from Astro components. Web and PDF share **data**, not presentation.
- `docs/` becomes project-documentation-only (just `PLAN.md`).
- No `src/data/` directory — data is accessed directly via `getCollection()` in `.astro` components and via `getEntry()` in the PDF script.
- No `scripts/parse-resume.ts` — Zod schema in `config.ts` handles all parsing/validation at build time.
- No `tailwind.config.mjs` — Tailwind v4 uses CSS-based `@theme` configuration in `global.css`, no JS config file.
- `astro.config.ts` (not `.mjs`) — consistent with the TypeScript-first setup.
- `scripts/generate-pdf.tsx` (not `.ts`) — needs JSX for React-PDF components.
- No `src/pages/print.astro` — no longer needed since PDF is generated programmatically, not by rendering a web page.

---

## Data Layer Design

### MD File Format (YAML front matter + narrative body)

The `src/content/resume/resume.md` file uses YAML front matter for machine-readable data, with Markdown body for the free-text narrative. This is the Astro Content Collections convention — the file lives in `src/content/` so it is validated by the Zod schema in `config.ts` at build time and accessible via `getCollection('resume')`.

```yaml
---
name: Dmitrii Sorokoletov
title: QA Automation Engineer
phone: "+49-1520-388-0560"
email: sorokoletovdu@icloud.com
linkedin: https://linkedin.com/in/sorokoletovdu/
github: https://github.com/sorokoletovdu
permit: "German work permit: Blaue Karte"
languages:
  - English (Fluent)
  - Deutsch (Beginner)
  - Russian (Native)

experience:
  - company: Eurowings Digital
    title: QA Automation Engineer
    location: Cologne (Hybrid)
    start: 2024-12
    end: present
    bullets:
      - "..."
  - company: Quandoo
    title: QA Engineer
    location: Remote
    start: 2022-12
    end: 2024-12
    bullets:
      - "..."
  # ... additional roles

education:
  - degree: Bachelor's in Electronic Computing Machine Development
    school: Southwest State University
    location: Kursk, Russia

skills:
  - category: Test Automation
    items: [TypeScript, Playwright, JavaScript, Python, PyTest, PHP, Codeception]
  - category: Testing Types
    items: [Web, Mobile, API]
  - category: CI/CD
    items: [GitLab, GitHub Actions, Jenkins, Azure DevOps]
  - category: Tools
    items: [Git, SQL, Linux, Docker]
  - category: Practices
    items: [Agile, Scrum, ISTQB, Shift-left, Defect Management]
---

<!-- Narrative / extended content below (not rendered on 1-page CV) -->
```

Astro Content Collections with Zod schemas validate the front matter at build time — if the data structure is wrong, the build fails immediately.

---

## Tech Stack Details

### Astro
- Static site generator with zero JS by default — ideal for a CV page
- Content Collections with Zod schemas for MD front matter validation
- Outputs pure HTML/CSS → GitHub Pages compatible
- Tailwind v4 integrated via `@tailwindcss/vite` Vite plugin (not `@astrojs/tailwind`)

### Tailwind CSS (v4)
- Single-page print-first design: A4 sizing, `@media print` rules
- Configured via `src/styles/global.css` using `@import "tailwindcss"` and `@theme` — no JS config file
- Integrated via `@tailwindcss/vite` Vite plugin (declared in `astro.config.ts`), not `@astrojs/tailwind`
- Custom `cv-` utility classes for consistent spacing defined with `@utility` in `global.css`

### TypeScript
- Strict mode throughout
- Typed resume data interfaces generated from Zod schemas
- `scripts/` are `.ts` files run via `tsx`

### PDF Generation: `@react-pdf/renderer`

**Architecture decision**: PDF and web page are *separate visual implementations sharing the same data source* (`src/content/resume/resume.md`). This is the right approach — trying to render a web page to PDF via a browser produces font-loading artifacts, unpredictable page breaks, and CI inconsistencies.

- **`@react-pdf/renderer`** (React-PDF): programmatic PDF from React components
  - Pure Node.js, no browser binary needed → zero CI overhead
  - Deterministic output: same input always produces identical PDF
  - Proper font embedding (TTF/WOFF registered via `Font.register()`)
  - Full layout control: margins, spacing, typography, page breaks all explicit
  - Used by OpenResume and ResumeLM — proven for CV use
  - `scripts/generate-pdf.tsx`: reads YAML data via `getEntry()`, renders `<ResumePDF />` component, writes file directly via `renderToFile()`
  - No `astro preview` server needed — PDF script runs standalone
- `src/pdf/` directory contains React-PDF components (separate from Astro components)
- Known gotcha: fonts must be registered with absolute paths, not relative

**Playwright role**: *development preview only* — `playwright open http://localhost:4321` to visually inspect the web page. Not used for PDF production.

**Typst alternative**: If even higher typographic quality is needed, Typst (single ~25MB binary) reads YAML natively via `yaml()`, has professional CV templates, and can replace `@react-pdf/renderer`. Noted here for future consideration.

---

## GitHub Actions Workflows

### 1. `deploy-pages.yml` — Web + PDF Deploy (combined)
**Trigger**: push to `main`

The PDF is generated as part of the deploy, not separately. This ensures the PDF served on
GitHub Pages is always in sync with the web page, and the download button always works.
No browser binary or preview server needed — React-PDF runs as a pure Node.js script.

```
Steps:
1. Checkout
2. Setup Node (LTS)
3. pnpm install
4. astro build  → dist/
5. tsx scripts/generate-pdf.tsx
   → writes dist/Dmitrii_Sorokoletov_CV.pdf  (directly into the build output)
6. Upload PDF as workflow artifact (for traceability)
7. Deploy dist/ to GitHub Pages
```

**Output**:
- `https://<user>.github.io/cv/` — web page with a "Download PDF" button
- `https://<user>.github.io/cv/Dmitrii_Sorokoletov_CV.pdf` — the PDF at a stable URL
- `actions/upload-artifact` also stores the PDF as a workflow artifact (for traceability)

**Download button** in `index.astro`:
```html
<a href="/cv/Dmitrii_Sorokoletov_CV.pdf" download="Dmitrii_Sorokoletov_CV.pdf">
  Download PDF
</a>
```
The href is a relative path — no hardcoded domain, works for any GitHub Pages subdirectory.

### 2. `build-pdf.yml` — Local/Manual PDF (standalone)
**Trigger**: manual `workflow_dispatch` only

Identical PDF generation steps as above, but without the full Pages deploy.
Purpose: quick PDF rebuild without triggering a full site re-deploy (e.g. for local preview
or when only the PDF output is needed).

```
Steps:
1. Checkout
2. Setup Node (LTS)
3. pnpm install
4. tsx scripts/generate-pdf.tsx → Dmitrii_Sorokoletov_CV.pdf
5. Upload artifact (actions/upload-artifact)
```

**Output**: `Dmitrii_Sorokoletov_CV.pdf` as a downloadable Actions artifact

### 3. `ats-check.yml` — ATS Score Report (ResumeWorded-like, via Claude API)
**Trigger**: manual `workflow_dispatch`

```
Inputs:
  - job_description: string (paste the full JD text)

Steps:
1. Checkout
2. pnpm install
3. tsx scripts/ats-check.ts
   - Reads src/content/resume/resume.md (plain text, what ATS scanners actually see)
   - Sends resume text + job_description to Claude API with a structured prompt requesting:
       • Overall ATS match score (0–100) with reasoning
       • Missing keywords/phrases from the JD not present in the resume
       • Weak action verbs or overused phrases to replace
       • Bullet points lacking quantifiable metrics
       • Section-by-section feedback (Experience, Skills, Education)
       • Specific bullet point rewrite suggestions (top 3–5)
   - Writes structured markdown report to ats-report.md
4. Upload ats-report.md as workflow artifact
```

**Output**: `ats-report.md` — structured ATS analysis comparable to ResumeWorded, uploaded as artifact

**Why Claude API instead of ResumeAtsChecker Docker:**
- No Java 17, no Docker, no Spring Boot startup time in CI
- Semantic understanding vs keyword frequency counting
- Bullet-point rewrite suggestions (like ResumeWorded's "improve this line" feature)
- Requires `ANTHROPIC_API_KEY` secret in GitHub repo settings

---

## Implementation Phases

### Phase 0 — Cleanup & Foundation
- [ ] Remove prompt injection payload from `docs/Resume_Dmitrii_Sorokoletov.md` (lines 45-46)
- [ ] Delete legacy files: `index.html`, `styles.css`, `script.js`, `cv-data.json`
- [ ] Initialize Astro project: `pnpm create astro@latest` (TypeScript strict template)
- [ ] Add Tailwind v4: `pnpm add tailwindcss @tailwindcss/vite`, configure as Vite plugin in `astro.config.ts`
- [ ] Configure `tsconfig.json` (strict mode)
- [ ] Add `.node-version`, update `.gitignore` (dist/, .astro/, node_modules/)

### Phase 1 — Data Layer
- [ ] Move and restructure `docs/Resume_Dmitrii_Sorokoletov.md` → `src/content/resume/resume.md` with full YAML front matter (all 4 jobs, including Eurowings from `LINKEDIN-ACHIEVEMENTS.md`)
- [ ] Move `docs/LINKEDIN-ACHIEVEMENTS.md` → `src/content/achievements/achievements.md` (add minimal YAML front matter)
- [ ] Define Zod schemas for both collections in `src/content/config.ts`
- [ ] Verify build catches schema violations (`pnpm astro build` fails on bad front matter)

### Phase 2 — Astro Components & Pages
- [ ] `src/styles/global.css`: `@import "tailwindcss"`, `@theme` customizations, `@page { size: A4 }`, `@media print` rules
- [ ] `WebLayout.astro`: full page with "Download PDF" button — `<a href="./Dmitrii_Sorokoletov_CV.pdf" download>` (static file co-deployed to GitHub Pages)
- [ ] `Header.astro`: name, title, contacts, permit/language line
- [ ] `WorkExperience.astro`: iterates `experience` array from `getCollection('resume')`, formats date range
- [ ] `Education.astro`
- [ ] `Skills.astro`: grouped by category, wrapping flex/grid
- [ ] `src/pages/index.astro`: web view (via WebLayout)
- [ ] `src/pages/achievements.astro`: renders `getCollection('achievements')` (web-only, not in PDF)
- [ ] No `print.astro` — PDF is generated programmatically by React-PDF, not by rendering a page
- [ ] Tailwind design: clean single-column A4 layout, ATS-friendly font (no icons, no columns)

### Phase 3 — PDF Generation (React-PDF, Awesome-CV inspired)
- [ ] Install: `pnpm add @react-pdf/renderer` + `@types/react` (React types, no React DOM needed for server render)
- [ ] Download font files to `public/fonts/`: Source Sans 3 (Regular, Bold, Light) + Roboto (Regular, Bold) from Google Fonts — TTF format
- [ ] `src/pdf/fonts.ts`: `Font.register()` all variants using `path.resolve()` absolute paths
- [ ] Design tokens in `src/pdf/theme.ts`: accent color (default `#0395DE`), font sizes matching Awesome-CV specs, spacing scale
- [ ] `src/pdf/components/PDFHeader.tsx`: name (32pt Roboto Bold), title (7.6pt), contact row with phone/email/LinkedIn/GitHub — replicate Awesome-CV header
- [ ] `src/pdf/components/PDFSectionHeader.tsx`: 16pt bold, first 3 chars in accent color, 0.9pt horizontal rule below
- [ ] `src/pdf/components/PDFExperience.tsx`, `PDFEducation.tsx`, `PDFSkills.tsx`
- [ ] `src/pdf/ResumePDF.tsx`: root `<Document><Page size="A4">` assembles all, margins matching Awesome-CV
- [ ] `scripts/generate-pdf.tsx`: reads `src/content/resume/resume.md` front matter directly (gray-matter), calls `renderToFile()` → `dist/Dmitrii_Sorokoletov_CV.pdf`
- [ ] Add `generate:pdf` npm script: `astro build && tsx scripts/generate-pdf.tsx`
- [ ] Test locally — compare PDF output side-by-side with current Awesome-CV resume

### Phase 3.5 — ATS Check Script (Claude API, ResumeWorded-like)
- [ ] `scripts/ats-check.ts`: reads `src/content/resume/resume.md` (plain text), calls `@anthropic-ai/sdk` with structured prompt
- [ ] Prompt covers: ATS score, keyword gaps vs JD, weak verbs, missing metrics, section feedback, bullet rewrites
- [ ] Writes structured `ats-report.md` with score, tables, and suggested rewrites
- [ ] Add `ats:check` npm script: `tsx scripts/ats-check.ts` (requires `ANTHROPIC_API_KEY` env var)
- [ ] Test locally with a sample JD — verify quality of feedback vs ResumeWorded

### Phase 4 — GitHub Actions
- [ ] `.github/workflows/deploy-pages.yml`
- [ ] `.github/workflows/build-pdf.yml`
- [ ] `.github/workflows/ats-check.yml`
- [ ] Configure GitHub Pages in repo settings (source: Actions)
- [ ] Test all three workflows

### Phase 5 — LinkedIn Achievements Integration
- [ ] Create a separate `/achievements` page rendering `LINKEDIN-ACHIEVEMENTS.md`
- [ ] Link from web CV header ("Full LinkedIn achievements →")
- [ ] This page is web-only (not included in the A4 PDF)

---

## Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| PDF generation | `@react-pdf/renderer` | Programmatic (not screenshot), proper font embedding, deterministic, no browser in CI |
| Playwright role | Dev preview only | `playwright open localhost:4321` for visual inspection; not used for PDF production |
| Data location | `src/content/` (Astro Collections) | Zod validation at build time, `getCollection()` access, type-safe |
| Data format | MD + YAML front matter | Version-control friendly, human-readable, Astro native |
| Tailwind version | v4 (`@tailwindcss/vite`) | CSS-based config (`@theme`), no `tailwind.config.js`, current standard |
| OpenResume / ResumeLM | None (reference only) | Both AGPL, both web-app-only, no CLI/API; ResumeLM also needs Supabase+DB+AI keys |
| ATS checking | Claude API (`@anthropic-ai/sdk`) | ResumeWorded-level feedback: scores, keyword gaps, bullet rewrites — no Docker/Java |
| Deployment | GitHub Pages via Actions | Free, fits the repo structure |
| PDF + web deploy | Single combined `deploy-pages.yml` | PDF always in sync with web; stable download URL |
| CV layout | Single-column A4 | ATS-friendly, scannable, professional |
| Package manager | pnpm | Fast, strict, disk-efficient |

---

## ATS Considerations for CV Design

Based on OpenResume's ATS heuristics and general ATS best practices:
- No tables, no multi-column layouts in the PDF (screen readers/ATS scanners parse left-to-right)
- No icons or images in the text flow
- Standard section headings: "Work Experience", "Education", "Skills"
- Use `data-testid`-like semantic HTML structure so the Playwright PDF captures clean text
- Fonts embedded in PDF (Playwright Chromium handles this)
- Skills listed as plain text, not as progress bars or charts

---

## Notes on Security

- The current `docs/Resume_Dmitrii_Sorokoletov.md` contains a **prompt injection payload** on lines 45–46 targeting AI-powered ATS systems. Remove before any deployment or submission.
- The Astro build process will strip this via Markdown rendering, but it should not exist in the source file.
