import "@testing-library/jest-dom";
import { beforeEach, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
});
