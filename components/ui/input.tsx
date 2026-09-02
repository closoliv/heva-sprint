import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-sm border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
