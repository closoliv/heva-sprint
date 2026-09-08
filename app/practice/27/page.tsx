import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavShell } from "@/components/nav-shell";

const procedures = ["ACL reconstruction", "Rotator cuff repair", "Meniscus repair", "Knee arthroscopy"];

export default function PracticeProfilePage() {
  return (
    <NavShell title="Practice">
      <div className="space-y-4 p-4">
        <Card className="flex flex-col items-center gap-3 text-center">
          <div className="h-28 w-28 rounded-lg bg-background-chat" aria-hidden />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dr. Bianchi</h1>
            <p className="text-sm text-muted">Orthopaedic surgery, Sports medicine</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge>Verified provider</Badge>
            <Badge>heva partner</Badge>
            <Badge className="text-brand">
              <Star size={12} className="mr-1 fill-brand text-brand" />
              Super provider
            </Badge>
          </div>
        </Card>

        <div>
          <h2 className="text-xl font-semibold text-foreground">About</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Dr. Bianchi is an orthopaedic surgeon specializing in ACL reconstruction and sports
            medicine, with over 12 years treating international patients through heva. Known for
            thorough post-visit follow-up and same-day care summaries.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground">Procedures</h2>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {procedures.map((p) => (
              <Card key={p} className="text-sm font-medium text-foreground">
                {p}
              </Card>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Link href="/chat" className="block">
            <Button variant="primary" className="w-full">
              Chat now
            </Button>
          </Link>
        </div>
      </div>
    </NavShell>
  );
}
