---
name: Dmitrii Sorokoletov
title: Senior SDET | QA Automation Engineer
phone: "+49-1520-388-0560"
email: sorokoletovdu@icloud.com
linkedin: https://linkedin.com/in/sorokoletovdu/
github: https://github.com/sorokoletovdu
permit: "German work permit: Blaue Karte"
languages:
  - English (Fluent)
  - Deutsch (Beginner)
  - Russian (Native)

summary: >
  Senior SDET and QA Architect with 8 years of experience specializing in TypeScript, Playwright,
  and CI/CD infrastructure. Proven track record of migrating legacy monoliths to greenfield,
  squad-owned testing ecosystems and building self-healing test data pipelines. Passionate about
  driving "Shift-Left" Agile maturity, mentoring developers on ISTQB gTAA (Generic Test Automation Architecture) principles, and acting as a
  Quality Advisor to seamlessly integrate automated quality gates into the SDLC.

experience:
  - company: Eurowings Digital
    title: QA Automation Engineer
    location: Cologne (Hybrid)
    start: "2024-12"
    end: present
    bullets:
      - Architected a modular, ISTQB-aligned E2E framework (**Playwright/TypeScript**) from greenfield, replacing a legacy monolith; decoupled page objects into domain-specific fixture factories aligned with the **Vue/Nuxt** application architecture.
      - Enforced architectural boundaries via **custom ESLint AST plugins**, banning locale-sensitive selectors and restricting locator creation to Page Objects, converting architectural rules into automated CI gates.
      - Engineered an API-driven test data factory (Factory + Strategy pattern) and a **self-healing cron pipeline** classifying live flight routes by schedule reliability, eliminating manual test data maintenance.
      - Designed **GitHub Actions** workflows for 4-shard parallel execution across 36 browser/locale project combinations; achieved **>90% branch coverage** on framework utilities via Vitest.
      - Acted as Quality Advisor across two cross-functional squads (10 developers); operationalized Shift-Left testing by establishing **asynchronous risk-based QA workflows** during backlog refinement and introducing developer self-testing checklists, decentralizing quality ownership and preventing QA bottlenecks.
      - Established AI-assisted test authoring by integrating **LLM agents** into engineering workflows; authored standardized prompt contexts (AGENTS.md / llms.txt) to align LLM-generated code with the project architecture, reducing framework maintenance overhead.

  - company: Quandoo
    title: QA Engineer
    location: Remote
    start: "2022-12"
    end: "2024-12"
    bullets:
      - Sole QA engineer on a cross-functional squad; built Playwright E2E and REST API integration test suites for the flagship restaurant-booking product, integrated into GitLab CI/CD pipelines, reducing manual regression from up to 2 days to a fully automated cycle and doubling deployment cadence from 1 to 2 releases per sprint.
      - Architected test frameworks covering Web, Mobile, and REST API layers, unifying tooling across QA and development teams and reducing recurring test failures from 30% to 15%.
      - Embedded quality gates into the SDLC by introducing Definition of Done and Definition of Ready artifacts, moving defect detection upstream and reducing late-stage defect escape rate.
      - Eliminated recurring patterns of user-reported defects by correlating production incident data with automation coverage gaps and realigning regression priorities toward high-impact user flows, sustaining a downward defect trend with no recurring defect categories in subsequent releases.

  - company: Grid Dynamics
    title: Senior Software QA Automation Engineer
    location: Remote
    start: "2022-01"
    end: "2022-12"
    bullets:
      - Engineered 250 automated UI regression tests using Puppeteer, Jest, and Pytest, reducing manual regression from 350 to 100 test cases per cycle and establishing a repeatable automated baseline across the frontend stack.
      - Consolidated JS (Puppeteer/Jest) and Python/Pytest test suites into a shared CI pipeline, extending the 250-test automated baseline across frontend and backend layers within a unified execution environment.
      - Root-caused and remediated infrastructure blockers through SQL, SSH, and API contract analysis, achieving zero critical incidents across 3 production deployments over a 3-month engagement.

  - company: ECommPay
    title: Senior Software QA Automation Engineer
    location: Remote
    start: "2018-04"
    end: "2022-01"
    bullets:
      - Architected and delivered 2,500 REST API end-to-end automated tests for a payment orchestration platform (80% regression coverage) and 20 financial verification tests for a reporting tool (75% coverage), using Codeception (PHP) and Pytest across backend and UI layers.
      - Introduced a structured defect management and retesting workflow, cutting the test execution and retest cycle from 2 days to 4 hours.
      - Triaged and eliminated root causes of production and infrastructure failures using SQL, SSH, Linux CLI, and Regex analysis, contributing to 99.99% service availability with only 3 outages under 5 minutes each across a nearly 4-year tenure.

education:
  - degree: "Bachelor's degree in Electronic Computing Machine Development and Technology"
    school: Southwest State University
    year: 2008

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
      - Jira
      - Postman
      - TestRail
      - Vue.js / Nuxt (SUT)
      - ESLint
      - Vitest
      - Zod
      - OpenAPI
  - category: Practices
    items:
      - Agile
      - Scrum
      - ISTQB Standards & Architecture
      - Shift-left
      - Defect Management
  - category: AI / LLM
    items:
      - AI Agents
      - Prompt Engineering
      - LLM Workflows
---
