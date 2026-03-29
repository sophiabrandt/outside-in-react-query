import { z } from "zod/mini";

export const restaurantSchema = z.object({
  id: z.number(),
  name: z.string().check(z.minLength(2)),
});
export const restaurantsSchema = z.array(restaurantSchema);

export type Restaurant = z.infer<typeof restaurantSchema>;
export type Restaurants = z.infer<typeof restaurantsSchema>;

export const validateRestaurants = (restaurants: unknown) => {
  try {
    return restaurantsSchema.parse(restaurants);
  } catch (error: unknown) {
    if (error instanceof z.core.$ZodError) {
      console.error(error.issues);
      throw new Error("Failed to parse restaurants response");
    }
    throw error;
  }
};

export const restaurantNoIdSchema = z.omit(restaurantSchema, { id: true });

export const validateRestaurantInput = (restaurantName: unknown) => {
  try {
    const { name } = restaurantNoIdSchema.parse({ name: restaurantName });
    return name;
  } catch (error: unknown) {
    if (error instanceof z.core.$ZodError) {
      console.error(error.issues);
      throw new Error(
        `Invalid restaurant input: ${JSON.stringify(z.prettifyError(error), null, 2)}`,
      );
    }
    throw error;
  }
};
