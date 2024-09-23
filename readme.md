# Playwright Sauce-Demo Automation 
This project aims to automate various scenarios of Sauce-Demo using Playwright

## TechStack
- Playwright
- Typescript
- Allure-Report

## Pre-requisite
- NodeJs
- Typescript

## Installation
-  Install nodejs based on OS from [Official Website](https://nodejs.org/en/download/package-manager)
- Install typescript- `npm install -g typescript`
- Install all dependencies- `npm install`

## How to execute the tests
-  To execute all the tests in all browsers(Chromium,Firefox,Webkit),-Run the command-`npm run test`
- To execute specific test in all browsers,change in package.json `"execute:scrpit": "npx playwright test ./tests/<Name of test case>.ts"`
- To execute specific test in specific browsers,change in package.json `"execute:scrpit": "npx playwright test ./tests/<Name of test case>.ts --project=<Name of the browser>"` for different browser name refer as playwright.config.ts:53

## How to add new test cases
- All the test cases should be under the folder tests/spec
- All the test cases should have the extension of `.spec.ts`
- Every page within the webite should have page object class under tests/pages
- Post exccution the report will be avaiable under the allure-report folder