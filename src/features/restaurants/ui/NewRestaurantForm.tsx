import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useNewRestaurantDataMutation } from "../hooks/useRestaurantQueries";

interface NewRestaurantFormProps {
  createRestaurant: ReturnType<typeof useNewRestaurantDataMutation>["mutate"];
}

export const NewRestaurantForm = ({ createRestaurant }: NewRestaurantFormProps) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { form, restaurantName } = readForm(event);
    createRestaurant(restaurantName);
    form.reset();
  };

  return (
    <form noValidate onSubmit={onSubmit} className="inline-flex w-full gap-x-1">
      <Input name="restaurant" placeholder="Add restaurant" />
      <Button type="submit">Add</Button>
    </form>
  );
};

function readForm(event: React.FormEvent<HTMLFormElement>) {
  const form = event.currentTarget;
  const data = new FormData(form);
  // TODO: validate properly
  const restaurantName = String(data.get("restaurant") ?? "").trim();
  return { form, restaurantName };
}
