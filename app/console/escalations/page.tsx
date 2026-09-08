import { NavShell } from "@/components/nav-shell";
import { ShieldCheck } from "lucide-react";

export default function EscalationsPage() {
  return (
    <NavShell title="Escalations" nav="provider">
      <div className="flex h-full flex-col p-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Escalations</h1>
          <p className="mt-1 text-sm text-muted">
            Cases flagged for review — a missed check-in, a patient-reported red flag, or a payment dispute.
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <ShieldCheck size={32} className="text-muted" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-medium text-foreground">No active escalations</p>
            <p className="mt-1 text-sm text-muted">You're all caught up.</p>
          </div>
        </div>
      </div>
    </NavShell>
  );
}
