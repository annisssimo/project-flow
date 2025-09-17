import {
  cn,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  getInitials,
  generateId,
  calculateProgress,
  getPriorityColor,
  getStatusColor,
  debounce,
} from "../utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("handles conditional classes", () => {
      expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
    });
  });

  describe("formatDate", () => {
    it("formats date correctly", () => {
      const date = new Date("2024-01-15");
      expect(formatDate(date)).toBe("Jan 15, 2024");
    });
  });

  describe("formatDateTime", () => {
    it("formats date and time correctly", () => {
      const date = new Date("2024-01-15T14:30:00");
      expect(formatDateTime(date)).toBe("Jan 15, 2024, 02:30 PM");
    });
  });

  describe("formatRelativeTime", () => {
    it("formats recent time correctly", () => {
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
      expect(formatRelativeTime(oneMinuteAgo)).toBe("1m ago");
    });

    it("formats older time correctly", () => {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(oneDayAgo)).toBe("1d ago");
    });
  });

  describe("getInitials", () => {
    it("extracts initials from name", () => {
      expect(getInitials("John Doe")).toBe("JD");
      expect(getInitials("Jane Smith Wilson")).toBe("JS");
    });
  });

  describe("generateId", () => {
    it("generates unique IDs", () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1).toHaveLength(9);
    });
  });

  describe("calculateProgress", () => {
    it("calculates progress correctly", () => {
      expect(calculateProgress(3, 10)).toBe(30);
      expect(calculateProgress(0, 0)).toBe(0);
      expect(calculateProgress(5, 5)).toBe(100);
    });
  });

  describe("getPriorityColor", () => {
    it("returns correct colors for priorities", () => {
      expect(getPriorityColor("urgent")).toContain("text-red-600");
      expect(getPriorityColor("high")).toContain("text-orange-600");
      expect(getPriorityColor("medium")).toContain("text-yellow-600");
      expect(getPriorityColor("low")).toContain("text-green-600");
    });
  });

  describe("getStatusColor", () => {
    it("returns correct colors for statuses", () => {
      expect(getStatusColor("completed")).toContain("text-green-600");
      expect(getStatusColor("active")).toContain("text-blue-600");
      expect(getStatusColor("on-hold")).toContain("text-yellow-600");
    });
  });

  describe("debounce", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("debounces function calls", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
