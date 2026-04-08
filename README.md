# PartsDesk

PartsDesk is the parts web frontend for Ops Hub.

This app is separate from `ops-hub` on purpose:
- `ops-hub` stays the backend, workflow engine, and shared API surface
- `parts-app` is the PartsDesk case-first UI for ordering, ETA/tracking, receipt, and handoff to dispatch

## Current tabs

- `Board`
- `Cases`
- `Requests`
- `Settings`

## Current scope

- `Board`
Queue-first overview of open requests, case-stage distribution, ownership pressure, and quick jumps into active work.

- `Cases`
Case-first workspace for ordering, ETA, tracking, receipt, readiness handoff, linked request context, and timeline review. Cases now also show the underlying BlueFolder SR status plus normalized `serviceRequestStatusMeta` so operators can tell whether a case is still active because the SR is truly parts-related versus closed, quote-blocked, or waiting on customer follow-up.

- `Requests`
Tracked request queue with claim/unclaim/status actions and direct linkage back to the owning case.

- `Settings`
Local operator preferences for theme, app name, saved filters, and restoring the last case/request context.

## Environment

Copy `.env.example` to `.env.local` and set:

- `VITE_OPS_HUB_API_BASE`
- `VITE_OPS_HUB_API_TOKEN`
- `VITE_PARTS_USER_ID`
- `VITE_OPS_HUB_API_TIMEOUT_MS` (optional, defaults to `15000`)
- `VITE_OPS_HUB_PARTS_READ_TIMEOUT_MS` (optional, defaults to `90000` for board, cases, requests, and detail reads)

The checked-in `.env.example` includes the full supported set.

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Tests:

```bash
npm test
```

## Current status

This app now has the same baseline operator polish level as the dispatch app:
- app name and theme are operator-configurable
- light and dark mode are both supported
- case/request filters can be persisted locally
- the last selected case/request can be remembered and restored on launch
