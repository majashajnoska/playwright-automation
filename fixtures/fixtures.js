import { test as base, request } from "@playwright/test";
import { apiLogin } from "../api/UsersApi";
import { apiCreateListing } from "../api/ListingsApi";
import { users } from "../testData/users.js";

export const test = base.extend({
  authenticatedPage: async ({ browser }, use) => {
    const apiClient = await request.newContext();
    const token = await apiLogin(
      apiClient,
      users.admin.email,
      users.admin.password
    );

    const context = await browser.newContext();

    await context.addInitScript((tokenValue) => {
      window.localStorage.setItem("accessToken", tokenValue);
    }, token);

    const page = await context.newPage();
    await use(page);
    await context.close();
    await apiClient.dispose();
  },

  createdListing: async ({}, use) => {
    const apiClient = await request.newContext();
    const token = await apiLogin(
      apiClient,
      users.admin.email,
      users.admin.password
    );
    const listing = await apiCreateListing(apiClient, token);

    await use(listing);
    await apiClient.dispose();
  },
});
