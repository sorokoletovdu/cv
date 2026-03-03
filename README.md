# CV

Personal CV builder. One Markdown file drives three outputs: a web page (GitHub Pages),
a downloadable PDF, and an ATS compatibility report.

## Architecture

```
src/content/resume/resume.md   ← single source of truth (YAML front matter)
        │
        ├── Astro build ──────→ GitHub Pages (web CV)
        ├── generate-pdf.tsx ─→ dist/Dmitrii_Sorokoletov_CV.pdf
        └── ats-check.ts ─────→ ats-report.md (Claude API)
```

## Project Structure

```
src/
  content/resume/resume.md       CV data (YAML front matter)
  components/                    Astro components (web layout)
  pdf/                           React-PDF components (PDF layout)
  pdf/fonts.ts                   Font registration (Open Sans via @fontsource)
  pdf/theme.ts                   Design tokens
scripts/
  generate-pdf.tsx               Renders PDF from resume front matter
  ats-check.ts                   Runs ATS analysis against a job description
docs/
  JOB-DESCRIPTION-EXAMPLE.md    Example JD for local ATS checks
```

## Commands

All commands run from the project root.

| Command | Action |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build site to `./dist/` |
| `pnpm generate:pdf` | Build site + generate PDF |
| `pnpm ats:check <jd-file>` | Run ATS check against a job description file |

### ATS check — local usage

Requires `ANTHROPIC_API_KEY` in `.env`:

```sh
pnpm ats:check docs/JOB-DESCRIPTION-EXAMPLE.md
```

Writes `ats-report.md` to the project root.

## CI/CD Workflows

| Workflow | Trigger | Output |
|---|---|---|
| `deploy-pages` | Push to `master` | Deploys web CV to GitHub Pages; uploads PDF artifact (90 days) |
| `build-pdf` | Manual | Uploads PDF artifact (30 days) |
| `ats-check` | Manual (JD file path input) | Uploads `ats-report.md` artifact (90 days); requires `ANTHROPIC_API_KEY` secret |

## Tech Stack

- **Framework**: Astro 5, TypeScript strict mode
- **Styling**: Tailwind CSS v4 (CSS `@theme`, no config file)
- **PDF**: `@react-pdf/renderer` — pure Node.js, no browser
- **Fonts**: `@fontsource/open-sans` — WOFF from npm
- **ATS**: `@anthropic-ai/sdk`
- **Package manager**: pnpm
