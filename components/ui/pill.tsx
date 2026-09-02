import * as React from "react";
import { cn } from "@/lib/utils";

// Rounded, outlined chip — used for chat quick-replies and store filters.
export function Pill({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "rounded-pill border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-background-chat",
        className
      )}
      {...props}
    />
  );
}
