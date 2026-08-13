import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // Define strong types for class members
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  /**
   * @param page - Playwright core Page object passed from test/fixture context
   */
  constructor(page: Page) {
    this.page = page;

    // Locators use user-visible accessibility attributes (best practice)
    // Note: Locators here are LAZY; no network/DOM query happens during class instantiation.
    this.usernameInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
  }

  /**
   * Navigates directly to the Login page URL.
   */
  async navigate(): Promise<void> {
    await this.page.goto('https://conduit.bondaracademy.com/login');
  }

  /**
   * Action method encapsulating the login sequence.
   * Playwright automatically handles auto-waiting for elements to be visible/enabled before acting.
   * 
   * @param user - Target user email/username
   * @param pass - Target user password
   */
  async login(user: string, pass: string): Promise<void> {
    await this.usernameInput.fill(user); // Auto-waits for input to be editable
    await this.passwordInput.fill(pass);  // Auto-waits for input to be editable
    await this.loginButton.click();       // Auto-waits for button to be clickable
  }
}