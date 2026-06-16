import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './frontend/tests/e2e',
  testMatch:    '**/*.spec.js',
  timeout:      30_000,           
  retries:      process.env.CI ? 2 : 0, 
  reporter: 'list',
  outputDir: './frontend/tests/e2e/test-results',

  use: {
    baseURL:     'http://localhost:5174', 
    trace:       'on-first-retry',       
    screenshot:  'only-on-failure',      
    video:       'retain-on-failure',    
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  ],
});