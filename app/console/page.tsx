import { DashboardShell } from "@/components/console/dashboard-shell";
import { EscalationsList } from "@/components/console/escalations-list";

export default function ConsoleDashboard() {
  return (
    <DashboardShell>
      <div className="space-y-6 p-4 sm:p-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Escalations</h1>
          <p className="mt-1 text-sm text-muted">Cases prioritized for your review and action.</p>
        </div>
        <EscalationsList />
      </div>
    </DashboardShell>
  );
}
