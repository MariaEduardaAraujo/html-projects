import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir:      './tests/e2e',
  testMatch:    '**/*.spec.js',
  timeout:      30_000,           
  retries:      process.env.CI ? 2 : 0, 
  reporter:     [['html', { outputFolder: 'tests/e2e/report' }]],

  use: {
    baseURL:     'http://localhost:5174', 
    trace:       'on-first-retry',       
    screenshot:  'only-on-failure',      
    video:       'retain-on-failure',    
  },


  webServer: [
    {
      command:            'npm run dev --prefix backend',
      url:                'http://localhost:3000/api/health',
      reuseExistingServer: !process.env.CI,
    },
    {
      command:            'npm run dev --prefix frontend',
      url:                'http://localhost:5174',
      reuseExistingServer: !process.env.CI,
    },
  ],

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  ],
});