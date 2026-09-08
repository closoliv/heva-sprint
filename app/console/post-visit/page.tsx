"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import Link from "next/link";
import { ChevronLeft, Mic, Paperclip, Sparkles, Stethoscope, Undo2, X } from "lucide-react";
import { SendIcon } from "@/components/ui/send-icon";
import { DashboardShell } from "@/components/console/dashboard-shell";
import { PatientAvatarCard, PatientInfoSection } from "@/components/console/patient-overview";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PATIENTS } from "@/lib/patients";

// Demo constants — spec uses "[Patient]" / "Dr. [Provider last name]" placeholders.
const PATIENT_FIRST_NAME = "Sofía";
const PROVIDER_LAST_NAME = "Bianchi";
const PATIENT = PATIENTS["sofia-ramirez"];
const PROCEDURE_NAME = PATIENT.generalInfo.find((row) => row.label === "Procedure")?.value ?? "";

type StepId =
  | "graft_type"
  | "outcome"
  | "outcome_note"
  | "weight_bearing"
  | "brace"
  | "physical_therapy"
  | "red_flags"
  | "follow_up";

type Record_ = {
  graftType: string;
  outcome: string;
  outcomeNote: string;
  weightBearing: string;
  brace: string;
  physicalTherapy: string;
  redFlags: string[];
  followUp: string;
};

const DEFAULT_RED_FLAGS = [
  "Fever, or redness/warmth/drainage spreading from the incision (possible infection)",
  "Increasing calf pain, swelling, or tenderness — contact us immediately (possible blood clot)",
  "Chest pain or shortness of breath — seek emergency care immediately (possible clot reaching the lung)",
  "Numbness, tingling, or the foot turning pale or cold",
];

const EMPTY_RECORD: Record_ = {
  graftType: "",
  outcome: "",
  outcomeNote: "",
  weightBearing: "",
  brace: "",
  physicalTherapy: "",
  redFlags: DEFAULT_RED_FLAGS,
  followUp: "",
};

type StepConfig = {
  prompt: () => string;
  chips?: string[];
  // Chips that need free text instead of submitting immediately (e.g. "Other", "Custom").
  customChips?: string[];
  field: keyof Record_;
  defaultValue?: string;
};

const STEP_CONFIG: Record<StepId, StepConfig> = {
  graft_type: {
    prompt: () => "Which graft did you use?",
    chips: ["Hamstring autograft", "Patellar tendon autograft", "Allograft", "Other"],
    customChips: ["Other"],
    field: "graftType",
  },
  outcome: {
    prompt: () => "How did the procedure go?",
    chips: ["As planned", "Noted a complication"],
    field: "outcome",
  },
  outcome_note: {
    prompt: () => "What should the patient know?",
    field: "outcomeNote",
  },
  weight_bearing: {
    prompt: () => "Weight-bearing status for the next couple of weeks?",
    chips: [
      "Weight-bearing as tolerated, with crutches",
      "Non-weight-bearing",
      "Partial weight-bearing",
      "Custom",
    ],
    customChips: ["Custom"],
    field: "weightBearing",
    defaultValue: "Weight-bearing as tolerated, with crutches",
  },
  brace: {
    prompt: () => "Brace instructions?",
    chips: ["Locked in extension, remove around 2 weeks", "Functional brace, unlocked", "No brace"],
    field: "brace",
    defaultValue: "Locked in extension, remove around 2 weeks",
  },
  // Options grounded in Phase 1 (0-4 weeks) of the provided ACL Reconstruction
  // Guidelines — the two branch on whether a meniscus repair was also done,
  // which changes the ROM restriction per that protocol.
  physical_therapy: {
    prompt: () => "Physical therapy plan for the next few weeks?",
    chips: [
      "Start PT this week — quad sets, ROM as tolerated, no forced flexion. Avoid prolonged standing/walking.",
      "Start PT this week — quad sets, ROM limited to 0–90° for the first 2 weeks (meniscus repair), no forced flexion.",
      "Custom",
    ],
    customChips: ["Custom"],
    field: "physicalTherapy",
    defaultValue:
      "Start PT this week — quad sets, ROM as tolerated, no forced flexion. Avoid prolonged standing/walking.",
  },
  red_flags: {
    prompt: () =>
      `Here's the standard list of things that should prompt ${PATIENT_FIRST_NAME} to contact you or seek care right away — edit as needed:`,
    field: "redFlags",
  },
  follow_up: {
    prompt: () => `When should ${PATIENT_FIRST_NAME} check back in?`,
    chips: ["2 weeks – suture check", "Custom"],
    customChips: ["Custom"],
    field: "followUp",
  },
};

