import { describe, expect, it, beforeAll, afterAll, afterEach } from "vitest";
import { faker, simpleFaker } from "@faker-js/faker";
import { restaurantClient } from "./restaurantClient";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

describe("restaurantApiClient", () => {
  describe("get", () => {
    describe("success case", () => {
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

      it("should get restaurants from api", async () => {
        const data = await restaurantClient.get();

        expect(data).toEqual(mockResponse);
      });
    });

    describe("parsing error", () => {
      const server = setupServer(
        http.get("*/restaurants", () => {
          return HttpResponse.json([{ id: null, name: 99 }]);
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

      it("should throw a validation error if response does not conform with schema", async () => {
        await expect(restaurantClient.get()).rejects.toThrowError(
          "Failed to parse restaurants response",
        );
      });
    });

    describe("generic error", () => {
      const server = setupServer(
        http.get("*/restaurants", () => {
          return new HttpResponse(null, { status: 500 });
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

      it("should throw a generic error", async () => {
        await expect(restaurantClient.get()).rejects.toThrowError(
          /Request failed with status code 500 Internal Server Error/,
        );
      });
    });
  });

  describe("post", () => {
    describe("success case", () => {
      const restaurantName = faker.company.name();
      const server = setupServer(
        http.post("*/restaurants", () => {
          return HttpResponse.json({
            id: simpleFaker.number.int(10),
            name: restaurantName,
          });
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

      it("should send data to the server", async () => {
        const result = await restaurantClient.post(restaurantName);

        expect(result).toStrictEqual({
          id: expect.any(Number),
          name: restaurantName,
        });
      });
    });
  });
});
