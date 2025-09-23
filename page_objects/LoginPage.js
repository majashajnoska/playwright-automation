export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('input[name="email"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginSubmit = page.locator('button[type="submit"]');
    this.loginTitle = page.locator("h4.MuiTypography-h4");
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Email and password must be provided");
    }
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginSubmit.click();
  }
}
