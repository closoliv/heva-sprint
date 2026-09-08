import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { InfoRow } from "@/lib/patients";

export function PatientAvatarCard({
  name,
  demographics,
  as = "h2",
}: {
  name: string;
  demographics: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <Card className="flex flex-col items-center gap-2 text-center">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-pill bg-background-chat" aria-hidden>
        <User size={28} strokeWidth={1.8} className="text-muted" />
      </div>
      <div>
        <Heading className="text-lg font-semibold text-foreground">{name}</Heading>
        <p className="text-sm text-muted">{demographics}</p>
      </div>
    </Card>
  );
}

export function PatientInfoSection({ title, rows }: { title: string; rows: InfoRow[] }) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <dl className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 text-sm">
            <dt className="text-muted">{row.label}</dt>
            <dd className="text-right font-medium text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
