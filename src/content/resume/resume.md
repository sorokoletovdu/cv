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
    start: "2024-12"
    end: present
    bullets:
      - Architected a modular, ISTQB-aligned E2E framework (Playwright/TypeScript) from greenfield, replacing a legacy monolith; decoupled page objects into domain-specific fixture factories aligned with the Vue/Nuxt application architecture.
      - Enforced architectural boundaries via custom ESLint AST plugins, banning locale-sensitive selectors and restricting locator creation to Page Objects, converting architectural rules into automated CI gates.
      - Engineered an API-driven test data factory (Factory + Strategy pattern) and a self-healing cron pipeline classifying live flight routes by schedule reliability, eliminating manual test data maintenance.
      - Designed GitHub Actions workflows for 4-shard parallel execution across 36 browser/locale project combinations; achieved >90% branch coverage on framework utilities via Vitest.
      - Sole QA Automation Engineer embedded across two cross-functional squads (10 developers); drove Shift-Left testing from Sprint Refinement, conducted regular exploratory and release-cycle manual regression testing, and mentored developers on ISTQB gTAA principles to enable independent E2E test authorship.
      - Integrated AI agents into engineering workflows; standardized prompt contexts (AGENTS.md / llms.txt) to align LLM-generated code with project architecture, reducing maintenance overhead.

  - company: Quandoo
    title: QA Engineer
    location: Remote
    start: "2022-12"
    end: "2024-12"
    bullets:
      - Sole QA engineer on a cross-functional squad; built Playwright E2E and API integration test suites for the flagship restaurant-booking product, integrated into GitLab CI/CD pipelines, and reduced manual regression cycles to increase deployment cadence.
      - Architected test frameworks covering Web, Mobile, and API layers, unifying tooling across QA and development teams and reducing recurring test failures.
      - Embedded quality gates into the SDLC by introducing Definition of Done and Definition of Ready artifacts, moving defect detection upstream and reducing late-stage defect escape rate.
      - Reduced user-reported defects by correlating production incident data with coverage gaps and realigning regression priorities toward high-impact user flows.

  - company: Grid Dynamics
    title: Senior Software QA Automation Engineer
    location: Remote
    start: "2022-01"
    end: "2022-12"
    bullets:
      - Implemented automated UI tests using Puppeteer, Jest, and Pytest, replacing manual regression cycles with a repeatable automated baseline across the frontend stack.
      - Unified JS (Puppeteer/Jest) and Python/Pytest test suites into a shared CI pipeline, extending automated coverage across frontend and backend layers.
      - Diagnosed and resolved infrastructure blockers through SQL, SSH, and API contract analysis, streamlining test framework integration with zero critical incidents post-deployment.

  - company: ECommPay
    title: Senior Software QA Automation Engineer
    location: Remote
    start: "2018-04"
    end: "2022-01"
    bullets:
      - Built end-to-end automated test suites covering backend, API, and UI layers using Codeception (PHP) and Pytest, establishing full-stack regression coverage.
      - Introduced a structured defect management and retesting workflow, cutting the test execution and retest cycle from 2 days to 4 hours.
      - Triaged production and test infrastructure failures using SQL, SSH, Linux CLI, and Regex patterns, reducing recurring system downtime across release cycles.

education:
  - degree: "Bachelor's degree in Electronic Computing Machine Development and Technology"
    school: Southwest State University
    location: "Kursk, Russia"

skills:
  - category: Test Automation
    items:
      - TypeScript
      - Playwright
      - JavaScript
      - Node.js
      - Python
      - PyTest
      - PHP
      - Codeception
  - category: Testing Types
    items:
      - Web
      - Mobile
      - API
      - Integration
      - Exploratory
      - Regression
  - category: CI/CD
    items:
      - GitLab
      - GitHub Actions
      - Jenkins
      - Azure DevOps
  - category: Tools
    items:
      - Git
      - SQL
      - Linux
      - Docker
      - Vue.js
      - ESLint
      - Vitest
      - Zod
      - OpenAPI
  - category: AI / LLM
    items:
      - AI Agents
      - Prompt Engineering
      - LLM Workflows
  - category: Practices
    items:
      - Agile
      - Scrum
      - ISTQB gTAA
      - Shift-left
      - Defect Management
---
