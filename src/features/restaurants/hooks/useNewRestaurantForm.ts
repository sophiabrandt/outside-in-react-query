import { useState, type FormEvent } from "react";
import type { useNewRestaurantDataMutation } from "./useRestaurantQueries";
import { validateRestaurantInput } from "../model";

export const useNewRestaurantForm = (
  createRestaurant: ReturnType<typeof useNewRestaurantDataMutation>["mutate"],
) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleFormData(formData: FormData) {
    const restaurantFormName = formData.get("restaurant");
    const result = validateRestaurantInput(restaurantFormName);
    if (!result.success) {
      setValidationError(result.errors);
      return;
    }

    setValidationError(null);
    createRestaurant(result.data);
  }

  // Convenience onSubmit wrapper for forms.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    handleFormData(new FormData(form));
    form.reset();
  }

  return { handleFormData, onSubmit, validationError };
};
