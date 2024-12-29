import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000, 
  retries: 1, 
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000/',
    timeout: 120000,
  },
  use: {
    baseURL: 'http://localhost:3000/',
    headless: true,
    screenshot: 'only-on-failure', // Take a screenshot only when a test fails
    trace: 'on-first-retry', 
    contextOptions: {
      storageState: 'state.json',
    },
  },
  projects: [
    {
      name: 'default',
      use: {
        trace: 'on',
      },
    },
  ],
  reporter: [['html', { open: 'on-failure' }]],  
});
