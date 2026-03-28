import ky from "ky";
import { restaurantsSchema, type Restaurant } from "../model";
import { ENV } from "varlock/env";
import { z } from "zod/mini";

const baseURL = `https://api.outsidein.dev/${ENV.API_KEY}`;

export const restaurantClient = Object.freeze({
  get: async () => {
    try {
      const restaurants = await ky.get(`${baseURL}/restaurants`).json();
      return restaurantsSchema.parse(restaurants);
    } catch (error: unknown) {
      if (error instanceof z.core.$ZodError) {
        console.error(error.issues);
        throw new Error("Failed to parse restaurants response");
      }
      throw error;
    }
  },
  post: async (restaurantName: Restaurant["name"]) => {
    try {
      return await ky.post(`${baseURL}/restaurants`, { json: { name: restaurantName } }).json();
    } catch {
      // TODO
    }
  },
});
