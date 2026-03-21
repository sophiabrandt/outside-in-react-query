import { RestaurantsScreen } from "@/features/restaurants";
import { Providers } from "./Providers";

export const App = () => {
  return (
    <Providers>
      <RestaurantsScreen />
    </Providers>
  );
};
