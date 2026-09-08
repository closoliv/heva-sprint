import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/console/dashboard-shell";

export default function ProviderProfilePage() {
  return (
    <DashboardShell>
      <div className="space-y-4 p-4 sm:p-8">
        <Card className="flex flex-col items-center gap-3 text-center">
          <div className="h-28 w-28 rounded-lg bg-background-chat" aria-hidden />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dr. Bianchi</h1>
            <p className="text-sm text-muted">Orthopaedic surgery · Sports medicine</p>
          </div>
          <div className="flex gap-2">
            <Badge>Verified provider</Badge>
            <Badge>heva partner</Badge>
          </div>
        </Card>

        <div>
          <h2 className="text-xl font-semibold text-foreground">About</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Placeholder profile — this is where provider bio, credentials, and practice details go.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
