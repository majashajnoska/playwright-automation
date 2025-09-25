export class FeaturedListingPage {
  constructor(page) {
    this.page = page;
    this.searchFilter = page.getByLabel("Search");
    this.bedroomsDropdown = page.getByRole("button", { name: "Bedrooms" });
    this.bedroomsOption = page.locator('li[data-value="2"]');
    this.cityFilter = page.getByRole("textbox", { name: "City" });
    this.startSearchButton = page.locator(
      'button[type="button"]:has-text("Start Search")'
    );
    this.listingTitle = page.locator("h5");
    this.listingAddress = page.locator(
      "div.MuiGrid-grid-xs-12 p.MuiTypography-body1"
    );
    this.listingSqft = page.locator('//div[contains(text(), "Sqft")]');
    this.listingGarage = page.getByText("Garage:");
    this.listingBedrooms = page.getByText("Bedrooms:");
    this.listingBathrooms = page.getByText("Bathrooms:");
    this.listingCity = page.getByText("City:");
    this.listingState = page.getByText("State:");
    this.listingZipCode = page.getByText("Zip/Code:");
    this.moreInfoButton = page.locator(
      "div.MuiCardContent-root a.MuiButtonBase-root"
    );
  }

  async selectBedrooms(bedrooms) {
    await this.bedroomsDropdown.click();
    await this.page.locator(`li[data-value="${bedrooms}"]`).click();
  }
}
