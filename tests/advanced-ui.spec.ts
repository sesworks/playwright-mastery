// Import 'test' and 'expect' from the CUSTOM fixture file, NOT '@playwright/test' directly!
import { test, expect } from '../fixtures/customFixtures';

test.describe('Round 2: Advanced UI Mechanics & POM', () => {

  /**
   * Scenario 1: Page Object Model via Custom Fixture Injection
   * { loginPage } is automatically instantiated and injected by customFixtures.ts
   */
  test('POM Navigation and Custom Fixture Injection', async ({ loginPage }) => {
    // Call high-level business methods provided by the POM
    await loginPage.navigate();
    await loginPage.login('qa-demo@example.com', 'password123');
  });

  /**
   * Scenario 2: Native Browser Dialog Handling (Alerts, Confirms, Prompts)
   * Playwright auto-dismisses alerts by default. To capture or accept them, register an event listener.
   */
  test('Handle Native Browser Dialogs', async ({ page }) => {
    // Set up event listener BEFORE triggering the dialog action
    page.on('dialog', async dialog => {
      console.log(`[Dialog Caught] Message: "${dialog.message()}" | Type: ${dialog.type()}`);
      
      // Accept (click OK) on the native alert/confirm dialog
      await dialog.accept();
    });

    // Inject temporary HTML into the DOM to test alert handling without external dependencies
    await page.setContent('<button onclick="alert(\'Playwright Alert Test!\')">Trigger Alert</button>');
    
    // Clicking triggers the alert -> listener catches it -> accepts it automatically
    await page.getByRole('button', { name: 'Trigger Alert' }).click();
  });

  /**
   * Scenario 3: Standard HTML `<select>` Dropdowns
   */
  test('Handle HTML Dropdowns & Assertions', async ({ page }) => {
    // Inject custom HTML dropdown element
    await page.setContent(`
      <select id="skills">
        <option value="pw">Playwright</option>
        <option value="java">Java</option>
        <option value="ts">TypeScript</option>
      </select>
    `);

    const dropdown = page.locator('#skills');

    // selectOption selects by 'value', 'label', or index
    await dropdown.selectOption('ts');

    // Web-first assertion: auto-retries until value matches
    await expect(dropdown).toHaveValue('ts');
  });

});