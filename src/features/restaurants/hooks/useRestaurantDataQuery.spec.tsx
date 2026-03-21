import { renderHook, waitFor } from "@testing-library/react";
import { faker, simpleFaker } from "@faker-js/faker";
import { describe, expect, vi, it } from "vitest";
import { useRestaurantDataQuery } from "./useRestaurantDataQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { restaurantClient } from "../api/restaurantClient";

vi.mock("../api/restaurantClient", () => {
  return {
    restaurantClient: {
      get: vi.fn().mockResolvedValue([
        {
          name: faker.company.name(),
          id: simpleFaker.number.int(100),
        },
      ]),
    },
  };
});

describe("useRestaurantDataQuery", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should retrieve restaurants", async () => {
    renderHook(() => useRestaurantDataQuery(), { wrapper });

    await waitFor(() => expect(restaurantClient.get).toHaveBeenCalledTimes(1));
  });
});
