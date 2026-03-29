import { describe, expect, it, vi } from "vitest";
import { faker } from "@faker-js/faker";
import { newRestaurantForm } from "./newRestaurantForm";
import * as model from "../model";

describe("newRestaurantForm", () => {
  it("handleFormData calls createRestaurant with the restaurant name", () => {
    // Arrange
    const createRestaurant = vi.fn();
    const api = newRestaurantForm(createRestaurant);

    const restaurantName = faker.company.name();
    const fd = new FormData();
    fd.set("restaurant", restaurantName);

    // Act
    api.handleFormData(fd);

    // Assert
    expect(createRestaurant).toHaveBeenCalledTimes(1);
    expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
  });

  it("throws an error on invalid input", () => {
    // Arrange
    const createRestaurant = vi.fn();
    const api = newRestaurantForm(createRestaurant);

    const restaurantName = "";
    const fd = new FormData();
    fd.set("restaurant", restaurantName);

    // Act / Assert
    expect(() => api.handleFormData(fd)).toThrowError();
  });

  it("onSubmit prevents default, validates input, calls createRestaurant and resets the form", () => {
    // Arrange
    const restaurantName = faker.company.name();
    const createRestaurant = vi.fn();
    const validateSpy = vi.spyOn(model, "validateRestaurantInput").mockReturnValue(restaurantName);

    const api = newRestaurantForm(createRestaurant);

    const form = document.createElement("form") as HTMLFormElement;
    const input = document.createElement("input") as HTMLInputElement;
    input.name = "restaurant";
    input.value = restaurantName;
    form.appendChild(input);

    const preventDefault = vi.fn();
    const resetSpy = vi.fn();
    form.reset = resetSpy;

    const event = {
      currentTarget: form,
      preventDefault,
    } as unknown as Parameters<typeof api.onSubmit>[0];

    // Act
    api.onSubmit(event);

    // Assert
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(restaurantName);
    expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  it("onSubmit calls onError when validation throws and does not reset the form or call createRestaurant", () => {
    // Arrange
    const createRestaurant = vi.fn();
    const error = new Error("validation failed");
    vi.spyOn(model, "validateRestaurantInput").mockImplementation(() => {
      throw error;
    });
    const onError = vi.fn();

    const api = newRestaurantForm(createRestaurant, onError);

    const form = document.createElement("form") as HTMLFormElement;
    const input = document.createElement("input") as HTMLInputElement;
    input.name = "restaurant";
    input.value = "some name";
    form.appendChild(input);

    const preventDefault = vi.fn();
    const resetSpy = vi.fn();
    form.reset = resetSpy;

    const event = {
      currentTarget: form,
      preventDefault,
    } as unknown as Parameters<typeof api.onSubmit>[0];

    // Act
    api.onSubmit(event);

    // Assert
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(error);
    expect(createRestaurant).not.toHaveBeenCalled();
    expect(resetSpy).not.toHaveBeenCalled();
  });

  it("onSubmit without onError rethrows validation error (covers default onError)", () => {
    // Arrange
    const createRestaurant = vi.fn();
    const error = new Error("validation failed - default");
    vi.spyOn(model, "validateRestaurantInput").mockImplementation(() => {
      throw error;
    });

    const api = newRestaurantForm(createRestaurant);

    const form = document.createElement("form") as HTMLFormElement;
    const input = document.createElement("input") as HTMLInputElement;
    input.name = "restaurant";
    input.value = "some name";
    form.appendChild(input);

    const preventDefault = vi.fn();
    form.reset = vi.fn();

    const event = {
      currentTarget: form,
      preventDefault,
    } as unknown as Parameters<typeof api.onSubmit>[0];

    // Act / Assert
    expect(() => api.onSubmit(event)).toThrow(error);
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(createRestaurant).not.toHaveBeenCalled();
  });
});
