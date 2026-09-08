import { NavShell } from "@/components/nav-shell";
import { EscalationsList } from "@/components/console/escalations-list";

export default function EscalationsPage() {
  return (
    <NavShell title="Escalations" nav="provider" wide>
      <div className="space-y-6 p-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Escalations</h1>
          <p className="mt-1 text-sm text-muted">
            Cases flagged for review — a missed check-in, a patient-reported red flag, or a payment dispute.
          </p>
        </div>
        <EscalationsList />
      </div>
    </NavShell>
  );
}
