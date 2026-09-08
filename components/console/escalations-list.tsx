import Link from "next/link";

const escalations = [
  {
    href: "/console/inbound/sofia-ramirez",
    patient: "Sofía Ramírez",
    detail: "ACL reconstruction · post-visit record not yet sent",
    time: "Today",
    status: "attention" as const,
  },
  {
    href: null,
    patient: "James Okafor",
    detail: "Rotator cuff repair · reported mild fever, day 3",
    time: "Yesterday",
    status: "in_progress" as const,
  },
];

function StatusBadge({ status }: { status: "attention" | "in_progress" }) {
  if (status === "attention") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
        <span className="h-1.5 w-1.5 shrink-0 rounded-pill bg-red-600" aria-hidden />
        Needs attention
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-pill bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand">
      In progress
    </span>
  );
}

export function EscalationsList() {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
      {escalations.map((e) => {
        const content = (
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 rounded-pill bg-background-chat" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-foreground">{e.patient}</p>
                <p className="mt-0.5 text-sm text-muted">{e.detail}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 pl-[52px] sm:flex-col sm:items-end sm:pl-0">
              <span className="text-xs text-muted">{e.time}</span>
              <StatusBadge status={e.status} />
            </div>
          </div>
        );
        return e.href ? (
          <Link key={e.patient} href={e.href} className="block transition-colors hover:bg-background-chat">
            {content}
          </Link>
        ) : (
          <div key={e.patient}>{content}</div>
        );
      })}
    </div>
  );
}
