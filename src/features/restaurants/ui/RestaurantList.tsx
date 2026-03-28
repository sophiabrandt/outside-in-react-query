import type { Restaurant } from "../model";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/shared/components/ui/card";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export const RestaurantList = ({ restaurants }: RestaurantListProps) => {
  return (
    <ul className="grid gap-4 list-none p-0">
      {restaurants.map(({ id, name }) => (
        <li key={id}>
          <Card>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Restaurant ID: {id}</CardDescription>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};
