import { useRestaurantDataQuery } from "../hooks/useRestaurantDataQuery";
import { RestaurantList } from "./RestaurantList";

export const RestaurantsScreen = () => {
  const { data: restaurants } = useRestaurantDataQuery();
  // TODO: handle loading states
  return (
    <>
      <h1>Restaurants</h1>
      {restaurants ? <RestaurantList restaurants={restaurants} /> : null}
    </>
  );
};
