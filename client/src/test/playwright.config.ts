import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    contextOptions: {
      storageState: 'state.json', // Reuse state between tests
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
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],  
});
