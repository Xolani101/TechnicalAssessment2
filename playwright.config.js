/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['monocart-reporter', { name: 'Monocart Custom Report', outputFile: './monocart-report/index.html' }]
  ],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    // UI tests - run on all browsers
    {
      name: 'UI Tests - Chromium',
      testMatch: /.*uiautomationtesting\.spec\.js/,
      use: { browserName: 'chromium' }
    },
    {
      name: 'UI Tests - Firefox', 
      testMatch: /.*uiautomationtesting\.spec\.js/,
      use: { browserName: 'firefox' }
    },
    {
      name: 'UI Tests - WebKit',
      testMatch: /.*uiautomationtesting\.spec\.js/,
      use: { browserName: 'webkit' }
    },
    // API tests - run only on Chromium
    {
      name: 'API Tests',
      testMatch: /.*apitesting\.spec\.js/,
      use: { browserName: 'chromium' }
    }
  ],
};

module.exports = config;
