import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewRestaurantForm } from "./NewRestaurantForm";

describe("RestaurantForm", () => {
  it("should fill in restaurant form", async () => {
    const restaurantName = "Nomnomnom";
    const createRestaurant = vi.fn();
    const user = userEvent.setup();

    render(<NewRestaurantForm createRestaurant={createRestaurant} />);

    await user.type(screen.getByRole("textbox"), restaurantName);
    await user.click(screen.getByRole("button"));

    expect(createRestaurant).toHaveBeenNthCalledWith(1, restaurantName);
    expect(screen.getByRole("textbox")).toHaveTextContent("");
  });
});
