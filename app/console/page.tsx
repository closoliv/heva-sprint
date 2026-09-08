"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Calendar,
  Inbox,
  LayoutDashboard,
  Search,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EscalationsList } from "@/components/console/escalations-list";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: null },
  { label: "Appointments", icon: Calendar, href: null },
  { label: "Inbound", icon: Inbox, href: "/console/inbound" },
  { label: "Escalations", icon: AlertTriangle, href: "/console" },
  { label: "Fine-tuning", icon: SlidersHorizontal, href: "/console/fine-tuning" },
  { label: "Profile", icon: UserRound, href: "/console/profile" },
];

export default function ConsoleDashboard() {
  const pathname = usePathname();

  return (
    <div className="flex h-dvh bg-white">
      <aside className="flex w-16 shrink-0 flex-col gap-4 border-r border-border bg-background-chat p-2 md:w-64 md:p-4">
        <Link href="/" className="flex items-center justify-center gap-2 px-1 py-2 md:justify-start md:px-2">
          <div className="h-7 w-7 shrink-0 rounded-md bg-brand" aria-hidden />
          <span className="hidden text-lg font-semibold text-foreground md:inline">heva</span>
        </Link>

        <div className="flex items-center justify-center gap-2 rounded-pill border border-border bg-white px-3 py-2 md:justify-start">
          <Search size={16} className="shrink-0 text-muted" />
          <span className="hidden text-sm text-muted md:inline">Search</span>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, href }) => {
            const active = href ? pathname === href : false;
            const rowClasses = cn(
              "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors md:justify-start",
              active ? "bg-brand-50 text-brand" : href ? "text-foreground hover:bg-white" : "cursor-default text-muted"
            );
            return href ? (
              <Link key={label} href={href} className={rowClasses}>
                <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            ) : (
              <div key={label} className={rowClasses}>
                <Icon size={18} strokeWidth={1.8} />
                <span className="hidden md:inline">{label}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Escalations</h1>
            <p className="mt-1 text-sm text-muted">
              Cases flagged for review — a missed check-in, a patient-reported red flag, or a payment
              dispute.
            </p>
          </div>
          <EscalationsList />
        </div>
      </main>
    </div>
  );
}
