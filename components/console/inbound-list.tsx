import Link from "next/link";
import { CheckCircle2, MessageCircleMore, ListFilter, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { INBOUND, type InboundStatus } from "@/lib/inbound";
import { ChannelCell } from "@/components/console/escalations-list";

function StatusBadge({ status }: { status: InboundStatus }) {
  if (status === "new_inquiry") {
    return (
      <span className="inline-flex items-center gap-1 rounded-pill bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand">
        <MessageCircleMore size={12} />
        New inquiry
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-pill bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
      <CheckCircle2 size={12} />
      Consultation booked
    </span>
  );
}

export function InboundList() {
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

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
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
              {INBOUND.map((i) => (
                <tr key={i.patient} className={cn(i.href && "hover:bg-background-chat")}>
                  <td className="px-4 py-3 font-medium">
                    {i.href ? (
                      <Link href={i.href} className="text-brand hover:underline">
                        {i.patient}
                      </Link>
                    ) : (
                      <span className="cursor-pointer text-brand hover:underline">{i.patient}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <ChannelCell channel={i.channel} />
                  </td>
                  <td className="px-4 py-3 text-slate">{i.appointmentDate}</td>
                  <td className="px-4 py-3 text-slate">{i.procedure}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={i.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border bg-white px-4 py-3 text-sm sm:flex-row">
          <p className="text-muted">
            Showing <span className="font-medium text-foreground">1–{INBOUND.length}</span> of{" "}
            <span className="font-medium text-foreground">{INBOUND.length}</span> patients
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="rounded-pill border border-border px-3 py-1.5 text-sm font-medium text-muted disabled:opacity-50"
            >
              Previous
            </button>
            <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-brand-50 text-sm font-medium text-brand">
              1
            </span>
            <button
              type="button"
              disabled
              className="rounded-pill border border-border px-3 py-1.5 text-sm font-medium text-muted disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
