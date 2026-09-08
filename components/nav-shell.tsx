"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Inbox, MessageCircle, SlidersHorizontal, Store, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const patientTabs = [
  { href: "/list/1", label: "Profile", icon: UserRound, match: (p: string) => p.startsWith("/list/") },
  { href: "/list", label: "Store", icon: Store, match: (p: string) => p === "/list" },
  { href: "/chat", label: "Chat", icon: MessageCircle, match: (p: string) => p.startsWith("/chat") },
];

const providerTabs = [
  {
    href: "/console/inbound",
    label: "Inbound",
    icon: Inbox,
    match: (p: string) => p.startsWith("/console/inbound") || p.startsWith("/console/post-visit"),
  },
  { href: "/console/escalations", label: "Escalations", icon: AlertTriangle, match: (p: string) => p === "/console/escalations" },
  { href: "/console/fine-tuning", label: "Fine-tuning", icon: SlidersHorizontal, match: (p: string) => p === "/console/fine-tuning" },
  { href: "/console/profile", label: "Profile", icon: UserRound, match: (p: string) => p === "/console/profile" },
];

export function NavShell({
  title,
  nav = "patient",
  wide = false,
  children,
}: {
  title?: string;
  nav?: "patient" | "provider";
  wide?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const tabs = nav === "provider" ? providerTabs : patientTabs;

  return (
    <div className="flex h-dvh flex-col bg-white">
      <header className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <img src="/heva-icon.svg" alt="heva" width={28} height={28} className="h-7 w-7 shrink-0" />
          <span className="text-lg font-semibold text-foreground">heva</span>
        </Link>

        {title && (
          <span className="hidden truncate text-sm font-medium text-muted sm:inline">{title}</span>
        )}

        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          {tabs.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-pill px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                  active ? "bg-brand-50 text-brand" : "text-muted hover:bg-background-chat"
                )}
              >
                <Icon size={16} strokeWidth={active ? 2.4 : 1.8} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className={cn("mx-auto h-full w-full", wide ? "max-w-6xl" : "max-w-[800px]")}>{children}</div>
      </main>
    </div>
  );
}
