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

## Environment Variables

This project uses the [`dotenv`](https://www.npmjs.com/package/dotenv) package to manage environment variables.

1. Create a `.env` file in the project root.
2. Add the required environment variables. For example:

   ```env
   API_USER_EMAIL=your_email@example.com
   API_USER_PASSWORD=your_password
   PGHOST=localhost
   PGPORT=5432
   PGUSER=your_db_user
   PGPASSWORD=your_db_password
   PGDATABASE=your_db_name
   ```

3. The tests and scripts will automatically load these variables.

> **Note:** Do not commit your `.env` file to version control. It is already included in `.gitignore`.

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