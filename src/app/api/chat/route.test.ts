import { describe, it, expect, vi } from "vitest";

// Mock Next.js server utilities
vi.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, init?: any) => ({
      json: async () => data,
      status: init?.status || 200,
    }),
  },
}));

// Mock database
vi.mock("@/db", () => ({
  db: {
    query: {
      sessions: {
        findFirst: vi.fn(),
      },
      messages: {
        findMany: vi.fn(),
      },
    },
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => []),
        })),
      })),
    })),
    insert: vi.fn(() => ({
      values: vi.fn(),
    })),
  },
}));

// Mock AI client
vi.mock("@/lib/ai", () => ({
  aiClient: {
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  },
}));

describe("POST /api/chat", () => {
  it("validates required fields", async () => {
    const { POST } = await import("./route");

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: "test" }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing sessionId");
  });

  it("handles missing session", async () => {
    const { db } = await import("@/db");
    const { POST } = await import("./route");

    vi.mocked(db.query.sessions.findFirst).mockResolvedValue(undefined);

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ sessionId: "non-existent", message: "test" }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe("Session not found");
  });
});
