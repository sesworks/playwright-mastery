import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// 1. Define the TypeScript type for custom fixtures available in tests
type MyFixtures = {
  loginPage: LoginPage;
};

// 2. Extend Playwright's base test runner with custom fixtures
export const test = base.extend<MyFixtures>({
  /**
   * Custom 'loginPage' fixture definition.
   * Playwright passes built-in fixtures (like { page }) into custom fixtures.
   */
  loginPage: async ({ page }, use) => {
    // SETUP: Instantiate the Page Object with the active test page
    const loginPage = new LoginPage(page);

    // EXECUTE / PASS: Provide the initialized page object to the test function
    await use(loginPage);

    // TEARDOWN: Any code written after 'use()' runs after the test completes (e.g., cleanup)
  },
});

// 3. Re-export 'expect' so tests can import both 'test' and 'expect' from one file
export { expect } from '@playwright/test';