export class HomePage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator('a[href="/auth/login"]');
    this.registerButton = page.locator('a[href="/auth/register"]');
    this.searchFilter = page.locator('input[id=":r1:"]');
    this.bedroomsDropdown = page.getByRole("button", { name: "Bedrooms" });
    this.bedroomsOption = page.locator('li[data-value="2"]');
    this.cityFilter = page.locator('[id=":r4:"]');
    this.searchButton = page.locator('[type="button"]');
    this.featuredListingButton = page.locator('a[href="/featured-listings"]');
  }
}
