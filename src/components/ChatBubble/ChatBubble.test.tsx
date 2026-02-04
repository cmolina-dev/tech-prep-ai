import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ChatBubble from "./ChatBubble";
import { Message } from "@/data/mockData";

describe("ChatBubble", () => {
  it("renders user message correctly", () => {
    const message: Message = {
      id: "1",
      role: "user",
      content: "Hello, this is a test",
      timestamp: new Date("2024-01-01T10:00:00"),
    };

    render(<ChatBubble message={message} />);

    expect(screen.getByText("Hello, this is a test")).toBeInTheDocument();
    expect(screen.getByText("You")).toBeInTheDocument();
  });

  it("renders AI message correctly", () => {
    const message: Message = {
      id: "2",
      role: "ai",
      content: "AI response here",
      timestamp: new Date("2024-01-01T10:01:00"),
    };

    render(<ChatBubble message={message} />);

    expect(screen.getByText("AI response here")).toBeInTheDocument();
    expect(screen.getByText("AI Interviewer")).toBeInTheDocument();
  });

  it("applies correct styling for user messages", () => {
    const message: Message = {
      id: "3",
      role: "user",
      content: "User message",
      timestamp: new Date(),
    };

    const { container } = render(<ChatBubble message={message} />);
    const bubble = container.querySelector(".justify-end");
    expect(bubble).toBeInTheDocument();
  });

  it("applies correct styling for AI messages", () => {
    const message: Message = {
      id: "4",
      role: "ai",
      content: "AI message",
      timestamp: new Date(),
    };

    const { container } = render(<ChatBubble message={message} />);
    const bubble = container.querySelector(".justify-start");
    expect(bubble).toBeInTheDocument();
  });
});
