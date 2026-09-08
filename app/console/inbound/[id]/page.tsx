import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavShell } from "@/components/nav-shell";
import { CheckCircle2 } from "lucide-react";

const PATIENTS: Record<
  string,
  {
    name: string;
    procedure: string;
    visitDate: string;
    summary: string;
    record: { status: "due" } | { status: "sent"; sentDate: string };
  }
> = {
  "sofia-ramirez": {
    name: "Sofía Ramírez",
    procedure: "ACL reconstruction",
    visitDate: "Today",
    summary:
      "Hamstring autograft, no complications. Standard weight-bearing and brace protocol discussed chairside — post-visit record not yet sent.",
    record: { status: "due" },
  },
  "marcus-webb": {
    name: "Marcus Webb",
    procedure: "Rotator cuff repair",
    visitDate: "3 days ago",
    summary: "Procedure went as planned. Follow-up scheduled for suture check.",
    record: { status: "sent", sentDate: "3 days ago" },
  },
};

const PLACEHOLDER = {
  name: "Placeholder name",
  procedure: "Category",
  visitDate: "—",
  summary: "Placeholder description text — this is where the real visit summary goes.",
  record: { status: "due" as const },
};

export default function PatientFilePage({ params }: { params: { id: string } }) {
  const patient = PATIENTS[params.id] ?? PLACEHOLDER;

  return (
    <NavShell title={patient.name} nav="provider">
      <div className="space-y-4 p-4">
        <Card className="flex flex-col items-center gap-3 text-center">
          <div className="h-28 w-28 rounded-lg bg-background-chat" aria-hidden />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{patient.name}</h1>
            <p className="text-sm text-muted">
              {patient.procedure} · {patient.visitDate}
            </p>
          </div>
        </Card>

        <div>
          <h2 className="text-xl font-semibold text-foreground">Visit summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">{patient.summary}</p>
        </div>

        <Card className={patient.record.status === "due" ? undefined : "flex items-center gap-3"}>
          {patient.record.status === "due" ? (
            <div className="space-y-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Post-visit record</h2>
                <p className="mt-1 text-sm text-muted">
                  Not yet sent to {patient.name.split(" ")[0]}. Complete it with heva — takes about a
                  minute.
                </p>
              </div>
              <Link href="/console/post-visit" className="block">
                <Button variant="primary" className="w-full">
                  Complete with heva
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <CheckCircle2 size={18} className="shrink-0 text-brand" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">Post-visit record</h2>
                <p className="mt-1 text-sm text-muted">Sent via WhatsApp · {patient.record.sentDate}</p>
              </div>
            </>
          )}
        </Card>

        {patient.record.status === "sent" && <Badge>Record complete</Badge>}
      </div>
    </NavShell>
  );
}
