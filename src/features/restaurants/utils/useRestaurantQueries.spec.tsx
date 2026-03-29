import { act, renderHook, waitFor } from "@testing-library/react";
import { faker, simpleFaker } from "@faker-js/faker";
import { describe, expect, vi, it } from "vitest";
import { useNewRestaurantDataMutation, useRestaurantQuery } from "./useRestaurantQueries";
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
      post: vi.fn().mockResolvedValue({
        name: faker.company.name(),
        id: simpleFaker.number.int(100),
      }),
    },
  };
});

function setup() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return wrapper;
}

describe("useRestaurantQuery", () => {
  const wrapper = setup();

  it("should call restaurantClient.get when querying restaurants", async () => {
    renderHook(() => useRestaurantQuery(), { wrapper });

    await waitFor(() => expect(restaurantClient.get).toHaveBeenCalledTimes(1));
  });
});

describe("newRestaurantMutationData", () => {
  it("should call restaurants.post when creating a new restaurant", async () => {
    const wrapper = setup();
    const restaurantName = faker.company.name();
    const { result } = renderHook(() => useNewRestaurantDataMutation(), {
      wrapper,
    });

    await act(async () => result.current.mutate(restaurantName));

    expect(restaurantClient.post).toHaveBeenNthCalledWith(1, restaurantName);
  });
});