function getStepSequence(record: Record_): StepId[] {
  const seq: StepId[] = ["graft_type", "outcome"];
  if (record.outcome === "Noted a complication") seq.push("outcome_note");
  seq.push("weight_bearing", "brace", "physical_therapy", "red_flags", "follow_up");
  return seq;
}

function buildWhatsAppMessage(record: Record_) {
  const howItWent = record.outcome === "Noted a complication" ? record.outcomeNote : record.outcome;
  const redFlagLines = record.redFlags.map((f) => `- ${f}`).join("\n");
  return `Hi ${PATIENT_FIRST_NAME}, here's a summary from your ACL reconstruction
with Dr. ${PROVIDER_LAST_NAME} today:

🦵 Procedure: ACL reconstruction (${record.graftType})
✅ How it went: ${howItWent}

What to do:
- ${record.weightBearing}
- ${record.brace}
- ${record.physicalTherapy}

⚠️ Contact us right away if you notice:
${redFlagLines}

📅 Next check-in: ${record.followUp}

Questions? Message us here anytime.`;
}

function HevaAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand text-white">
      <Sparkles size={16} strokeWidth={2} />
    </div>
  );
}

function ProviderAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border border-border bg-white text-slate">
      <Stethoscope size={16} strokeWidth={1.8} />
    </div>
  );
}

function SystemBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end justify-start gap-2">
      <HevaAvatar />
      <div className="max-w-[85%] rounded-lg border border-border bg-white p-3 text-sm text-foreground">
        {children}
      </div>
    </div>
  );
}

function ProviderBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end justify-end gap-2">
      <div className="max-w-[85%] rounded-lg bg-brand p-3 text-sm text-white">{children}</div>
      <ProviderAvatar />
    </div>
  );
}

type ChipState = "plain" | "suggested" | "selected";

function Chip({ state, onClick, children }: { state: ChipState; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
        state === "selected" && "border-brand bg-brand text-white",
        state === "suggested" && "border-brand bg-white text-brand hover:bg-brand-50",
        state === "plain" && "border-brand bg-white text-foreground hover:bg-background-chat"
      )}
    >
      {children}
    </button>
  );
}

