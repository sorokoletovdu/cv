---
name: Dmitrii Sorokoletov
title: Senior SDET | QA Automation Engineer
phone: "+49-1520-388-0560"
email: sorokoletovdu@icloud.com
linkedin: https://linkedin.com/in/sorokoletovdu/
github: https://github.com/sorokoletovdu
permit: "German work permit: Niederlassungserlaubnis (NE)"
languages:
  - English (Fluent)
  - Deutsch (Beginner)
  - Russian (Native)

summary: >
  Senior SDET and QA Architect with 8 years of experience in TypeScript, Playwright, and CI/CD infrastructure. 
  Domain expertise spans aviation, marketplace, and fintech platforms. Proven track record of migrating legacy 
  monoliths to greenfield ecosystems, cutting test execution times by 42% and accelerating data provisioning 5x. 
  Expert in Shift-Left Agile maturity, mentoring developers on ISTQB-aligned architecture, and integrating automated quality gates.

experience:
  - company: Eurowings Digital
    title: QA Automation Engineer
    location: Cologne (Hybrid)
    start: "2024-12"
    end: Present
    bullets:
      - Architected a greenfield, ISTQB-aligned E2E framework (Playwright/TypeScript) replacing a legacy monolith; decoupled page objects into domain-specific fixture factories aligned with the Vue/Nuxt architecture.
      - Optimized CI workflows and dependency caching within the new framework, cutting baseline smoke test execution time by ~42% (from 13 minutes to 7.5 minutes).
      - Enforced architectural boundaries via custom ESLint AST plugins; banned locale-sensitive selectors and restricted locator creation to Page Objects, converting architectural rules into strict, automated CI gates.
      - Engineered an API-driven test data factory and a self-healing cron pipeline that dynamically classifies live flight routes; eliminated manual route discovery and accelerated test data provisioning by up to 5x.
      - Designed GitHub Actions workflows for 4-shard parallel execution across 36 browser/locale project combinations, achieving >90% branch coverage on framework utilities via Vitest.
      - Served as QA Lead and Quality Advisor across two cross-functional squads (10 developers); operationalized Shift-Left testing by establishing asynchronous risk-based QA workflows during backlog refinement and introducing developer self-testing checklists, eliminating QA bottlenecks.
      - Pioneered AI-assisted test authoring by integrating LLM agents into engineering workflows; authored standardized prompt contexts (AGENTS.md / llms.txt) to enforce project architecture, improving code consistency and reducing PR review rework by 50%.

  - company: Quandoo
    title: QA Engineer
    location: Remote
    start: "2022-12"
    end: "2024-12"
    bullets:
      - Sole QA engineer on a cross-functional squad; built Playwright E2E and REST API integration test suites for the flagship restaurant-booking product, integrated into GitLab CI/CD pipelines, reducing manual regression from up to 2 days to a fully automated cycle and doubling deployment cadence from 1 to 2 releases per sprint.
      - Architected test frameworks covering Web, Mobile, and REST API layers, unifying tooling across QA and development teams and reducing recurring test failures from 30% to 15%.
      - Implemented SDLC quality gates by defining and enforcing Definition of Done and Definition of Ready artifacts, shifting defect detection upstream and drastically reducing late-stage defect escape rates.
      - Eliminated recurring patterns of user-reported defects by correlating production incident data with automation coverage gaps and realigning regression priorities toward high-impact user flows, sustaining a downward defect trend with no recurring defect categories in subsequent releases.

  - company: Grid Dynamics
    title: Senior Software QA Automation Engineer (Consulting Engagement)
    location: Remote
    start: "2022-01"
    end: "2022-11"
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
      - Diagnosed and resolved root causes of production and infrastructure failures using SQL, SSH, Linux CLI, and Regex analysis, sustaining 99.99% service availability with only 3 outages under 5 minutes each across a nearly 4-year tenure.

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
      - REST API
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
      - Page Object Model (POM)
      - Test Data Management
      - Shift-left
      - Defect Management
  - category: AI / LLM
    items:
      - AI Agents
      - Prompt Engineering
      - LLM Workflows
      - Claude
      - GitHub Copilot
---
