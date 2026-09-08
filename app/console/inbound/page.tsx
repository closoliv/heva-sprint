import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/console/dashboard-shell";
import { CheckCircle2, Clock } from "lucide-react";

const items = [
  {
    id: "sofia-ramirez",
    patient: "Sofía Ramírez",
    detail: "ACL reconstruction · completed today",
    status: "Post-visit record due",
    urgent: true,
  },
  {
    id: "marcus-webb",
    patient: "Marcus Webb",
    detail: "Rotator cuff repair · follow-up scheduled",
    status: "Record sent",
    urgent: false,
  },
];

export default function InboundPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 p-4 sm:p-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Inbound</h1>
          <p className="mt-1 text-sm text-muted">Patients from today's visits who need a next step.</p>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <Link key={item.id} href={`/console/inbound/${item.id}`} className="block">
              <Card className="transition-colors hover:bg-background-chat">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{item.patient}</h2>
                    <p className="mt-1 text-sm text-muted">{item.detail}</p>
                  </div>
                  {item.urgent ? (
                    <Badge className="shrink-0 bg-brand-50 text-brand">
                      <Clock size={12} className="mr-1" />
                      {item.status}
                    </Badge>
                  ) : (
                    <Badge className="shrink-0 bg-green-50 text-green-600">
                      <CheckCircle2 size={12} className="mr-1" />
                      {item.status}
                    </Badge>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
