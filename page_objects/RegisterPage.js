export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[name="firstName"]');
    this.lastNameInput = page.locator('[name="lastName"]');
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.registerButton = page.locator('[type="submit"]');
    this.errorAlert = page.locator('[role="alert"]');
    this.nameFieldValidation = page.getByText("First name required");
    this.lastNameFieldValidation = page.getByText("Last name required");
    this.emailFieldValidation = page.getByText("Email is required");
    this.passwordFieldValidation = page.getByText("Password is required");
  }

  async register(
    name = "Maja",
    lastName = "Shajnoska",
    email,
    password = "123456"
  ) {
    if (email === undefined || email === null) {
      const randomString = Math.random().toString(36).substring(2, 10);
      email = `maja+${randomString}@gmail.com`;
    }

    await this.firstNameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }
}
