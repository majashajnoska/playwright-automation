export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.profileButton = page.locator(
      'button div [class="MuiAvatar-img css-1hy9t21"]'
    );
    this.logoutButton = page.locator("li.MuiMenuItem-root");
  }
}
