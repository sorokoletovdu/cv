# CV Builder — Spec Index {#root}

URI scheme: `spec://cv/<document>#<section>[.<subsection>]`

Files live in `docs/spec/`. Anchors use extended Markdown syntax `{#id}` — rendered as clickable
links by GitHub and most Markdown renderers.

## Control Plane {#control-plane}

| File | Role |
|---|---|
| [`BOOT.md`](../../BOOT.md) | Universal AI session entry point — read first every session |
| [`WAL.md`](../../WAL.md) | Write-Ahead Log — current project state, pending work, REVIEW items |

WAL uses URI `spec://cv/wal` for reference. High-value WAL anchors:
`spec://cv/wal#state`, `spec://cv/wal#pending`, `spec://cv/wal#reviews`, `spec://cv/wal#dntouch`

## Spec Documents {#documents}

| URI prefix | File | Covers |
|---|---|---|
| `spec://cv/architecture` | [architecture.md](architecture.md) | Project overview, target file structure, open-source tool ADRs, key design decisions |
| `spec://cv/data` | [data.md](data.md) | Data layer: YAML front matter format, Zod schemas, Content Collections |
| `spec://cv/design` | [design.md](design.md) | Visual design: font/color/typography specs for React-PDF |
| `spec://cv/fonts` | [fonts.md](fonts.md) | Font specification: Open Sans weights, web vs PDF loading |
| `spec://cv/stack` | [stack.md](stack.md) | Tech stack per technology: Astro, Tailwind v4, TypeScript, React-PDF |
| `spec://cv/workflows` | [workflows.md](workflows.md) | GitHub Actions: deploy-pages, build-pdf, ats-check |
| `spec://cv/ats` | [ats.md](ats.md) | ATS design rules for CV layout + ATS check script spec |
| `spec://cv/security` | [security.md](security.md) | Security constraints (prompt injection, secrets, AI disclosure policy) |

## Anchor reference {#anchors}

Selected high-value anchors for use in `// Implements:` and `// See:` code comments:

```
spec://cv/architecture#overview            — what this system is
spec://cv/architecture#structure           — target directory layout
spec://cv/architecture#decisions           — ADR table (all key choices)

spec://cv/data#schema                      — YAML front matter contract
spec://cv/data#validation                  — Zod schema enforcement

spec://cv/design#fonts                     — registered font variants
spec://cv/design#typography                — point sizes per element
spec://cv/design#colors                    — accent + gray palette
spec://cv/design#header                    — name/title/contact row layout
spec://cv/design#section-header            — first-3-chars accent + rule

spec://cv/stack#pdf                        — @react-pdf/renderer rationale
spec://cv/stack#pdf.fonts                  — Font.register() absolute paths gotcha
spec://cv/stack#tailwind                   — @theme config, no tailwind.config.js

spec://cv/workflows#deploy                 — deploy-pages.yml steps + output
spec://cv/workflows#build-pdf              — build-pdf.yml steps
spec://cv/workflows#ats-check              — ats-check.yml inputs/steps/output

spec://cv/ats#rules                        — ATS layout invariants (no tables, no columns)
spec://cv/ats#prompt                       — Claude API prompt structure

spec://cv/security#injection               — prompt injection removal requirement
spec://cv/security#ai-disclosure           — AI presence disclosure policy (prohibited + permitted)
spec://cv/security#ai-disclosure.prohibited — what AI tools must never put in commits/code/docs
spec://cv/security#ai-disclosure.permitted  — what is always allowed (boot files, spec docs, memory)
```
