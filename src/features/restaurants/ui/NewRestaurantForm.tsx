import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useNewRestaurantDataMutation } from "../hooks/useRestaurantQueries";
import { useNewRestaurantForm } from "../hooks/useNewRestaurantForm";
import type { MutationStatus } from "@tanstack/react-query";
import clsx from "clsx";

interface NewRestaurantFormProps {
  createRestaurant: ReturnType<typeof useNewRestaurantDataMutation>["mutate"];
  status: MutationStatus;
}

export const NewRestaurantForm = ({ createRestaurant, status }: NewRestaurantFormProps) => {
  const { onSubmit, validationError } = useNewRestaurantForm(createRestaurant);

  const isLoading = status === "pending";

  return (
    <form id="add-restaurant" noValidate onSubmit={onSubmit}>
      <fieldset form="add-restaurant" disabled={isLoading}>
        <div className="inline-flex w-full gap-x-1">
          <Input name="restaurant" placeholder="Add restaurant" />
          <Button
            type="submit"
            disabled={isLoading}
            className={clsx(isLoading && "opacity-50 pointer-events-none")}
          >
            Add
          </Button>
        </div>
        {validationError && <p className="text-red-600">{validationError}</p>}
      </fieldset>
    </form>
  );
};
