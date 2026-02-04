import { describe, it, expect } from "vitest";
import {
  interviewPaths,
  difficultyOptions,
  InterviewPath,
  DifficultyOption,
} from "./mockData";

describe("mockData", () => {
  describe("interviewPaths", () => {
    it("contains valid path objects", () => {
      expect(interviewPaths.length).toBeGreaterThan(0);

      interviewPaths.forEach((path: InterviewPath) => {
        expect(path).toHaveProperty("id");
        expect(path).toHaveProperty("title");
        expect(path).toHaveProperty("description");
        expect(path).toHaveProperty("icon");
        expect(typeof path.id).toBe("string");
        expect(typeof path.title).toBe("string");
      });
    });

    it("has unique IDs", () => {
      const ids = interviewPaths.map((p: InterviewPath) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("difficultyOptions", () => {
    it("contains valid difficulty objects", () => {
      expect(difficultyOptions.length).toBeGreaterThan(0);

      difficultyOptions.forEach((diff: DifficultyOption) => {
        expect(diff).toHaveProperty("id");
        expect(diff).toHaveProperty("title");
        expect(diff).toHaveProperty("description");
        expect(typeof diff.id).toBe("string");
        expect(typeof diff.title).toBe("string");
      });
    });

    it("has unique IDs", () => {
      const ids = difficultyOptions.map((d: DifficultyOption) => d.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
