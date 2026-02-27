# GitHub Actions Workflows {#root}

`spec://cv/workflows`

## Invariants {#invariants}

- No browser binary (Playwright, Chromium) in any workflow. PDF is pure Node.js.
- `ANTHROPIC_API_KEY` must be set as a GitHub repository secret for `ats-check.yml`.
- All workflows use `pnpm` — never `npm install` or `yarn`.
- The PDF artifact path inside `dist/` must be `Dmitrii_Sorokoletov_CV.pdf` — this is the filename
  the download button in `index.astro` links to.

---

## 1. `deploy-pages.yml` — Web + PDF Deploy {#deploy}

**Trigger**: push to `main`

**Rationale**: PDF is generated inside the same job as the site build. This guarantees the PDF
served on GitHub Pages is always in sync with the web page, and the download button always resolves.
No browser binary or preview server needed — React-PDF runs as pure Node.js.

```
Steps:
1. actions/checkout
2. pnpm/action-setup + actions/setup-node (LTS)
3. pnpm install --frozen-lockfile
4. pnpm astro build              → dist/
5. pnpm tsx scripts/generate-pdf.tsx
   → writes dist/Dmitrii_Sorokoletov_CV.pdf  (inside the build output)
6. actions/upload-artifact       → PDF artifact (traceability)
7. actions/deploy-pages          → deploy dist/ to GitHub Pages
```

**Outputs**:
- `https://<user>.github.io/cv/` — web page with "Download PDF" button
- `https://<user>.github.io/cv/Dmitrii_Sorokoletov_CV.pdf` — PDF at a stable URL
- Workflow artifact: `Dmitrii_Sorokoletov_CV.pdf`

**Download button** (`src/pages/index.astro`):
```html
<a href="/cv/Dmitrii_Sorokoletov_CV.pdf" download="Dmitrii_Sorokoletov_CV.pdf">
  Download PDF
</a>
```
The href is a relative path — no hardcoded domain, works for any GitHub Pages subdirectory.

---

## 2. `build-pdf.yml` — Manual PDF Build {#build-pdf}

**Trigger**: manual `workflow_dispatch` only

**Rationale**: Quick PDF rebuild without triggering a full site re-deploy. Useful when only the PDF
output needs to be checked (e.g. after updating resume data without changing web styles).

```
Steps:
1. actions/checkout
2. pnpm/action-setup + actions/setup-node (LTS)
3. pnpm install --frozen-lockfile
4. pnpm tsx scripts/generate-pdf.tsx  → Dmitrii_Sorokoletov_CV.pdf
5. actions/upload-artifact            → PDF artifact (downloadable from Actions UI)
```

**Output**: `Dmitrii_Sorokoletov_CV.pdf` as a downloadable Actions artifact.

---

## 3. `ats-check.yml` — ATS Score Report {#ats-check}

**Trigger**: manual `workflow_dispatch`

**Rationale**: Replaced ResumeAtsChecker (Spring Boot + Java 17 + Docker) with the Claude API.
Claude provides semantic feedback — bullet rewrites, scoring, section analysis — comparable to
ResumeWorded, with no Docker/Java overhead in CI.

**Why Claude API over ResumeAtsChecker**:
- No Java 17, no Docker, no Spring Boot startup time
- Semantic understanding vs keyword frequency counting
- Bullet-point rewrite suggestions (like ResumeWorded's "improve this line")
- One `ANTHROPIC_API_KEY` secret vs a full Docker Compose stack

```
Inputs:
  job_description: string   (paste full JD text into the workflow_dispatch UI)

Steps:
1. actions/checkout
2. pnpm/action-setup + actions/setup-node (LTS)
3. pnpm install --frozen-lockfile
4. pnpm tsx scripts/ats-check.ts
   Reads:  src/content/resume/resume.md (plain text — what ATS scanners see)
   Calls:  Claude API with structured prompt (see spec://cv/ats#prompt)
   Writes: ats-report.md
5. actions/upload-artifact  → ats-report.md artifact
```

**Output**: `ats-report.md` — structured ATS analysis, uploaded as a downloadable workflow artifact.

**Required secret**: `ANTHROPIC_API_KEY` in repository Settings → Secrets → Actions.
