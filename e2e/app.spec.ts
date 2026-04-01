import { test, expect } from "@playwright/test";

test.describe("Show error boundary", () => {
  test("shows error boundary when response cannot be parsed", async ({ page }) => {
    // Arrange
    await page.route("**/api.outsidein.dev/*/restaurants", (route) => {
      route.fulfill({ json: null });
    });

    // Act
    await page.goto("/");

    // Assert
    await expect(
      page.getByText("Failed to parse restaurants response"),
    ).toBeVisible();
  });
});
