import { Card } from "@/components/ui/card";
import { DashboardShell } from "@/components/console/dashboard-shell";

const preferences = [
  {
    label: "Auto-draft post-visit records",
    desc: "Pre-fill weight-bearing and brace defaults from graft type — always editable before sending.",
  },
  {
    label: "Delivery channel",
    desc: "WhatsApp today; Instagram and SMS are on the roadmap.",
  },
  {
    label: "Response tone",
    desc: "Plain, direct language — matches how heva writes to patients elsewhere.",
  },
];

export default function FineTuningPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 p-4 sm:p-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Fine-tuning</h1>
          <p className="mt-1 text-sm text-muted">
            How heva's AI assists with your patient records and messages. Placeholder — not wired up yet.
          </p>
        </div>
        <div className="space-y-3">
          {preferences.map((p) => (
            <Card key={p.label}>
              <h2 className="text-sm font-semibold text-foreground">{p.label}</h2>
              <p className="mt-1 text-sm text-muted">{p.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
