"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Calendar,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  SlidersHorizontal,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ESCALATIONS_NEEDING_ATTENTION } from "@/lib/escalations";
import { INBOUND_COUNT } from "@/lib/inbound";

type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string | null;
  match: ((p: string) => boolean) | null;
  count?: number;
};

const navItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: null, match: null },
  { label: "Appointments", icon: Calendar, href: null, match: null },
  {
    label: "Inbound",
    icon: Inbox,
    href: "/console/inbound",
    match: (p) => p === "/console/inbound",
    count: INBOUND_COUNT,
  },
  {
    label: "Escalations",
    icon: AlertTriangle,
    href: "/console",
    // Patient detail pages and the post-visit chat are only ever reached
    // from the Escalations table (e.g. Sofía Ramírez), so keep the nav
    // on Escalations while viewing them instead of jumping to Inbound.
    match: (p) => p === "/console" || p.startsWith("/console/inbound/") || p.startsWith("/console/post-visit"),
    count: ESCALATIONS_NEEDING_ATTENTION,
  },
  {
    label: "Fine-tuning",
    icon: SlidersHorizontal,
    href: "/console/fine-tuning",
    match: (p) => p === "/console/fine-tuning",
  },
  { label: "Wallet", icon: Wallet, href: null, match: null },
  {
    label: "Profile",
    icon: UserRound,
    href: "/console/profile",
    match: (p) => p === "/console/profile",
  },
];

const bottomNavItems: NavItem[] = [
  { label: "Support", icon: HelpCircle, href: null, match: null },
  { label: "Settings", icon: Settings, href: null, match: null },
];

function NavRow({ item, pathname }: { item: NavItem; pathname: string }) {
  const { label, icon: Icon, href, match, count = 0 } = item;
  const active = match ? match(pathname) : false;
  const rowClasses = cn(
    "flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors md:justify-start",
    active ? "bg-brand-50 text-brand" : "text-foreground hover:bg-white"
  );
  const content = (
    <>
      <span className="relative shrink-0">
        <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-pill bg-red-600 text-[9px] font-semibold text-white md:hidden">
            {count}
          </span>
        )}
      </span>
      <span className="hidden flex-1 md:inline">{label}</span>
      {count > 0 && (
        <span className="hidden shrink-0 rounded-pill bg-red-600 px-1.5 py-0.5 text-[11px] font-semibold text-white md:inline">
          {count}
        </span>
      )}
    </>
  );
  return href ? (
    <Link href={href} className={rowClasses}>
      {content}
    </Link>
  ) : (
    <div className={rowClasses}>{content}</div>
  );
}

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
          {navItems.map((item) => (
            <NavRow key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>

        <nav className="mt-auto space-y-1 border-t border-border pt-4">
          {bottomNavItems.map((item) => (
            <NavRow key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
