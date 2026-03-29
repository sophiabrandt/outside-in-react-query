import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useNewRestaurantDataMutation } from "../hooks/useRestaurantQueries";
import { useNewRestaurantForm } from "../hooks/useNewRestaurantForm";

interface NewRestaurantFormProps {
  createRestaurant: ReturnType<typeof useNewRestaurantDataMutation>["mutate"];
}

export const NewRestaurantForm = ({ createRestaurant }: NewRestaurantFormProps) => {
  const { onSubmit, validationError } = useNewRestaurantForm(createRestaurant);

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="inline-flex w-full gap-x-1">
        <Input name="restaurant" placeholder="Add restaurant" />
        <Button type="submit">Add</Button>
      </div>
      {validationError && <p className="text-red-600">{validationError}</p>}
    </form>
  );
};
