import { afterEach, describe, expect, it, vi } from "vitest";
import { partsApi } from "./client";

describe("partsApi client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("omits json content-type on GET requests", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ openCases: 2 })),
    });
    vi.stubGlobal("fetch", fetchMock);

    await partsApi.getBoard();

    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers["Content-Type"]).toBeUndefined();
    expect(options.headers["X-Parts-Subject"]).toBeTypeOf("string");
  });

  it("adds a clearer parts message for 403 responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        text: () => Promise.resolve(JSON.stringify({ success: false, message: "Parts or admin identity could not be resolved." })),
      }),
    );

    await expect(partsApi.getBoard()).rejects.toThrow(
      "Parts or admin identity could not be resolved. Check the parts/admin user ID allowlist.",
    );
  });
});
