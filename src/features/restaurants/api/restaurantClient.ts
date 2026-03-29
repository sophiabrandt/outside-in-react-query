import ky from "ky";
import { validateRestaurants, type Restaurant } from "../model";
import { ENV } from "varlock/env";

const baseURL = `https://api.outsidein.dev/${ENV.API_KEY}`;

export const restaurantClient = Object.freeze({
  get: async () => {
    const restaurants = await ky.get(`${baseURL}/restaurants`).json();
    return validateRestaurants(restaurants);
  },
  post: async (restaurantName: Restaurant["name"]) => {
    return await ky.post(`${baseURL}/restaurants`, { json: { name: restaurantName } }).json();
  },
});
