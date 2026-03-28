import { test, expect } from "@playwright/test";
import { faker, simpleFaker } from "@faker-js/faker";

test.describe("Creating a Restaurant", () => {
  test("can create a restaurant", async ({ page }) => {
    // Arrange
    const restaurantName = faker.lorem.words(2);
    const restaurantId = simpleFaker.number.int(10);
    const created = {
      name: restaurantName,
      id: restaurantId,
    };
    await page.route("**/api.outsidein.dev/*/restaurants", (route) => {
      if (route.request().method() === "POST") {
        route.fulfill({ status: 201, json: created });
      } else {
        route.fulfill({
          status: 200,
          json: [created]
        });
      }
    });

    // Act
    await page.goto("/");
    await page.getByRole("textbox").fill(restaurantName);
    await page.getByRole("button", { name: "Add" }).click();

    // Assert
    await expect(page.getByText(restaurantName)).toBeVisible();
  });
});
