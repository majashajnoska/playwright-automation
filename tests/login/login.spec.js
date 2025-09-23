import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/HomePage";
import { LoginPage } from "../../page_objects/LoginPage";
import { DashboardPage } from "../../page_objects/DashboardPage";

let homePage, loginPage, dashboardPage;

const adminUser = {
  email: "m.shajn@gmail.com",
  password: "DontTestMe",
};

test.describe("Login tests", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto("/");
  });

  test("Should log in with existing admin account", async ({ page }) => {
    await homePage.loginButton.click();
    await loginPage.emailField.fill(adminUser.email);
    await loginPage.passwordField.fill(adminUser.password);
    await loginPage.loginSubmit.click();

    await expect(page.locator("a div p.MuiTypography-root")).toHaveText(
      "role: admin"
    );
  });

  test("Should log out", async ({ page }) => {
    await homePage.loginButton.click();
    await loginPage.emailField.fill(adminUser.email);
    await loginPage.passwordField.fill(adminUser.password);
    await loginPage.loginSubmit.click();
    await dashboardPage.profileButton.click();
    await dashboardPage.logoutButton.click();

    await expect(loginPage.loginTitle).toHaveText("Sign in to Delek Homes");
  });
});
