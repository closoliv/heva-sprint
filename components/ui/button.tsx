import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Taste principle #1 ("One loud color, everywhere else quiet"): the accent
// (lime) variant is reserved for the single primary action on a screen.
// Don't use it more than once per view — that's what makes it work.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:brightness-95",
        brand: "bg-brand text-white hover:bg-brand-700",
        outline: "border border-border bg-white text-foreground hover:bg-background-chat",
        pill: "rounded-pill border border-border bg-white text-foreground px-4 py-2 font-medium hover:bg-background-chat",
        ghost: "text-brand hover:bg-brand-50",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        icon: "h-11 w-11 rounded-pill p-0",
      },
    },
    defaultVariants: { variant: "brand", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
