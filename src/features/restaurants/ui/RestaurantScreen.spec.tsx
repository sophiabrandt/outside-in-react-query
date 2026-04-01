import { render, screen, waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { simpleFaker, faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import userEvent from "@testing-library/user-event";

describe("RestaurantScreen", () => {
  describe("data", () => {
    const mockResponse = Array.from({ length: 2 }, () => ({
      id: simpleFaker.number.int(100),
      name: faker.company.name(),
    }));
    const server = setupServer(
      http.get("*/restaurants", () => {
        return HttpResponse.json(mockResponse);
      }),
    );
    setupMsw(server);

    it("should render the restaurants list", async () => {
      await setupSut();

      await waitFor(() => expect(screen.getByText(mockResponse[0].name)).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText(mockResponse[1].name)).toBeInTheDocument());
    });

    it("should render the new restaurant form", async () => {
      await setupSut();

      await waitFor(() => expect(screen.getByRole("textbox")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument());
    });
  });

  describe("loading", () => {
    it("should render a loading skeleton", async () => {
      await setupSut();

      expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
    });
  });

  describe("error boundary", () => {
    it("should render the error fallback and call resetQueries on 'Try again'", async () => {
      // Arrange
      vi.resetModules();
      vi.doMock("../hooks/useRestaurantQueries", () => {
        return {
          restaurantQueryKeys: { all: ["restaurants"] as const },
          useRestaurantQuery: () => {
            throw new Error("Test error");
          },
          useNewRestaurantDataMutation: () => ({ mutate: () => {} }),
        };
      });
      const user = userEvent.setup();

      // Act
      const { RestaurantsScreen } = await import("./RestaurantScreen");
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

      const resetSpy = vi.spyOn(queryClient, "resetQueries");

      const Wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      render(
        <Wrapper>
          <RestaurantsScreen />
        </Wrapper>,
      );

      // Assert
      await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
      expect(screen.getByText("Something went wrong:")).toBeInTheDocument();

      // Act: click Try again
      await user.click(screen.getByText("Try again"));

      // Assert
      expect(resetSpy).toHaveBeenCalled();
      expect(resetSpy.mock.calls[0][0]).toEqual({ queryKey: ["restaurants"] });
    });

    it("should render generic message when thrown value is non-Error", async () => {
      // Arrange
      vi.resetModules();
      vi.doMock("../hooks/useRestaurantQueries", () => {
        return {
          restaurantQueryKeys: { all: ["restaurants"] as const },
          useRestaurantQuery: () => {
            throw "non-error value";
          },
          useNewRestaurantDataMutation: () => ({ mutate: () => {} }),
        };
      });

      // Act
      const { RestaurantsScreen } = await import("./RestaurantScreen");
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

      const Wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      render(
        <Wrapper>
          <RestaurantsScreen />
        </Wrapper>,
      );

      // Assert
      await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  async function setupSut() {
    const { RestaurantsScreen } = await import("./RestaurantScreen");
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    render(
      <Wrapper>
        <RestaurantsScreen />
      </Wrapper>,
    );
  }

  function setupMsw(server: SetupServerApi) {
    beforeAll(() => {
      // Fail tests if there's an unhandled request to help catch mismatched routes.
      server.listen({ onUnhandledRequest: "error" });
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close();
    });
  }
});
