# LinkedIn Achievements — S.T.A.R. Format

> EWD E2E Testing Framework — Eurowings Digital

---

## Framework Architecture & Strategic Migration

- **Designed and built a greenfield cross-system E2E testing framework** (Playwright + TypeScript + Vitest) from scratch for a 9-locale airline web platform (AEM + API + Vue/Nuxt microfrontends), replacing a legacy monolithic repo. Established an ISTQB-aligned 4-layer architecture (POMs → Business Functions → Validation → Specs) with compile-time boundary enforcement via custom ESLint AST rules.

- **Led the strategic migration** away from a legacy monorepo with 120+ POMs, 33 helpers, and 20+ CI pipelines into a domain-driven, squad-owned framework. Conducted 3 pre-migration analyses (tech stack, POM audit, test data creation) totaling 2,600+ lines of technical documentation to assure the smooth transition. Replaced the monolithic PageManager (55 eager POM instantiations) with lean domain-specific fixture factories.

---

## Locale-Agnostic Selector Governance

- **Authored and enforced a `data-testid` naming convention** as a shift-left contract between QA and frontend squads across 9 locales. Implemented 10+ custom ESLint AST selectors that ban locale-sensitive locators (`getByText`, `getByLabel`, `:has-text`, `getByRole({name})`) and restrict locator construction to POM files only — turning architectural rules into automated CI gates.

---

## API-Driven Test Data Creation

- **Engineered a test data factory** using Factory + Strategy pattern to create test data via API calls (no UI, no legacy proxy API dependency). Implemented 5 test data strategies, a 3-level retry controller with attribute rotation and date shifting, and stateful HTTP session management with cookie-jar accumulation — backed by 95% branch coverage on critical modules.

- **Built an automated test data pipeline**: weekly CI cron job extracts live flight routes from API, classifies routes, filters by schedule reliability, and auto-commits updated route pools — keeping test data current without manual intervention.

---

## CI/CD & Quality Engineering

- **Designed 8 GitHub Actions workflows** including 4-shard parallel E2E execution, a 2×2 locale/browser smoke matrix with blob report merging, live API integration tests with sequential execution (preventing test data capacity exhaustion), and automated secret scanning. Configured dynamic Playwright project generation supporting up to 36 browser × locale combinations from environment variables.

- **Achieved 443 Vitest unit tests** for the testing framework itself — covering all test data strategies, API clients, retry logic, config validation, utilities, and business functions. Enforced per-file branch thresholds (95%) on critical infrastructure and banned `if` statements in helper code via ESLint to enforce functional/dictionary-first patterns.

---

## Testing Standards & Documentation

- **Established testing standards and comprehensive documentation** (TEST-STRATEGY, LOCATOR-STRATEGY, TEST-DATA-CREATION, CONTRIBUTING, ENVIRONMENT-SETUP, TESTID-CONVENTION) aligned with ISTQB CTFL/CTAL syllabi — covering EP, BVA, Decision Table, State Transition, and Error Guessing techniques mapped to actual test implementations. Created AI agent instruction files (AGENTS.md, CLAUDE.md, llms.txt) enabling consistent LLM-assisted development.
---

## Key Technologies

`Playwright` · `TypeScript (strict)` · `Vitest` · `ESLint 9 (AST rules)` · `Zod` · `OpenAPI/Kubb codegen` · `GitHub Actions` · `Page Object Model` · `Factory + Strategy pattern` · `ISTQB gTAA`
