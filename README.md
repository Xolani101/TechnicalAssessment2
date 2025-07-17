# TechnicalAssessment2

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Xolani101/TechnicalAssessment2.git
   cd TechnicalAssessment2
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running Tests

- **Run all Playwright tests:**
  ```sh
  npm test
  ```

## Generating and Viewing Reports

- **Playwright HTML Report:**
  - After running tests, view the HTML report with:
    ```sh
    npm run report
    ```
  - The report will open in your browser from the `playwright-report` folder.

- **Monocart Custom Report:**
  - After running tests, open the Monocart report with:
    ```sh
    npx monocart show-report monocart-report/index.html
    ```
  - This will serve the interactive custom report locally.

## Continuous Integration

- On every push or pull request to `main`, GitHub Actions will run tests and upload both the Playwright and Monocart reports as workflow artifacts.

## Project Structure

- `tests/` - Contains all test suites, test data, and test utilities.
- `db/` - Database-related scripts.
- `playwright.config.js` - Playwright configuration, including custom reporters.

---
For more details, see comments in the code and configuration files.