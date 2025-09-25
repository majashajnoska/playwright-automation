import { faker } from "@faker-js/faker";
import fs from "fs";

export async function apiCreateListing(apiRequestContext, token) {
  const data = {
    images: fs.createReadStream("./testData/images/house.jpg"),
    lotSize: faker.number.int({ min: 1000, max: 3000 }),
    sqft: faker.number.int({ min: 700, max: 1500 }),
    garage: faker.number.int({ min: 1, max: 3 }),
    bathrooms: faker.number.int({ min: 2, max: 3 }),
    bedrooms: faker.number.int({ min: 2, max: 3 }),
    price: faker.number.int({ min: 500000, max: 800000 }),
    zipCode: faker.number.int({ min: 90001, max: 96162 }),
    state: "CL",
    city: faker.location.city(),
    address: faker.location.streetAddress(),
    description: "New flat in a beautiful place!",
    title: `Maja Automation ${faker.number.int({ min: 1000, max: 100000 })}`,
    isPublished: true,
  };

  const createListingResponse = await apiRequestContext.post(
    `/api/estate-objects`,
    {
      multipart: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const apiLoginResponseJson = await createListingResponse.json();
  return apiLoginResponseJson;
}
