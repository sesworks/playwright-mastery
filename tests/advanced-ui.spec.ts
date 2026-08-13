import { test, expect } from '../fixtures/customFixtures';

test.describe('Round 2: UI Mechanics & Fixtures', () => {

  test('Custom Fixture & Page Object Model Demo', async ({ page, loginPage }) => {
    await page.goto('https://conduit.bondaracademy.com/login');
    await loginPage.login('testuser@example.com', 'password123');
  });

  test('Handle Alerts, Frames, and Dropdowns', async ({ page }) => {
    // 1. Handle Dialog/Alert
    page.on('dialog', async dialog => {
      console.log(`Alert text: ${dialog.message()}`);
      await dialog.accept();
    });

    // 2. Handle Frames
    // const frame = page.frameLocator('#my-frame');
    // await frame.getByRole('button').click();

    // 3. Handle Dropdowns
    // await page.locator('select#dropdown').selectOption({ label: 'Option 1' });
  });
});