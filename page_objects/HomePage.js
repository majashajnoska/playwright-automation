export class HomePage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator('a[href="/auth/login"]');
    this.registerButton = page.locator('a[href="/auth/register"]');
    this.searchFilter = page.getByLabel("Search");
    this.bedroomsDropdown = page.getByRole("button", { name: "Bedrooms" });
    this.bedroomsOption = page.locator('li[data-value="2"]');
    this.cityFilter = page.getByLabel("City");
    this.searchButton = page.locator('[type="button"]');
    this.featuredListingButton = page.locator('a[href="/featured-listings"]');
    this.darkModeSwitch = page.locator("input.PrivateSwitchBase-input");
  }

  async enableDarkMode() {
    if (!(await this.darkModeSwitch.isChecked())) {
      await this.darkModeSwitch.click();
    }
  }

  async disableDarkMode() {
    if (await this.darkModeSwitch.isChecked()) {
      await this.darkModeSwitch.click();
    }
  }
}
