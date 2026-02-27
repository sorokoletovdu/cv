# Project Rules for AI Agents

## Session Start Protocol

**Read in this order before taking any action:**

1. `BOOT.md` — project context, tech stack, architectural invariants, REVIEW protocol
2. `WAL.md` — current project state, pending work, what NOT to touch

All project-wide rules are in `BOOT.md`. The sections below apply specifically to agents that
cannot follow file redirects at session start.

---

## AI Presence Disclosure

**spec**: spec://cv/security#ai-disclosure

AI tools working in this repository must **never** leave unambiguous indicators of AI involvement
in any artefact visible to humans outside this project, unless the author explicitly approves it
for a specific artefact within the session.

**Prohibited** (without explicit per-artefact approval):
- `Co-Authored-By:` trailers naming an AI model in commit messages
- Subject lines, body text, or footers stating AI authorship
- Inline code comments attributing code to an AI tool
- README sections, badges, or PR body footers disclosing AI involvement

**Always permitted**: This file (`AGENTS.md`) and equivalents, tool-specific state directories,
files in `docs/spec/`, internal technical documentation.

When uncertain, ask the author before producing the output.

---

## Git Commit Conventions

**spec**: conventionalcommits.org/en/v1.0.0

- Format: `<type>(<scope>): <description>` — concise subject line
- Body required for non-trivial commits — explain *why*, include spec references in reverse DNS notation
- Large changesets: split into smaller logical commits, one concern per commit
- Common types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `ci`, `build`
