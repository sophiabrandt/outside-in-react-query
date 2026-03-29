import ky from "ky";
import { restaurantSchema, restaurantsSchema, type Restaurant } from "../model";
import { ENV } from "varlock/env";

const baseURL = `https://api.outsidein.dev/${ENV.API_KEY}`;

export const restaurantClient = Object.freeze({
  get: async (): Promise<Restaurant[]> => {
    const raw = await ky.get(`${baseURL}/restaurants`).json();
    try {
      return restaurantsSchema.parse(raw);
    } catch {
      throw new Error("Failed to parse restaurants response");
    }
  },
  post: async (name: Restaurant["name"]): Promise<Restaurant> => {
    const raw = await ky.post(`${baseURL}/restaurants`, { json: { name } }).json();
    return restaurantSchema.parse(raw);
  },
});
