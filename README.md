# QA Interview Automation

Playwright + TypeScript test suite covering UI and API automation for the QA interview assessment.

---

## Stack

- [Playwright](https://playwright.dev/) — browser automation and API testing
- [TypeScript](https://www.typescriptlang.org/) — strict mode
- [@faker-js/faker](https://fakerjs.dev/) — randomised test data
- [dotenv](https://github.com/motdotla/dotenv) — environment configuration

---

## Prerequisites

- Node.js 18+
- npm

---

## Setup

**1. Clone the repository**

```bash
git clone https://github.com/irisda/qa-automation-playright-test.git
cd qa-automation-playright-test
```

**2. Install dependencies**

```bash
npm install
```

**2. Install browsers**

```bash
npm run install:browsers
```

**3. Configure environment**

```bash
cp .env.example .env
```

The default values in `.env.example` point to the live test environments and work out of the box:

```
UI_BASE_URL=https://demoqa.com
API_BASE_URL=https://jsonplaceholder.typicode.com
```

---

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests (UI + API) |
| `npm run test:ui` | Run UI tests only |
| `npm run test:api` | Run API tests only |
| `npm run test:headed` | Run all tests in headed (visible browser) mode |
| `npm run report` | Open the last HTML report |

### Running a Specific Test with `--grep`

Use `--grep` to target a single test or describe block by name, and `--debug` to open Playwright Inspector for step-by-step debugging:

```bash
npx playwright test src/tests/practiceForm.spec.ts --grep "Task 5 — Practice Form" --debug
```

| Part | Purpose |
|---|---|
| `src/tests/practiceForm.spec.ts` | Scope to a single spec file |
| `--grep "Task 5 — Practice Form"` | Match tests by name (supports regex) |
| `--debug` | Opens Playwright Inspector — step through actions, inspect locators |

---

## Project Structure

```
src/
├── pages/          # Page Object Model classes
├── services/       # API service classes
├── tests/          # Test specs and fixtures
├── types/          # TypeScript types and enums
└── utils/
    ├── dateHelpers.ts
    └── testData/   # Faker-generated test data
playwright.config.ts
```

---

## Failure Diagnostics

On failure, Playwright automatically collects:

| Artifact | Condition |
|---|---|
| Screenshot | Every failure |
| Trace | On first retry (open with `npx playwright show-trace <path>`) |
| Video | On first retry |

Artifacts are saved under `test-results/`. The HTML report is generated at `playwright-report/`.