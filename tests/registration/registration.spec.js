import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/HomePage";
import { RegisterPage } from "../../page_objects/RegisterPage";
import { DashboardPage } from "../../page_objects/DashboardPage";

let homePage;
let registerPage;

test.describe("Resgistration tests", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);

    await page.goto("/");
  });

  test("Should register a new account", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await homePage.registerButton.click();
    await registerPage.register();

    await expect(dashboardPage.userRole).toHaveText("role: user");
  });

  test("Should not register with an already existing email account", async ({
    page,
  }) => {
    await homePage.registerButton.click();
    await registerPage.register(
      "Maja",
      "Shajnoska",
      "maja.shajnoska@gmail.com",
      "123456"
    );
    await registerPage.registerButton.click();

    await expect(registerPage.errorAlert).toHaveText(
      "Input data validation failed"
    );
  });

  test("Should not register without filling in required fields", async ({
    page,
  }) => {
    await homePage.registerButton.click();
    await registerPage.register("", "", "", "");

    await expect(registerPage.nameFieldValidation).toBeVisible();
    await expect(registerPage.lastNameFieldValidation).toBeVisible();
    await expect(registerPage.emailFieldValidation).toBeVisible();
    await expect(registerPage.passwordFieldValidation).toBeVisible();
  });
});
