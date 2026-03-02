# ATS Compatibility {#root}

`spec://cv/ats`

Covers two concerns: (1) CV layout rules that make the document ATS-parseable, and (2) the ATS
check script that provides ResumeWorded-level feedback via the Claude API.

## Invariants {#invariants}

- ATS layout rules apply to **both** the web page and the PDF. Neither output may violate them.
- The ATS check script reads the resume as **plain text** — exactly what an ATS scanner sees.
  It must not use the rendered HTML or the PDF binary.
- Claude model used: `claude-opus-4-6` (or latest available). Model choice must be explicit in
  `scripts/ats-check.ts` — never rely on a default.

---

## CV Layout Rules {#rules}

Based on OpenResume's ATS heuristics and general ATS best practices. These are hard constraints,
not suggestions:

- **No tables** — ATS scanners parse left-to-right and often mangle table cell ordering.
- **No multi-column layouts** — same reason as tables; columns produce garbled parse order.
- **No icons in text flow** — icon fonts and SVG icons are not extracted by ATS scanners;
  they appear as garbage characters or are skipped entirely.
- **Standard section headings** — use "Work Experience", "Education", "Skills" verbatim (or
  close variants). Exotic section names are not recognized.
- **Skills as plain text** — list items separated by commas or line breaks. No progress bars,
  no star ratings, no percentage charts — these are not extractable by ATS.
- **Fonts embedded in PDF** — `@react-pdf/renderer` handles this via `Font.register()`.
  Do not rely on system fonts.

---

## ATS Check Script {#script}

File: `scripts/ats-check.ts`
Spec: `spec://cv/workflows#ats-check`

```ts
// Implements: spec://cv/ats#script
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import matter from 'gray-matter';
```

### Input {#script.input}

- Resume: read `src/content/resume/resume.md` as plain text (YAML front matter stripped to
  key-value pairs, body included as-is). This mirrors what an ATS scanner ingests.
- Job description: `process.argv[2]` — accepts one of:
  - A file path (e.g. `docs/JOB-DESCRIPTION-EXAMPLE.md`) — read from disk
  - A raw text string — used as-is
  - Omitted with stdin piped — read from stdin

  In CI (`ats-check.yml`), the `jd_file` workflow input (default:
  `docs/JOB-DESCRIPTION-EXAMPLE.md`) is passed as the file path argument.

### Claude API Prompt {#prompt}

Send a single `messages` API call with `model: 'claude-opus-4-6'`.

```ts
// Implements: spec://cv/ats#prompt
const response = await client.messages.create({
  model: 'claude-opus-4-6',
  max_tokens: 2048,
  messages: [{
    role: 'user',
    content: `You are an expert ATS (Applicant Tracking System) analyst...

Resume:
<resume>
${resumeText}
</resume>

Job Description:
<jd>
${jobDescription}
</jd>

Provide a structured ATS analysis in Markdown format covering:
1. Overall ATS match score (0–100) with brief reasoning
2. Missing keywords/phrases from the JD not present in the resume
3. Weak action verbs or overused phrases to replace
4. Bullet points lacking quantifiable metrics (list top 3–5)
5. Section-by-section feedback (Experience, Skills, Education)
6. Specific bullet point rewrite suggestions (top 3–5, show before/after)`,
  }],
});
```

### Prompt coverage {#prompt.coverage}

The prompt must produce feedback on all of the following:
- Overall ATS match score (0–100) with reasoning
- Missing keywords/phrases from the JD not in the resume
- Weak action verbs or overused phrases with replacement suggestions
- Bullet points lacking quantifiable metrics
- Section-by-section analysis (Experience, Skills, Education)
- Specific bullet point rewrites: before → after pairs (top 3–5)

### Output {#output}

File: `ats-report.md` (written to the repo root, uploaded as a workflow artifact).

Structure:
```markdown
# ATS Report — [date]

## Score: XX/100

[Reasoning paragraph]

## Missing Keywords
| Keyword | JD Context |
|---|---|
| ... | ... |

## Weak Action Verbs
| Current | Suggested |
|---|---|
| ... | ... |

## Bullets Lacking Metrics
- ...

## Section Feedback
### Experience
...
### Skills
...
### Education
...

## Bullet Rewrites
**Before**: ...
**After**: ...
```
