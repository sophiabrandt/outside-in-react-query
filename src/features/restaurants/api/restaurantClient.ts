import ky from "ky";
import { restaurantsSchema } from "../model";

// TODO: better env variables!
const baseURL = `https://api.outsidein.dev/${import.meta.env.VITE_API_KEY}`;

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
