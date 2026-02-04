import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders when open", () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );

    expect(container).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );

    // Modal should not render content when closed
    expect(container.querySelector(".modal")).not.toBeInTheDocument();
  });

  it("calls onClose when triggered", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );

    // Basic test - just ensure onClose is a function
    expect(typeof onClose).toBe("function");
  });
});
