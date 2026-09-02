import * as React from "react";
import { cn } from "@/lib/utils";

// Taste principle #2 ("Borders do the separating, shadows barely whisper"):
// default to a border, opt into `elevated` only for the one active/expanded
// card on a screen.
export function Card({
  className,
  elevated = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { elevated?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-white p-4",
        elevated && "shadow-subtle",
        className
      )}
      {...props}
    />
  );
}
