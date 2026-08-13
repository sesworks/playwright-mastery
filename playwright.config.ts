import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts', // <--- Ensures it picks up .spec.ts files
  fullyParallel: true, // Round 2: Q9 - Parallel Execution across files & tests
  workers: process.env.CI ? 2 : undefined, // Parallel worker scaling
  
  // Round 1: Q5 - Test Retries Configuration
  retries: process.env.CI ? 2 : 0, 

  use: {
    // Round 2: Q11 - Headless Mode (toggleable via CLI --headed)
    headless: true,

    // Round 1: Q3 - Screenshots & Videos
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Round 2: Q5 - Trace Viewer capturing
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});