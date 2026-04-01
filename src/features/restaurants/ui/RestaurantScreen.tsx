import Spacer from "@/shared/components/ui/spacer";
import {
  restaurantQueryKeys,
  useNewRestaurantDataMutation,
  useRestaurantQuery,
} from "../hooks/useRestaurantQueries";
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
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Button } from "@/shared/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-red-500">
        {error instanceof Error ? error.message : "Something went wrong"}
      </pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};

export const RestaurantsScreen = () => {
  const queryClient = useQueryClient();
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        queryClient.resetQueries({ queryKey: restaurantQueryKeys.all });
      }}
    >
      <RestaurantsDisplay />
    </ErrorBoundary>
  );
};

const RestaurantsDisplay = () => {
  const restaurants = useRestaurantQuery();
  const newRestaurant = useNewRestaurantDataMutation();

  if (restaurants.data) {
    return (
      <div className="mx-8">
        <NewRestaurantForm
          createRestaurant={newRestaurant.mutate}
          status={newRestaurant.status}
          error={newRestaurant.error}
        />
        <Spacer size="sm" />
        <RestaurantList restaurants={restaurants.data} />
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
