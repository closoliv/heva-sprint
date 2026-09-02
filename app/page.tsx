import Link from "next/link";
import { Card } from "@/components/ui/card";
import { NavShell } from "@/components/nav-shell";

const routes = [
  { href: "/list/1", title: "Detail pattern", desc: "Profile-style header + sections, mirrors app.heva.co/practice/27" },
  { href: "/list", title: "List pattern", desc: "Searchable, card-based list, mirrors the store page" },
  { href: "/chat", title: "Chat pattern", desc: "Suggestion pills + message input, mirrors the chat page" },
];

export default function Home() {
  return (
    <NavShell>
      <div className="space-y-6 p-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Scaffold</h1>
          <p className="mt-1 text-sm text-muted">
            Blank canvas — swap this page for whatever the brief needs tomorrow.
          </p>
        </div>
        <div className="space-y-5">
          {routes.map((r) => (
            <Link key={r.href} href={r.href}>
              <Card className="transition-colors hover:bg-background-chat">
                <h2 className="text-lg font-semibold text-foreground">{r.title}</h2>
                <p className="mt-1 text-sm text-muted">{r.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </NavShell>
  );
}
