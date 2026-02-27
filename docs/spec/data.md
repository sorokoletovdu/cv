# Data Layer {#root}

`spec://cv/data`

## Invariants {#invariants}

- `src/content/resume/resume.md` is the **single source of truth** for web and PDF outputs.
- All YAML front matter is validated by Zod at build time. A schema violation fails the build immediately.
- `src/content/achievements/achievements.md` feeds the `/achievements` web page only — never the PDF.
- No separate `src/data/` directory. Data is accessed exclusively via `getCollection()` / `getEntry()`.

---

## File Format {#format}

Both content files follow the Astro Content Collections convention: YAML front matter (machine-readable,
Zod-validated) + optional Markdown body (free-text narrative, not rendered on the 1-page CV).

Files live in `src/content/<collection>/` so Astro picks them up automatically and applies the Zod
schema from `src/content/config.ts` at build time.

---

## Resume YAML Schema {#schema}

File: `src/content/resume/resume.md`

```yaml
---
name: string               # Full name — displayed at 32pt in PDF header
title: string              # Position title — displayed at 7.6pt in PDF header
phone: string
email: string
linkedin: string           # Full URL: https://linkedin.com/in/...
github: string             # Full URL: https://github.com/...
permit: string             # e.g. "German work permit: Blaue Karte"
languages:
  - string                 # e.g. "English (Fluent)", "Deutsch (Beginner)"

experience:
  - company: string
    title: string
    location: string       # e.g. "Cologne (Hybrid)" or "Remote"
    start: YYYY-MM          # ISO month: 2024-12 — stored as ISO, rendered as "Dec 2024"
    end: YYYY-MM | "present" # "present" is lowercase in data; rendered as "Present"
    bullets:
      - string             # Each bullet: one achievement, one line

education:
  - degree: string
    school: string
    location: string

skills:
  - category: string       # e.g. "Test Automation", "CI/CD"
    items:
      - string             # Plain text — no icons, no progress bars (ATS rule)
---

<!-- Narrative / extended content below — not rendered on 1-page CV -->
```

### Example values {#schema.example}

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
```

---

## Zod Validation {#validation}

File: `src/content/config.ts`

The Zod schema mirrors the YAML structure above. Astro calls `getCollection()` / `getEntry()` at
build time and throws if any field is missing, wrongly typed, or out of the expected range.

Key validation points:
- `start` / `end` are validated with `/^\d{4}-\d{2}$/` regex, or the literal `"present"` for `end`.
  Not native `Date` objects — YAML month-only strings have no standard JS mapping.
- `bullets` is `z.array(z.string()).min(1)` — empty bullet arrays fail the build.
- `skills[].items` is `z.array(z.string())` — enforces plain text, no nested objects.

### Date rendering {#validation.dates}

ISO month strings in the data layer are converted to human-readable display using
[dayjs](https://day.js.org): `"2024-12"` → `"Dec 2024"`, `"present"` → `"Present"`.

The formatting utility lives at `src/lib/formatDate.ts` and is used by both
`src/components/WorkExperience.astro` and `src/pdf/components/PDFExperience.tsx`.

---

## Achievements Schema {#achievements}

File: `src/content/achievements/achievements.md`

Minimal YAML front matter (exact schema TBD at implementation time). Contains LinkedIn achievement
entries rendered on the `/achievements` web page. Never referenced by `scripts/generate-pdf.tsx`.
