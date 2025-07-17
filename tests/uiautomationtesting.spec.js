const { test, expect } = require('@playwright/test');
const { getTestData } = require('./utils/utils');

const testData = getTestData();

test.describe('UI Automation E2E', () => {
  for (const data of testData) {
    test(`Login, add ${data.item}, checkout, and logout [${data.username}]`, async ({ page, browserName }) => {
      // Launch app
      await page.goto('https://www.saucedemo.com');

      // Login
      await page.fill('#user-name', data.username);
      await page.fill('#password', data.password);
      await page.click('#login-button');
      await expect(page).toHaveURL(/inventory/);

      // Add item to cart
      await page.click(`text=${data.item}`);
      await page.click('button:has-text("Add to cart")');
      await page.click('.shopping_cart_link');
      await expect(page.locator('.cart_item')).toContainText(data.item);

      // Checkout
      await page.click('button:has-text("Checkout")');
      await page.fill('#first-name', 'Test');
      await page.fill('#last-name', 'User');
      await page.fill('#postal-code', '12345');
      await page.click('input[type=submit]');
      await page.click('button:has-text("Finish")');
      await expect(page.locator('.complete-header')).toHaveText(/Thank you/);

      // Logout
      await page.click('#react-burger-menu-btn');
      await page.click('#logout_sidebar_link');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  }
});
