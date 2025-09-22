import { test, expect } from "@playwright/test";

const adminUser = {
  email: "m.shajn@gmail.com",
  password: "DontTestMe",
};

test.describe("Login tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Should log in with existing admin account", async ({ page }) => {
    await page.locator('[href="/auth/login"]').click();
    await page.locator('input[name="email"]').fill(adminUser.email);
    await page.locator('input[name="password"]').fill(adminUser.password);
    await page.locator('button[type="submit"]').click();

    await expect(page.locator("a div p.MuiTypography-root")).toHaveText(
      "role: admin"
    );
  });

  test("Should log out", async ({ page }) => {
    await page.locator('[href="/auth/login"]').click();
    await page.locator('input[name="email"]').fill(adminUser.email);
    await page.locator('input[name="password"]').fill(adminUser.password);
    await page.locator('button[type="submit"]').click();
    await page
      .locator('button div [class="MuiAvatar-img css-1hy9t21"]')
      .click();
    await page.locator("li.MuiMenuItem-root").click();

    await expect(page.locator("h4.MuiTypography-h4")).toHaveText(
      "Sign in to Delek Homes"
    );
  });
});
