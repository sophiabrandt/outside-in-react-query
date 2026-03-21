import { useQuery } from "@tanstack/react-query";
import { restaurantClient } from "../api/restaurantClient";

export const restaurantQueryKeys = {
  all: ["restaurants"] as const,
};

export const useRestaurantDataQuery = () => {
  return useQuery({
    queryKey: restaurantQueryKeys.all,
    queryFn: () => restaurantClient.get(),
  });
};
