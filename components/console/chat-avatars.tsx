import { Sparkles, Stethoscope, User } from "lucide-react";

export function HevaAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand text-white">
      <Sparkles size={16} strokeWidth={2} />
    </div>
  );
}

export function ProviderAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border border-border bg-white text-slate">
      <Stethoscope size={16} strokeWidth={1.8} />
    </div>
  );
}

export function PatientAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand text-white">
      <User size={16} strokeWidth={1.8} />
    </div>
  );
}
