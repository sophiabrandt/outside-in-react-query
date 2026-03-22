import { RestaurantsScreen } from "@/features/restaurants";
import { Providers } from "./Providers";
import Spacer from "@/shared/components/ui/spacer";
import Toolbar from "@/shared/components/ui/toolbar";

export const App = () => {
  return (
    <Providers>
      <Toolbar>
        <h1 className="text-lg font-semibold w-full text-center">
          Outside In React Query Example
        </h1>
      </Toolbar>
      <Spacer size="md" />
      <RestaurantsScreen />
    </Providers>
  );
};
