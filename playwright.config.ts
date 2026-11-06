import { defineConfig, devices } from "@playwright/test";

// Dedicated port so tests never hit another app already running on 3000.
const port = 3100;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  // Uses the installed Google Chrome: Playwright's bundled Chromium doesn't support macOS 13.
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
  },
});
