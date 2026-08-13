import { test, expect } from '@playwright/test';
import { z } from 'zod';

test.describe('Round 3: API, Schemas, Visuals & Multi-Context', () => {
// Q1: Direct API Request + Schema Validation using Zod
  test('API Request and Zod Schema Validation', async ({ request }) => {
    // 1. Send direct HTTP GET request using Playwright's APIRequestContext
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // 2. Define expected JSON Schema structure using Zod
    const postResponseSchema = z.object({
      userId: z.number(),
      id: z.number(),
      title: z.string(),
      body: z.string(),
    });

    // 3. Validate response structure matches schema at runtime
    const parsedData = postResponseSchema.parse(responseBody);
    expect(parsedData.id).toBe(1);
    console.log(`[Schema Verified] Post Title: "${parsedData.title.slice(0, 20)}..."`);
  });

  // Q2: Visual Regression / Snapshot Testing
  test('Visual Regression Snapshot Check', async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/login');

    // Mask dynamic or moving elements if necessary, then take/compare screenshot
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixelRatio: 0.05, // Allow up to 5% visual variance
    });
  });

  // Q3: Handling Multi-Tab / New Window Contexts
  test('Handle Multi-Tab Navigation', async ({ page, context }) => {
    await page.setContent('<a href="https://conduit.bondaracademy.com" target="_blank" id="open-tab">New Tab</a>');

    // Listen for the new page event BEFORE clicking the link
    const pagePromise = context.waitForEvent('page');
    await page.click('#open-tab');

    // Await the new page handle
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    expect(newPage.url()).toContain('conduit.bondaracademy.com');
  });

  // Q4: Handling iFrames
  test('Handle iFrame Locators and Actions', async ({ page }) => {
    await page.setContent(`
      <iframe id="test-frame" srcdoc="<button id='frame-btn'>Inside Frame</button>"></iframe>
    `);

    // Target the element inside the frame using frameLocator
    const frameButton = page.frameLocator('#test-frame').locator('#frame-btn');
    await expect(frameButton).toBeVisible();
    await frameButton.click();
  });

});