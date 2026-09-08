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

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: null, match: null },
  { label: "Appointments", icon: Calendar, href: null, match: null },
  {
    label: "Inbound",
    icon: Inbox,
    href: "/console/inbound",
    match: (p: string) => p.startsWith("/console/inbound") || p.startsWith("/console/post-visit"),
  },
  { label: "Escalations", icon: AlertTriangle, href: "/console", match: (p: string) => p === "/console" },
  { label: "Fine-tuning", icon: SlidersHorizontal, href: "/console/fine-tuning", match: (p: string) => p === "/console/fine-tuning" },
  { label: "Profile", icon: UserRound, href: "/console/profile", match: (p: string) => p === "/console/profile" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-dvh bg-white">
      <aside className="flex w-16 shrink-0 flex-col gap-4 border-r border-border bg-background-chat p-2 md:w-64 md:p-4">
        <Link href="/" className="flex items-center justify-center gap-2 px-1 py-2 md:justify-start md:px-2">
          <img src="/heva-icon.svg" alt="heva" width={28} height={28} className="h-7 w-7 shrink-0" />
          <span className="hidden text-lg font-semibold text-foreground md:inline">heva</span>
        </Link>

        <div className="flex items-center justify-center gap-2 rounded-pill border border-border bg-white px-3 py-2 md:justify-start">
          <Search size={16} className="shrink-0 text-muted" />
          <span className="hidden text-sm text-muted md:inline">Search</span>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, href, match }) => {
            const active = match ? match(pathname) : false;
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

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
