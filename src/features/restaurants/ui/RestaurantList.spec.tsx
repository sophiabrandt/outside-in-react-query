import { describe, expect, it } from "vitest";
import { faker, simpleFaker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { RestaurantList } from "./RestaurantList";

describe("RestaurantList", () => {
  it("should display the restaurants", () => {
    const restaurant1 = faker.company.name();
    const restaurant2 = faker.company.name();
    const restaurants = [
      {
        name: restaurant1,
        id: simpleFaker.number.int(100),
      },
      {
        name: restaurant2,
        id: simpleFaker.number.int(100),
      },
    ];

    render(<RestaurantList restaurants={restaurants} />);

    expect(screen.getByText(restaurant1)).toBeInTheDocument();
    expect(screen.getByText(restaurant2)).toBeInTheDocument();
  });
});
