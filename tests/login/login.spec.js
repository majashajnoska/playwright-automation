import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/HomePage";
import { LoginPage } from "../../page_objects/LoginPage";
import { DashboardPage } from "../../page_objects/DashboardPage";
import { users } from "../../testData/users.js";

let homePage, loginPage, dashboardPage;

test.describe("Login tests", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto("/");
  });

  test("Should log in with existing admin account", async ({ page }) => {
    await homePage.loginButton.click();
    await loginPage.login(users.admin.email, users.admin.password);

    await expect(dashboardPage.userRole).toHaveText("role: admin");
  });

  test("Should log out", async ({ page }) => {
    await homePage.loginButton.click();
    await loginPage.login(users.admin.email, users.admin.password);
    await dashboardPage.profileButton.click();
    await dashboardPage.logoutButton.click();

    await expect(loginPage.loginTitle).toHaveText("Sign in to Delek Homes");
  });
});
