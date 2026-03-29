import { describe, it, expect } from "vitest";
import {
  validateRestaurants,
  validateRestaurantInput,
  restaurantsSchema,
  restaurantNoIdSchema,
} from "./model";

describe("restaurants model validation", () => {
  describe("validateRestaurants", () => {
    it("parses and returns a valid restaurants array", () => {
      const input = [
        { id: 1, name: "AB" },
        { id: 2, name: "Sushi" },
      ];

      const result = validateRestaurants(input);
      expect(result).toEqual(input);
    });

    it("accepts an empty array", () => {
      const input: unknown = [];
      const result = validateRestaurants(input);
      expect(result).toEqual([]);
    });

    it("throws a generic error when the payload is invalid (bad shape)", () => {
      // Missing `id` and name too short
      const bad = [{ name: "A" }];

      expect(() => validateRestaurants(bad)).toThrowError("Failed to parse restaurants response");
    });

    it("throws when passed a non-array value", () => {
      const bad: unknown = { id: 1, name: "AB" };
      expect(() => validateRestaurants(bad)).toThrowError("Failed to parse restaurants response");
    });

    it("rethrows non-Zod errors from the schema parse", () => {
      const originalParse = restaurantsSchema.parse;
      // Replace parse with a function that throws a non-Zod error
      (restaurantsSchema as any).parse = () => {
        throw new Error("unexpected non-zod error");
      };

      try {
        expect(() => validateRestaurants([])).toThrow("unexpected non-zod error");
      } finally {
        // Restore original parse to avoid leaking state to other tests
        (restaurantsSchema as any).parse = originalParse;
      }
    });
  });

  describe("validateRestaurantInput", () => {
    it("returns the name when input is valid", () => {
      const name = "Nice Place";
      const result = validateRestaurantInput(name);
      expect(result).toBe(name);
    });

    it("accepts a short-but-valid name of length 2", () => {
      const name = "OK";
      expect(validateRestaurantInput(name)).toBe(name);
    });

    it("throws a descriptive error when the name is too short", () => {
      const badName = "A";
      expect(() => validateRestaurantInput(badName)).toThrowError(/^Invalid restaurant input:/);
    });

    it("throws a descriptive error when input type is invalid", () => {
      const badInput: unknown = 123;
      expect(() => validateRestaurantInput(badInput)).toThrowError(/^Invalid restaurant input:/);
    });

    it("rethrows non-Zod errors from the input schema parse", () => {
      const originalParse = restaurantNoIdSchema.parse;
      // Replace parse with a function that throws a non-Zod error
      (restaurantNoIdSchema as any).parse = () => {
        throw new TypeError("some other parse failure");
      };

      try {
        expect(() => validateRestaurantInput("anything")).toThrow("some other parse failure");
      } finally {
        // Restore original parse to avoid leaking state to other tests
        (restaurantNoIdSchema as any).parse = originalParse;
      }
    });
  });
});
