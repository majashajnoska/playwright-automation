## 📌 Overview

This repository contains an automation framework built using Playwright
, designed for end-to-end testing of web applications. It includes both UI and API testing utilities and is designed to be scalable, maintainable, and CI/CD ready.

---

## 🛠️ Features

- Cross-Browser Testing: Supports Chromium, Firefox, and WebKit browsers.
- Modular Architecture: Organized into reusable components like page objects, test data, and fixtures.
- Dynamic Test Data: Uses Faker to generate realistic random test data.
- Environment Variables: Configure runtime variables in a .env file. Example variables: BASE_URL, ADMIN_EMAIL, etc.
- API Testing: Includes utilities for API endpoint testing.
- Comprehensive Testing: Includes positive scenarios, API validations, and end-to-end UI flows.
- CI/CD Ready: Integrated with GitHub Actions; uses Secrets to store sensitive data like API tokens securely.

---

## 📁 Project Structure

```bash
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── api/                    # API testing utilities
├── fixtures/               # Test fixtures
├── page_objects/           # Page Object Model classes
├── testData/               # Test data files
├── tests/                  # Test scripts
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project metadata and dependencies
└── playwright.config.js     # Playwright configuration
```

---

## 🚀 Setup & Installation

Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

Steps
1. Clone the repository:
```bash
git clone https://github.com/majashajnoska/playwright-automation.git
cd playwright-automation
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
- Copy .env.example to .env:
```bash
cp .env.example .env
```
- Fill in the required values (BASE_URL, ADMIN_EMAIL, etc.).
4. Set up browsers:
```bash
npx playwright install
```

---

## 🧪 Running Tests

- Run all tests:
```bash
npx playwright test
```
- Run tests in a specific browser:
```bash
npx playwright test --project=firefox
```
- Run tests in headed mode:
```bash
npx playwright test --headed
```

---

## 📊 Test Coverage & Reporting

- Covers positive scenarios, API validations, and end-to-end UI flows.
- Dynamic test data ensures robustness across different inputs.
- Generate HTML reports for detailed results:
```bash
npx playwright show-report
```

---

## 🔒 GitHub Actions & Secrets

- CI/CD workflows are located in .github/workflows/.