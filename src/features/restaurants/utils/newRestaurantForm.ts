import type { FormEvent } from "react";
import type { useNewRestaurantDataMutation } from "./useRestaurantQueries";
import { validateRestaurantInput } from "../model";

export function newRestaurantForm(
  createRestaurant: ReturnType<typeof useNewRestaurantDataMutation>["mutate"],
  onError: (error: unknown) => void = (error) => {
    throw error;
  },
) {
  function handleFormData(formData: FormData) {
    const restaurantFormName = formData.get("restaurant");
    const restaurantName = validateRestaurantInput(restaurantFormName);
    createRestaurant(restaurantName);
  }

  // Convenience onSubmit wrapper for forms.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      handleFormData(new FormData(form));
      form.reset();
    } catch (error) {
      onError(error);
    }
  }

  return { handleFormData, onSubmit };
}
