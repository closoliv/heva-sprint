import { DashboardShell } from "@/components/console/dashboard-shell";
import { InboundList } from "@/components/console/inbound-list";

export default function InboundPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 p-4 sm:p-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Inbound</h1>
          <p className="mt-1 text-sm text-muted">Patients from today's visits who need a next step.</p>
        </div>
        <InboundList />
      </div>
    </DashboardShell>
  );
}
