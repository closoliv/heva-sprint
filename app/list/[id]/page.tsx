import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavShell } from "@/components/nav-shell";

export default function DetailPage({ params }: { params: { id: string } }) {
  return (
    <NavShell>
      <div className="space-y-4 p-4">
        <Card className="flex flex-col items-center gap-3 text-center">
          <div className="h-28 w-28 rounded-lg bg-background-chat" aria-hidden />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Placeholder name</h1>
            <p className="text-sm text-muted">Category, Category, Category</p>
          </div>
          <div className="flex gap-2">
            <Badge>Badge</Badge>
            <Badge>Badge</Badge>
          </div>
        </Card>

        <div>
          <h2 className="text-xl font-semibold text-foreground">About</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Placeholder description text — this is where the real brief's content goes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground">Details</h2>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {["Item A", "Item B", "Item C", "Item D"].map((label) => (
              <Card key={label} className="text-sm font-medium text-foreground">
                {label}
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Button variant="primary" className="w-full">
            Primary action
          </Button>
          <Button variant="brand" className="w-full">
            Secondary action
          </Button>
        </div>
      </div>
    </NavShell>
  );
}
