import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const { partsApiMock } = vi.hoisted(() => ({
  partsApiMock: {
    getBoard: vi.fn(),
    getCases: vi.fn(),
    getRequests: vi.fn(),
    sync: vi.fn(),
  },
}));

vi.mock("./api/client", () => ({
  partsApi: partsApiMock,
}));

describe("Parts App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    partsApiMock.getBoard.mockReset();
    partsApiMock.getCases.mockReset();
    partsApiMock.getRequests.mockReset();
    partsApiMock.sync.mockReset();
    partsApiMock.getCases.mockResolvedValue({ items: [] });
    partsApiMock.getRequests.mockResolvedValue({ items: [] });
    partsApiMock.sync.mockResolvedValue({ message: "Sync complete." });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the hardened parts auth error on initial board load", async () => {
    partsApiMock.getBoard.mockRejectedValue(
      new Error("Parts or admin identity could not be resolved. Check the parts/admin user ID allowlist."),
    );

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText("Parts or admin identity could not be resolved. Check the parts/admin user ID allowlist."),
      ).toBeInTheDocument();
    });
  });

  it("reloads board, cases, and requests after sync", async () => {
    partsApiMock.getBoard
      .mockResolvedValueOnce({
        queueSummary: {
          totalRequests: 1,
          openRequests: 1,
          assignedRequests: 0,
          unassignedRequests: 1,
          syncedRequests: 0,
          resolvedCount: 0,
        },
        caseMetrics: { stageCounts: {}, assignedCases: 0, unassignedCases: 0 },
        openCases: [],
        openTrackedRequests: [],
      })
      .mockResolvedValueOnce({
        queueSummary: {
          totalRequests: 2,
          openRequests: 2,
          assignedRequests: 1,
          unassignedRequests: 1,
          syncedRequests: 2,
          resolvedCount: 0,
        },
        caseMetrics: { stageCounts: {}, assignedCases: 1, unassignedCases: 0 },
        openCases: [],
        openTrackedRequests: [],
      });
    partsApiMock.getCases
      .mockResolvedValueOnce({ items: [] })
      .mockResolvedValueOnce({ items: [] });
    partsApiMock.getRequests
      .mockResolvedValueOnce({ items: [] })
      .mockResolvedValueOnce({ items: [] });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Sync" })).toBeInTheDocument();
      expect(partsApiMock.getBoard).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(screen.getByRole("button", { name: "Sync" }));

    await waitFor(() => {
      expect(screen.getByText("Sync complete.")).toBeInTheDocument();
      expect(partsApiMock.getBoard).toHaveBeenCalledTimes(2);
      expect(partsApiMock.getCases).toHaveBeenCalledTimes(2);
      expect(partsApiMock.getRequests).toHaveBeenCalledTimes(2);
    });
  });
});
