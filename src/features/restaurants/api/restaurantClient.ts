import ky from "ky";
import { restaurantsSchema } from "../model";
import { ENV } from "varlock/env";

const baseURL = `https://api.outsidein.dev/${ENV.API_KEY}`;

export const restaurantClient = Object.freeze({
  get: async () => {
    try {
      const restaurants = await ky.get(`${baseURL}/restaurants`).json();
      return restaurantsSchema.parse(restaurants);
    } catch {
      // TODO: error handling
    }
  },
});
