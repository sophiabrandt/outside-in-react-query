import { z } from "zod/mini";

export const restaurantSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export const restaurantsSchema = z.array(restaurantSchema);

export type Restaurant = z.infer<typeof restaurantSchema>;
export type Restaurants = z.infer<typeof restaurantsSchema>;
