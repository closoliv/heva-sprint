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
  children,
}: {
  title?: string;
  nav?: "patient" | "provider";
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const tabs = nav === "provider" ? providerTabs : patientTabs;

  return (
    <div className="h-dvh overflow-hidden bg-background-chat sm:flex sm:items-center sm:justify-center sm:p-8">
      <div className="mx-auto flex h-dvh w-full max-w-app flex-col bg-white sm:h-[85dvh] sm:max-w-[800px] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:shadow-subtle">
        <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
          <div className="h-7 w-7 shrink-0 rounded-md bg-brand" aria-hidden />
          <span className="text-lg font-semibold text-foreground">heva</span>
          {title && <span className="ml-auto text-sm text-muted">{title}</span>}
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>

        <nav className="flex shrink-0 border-t border-border bg-white">
          {tabs.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium",
                  active ? "text-brand" : "text-muted"
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
