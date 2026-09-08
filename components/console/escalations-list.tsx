import Link from "next/link";
import { CheckCircle2, Instagram, ListFilter, MessageCircle, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const escalations = [
  {
    href: "/console/inbound/sofia-ramirez",
    patient: "Sofía Ramírez",
    channel: "WhatsApp" as const,
    appointmentDate: "Sep 8, 2026",
    procedure: "ACL reconstruction",
    status: "attention" as const,
  },
  {
    href: null,
    patient: "James Okafor",
    channel: "WhatsApp" as const,
    appointmentDate: "Sep 7, 2026",
    procedure: "Rotator cuff repair",
    status: "in_progress" as const,
  },
  {
    href: null,
    patient: "Elena Vasquez",
    channel: "Instagram" as const,
    appointmentDate: "Sep 6, 2026",
    procedure: "Meniscus repair",
    status: "attention" as const,
  },
  {
    href: null,
    patient: "Marcus Webb",
    channel: "WhatsApp" as const,
    appointmentDate: "Sep 5, 2026",
    procedure: "Rotator cuff repair",
    status: "in_progress" as const,
  },
  {
    href: null,
    patient: "Priya Nair",
    channel: "Instagram" as const,
    appointmentDate: "Sep 5, 2026",
    procedure: "Knee arthroscopy",
    status: "attention" as const,
  },
  {
    href: null,
    patient: "Tomás Herrera",
    channel: "WhatsApp" as const,
    appointmentDate: "Sep 4, 2026",
    procedure: "ACL reconstruction",
    status: "in_progress" as const,
  },
  {
    href: null,
    patient: "Grace Kim",
    channel: "Instagram" as const,
    appointmentDate: "Sep 3, 2026",
    procedure: "Meniscus repair",
    status: "attention" as const,
  },
  {
    href: null,
    patient: "Daniel Osei",
    channel: "WhatsApp" as const,
    appointmentDate: "Sep 2, 2026",
    procedure: "Knee arthroscopy",
    status: "resolved" as const,
  },
  {
    href: null,
    patient: "Lucía Fernández",
    channel: "Instagram" as const,
    appointmentDate: "Sep 1, 2026",
    procedure: "ACL reconstruction",
    status: "resolved" as const,
  },
  {
    href: null,
    patient: "Omar Haddad",
    channel: "WhatsApp" as const,
    appointmentDate: "Sep 1, 2026",
    procedure: "Rotator cuff repair",
    status: "resolved" as const,
  },
];

function StatusBadge({ status }: { status: "attention" | "in_progress" | "resolved" }) {
  if (status === "attention") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
        <span className="h-1.5 w-1.5 shrink-0 rounded-pill bg-red-600" aria-hidden />
        Needs attention
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="inline-flex items-center rounded-pill bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand">
        In progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-pill bg-background-chat px-2.5 py-1 text-xs font-medium text-slate">
      <CheckCircle2 size={12} />
      Resolved
    </span>
  );
}

function ChannelCell({ channel }: { channel: "WhatsApp" | "Instagram" }) {
  const Icon = channel === "WhatsApp" ? MessageCircle : Instagram;
  return (
    <span className="inline-flex items-center gap-1.5 text-slate">
      <Icon size={15} className="shrink-0 text-muted" />
      {channel}
    </span>
  );
}

export function EscalationsList() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-pill border border-border bg-white px-3 py-2 sm:max-w-xs sm:flex-1">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            placeholder="Search patients..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-pill border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-background-chat"
        >
          <ListFilter size={16} className="text-muted" />
          Filters
          <ChevronDown size={14} className="text-muted" />
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-background-chat text-xs font-medium uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Contact channel</th>
              <th className="px-4 py-3 font-medium">Appointment date</th>
              <th className="px-4 py-3 font-medium">Procedure</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {escalations.map((e) => (
              <tr key={e.patient} className={cn(e.href && "hover:bg-background-chat")}>
                <td className="px-4 py-3 font-medium text-foreground">
                  {e.href ? (
                    <Link href={e.href} className="text-brand hover:underline">
                      {e.patient}
                    </Link>
                  ) : (
                    e.patient
                  )}
                </td>
                <td className="px-4 py-3">
                  <ChannelCell channel={e.channel} />
                </td>
                <td className="px-4 py-3 text-slate">{e.appointmentDate}</td>
                <td className="px-4 py-3 text-slate">{e.procedure}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={e.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
