import Spacer from "@/shared/components/ui/spacer";
import { useNewRestaurantDataMutation, useRestaurantQuery } from "../hooks/useRestaurantQueries";
import { NewRestaurantForm } from "./NewRestaurantForm";
import { RestaurantList } from "./RestaurantList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const RestaurantsScreen = () => {
  const { data: restaurants } = useRestaurantQuery();
  const newRestaurant = useNewRestaurantDataMutation();

  if (restaurants) {
    return (
      <div className="mx-8">
        <NewRestaurantForm createRestaurant={newRestaurant.mutate} />
        <Spacer size="sm" />
        <RestaurantList restaurants={restaurants} />
      </div>
    );
  }

  return <LoadingSkeleton />;
};

const LoadingSkeleton = () => (
  <ul data-testid="loading-skeleton" className="grid gap-4 list-none p-0 mx-8" aria-busy="true">
    {Array.from({ length: 2 }, (_, i) => (
      <li key={i}>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-4 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <Skeleton className="h-3 w-48" />
            </CardDescription>
          </CardContent>
        </Card>
      </li>
    ))}
  </ul>
);
