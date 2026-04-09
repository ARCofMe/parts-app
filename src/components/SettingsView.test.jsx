import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SettingsView from "./SettingsView";

describe("SettingsView", () => {
  it("shows ecosystem readiness and quick links", () => {
    render(
      <SettingsView
        themeMode="dark"
        onThemeModeChange={vi.fn()}
        preferences={{
          rememberLastCase: true,
          restoreLastCaseOnLaunch: false,
          rememberLastRequest: true,
          restoreLastRequestOnLaunch: false,
          persistFilters: { cases: true, requests: true },
        }}
        onPreferencesChange={vi.fn()}
        onClearSavedState={vi.fn()}
        workspaceLinks={{
          opsHubUrl: "ops.example.com",
          routeDeskUrl: "route.example.com",
          partsAppUrl: "",
          fieldDeskUrl: "",
        }}
        onWorkspaceLinksChange={vi.fn()}
      />,
    );

    expect(screen.getByText("2 of 4 workspaces configured.")).toBeInTheDocument();
    expect(screen.getByText("Current app")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open OpsHub" })).toHaveAttribute("href", "https://ops.example.com/");
    expect(screen.getByRole("link", { name: "Open RouteDesk" })).toHaveAttribute("href", "https://route.example.com/");
  });
});
