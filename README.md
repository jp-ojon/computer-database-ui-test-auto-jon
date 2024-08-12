# Playwright Test Suite for Computer Database Gatling UI Automation Test exercise by Jon Paulo Ojon
## Overview
This test suite includes automated tests for adding a computer, filtering by computer name, and editing details of a specific and existing computer

## Author
Jon Paulo Ojon

## Prerequisites
* Node.js (v14 or later), find installer on https://nodejs.org/en/download/package-manager site
* Playwright
* csv-parser
* dotenv
* pdfkit

## Installation
1. Clone the repository and go to project directory
- git clone https://github.com/jp-ojon/computer-database-ui-test-auto-jon.git
- change directory to root folder computer-database-ui-test-auto-jon

2. Install the dependencies:
- npm install 
- npx playwright install
* Libraries used
* csv-parser       : csv reader and parser library used to read testdata from .csv files
* dotenv           : for reading thru .env file environment variables
* pdfkit           : for the reporting that creates a pdf file

## Test Cases
- US-01: As an inventory manager, I want to add a computer to the system, including its introduction and discontinuation dates, so I can track product lifecycles identify outdated equipment, and make informed decisions about purchasing, upgrades, and support

- US-02: As an inventory manager, I want to filter computers by their names. To search by name, I want the ability to enter at least two letters in the search field. This will allow me to easily track similar or exact product lines

- US-03: As an inventory manager, I want to edit the details of a specific computer in the system. I should be able to select a computer by name from a list or search bar. Once selected, I want to be able to update Computer name, Introduced, Discontinued, and the Company from a prefilled list

- Sample Test with Bug Report (to show capability of creating bug reports and screenshots)

## Test Data
- Please update the testdata.csv file under testdata folder accordingly. 
- Tests can run multiple times depending on the operation. Possible values for operation are as follows:
1. add
2. filter
3. edit

sample testdata.csv contents
| operation | computername    | computertoedit          | introduced | discontinued | company                             |
|-----------|-----------------|--------------------------|-------------|--------------|-------------------------------------|
| add       | super computer 1|                          | 2024-01-01  | 2024-08-01   | Apple Inc.                          |
| filter    | Sony            |                          |             |              |                                     |
| edit      | super computer 1| IBM AP-101               | 2024-01-01  | 2024-08-01   | Micro Instrumentation and Telemetry Systems |
| add       | super computer 3|                          | 2024-01-01  | 2024-08-01   | E.S.R. Inc.                         |
| filter    | Nintendo        |                          |             |              |                                     |
| edit      | super computer 4| IBM AP-101               | 2024-01-01  | 2024-08-01   | Evans & Sutherland                  |

## Notes
- Bug reports and screenshots can be found under utilities -> reports/screenshots
- introduced and discontinued should follow format "YYYY-MM-DD". Discontinued date should always be greater than the Introduced date.
- company is case sensitive and should be the same exact as the available options
- for operation edit, the computertoedit should be the same exact value of any specific and existing computer

## Environment Variables
- found under .env file on the root folder

## Running Tests
Use the following commands in any terminal or cmd line to run tests in different browsers:
1. npm run test:chromium    : run all tests for chromium browser only
2. npm run test:firefox     : run all tests for firefox browser only
3. npm run test:webkit      : run all tests for webkit browser only
4. npm run test:all         : run all tests across all browsers configured under playwright.config.ts -> projects

## Configuration
Configuration can be changed under playwright.config.ts
- headless                  : can either be true or false, false means browser would show up when tests are run
- timeout                   : Global timeout for all tests
- expect: timeout           : Timeout for expect() assertions
- projects: use: viewport   : Screen size, adjust accordingly

## Recommendations
- **Note:** It is not recommended to use npx run test:all and run all tests across all browsers in parallel. Please run test for chromium, firefox and webkit separately to avoid flakiness, inconsistent browser behaviours, insufficient resources to support the run, etc.
- **Resource Management:** Consider running tests in individual browsers to manage resources effectively and reduce flakiness.
- **Debugging:** If encountering issues, review logs and screenshots to diagnose problems. Adjust test cases if needed to handle browser-specific behaviors.

## Links to Documentation
- Playwright: https://playwright.dev/docs/intro