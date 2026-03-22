import { render, screen, waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { RestaurantsScreen } from "./RestaurantScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { simpleFaker, faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";

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
      setupSut();

      await waitFor(() => expect(screen.getByText(mockResponse[0].name)).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText(mockResponse[1].name)).toBeInTheDocument());
    });
  });

  describe("loading", () => {
    it("should render a loading skeleton", () => {
      setupSut();

      expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
    });
  });

  function setupSut() {
    const queryClient = new QueryClient();
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
