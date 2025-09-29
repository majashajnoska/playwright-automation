// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  timeout: 40000,
  //globalTimeout: 60000,
  expect: {
    timeout: 2000,
  },
  retries: 1,
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    ['html', { outputFolder: 'test-results/html-report' }],
  ],

  testDir: "./tests",
  fullyParallel: true,

  use: {
    baseURL: process.env.BASE_URL,

    trace: "on-first-retry",
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: "off",
      size: { width: 1920, height: 1000 },
    },
    env: {
      adminEmail: process.env.ADMIN_EMAIL,
      adminPassword: process.env.ADMIN_PASSWORD,
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
