# Visual Design {#root}

`spec://cv/design`

Reference: Awesome-CV (`posquit0/Awesome-CV`, LPPL-1.3c). The LaTeX source is not used — only the
visual output is replicated in `@react-pdf/renderer` components.

## Invariants {#invariants}

- All font sizes and spacing values in `src/pdf/theme.ts` must match this spec exactly.
- Fonts must be registered via `Font.register()` with absolute paths before any component renders.
  See `spec://cv/fonts`.
- The accent color default is `#0395DE` (skyblue). Changing it requires updating `src/pdf/theme.ts`
  only — all components read from theme, never hardcode colors.

---

## Fonts {#fonts}

→ See `spec://cv/fonts` (`docs/spec/fonts.md`) for the full font specification
(family, weights, web vs PDF loading, Tailwind v4 usage rules, change guide).

**Summary:** Single family — **Open Sans** — for both web and PDF output.

---

## Typography {#typography}

| Element | Weight | Size | Notes |
|---|---|---|---|
| Name (header) | Bold 700 | 28pt | All caps, wide tracking |
| Position title | Regular 400 | 8pt | Wide letter-spacing, uppercase |
| Contact row | Regular 400 | 7.5pt | Separator: `·` (middle dot) |
| Section header label | Bold 700 | 10.5pt | First 3 chars in accent color |
| Entry title (role) | Bold 700 | 9pt | |
| Entry subtitle (company) | Regular 400 | 9pt | |
| Body / bullet text | Regular 400 | 8.5pt | |
| Date range | Light 300 | 8pt | Italic for location |

---

## Colors {#colors}

| Token | Hex | Usage |
|---|---|---|
| Accent (default: skyblue) | `#0395DE` | First 3 chars of section header; links |
| Dark gray | `#333333` | Primary text |
| Gray | `#5D5D5D` | Secondary text, dates |
| Light gray | `#999999` | Tertiary text, rules |

### Built-in accent themes {#colors.themes}

| Name | Hex |
|---|---|
| skyblue (default) | `#0395DE` |
| emerald | `#00A388` |
| red | `#DC3522` |
| darknight | `#131A28` |

Accent is defined once in `src/pdf/theme.ts`. All components import from theme.

---

## Header Layout {#header}

```
┌──────────────────────────────────────────────────────┐
│  FIRSTNAME LASTNAME          [28pt Bold, wide track]  │
│  Position Title              [8pt, wide track, caps]  │
│  phone · email · LinkedIn · GitHub    [7.5pt row]     │
└──────────────────────────────────────────────────────┘
```

- Name: 28pt Bold, dark gray `#333333`, uppercase, wide letter-spacing
- Title: 8pt Regular, gray `#5D5D5D`, uppercase, wide letter-spacing
- Contact row: phone, email, LinkedIn URL, GitHub URL separated by `·` (middle dot)
- No icons embedded in text flow (ATS rule — see `spec://cv/ats#rules`)

Component: `src/pdf/components/PDFHeader.tsx`

---

## Section Header {#section-header}

```
EXP erience ────────────────────────────────  (0.9pt rule, light gray)
^^^
accent color (first 3 chars)
```

- Label: 10.5pt Bold
- First 3 characters rendered in accent color `#0395DE`
- Remaining characters in dark gray `#333333`
- Followed immediately by a horizontal rule: 0.9pt, light gray `#999999`, full width

Component: `src/pdf/components/PDFSectionHeader.tsx`

---

## Page Layout {#page}

- Paper size: A4 (`210mm × 297mm`)
- Margins: top 36pt, bottom 36pt, left 48pt, right 48pt (approx. 12mm / 17mm)
- Single column throughout — no multi-column layouts
- `<Document><Page size="A4">` as the root in `src/pdf/ResumePDF.tsx`
