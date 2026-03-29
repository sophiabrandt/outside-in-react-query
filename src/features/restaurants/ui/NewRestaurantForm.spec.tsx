import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "react-error-boundary";
import { NewRestaurantForm } from "./NewRestaurantForm";

describe("NewRestaurantForm", () => {
  it("should fill in restaurant form", async () => {
    const restaurantName = "Nomnomnom";
    const createRestaurant = vi.fn();
    const user = userEvent.setup();

    render(
      <ErrorBoundary fallbackRender={() => <div>error</div>}>
        <NewRestaurantForm createRestaurant={createRestaurant} />
      </ErrorBoundary>,
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, restaurantName);
    await user.click(button);

    expect(createRestaurant).toHaveBeenNthCalledWith(1, restaurantName);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
