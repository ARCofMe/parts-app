import { render, screen } from "@testing-library/react";
import BrandBar from "./BrandBar";

describe("BrandBar", () => {
  it("renders only safe ecosystem links and marks the current app", () => {
    render(
      <BrandBar
        currentApp="partsApp"
        workspaceLinks={{
          opsHubUrl: "ops.example.com",
          routeDeskUrl: "https://route.example.com",
          partsAppUrl: "https://parts.example.com",
          fieldDeskUrl: "ftp://field.example.com",
        }}
      />
    );

    expect(screen.getByText("PartsApp")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open OpsHub" })).toHaveAttribute("href", "https://ops.example.com/");
    expect(screen.getByRole("link", { name: "Open RouteDesk" })).toHaveAttribute("href", "https://route.example.com/");
    expect(screen.queryByRole("link", { name: "Open FieldDesk" })).not.toBeInTheDocument();
  });
});
