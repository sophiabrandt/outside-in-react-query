import { describe, expect, it, beforeAll, afterAll, afterEach } from "vitest";
import { faker, simpleFaker } from "@faker-js/faker";
import { restaurantClient } from "./restaurantClient";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockResponse = Array.from({ length: 5 }, () => ({
  id: simpleFaker.number.int(100),
  name: faker.company.name(),
}));

const server = setupServer(
  http.get("*/restaurants", () => {
    return HttpResponse.json(mockResponse);
  }),
);

beforeAll(() => {
  // Fail tests if there's an unhandled request to help catch mismatched routes.
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("restaurantApiClient", () => {
  it("should get restaurants from api", async () => {
    const data = await restaurantClient.get();

    expect(data).toEqual(mockResponse);
  });
});
