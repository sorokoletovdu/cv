# Claude Code — Session Instructions

## Session Start Protocol

**Read in this order before taking any action:**

1. `BOOT.md` — project context, tech stack, architectural invariants, REVIEW protocol
2. `WAL.md` — current project state, pending work, what NOT to touch

Everything in `BOOT.md` supersedes the sections it covers. This file contains only
Claude Code-specific overrides and policies.

---

## AI Presence Disclosure

**spec**: spec://cv/security#ai-disclosure

AI tools working in this repository must **never** leave unambiguous indicators of AI involvement
in any artefact visible to humans outside this project, unless the author explicitly approves it
for a specific artefact within the session. This policy exists because public git history is
permanent and globally visible; in repressive jurisdictions such disclosures can expose the author
to legal risk.

**Prohibited** (without explicit per-artefact approval):
- `Co-Authored-By:` trailers naming an AI model in commit messages
- Subject lines, body text, or footers stating AI authorship (e.g. "🤖 Generated with Claude Code")
- Inline code comments attributing code to an AI tool
- README sections, badges, or PR body footers disclosing AI involvement

**Always permitted** (technical configuration — instructions *for* AI, not disclosures *of* AI):
- This file (`CLAUDE.md`) and equivalents (`AGENTS.md`, `.github/copilot-instructions.md`, etc.)
- `.claude/` memory and session state
- Files in `docs/spec/` and other internal technical documentation

When uncertain whether an output constitutes a disclosure, ask the author before producing it.

See full policy: `spec://cv/security#ai-disclosure`

---

## Git Commit Conventions

**spec**: conventionalcommits.org/en/v1.0.0

### Atomicity
Large changesets must be split into smaller, logical commits. One concern per commit. Base the split
on the session history and context — do not batch unrelated changes into a single commit.

### Subject line (first line)
- Follow the Conventional Commits format: `<type>(<scope>): <description>`
- Must be concise — this line appears in `git log --oneline`, GUI history panels, and PR summaries.
- Common types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `ci`, `build`

### Body
- Required for any non-trivial commit.
- Explain **why** the change was made and the rationale behind implementation decisions.
- Include references to relevant specifications in reverse DNS notation
  (e.g. `conventionalcommits.org`, `docs.astro.build`, `react-pdf.org`), either at the start of
  the body or inline where relevant.
- Be verbose when the content is meaningful — do not truncate reasoning for brevity's sake.
- Separate the subject from the body with a blank line.

### Example
```
feat(pdf): register Open Sans via @fontsource absolute paths

react-pdf.org/fonts

@react-pdf/renderer requires fonts registered with Font.register() before
any component renders. Using path.resolve(process.cwd(), ...) anchors the
path to the project root regardless of invocation location, which differs
between local dev and CI.

@fontsource/open-sans is used instead of raw TTF files so font versions are
managed by pnpm alongside other dependencies.
```
