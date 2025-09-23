export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('input[name="email"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginSubmit = page.locator('button[type="submit"]');
    this.loginTitle = page.locator("h4.MuiTypography-h4");
  }
}
