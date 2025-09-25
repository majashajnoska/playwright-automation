import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/HomePage";
import { FeaturedListingPage } from "../../page_objects/FeaturedListingPage";
import { ListingDetailsPage } from "../../page_objects/ListingDetailsPage";

let homePage;
let featuredListingPage;
let listingDetailsPage;

test.describe("Home page search", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    featuredListingPage = new FeaturedListingPage(page);
    listingDetailsPage = new ListingDetailsPage(page);

    await page.goto("/");
  });

  test("Should search by keyword", async ({ page }) => {
    await homePage.searchFilter.fill("Galewood");
    await homePage.searchButton.click();

    await expect(
      featuredListingPage.listingTitle.filter({ hasText: "Galewood" }).first()
    ).toBeVisible();
  });

  test("Should search by bedrooms", async ({ page }) => {
    await homePage.bedroomsDropdown.click();
    await homePage.bedroomsOption.click();
    await homePage.searchButton.click();
    await featuredListingPage.moreInfoButton.first().click();

    const bedrooms = await listingDetailsPage.getBedroomCount();
    expect(bedrooms).toBeGreaterThanOrEqual(2);
  });

  test("Should search by city", async ({ page }) => {
    await homePage.cityFilter.fill("Shine City");
    await homePage.searchButton.click();

    const cityText = await featuredListingPage.listingCity.textContent();
    expect(cityText).toContain("Shine City");

    await expect(featuredListingPage.listingTitle).toHaveCount(1);

    const extractNumber = (text) => text?.match(/\d+/)?.[0];

    const expectedSqft = extractNumber(
      await featuredListingPage.listingSqft.textContent()
    );
    const expectedGarage = extractNumber(
      await featuredListingPage.listingGarage.textContent()
    );
    const expectedBedrooms = extractNumber(
      await featuredListingPage.listingBedrooms.textContent()
    );
    const expectedBathrooms = extractNumber(
      await featuredListingPage.listingBathrooms.textContent()
    );

    await featuredListingPage.moreInfoButton.click();

    expect(
      extractNumber(await listingDetailsPage.squareFeetInfo.textContent())
    ).toBe(expectedSqft);
    expect(
      extractNumber(await listingDetailsPage.garageInfo.textContent())
    ).toBe(expectedGarage);
    expect(
      extractNumber(await listingDetailsPage.bedroomsInfo.textContent())
    ).toBe(expectedBedrooms);
    expect(
      extractNumber(await listingDetailsPage.bathroomsInfo.textContent())
    ).toBe(expectedBathrooms);
  });

  test("Should search by price", async ({ page }) => {
    const minPrice = 600000;
    const maxPrice = 800000;

    await page.goto(`/featured-listings?price=${minPrice}-${maxPrice}`);

    await featuredListingPage.moreInfoButton.first().click();

    const priceText = await listingDetailsPage.askingPriceInfo.textContent();
    const listingPrice = parseInt(priceText.replace(/[^0-9]/g, ""), 10);

    expect(listingPrice).toBeGreaterThanOrEqual(minPrice);
    expect(listingPrice).toBeLessThanOrEqual(maxPrice);
  });
});
