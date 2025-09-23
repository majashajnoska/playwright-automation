export class HomePage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator('a[href="/auth/login"]');
    this.registerButton = page.locator('a[href="/auth/register"]');
  }
}