function answerDisplay(stepId: StepId, record: Record_) {
  if (stepId === "red_flags") {
    return (
      <ul className="list-disc space-y-1 pl-4">
        {record.redFlags.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    );
  }
  return record[STEP_CONFIG[stepId].field] as string;
}

export default function PostVisitRecordPage() {
  const [record, setRecord] = useState<Record_>(EMPTY_RECORD);
  const [history, setHistory] = useState<StepId[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [fieldRevealed, setFieldRevealed] = useState(false);
  const [status, setStatus] = useState<"draft" | "sent">("draft");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sequence = getStepSequence(record);
  const currentStepId: StepId | "preview" | "sent" =
    status === "sent" ? "sent" : history.length < sequence.length ? sequence[history.length] : "preview";

  const isAnswering = currentStepId !== "preview" && currentStepId !== "sent";
  const currentConfig = isAnswering ? STEP_CONFIG[currentStepId] : null;
  const stepHasChips = !!currentConfig?.chips?.length;

  useEffect(() => {
    setInputValue("");
    setFieldRevealed(!stepHasChips); // steps with no chips (outcome_note) show the field immediately
    if (!stepHasChips) inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepId]);

  useEffect(() => {
    if (fieldRevealed) inputRef.current?.focus();
  }, [fieldRevealed]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, currentStepId]);

  function submitAnswer(stepId: StepId, value: string) {
    const field = STEP_CONFIG[stepId].field;
    setRecord((r) => ({ ...r, [field]: value }));
    setHistory((h) => [...h, stepId]);
  }

  function handleChipTap(chip: string) {
    if (!isAnswering || currentStepId === "red_flags") return;
    if (currentConfig?.customChips?.includes(chip)) {
      setInputValue("");
      setFieldRevealed(true);
      return;
    }
    submitAnswer(currentStepId as StepId, chip);
  }

  function handleSend() {
    if (!isAnswering) return;
    const value = inputValue.trim();
    if (!value) return;
    submitAnswer(currentStepId as StepId, value);
  }

  function handleAddRedFlag() {
    const value = inputValue.trim();
    if (!value) return;
    setRecord((r) => ({ ...r, redFlags: [...r.redFlags, value] }));
    setInputValue("");
  }

  function handleRemoveRedFlag(flag: string) {
    setRecord((r) => ({ ...r, redFlags: r.redFlags.filter((f) => f !== flag) }));
  }

  function handleContinueRedFlags() {
    setHistory((h) => [...h, "red_flags"]);
  }

  function handleUndo() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    if (last !== "red_flags") {
      setRecord((r) => ({ ...r, [STEP_CONFIG[last].field]: "" }));
    }
  }

  function handleEdit() {
    setStatus("draft");
    setHistory([]);
  }

  function handleSubmitInput() {
    if (currentStepId === "red_flags") handleAddRedFlag();
    else handleSend();
  }

  function chipState(field: keyof Record_, chip: string): ChipState {
    const stored = record[field];
    if (typeof stored === "string" && stored === chip) return "selected";
    if (!stored && currentConfig?.defaultValue === chip) return "suggested";
    return "plain";
  }

  const showField = isAnswering && (currentStepId === "red_flags" || fieldRevealed);

  function revealField() {
    if (isAnswering && !fieldRevealed) setFieldRevealed(true);
  }

  return (
    <DashboardShell>
      <div className="flex h-full flex-col bg-white">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-white px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/console/inbound/sofia-ramirez"
              className="flex shrink-0 items-center gap-1 text-sm text-muted hover:text-foreground"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">{PATIENT_FIRST_NAME} Ramírez</span>
            </Link>
            <span className="hidden text-border sm:inline">|</span>
            <h1 className="truncate text-sm font-semibold text-foreground">
              Post-visit record for {PROCEDURE_NAME}
            </h1>
          </div>
          {history.length > 0 && currentStepId !== "sent" && (
            <button
              onClick={handleUndo}
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-brand hover:underline"
            >
              <Undo2 size={12} />
              Undo last answer
            </button>
          )}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Quick-reference panel */}
          <aside className="hidden w-72 shrink-0 space-y-4 overflow-y-auto border-r border-border bg-background-chat p-4 lg:block">
            <PatientAvatarCard name={PATIENT.name} demographics={PATIENT.demographics} />
            <PatientInfoSection title="General info" rows={PATIENT.generalInfo} />
            <PatientInfoSection title="Contact info" rows={PATIENT.contactInfo} />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            <SystemBubble>
              Nice work finishing up with {PATIENT_FIRST_NAME}&apos;s ACL reconstruction. Let&apos;s get
              their post-visit record ready — takes about a minute.
            </SystemBubble>
  
            {history.map((stepId, i) => (
              <Fragment key={`${stepId}-${i}`}>
                <SystemBubble>{STEP_CONFIG[stepId].prompt()}</SystemBubble>
                <ProviderBubble>{answerDisplay(stepId, record)}</ProviderBubble>
              </Fragment>
            ))}
  
            {isAnswering && (
              <div className="flex items-end justify-start gap-2">
                <HevaAvatar />
                <div className="max-w-[85%] rounded-lg border border-border bg-white p-3">
                  <p className="text-sm text-foreground">{STEP_CONFIG[currentStepId].prompt()}</p>
  
                  {currentStepId === "red_flags" ? (
                    <div className="mt-3 space-y-3">
                      <ul className="space-y-2">
                        {record.redFlags.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 rounded-pill border border-border bg-background-chat px-3 py-2 text-sm text-foreground"
                          >
                            <span className="flex-1">{f}</span>
                            <button
                              onClick={() => handleRemoveRedFlag(f)}
                              aria-label="Remove"
                              className="mt-0.5 shrink-0 text-muted hover:text-foreground"
                            >
                              <X size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted">
                        Type below to add another, or continue when the list looks right.
                      </p>
                      <Button variant="ghost" size="sm" onClick={handleContinueRedFlags}>
                        Continue →
                      </Button>
                    </div>
                  ) : (
                    stepHasChips && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {currentConfig!.chips!.map((chip) => (
                          <Chip
                            key={chip}
                            state={chipState(currentConfig!.field, chip)}
                            onClick={() => handleChipTap(chip)}
                          >
                            {chip}
                          </Chip>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
  
            {currentStepId === "preview" && (
              <Card elevated className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Post-visit record</h2>
                  <p className="text-sm text-muted">ACL reconstruction · {record.graftType}</p>
                </div>
  
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-medium text-foreground">How it went</dt>
                    <dd className="text-slate">
                      {record.outcome}
                      {record.outcome === "Noted a complication" && record.outcomeNote && (
                        <span className="block text-muted">{record.outcomeNote}</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">What to do</dt>
                    <dd className="text-slate">
                      <ul className="list-disc pl-4">
                        <li>{record.weightBearing}</li>
                        <li>{record.brace}</li>
                        <li>{record.physicalTherapy}</li>
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Contact us right away if</dt>
                    <dd className="text-slate">
                      <ul className="list-disc pl-4">
                        {record.redFlags.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Next check-in</dt>
                    <dd className="text-slate">{record.followUp}</dd>
                  </div>
                </dl>
  
                <div className="space-y-2 pt-2">
                  <Button variant="brand" className="w-full" onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button variant="primary" className="w-full" onClick={() => setStatus("sent")}>
                    Send to {PATIENT_FIRST_NAME}
                  </Button>
                </div>
              </Card>
            )}
  
            {currentStepId === "sent" && (
              <div className="space-y-4">
                <SystemBubble>✅ Sent to {PATIENT_FIRST_NAME} via WhatsApp.</SystemBubble>
  
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                    What {PATIENT_FIRST_NAME} receives
                  </p>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2">
                      <div className="h-6 w-6 shrink-0 rounded-pill bg-white/20" aria-hidden />
                      <span className="text-sm font-medium text-white">heva</span>
                    </div>
                    <div className="bg-[#ECE5DD] p-3">
                      <div className="max-w-[90%] whitespace-pre-line rounded-lg bg-[#DCF8C6] p-3 text-sm text-[#111B21]">
                        {buildWhatsAppMessage(record)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
  
          {isAnswering && (
            <div className="flex shrink-0 items-center gap-2 border-t border-border bg-white p-3">
              <button
                type="button"
                tabIndex={-1}
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-pill transition-colors",
                  showField ? "bg-brand text-white" : "bg-background-chat text-muted"
                )}
              >
                <Paperclip size={18} />
              </button>
              <div
                onClick={revealField}
                className={cn(
                  "flex flex-1 items-center rounded-pill border px-4 transition-colors",
                  showField ? "border-border bg-white" : "cursor-text border-border bg-background-chat"
                )}
              >
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={revealField}
                  readOnly={!showField}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmitInput();
                  }}
                  placeholder={showField ? "Type your own answer..." : "Tap a chip, or type here"}
                  className={cn(
                    "h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted",
                    !showField && "cursor-text text-muted"
                  )}
                />
              </div>
              <button
                type="button"
                tabIndex={-1}
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-pill transition-colors",
                  showField ? "bg-brand text-white" : "bg-background-chat text-muted"
                )}
              >
                <Mic size={18} />
              </button>
              <button
                type="button"
                onClick={handleSubmitInput}
                disabled={!showField || !inputValue.trim()}
                aria-label="Send"
                className="h-8 w-12 shrink-0 disabled:opacity-50"
              >
                <SendIcon className="h-full w-full" />
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
