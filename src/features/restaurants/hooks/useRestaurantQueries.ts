import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { restaurantClient } from "../api/restaurantClient";
import type { Restaurant } from "../model";

export const restaurantQueryKeys = {
  all: ["restaurants"] as const,
};

export const useRestaurantQuery = () => {
  return useQuery({
    queryKey: restaurantQueryKeys.all,
    queryFn: () => restaurantClient.get(),
  });
};

export const useNewRestaurantDataMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (restaurantName: Restaurant["name"]) => restaurantClient.post(restaurantName),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: restaurantQueryKeys.all }),
  });
};
