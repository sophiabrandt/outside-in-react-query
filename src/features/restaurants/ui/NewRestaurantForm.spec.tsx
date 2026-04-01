import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "react-error-boundary";
import { NewRestaurantForm } from "./NewRestaurantForm";
import { toast } from "sonner";

describe("NewRestaurantForm", () => {
  it("should show a validation error and not submit when restaurant name is too short", async () => {
    const createRestaurant = vi.fn();
    const user = userEvent.setup();

    render(
      <ErrorBoundary fallbackRender={() => <div>error</div>}>
        <NewRestaurantForm createRestaurant={createRestaurant} status="idle" error={null} />
      </ErrorBoundary>,
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, "a");
    await user.click(button);

    expect(createRestaurant).not.toHaveBeenCalled();
    expect(screen.getByText(/too short/i)).toBeInTheDocument();
  });

  it("should fill in restaurant form", async () => {
    const restaurantName = "Nomnomnom";
    const createRestaurant = vi.fn();
    const user = userEvent.setup();

    render(
      <ErrorBoundary fallbackRender={() => <div>error</div>}>
        <NewRestaurantForm createRestaurant={createRestaurant} status="idle" error={null} />
      </ErrorBoundary>,
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /add/i });

    await user.type(input, restaurantName);
    await user.click(button);

    expect(createRestaurant).toHaveBeenNthCalledWith(1, restaurantName);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("should disable the form on pending state", async () => {
    render(
      <ErrorBoundary fallbackRender={() => <div>error</div>}>
        <NewRestaurantForm createRestaurant={vi.fn()} status="pending" error={null} />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByRole("button", { name: /add/i })).toHaveAttribute("disabled");
  });

  it("show error toast", async () => {
    const testError = new Error("TEST ERROR");
    const spy = vi.spyOn(toast, "error");

    render(
      <ErrorBoundary fallbackRender={() => <div>error</div>}>
        <NewRestaurantForm createRestaurant={vi.fn()} status="error" error={testError} />
      </ErrorBoundary>,
    );

    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });
});
