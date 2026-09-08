"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, MessageCircle, Star, Stethoscope, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavShell } from "@/components/nav-shell";
import { cn } from "@/lib/utils";

const procedures = ["ACL reconstruction", "Rotator cuff repair", "Meniscus repair", "Knee arthroscopy"];

const ABOUT_TEXT =
  "Dr. Bianchi is an orthopaedic surgeon specializing in ACL reconstruction and sports medicine, with over 12 years treating international patients through heva. Trained in minimally invasive arthroscopic techniques, Dr. Bianchi has performed more than 800 ACL reconstructions using hamstring, patellar tendon, and allograft methods tailored to each patient's activity level and recovery goals. Known for thorough post-visit follow-up and same-day care summaries, Dr. Bianchi's practice emphasizes clear communication before, during, and after every procedure — especially important for patients traveling from abroad who need a reliable record to bring home to their local care team.";

const ADDRESS = "Clínica Bianchi, San José, Costa Rica";

export default function PracticeProfilePage() {
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <NavShell title="Practice" wide>
      <div className="grid grid-cols-1 gap-8 p-4 sm:p-8 lg:grid-cols-[280px_1fr]">
        {/* Left column */}
        <div className="space-y-4">
          <div className="relative aspect-[0.87/1] w-full overflow-hidden rounded-lg bg-background-chat">
            {!photoFailed && (
              <Image
                src="/dr-bianchi.jpg"
                alt="Dr. Bianchi"
                fill
                className="object-cover"
                priority
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dr. Bianchi</h1>
            <p className="mt-1 text-sm text-muted">Orthopaedic surgery, Sports medicine</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>Verified provider</Badge>
            <Badge>heva partner</Badge>
            <Badge className="text-brand">
              <Star size={12} className="mr-1 fill-brand text-brand" />
              Super provider
            </Badge>
          </div>

          <div className="space-y-2 text-sm text-slate">
            <div className="flex items-center gap-2">
              <Clock size={16} className="shrink-0 text-muted" />
              Mon – Sat · 9AM – 5PM
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-muted" />
              <span>{ADDRESS}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link href="/chat" className="block">
              <Button variant="primary" className="w-full">
                <MessageCircle size={16} />
                Chat now
              </Button>
            </Link>
            <Link href="/list" className="block">
              <Button variant="brand" className="w-full">
                <Store size={16} />
                heva Store
              </Button>
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground">About</h2>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed text-slate",
                !aboutExpanded && "line-clamp-3"
              )}
            >
              {ABOUT_TEXT}
            </p>
            <button
              onClick={() => setAboutExpanded((v) => !v)}
              className="mt-1 text-sm font-medium text-brand hover:underline"
            >
              {aboutExpanded ? "Show less" : "Show more"}
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">Procedures</h2>
            <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {procedures.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <Stethoscope size={18} className="shrink-0 text-muted" strokeWidth={1.5} />
                  <span className="text-sm text-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">Where to find me</h2>
            <div
              className="relative mt-3 h-80 w-full overflow-hidden rounded-lg border border-border bg-background-chat"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(139,141,145,0.18) 39px, rgba(139,141,145,0.18) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(139,141,145,0.18) 39px, rgba(139,141,145,0.18) 40px)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <MapPin size={32} className="fill-brand-50 text-brand drop-shadow-sm" strokeWidth={1.75} />
                <span className="rounded-pill border border-border bg-white px-3 py-1 text-xs font-medium text-foreground shadow-subtle">
                  {ADDRESS}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavShell>
  );
}
