import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StepIndicator from "./StepIndicator";

describe("StepIndicator", () => {
  it("renders component", () => {
    render(<StepIndicator />);
    // Basic smoke test - just ensure it renders without crashing
    expect(document.body).toBeInTheDocument();
  });
});
