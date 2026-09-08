import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavShell } from "@/components/nav-shell";
import { CheckCircle2, Clock } from "lucide-react";

const items = [
  {
    href: "/console/post-visit",
    patient: "Sofía Ramírez",
    detail: "ACL reconstruction · completed today",
    status: "Post-visit record due",
    urgent: true,
  },
  {
    href: null,
    patient: "Marcus Webb",
    detail: "Rotator cuff repair · follow-up scheduled",
    status: "Record sent",
    urgent: false,
  },
];

export default function InboundPage() {
  return (
    <NavShell title="Inbound" nav="provider">
      <div className="space-y-6 p-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Inbound</h1>
          <p className="mt-1 text-sm text-muted">Patients from today's visits who need a next step.</p>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const content = (
              <Card
                className={item.href ? "transition-colors hover:bg-background-chat" : undefined}
              >
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
                    <Badge className="shrink-0">
                      <CheckCircle2 size={12} className="mr-1" />
                      {item.status}
                    </Badge>
                  )}
                </div>
              </Card>
            );
            return item.href ? (
              <Link key={item.patient} href={item.href} className="block">
                {content}
              </Link>
            ) : (
              <div key={item.patient}>{content}</div>
            );
          })}
        </div>
      </div>
    </NavShell>
  );
}
