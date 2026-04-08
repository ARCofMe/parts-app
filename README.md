# PartsDesk

PartsDesk is the parts operations web app for Ops Hub.

It is built for the office-side parts workflow:

- open queue visibility
- case-first parts handling
- request tracking and ownership
- ETA, tracking, receipt, and readiness handoff
- BlueFolder status context alongside internal workflow state

## Main Workspaces

- `Board`
  Overview of queue pressure, stage distribution, and ownership load.
- `Cases`
  Case-first workspace for parts lifecycle work and dispatch handoff.
- `Requests`
  Tracked request queue with claim, unclaim, and status actions.
- `Settings`
  Local operator preferences and remembered context.

## Runtime Requirements

Create `.env.local` from `.env.example` and set:

- `VITE_OPS_HUB_API_BASE`
- `VITE_OPS_HUB_API_TOKEN`
- `VITE_PARTS_USER_ID`

Optional:

- `VITE_OPS_HUB_API_TIMEOUT_MS`
- `VITE_OPS_HUB_PARTS_READ_TIMEOUT_MS`

PartsDesk branding is fixed in the app. There is no product-name override.

## Local Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Notes

- PartsDesk depends on Ops Hub for case, request, and BlueFolder-derived status data.
- Cases now include underlying BlueFolder SR status context so operators can distinguish true active parts work from quote-blocked, customer-waiting, or closed SRs.
- The app keeps local filter and selection preferences so operators can return to the same working context quickly.
