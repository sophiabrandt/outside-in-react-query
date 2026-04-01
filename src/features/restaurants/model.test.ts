import { describe, it, expect } from "vitest";
import { validateRestaurants, validateRestaurantInput } from "./model";

describe("restaurants model validation", () => {
  describe("validateRestaurants", () => {
    it("parses and returns a valid restaurants array", () => {
      const input = [
        { id: 1, name: "AB" },
        { id: 2, name: "Sushi" },
      ];

      const result = validateRestaurants(input);
      expect(result).toEqual({ success: true, data: input });
    });

    it("accepts an empty array", () => {
      const input: unknown = [];
      const result = validateRestaurants(input);
      expect(result).toEqual({ success: true, data: [] });
    });

    it("returns errors when the payload is invalid (bad shape)", () => {
      const bad = [{ name: "A" }];
      const result = validateRestaurants(bad);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain("Too short! At least 2 characters are required");
      }
    });

    it("returns errors when passed a non-array value", () => {
      const bad: unknown = { id: 1, name: "AB" };
      const result = validateRestaurants(bad);

      expect(result.success).toBe(false);
    });
  });

  describe("validateRestaurantInput", () => {
    it("returns the name when input is valid", () => {
      const name = "Nice Place";
      const result = validateRestaurantInput(name);
      expect(result).toEqual({ success: true, data: name });
    });

    it("accepts a short-but-valid name of length 2", () => {
      const name = "OK";
      const result = validateRestaurantInput(name);
      expect(result).toEqual({ success: true, data: name });
    });

    it("returns errors when the name is too short", () => {
      const badName = "A";
      const result = validateRestaurantInput(badName);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain("Too short! At least 2 characters are required");
      }
    });

    it("returns errors when input type is invalid", () => {
      const badInput: unknown = 123;
      const result = validateRestaurantInput(badInput);

      expect(result.success).toBe(false);
    });
  });
});
