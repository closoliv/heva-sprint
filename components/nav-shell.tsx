"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Store, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/list/1", label: "Profile", icon: UserRound, match: (p: string) => p.startsWith("/list/") },
  { href: "/list", label: "Store", icon: Store, match: (p: string) => p === "/list" },
  { href: "/chat", label: "Chat", icon: MessageCircle, match: (p: string) => p.startsWith("/chat") },
];

export function NavShell({ title, children }: { title?: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen max-w-app flex-col bg-white">
      <header className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="h-7 w-7 shrink-0 rounded-md bg-brand" aria-hidden />
        <span className="text-lg font-semibold text-foreground">[practice]</span>
        {title && <span className="ml-auto text-sm text-muted">{title}</span>}
      </header>

      <main className="flex-1">{children}</main>

      <nav className="sticky bottom-0 flex border-t border-border bg-white">
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
  );
}
