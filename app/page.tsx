import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavShell } from "@/components/nav-shell";

export default function Home() {
  return (
    <NavShell>
      <div className="flex h-full flex-col justify-center gap-8 p-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Portable Record</h1>
          <p className="mt-1 text-sm text-muted">
            Post-visit record creation, from provider chat to patient WhatsApp message.
          </p>
        </div>
        <div className="space-y-2">
          <Link href="/console/post-visit" className="block">
            <Button variant="primary" className="w-full">
              Post-visit record
            </Button>
          </Link>
          <Link href="/design-system" className="block">
            <Button variant="brand" className="w-full">
              Design system
            </Button>
          </Link>
        </div>
      </div>
    </NavShell>
  );
}
