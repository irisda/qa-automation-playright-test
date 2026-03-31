import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    timeout: 30_000,
    expect: {
        timeout: 5_000,
    },
    fullyParallel: false,
    retries: 1,
    reporter: [['html', { open: 'never' }], ['list']],
    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
    },
    projects: [
        {
            name: 'Desktop Chrome',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
