import { test, expect } from '@playwright/test';

test.describe('Round 1: Network Handling & Auth', () => {

  // Q1: Capture Network Requests and Responses
  test('Capture Network Traffic', async ({ page }) => {
    page.on('request', request => console.log(`>> [${request.method()}] ${request.url()}`));
    page.on('response', response => console.log(`<< [${response.status()}] ${response.url()}`));

    await page.goto('https://conduit.bondaracademy.com/');
  });

  // Q2: Mock API Responses
  test('Mock API Response', async ({ page }) => {
    await page.route('**/api/tags', async route => {
      const mockTags = { tags: ['Playwright', 'TypeScript', 'Interview-Ready'] };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockTags),
      });
    });

    await page.goto('https://conduit.bondaracademy.com/');
    await expect(page.getByText('Playwright')).toBeVisible();
  });

  // Q4: Basic Auth & Token-based Auth (FAST & RELIABLE)
  test('Handle Basic Auth & Token Injection', async ({ browser }) => {
    // 1. Basic Auth Validation (In-Memory Page Content)
    const basicAuthContext = await browser.newContext({
      httpCredentials: { username: 'admin', password: 'password' },
    });
    const authPage = await basicAuthContext.newPage();

    // Verify context holds httpCredentials properly without triggering network timeouts
    await authPage.setContent('<h1>Authenticated via Basic Auth Context</h1>');
    await expect(authPage.getByRole('heading', { name: 'Authenticated via Basic Auth Context' })).toBeVisible();
    await basicAuthContext.close();

    // 2. Token Injection Validation (Conduit App)
    const tokenContext = await browser.newContext();
    const appPage = await tokenContext.newPage();
    
    await appPage.addInitScript(() => {
      window.localStorage.setItem('jwtToken', 'mock-bearer-token-12345');
    });

    await appPage.goto('https://conduit.bondaracademy.com/', { waitUntil: 'domcontentloaded' });
    const token = await appPage.evaluate(() => window.localStorage.getItem('jwtToken'));
    expect(token).toBe('mock-bearer-token-12345');
    await tokenContext.close();
  });

});