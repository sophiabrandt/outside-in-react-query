import { z } from "zod/mini";

export const restaurantSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .check(z.minLength(2, { error: "Too short! At least 2 characters are required" })),
});
export const restaurantsSchema = z.array(restaurantSchema);

export type Restaurant = z.infer<typeof restaurantSchema>;
export type Restaurants = z.infer<typeof restaurantsSchema>;

export const validateRestaurants = (restaurants: unknown) => {
  const result = restaurantsSchema.safeParse(restaurants);

  if (result.success) {
    return { success: true, data: result.data } as const;
  }
  return { success: false, errors: z.prettifyError(result.error) } as const;
};

export const restaurantNoIdSchema = z.omit(restaurantSchema, { id: true });

export const validateRestaurantInput = (restaurantName: unknown) => {
  const result = restaurantNoIdSchema.safeParse({ name: restaurantName });

  if (result.success) {
    return { success: true, data: result.data.name } as const;
  }
  return { success: false, errors: z.prettifyError(result.error) } as const;
};
