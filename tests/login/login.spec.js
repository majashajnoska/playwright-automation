import { test } from "../../fixtures/fixtures.js";
import { expect } from "@playwright/test";
import { HomePage } from "../../page_objects/HomePage";
import { LoginPage } from "../../page_objects/LoginPage";
import { DashboardPage } from "../../page_objects/DashboardPage";
import { users } from "../../testData/users.js";
import { log } from "console";
import { apiLogin, setTokenInLocalStorage } from "../../api/UsersApi.js";

let homePage, loginPage, dashboardPage;
const adminEmail = users.admin.email;
const adminPassword = users.admin.password;

test.describe("Login tests", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto("/");

    console.log(
      `Starting test: ${testInfo.title} on project: ${testInfo.project.name}`
    );
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.title.replace(
        /\s+/g,
        "_"
      )}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });

      await testInfo.attach("failure-screenshot", {
        path: screenshotPath,
        contentType: "image/png",
      });

      console.log(`Screenshot taken for failed test: ${testInfo.title}`);
    }
  });

  test("Should log in with existing admin account", async ({ page }) => {
    await homePage.loginButton.click();
    await loginPage.login(adminEmail, adminPassword);

    await expect(dashboardPage.userRole).toHaveText("role: admin");
  });

  test("Should log out", async ({ page, request }) => {
    const token = await apiLogin(request, adminEmail, adminPassword);
    await setTokenInLocalStorage(page, token);

    await page.goto("/dashboard");
    await dashboardPage.profileButton.click();
    await dashboardPage.logoutButton.click();

    await expect(loginPage.loginTitle).toHaveText("Sign in to Delek Homes");
  });
});
