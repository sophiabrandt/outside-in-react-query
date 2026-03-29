import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useNewRestaurantDataMutation } from "../utils/useRestaurantQueries";
import { newRestaurantForm } from "../utils/newRestaurantForm";
import { useErrorBoundary } from "react-error-boundary";

interface NewRestaurantFormProps {
  createRestaurant: ReturnType<typeof useNewRestaurantDataMutation>["mutate"];
}

export const NewRestaurantForm = ({ createRestaurant }: NewRestaurantFormProps) => {
  const { showBoundary } = useErrorBoundary();
  const { onSubmit } = newRestaurantForm(createRestaurant, showBoundary);

  return (
    <form noValidate onSubmit={onSubmit} className="inline-flex w-full gap-x-1">
      <Input name="restaurant" placeholder="Add restaurant" />
      <Button type="submit">Add</Button>
    </form>
  );
};
