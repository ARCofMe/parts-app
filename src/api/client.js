const API_BASE = (import.meta.env.VITE_OPS_HUB_API_BASE || "http://127.0.0.1:8787").replace(/\/$/, "");
const API_TOKEN = import.meta.env.VITE_OPS_HUB_API_TOKEN || "";
const PARTS_USER_ID = import.meta.env.VITE_PARTS_USER_ID || "";
const REQUEST_TIMEOUT_MS = Number(import.meta.env.VITE_OPS_HUB_API_TIMEOUT_MS || 15000);

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const hasBody = options.body !== undefined;
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: options.method || "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
        "X-Parts-Subject": PARTS_USER_ID,
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
      body: hasBody ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });
    const text = await response.text();
    const payload = parsePayload(text);
    if (!response.ok) {
      throw new Error(buildErrorMessage(response.status, payload, text));
    }
    return payload;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Ops Hub request timed out after ${Math.round(REQUEST_TIMEOUT_MS / 1000)}s.`);
    }
    if (error instanceof TypeError) {
      throw new Error("Could not reach Ops Hub. Check that ops-hub is running and the API base URL is correct.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export const partsApi = {
  getBoard() {
    return request("/parts/board");
  },
  getCases(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && `${value}`.trim() !== "") params.set(key, value);
    });
    const suffix = params.size ? `?${params.toString()}` : "";
    return request(`/parts/cases${suffix}`);
  },
  getCase(reference) {
    return request(`/parts/cases/${encodeURIComponent(reference)}`);
  },
  getCaseTimeline(reference) {
    return request(`/parts/cases/${encodeURIComponent(reference)}/timeline`);
  },
  getRequests(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && `${value}`.trim() !== "") params.set(key, value);
    });
    const suffix = params.size ? `?${params.toString()}` : "";
    return request(`/parts/requests${suffix}`);
  },
  getRequest(requestId) {
    return request(`/parts/requests/${requestId}`);
  },
  postRequestAction(requestId, action, body = {}) {
    return request(`/parts/requests/${requestId}/${action}`, { method: "POST", body });
  },
  postCaseAction(srId, action, body = {}) {
    return request(`/parts/sr/${srId}/${action}`, { method: "POST", body });
  },
  sync() {
    return request("/parts/requests/sync", { method: "POST" });
  },
  reconcile() {
    return request("/parts/requests/reconcile", { method: "POST" });
  },
};

function parsePayload(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function buildErrorMessage(status, payload, text) {
  const message =
    (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string" && payload.message) ||
    (typeof payload === "string" ? payload : "") ||
    text ||
    `HTTP ${status}`;

  if (status === 401) return `${message} Check the Ops Hub API token.`;
  if (status === 403) return `${message} Check the parts/admin user ID allowlist.`;
  return message;
}
