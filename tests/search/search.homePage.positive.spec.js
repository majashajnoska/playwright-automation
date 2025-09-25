import { test } from "../../fixtures/fixtures.js";
import { expect } from "@playwright/test";
import { HomePage } from "../../page_objects/HomePage";
import { FeaturedListingPage } from "../../page_objects/FeaturedListingPage";
import { ListingDetailsPage } from "../../page_objects/ListingDetailsPage";

let homePage;
let featuredListingPage;
let listingDetailsPage;
let listing;

test.describe("Home page search", () => {
  test.beforeAll(async ({ createdListing }) => {
    listing = createdListing;
  });

  test.beforeEach(async ({ authenticatedPage }) => {
    homePage = new HomePage(authenticatedPage);
    featuredListingPage = new FeaturedListingPage(authenticatedPage);
    listingDetailsPage = new ListingDetailsPage(authenticatedPage);

    await authenticatedPage.goto("/");
    await homePage.enableDarkMode();
  });

  test("Should search by keyword", async ({ authenticatedPage }) => {
    await homePage.searchFilter.fill(listing.title);
    await homePage.searchButton.click();

    await expect(
      featuredListingPage.listingTitle
        .filter({ hasText: listing.title })
        .first()
    ).toBeVisible();
  });

  test("Should search by bedrooms", async ({ authenticatedPage }) => {
    await homePage.selectBedrooms(listing.bedrooms);
    await homePage.searchButton.click();
    await featuredListingPage.moreInfoButton.first().click();

    const bedrooms = await listingDetailsPage.getBedroomCount();
    expect(bedrooms).toBeGreaterThanOrEqual(Number(listing.bedrooms));
  });

  test("Should search by city", async ({ authenticatedPage }) => {
    await homePage.cityFilter.fill(listing.city);
    await homePage.searchButton.click();
    await authenticatedPage.waitForLoadState("networkidle");

    const cityText = await featuredListingPage.listingCity
      .first()
      .textContent();
    expect(cityText).toContain(listing.city);

    const titles = await featuredListingPage.listingTitle.allTextContents();
    console.log("Listing titles on page:", titles);

    await featuredListingPage.listingTitle
      .filter({ hasText: listing.title })
      .first()
      .waitFor({ state: "visible" });
    await expect(
      featuredListingPage.listingTitle.filter({ hasText: listing.title })
    ).toHaveCount(1, { timeout: 10000 });

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

  test("Should search by price", async ({ authenticatedPage }) => {
    const minPrice = 600000;
    const maxPrice = 800000;

    await authenticatedPage.goto(
      `/featured-listings?price=${minPrice}-${maxPrice}`
    );
    await featuredListingPage.moreInfoButton.first().click();

    const priceText = await listingDetailsPage.askingPriceInfo.textContent();
    const listingPrice = parseInt(priceText.replace(/[^0-9]/g, ""), 10);

    expect(listingPrice).toBeGreaterThanOrEqual(minPrice);
    expect(listingPrice).toBeLessThanOrEqual(maxPrice);
  });
});
