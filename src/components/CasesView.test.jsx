import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CasesView from "./CasesView";

describe("CasesView", () => {
  it("filters visible parts cases by stage", () => {
    render(
      <CasesView
        items={[
          {
            caseId: "parts:SR-100",
            reference: "SR-100",
            stage: "part_ordered",
            stageLabel: "Ordered",
            nextAction: "Post ETA",
            status: "open",
            ageBucket: "warm",
            assignedPartsLabel: "Parts 1",
          },
          {
            caseId: "parts:SR-101",
            reference: "SR-101",
            stage: "part_received",
            stageLabel: "Received",
            nextAction: "Schedule with dispatch",
            status: "open",
            ageBucket: "fresh",
            assignedPartsLabel: "Parts 2",
          },
        ]}
        loading={false}
        error=""
        onRefresh={vi.fn()}
        onSelectCase={vi.fn()}
        selectedCase={null}
        selectedCaseDetail={null}
        actionState={null}
        onCaseAction={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Stage"), { target: { value: "received" } });

    expect(screen.getByText("SR-101")).toBeInTheDocument();
    expect(screen.queryByText("SR-100")).not.toBeInTheDocument();
  });

  it("calls refresh and clears the error state after rerender", () => {
    const onRefresh = vi.fn();
    const { rerender } = render(
      <CasesView
        items={[]}
        loading={false}
        error="Could not load parts cases."
        onRefresh={onRefresh}
        onSelectCase={vi.fn()}
        selectedCase={null}
        selectedCaseDetail={null}
        detailLoading={false}
        actionState={null}
        onCaseAction={vi.fn()}
        onOpenRequests={vi.fn()}
        onOpenRequest={vi.fn()}
      />
    );

    expect(screen.getByText("Could not load parts cases.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(onRefresh).toHaveBeenCalledTimes(1);

    rerender(
      <CasesView
        items={[
          {
            caseId: "parts:SR-102",
            reference: "SR-102",
            stage: "part_received",
            stageLabel: "Received",
            nextAction: "Verify and stage",
            status: "open",
            ageBucket: "fresh",
            assignedPartsLabel: "Parts 3",
          },
        ]}
        loading={false}
        error=""
        onRefresh={onRefresh}
        onSelectCase={vi.fn()}
        selectedCase={null}
        selectedCaseDetail={null}
        detailLoading={false}
        actionState={null}
        onCaseAction={vi.fn()}
        onOpenRequests={vi.fn()}
        onOpenRequest={vi.fn()}
      />
    );

    expect(screen.queryByText("Could not load parts cases.")).not.toBeInTheDocument();
    expect(screen.getByText("SR-102")).toBeInTheDocument();
  });
});
