"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import { ArrowUp, X } from "lucide-react";
import { NavShell } from "@/components/nav-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Demo constants — spec uses "[Patient]" / "Dr. [Provider last name]" placeholders.
const PATIENT_FIRST_NAME = "Sofía";
const PROVIDER_LAST_NAME = "Bianchi";

type StepId =
  | "graft_type"
  | "outcome"
  | "outcome_note"
  | "weight_bearing"
  | "brace"
  | "red_flags"
  | "follow_up";

type Record_ = {
  graftType: string;
  outcome: string;
  outcomeNote: string;
  weightBearing: string;
  brace: string;
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
  redFlags: DEFAULT_RED_FLAGS,
  followUp: "",
};

type StepConfig = {
  prompt: () => string;
  chips?: string[];
  field: keyof Record_;
  defaultValue?: string;
};

const STEP_CONFIG: Record<StepId, StepConfig> = {
  graft_type: {
    prompt: () => "Which graft did you use?",
    chips: ["Hamstring autograft", "Patellar tendon autograft", "Allograft", "Other"],
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
    field: "weightBearing",
    defaultValue: "Weight-bearing as tolerated, with crutches",
  },
  brace: {
    prompt: () => "Brace instructions?",
    chips: ["Locked in extension, remove around 2 weeks", "Functional brace, unlocked", "No brace"],
    field: "brace",
    defaultValue: "Locked in extension, remove around 2 weeks",
  },
  red_flags: {
    prompt: () =>
      `Here's the standard list of things that should prompt ${PATIENT_FIRST_NAME} to contact you or seek care right away — edit as needed:`,
    field: "redFlags",
  },
  follow_up: {
    prompt: () => `When should ${PATIENT_FIRST_NAME} check back in?`,
    chips: ["2 weeks – suture check", "Custom"],
    field: "followUp",
  },
};

function getStepSequence(record: Record_): StepId[] {
  const seq: StepId[] = ["graft_type", "outcome"];
  if (record.outcome === "Noted a complication") seq.push("outcome_note");
  seq.push("weight_bearing", "brace", "red_flags", "follow_up");
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

⚠️ Contact us right away if you notice:
${redFlagLines}

📅 Next check-in: ${record.followUp}

Questions? Message us here anytime.`;
}

function SystemBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-lg border border-border bg-white p-3 text-sm text-foreground">
        {children}
      </div>
    </div>
  );
}

function ProviderBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-lg bg-brand p-3 text-sm text-white">{children}</div>
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-pill border px-4 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-brand bg-brand text-white"
          : "border-border bg-white text-foreground hover:bg-background-chat"
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
  const [status, setStatus] = useState<"draft" | "sent">("draft");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sequence = getStepSequence(record);
  const currentStepId: StepId | "preview" | "sent" =
    status === "sent" ? "sent" : history.length < sequence.length ? sequence[history.length] : "preview";

  useEffect(() => {
    if (currentStepId === "preview" || currentStepId === "sent") return;
    const cfg = STEP_CONFIG[currentStepId];
    const stored = record[cfg.field];
    const initial = typeof stored === "string" && stored ? stored : cfg.defaultValue ?? "";
    setInputValue(initial);
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, currentStepId]);

  function handleChipTap(chip: string) {
    if (chip === "Custom") {
      setInputValue("");
      inputRef.current?.focus();
      return;
    }
    setInputValue(chip);
  }

  function handleSend() {
    if (currentStepId === "preview" || currentStepId === "sent") return;
    const value = inputValue.trim();
    if (!value) return;
    const field = STEP_CONFIG[currentStepId].field;
    setRecord((r) => ({ ...r, [field]: value }));
    setHistory((h) => [...h, currentStepId]);
    setInputValue("");
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
    setInputValue("");
  }

  function handleEdit() {
    setStatus("draft");
    setHistory([]);
  }

  function handleSubmitInput() {
    if (currentStepId === "red_flags") handleAddRedFlag();
    else handleSend();
  }

  const isAnswering = currentStepId !== "preview" && currentStepId !== "sent";

  return (
    <NavShell title="Post-visit record">
      <div className="flex h-full flex-col bg-background-chat">
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
            <>
              <SystemBubble>{STEP_CONFIG[currentStepId].prompt()}</SystemBubble>

              {currentStepId === "red_flags" ? (
                <div className="flex justify-start">
                  <div className="w-full max-w-[85%] space-y-3 rounded-lg border border-border bg-white p-3">
                    <ul className="space-y-2">
                      {record.redFlags.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 rounded-pill border border-border bg-white px-3 py-2 text-sm text-foreground"
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
                </div>
              ) : (
                STEP_CONFIG[currentStepId].chips && (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2">
                      {STEP_CONFIG[currentStepId].chips!.map((chip) => (
                        <Chip
                          key={chip}
                          selected={inputValue === chip}
                          onClick={() => handleChipTap(chip)}
                        >
                          {chip}
                        </Chip>
                      ))}
                    </div>
                    <p className="text-xs text-muted">Tap to select, or type your own answer below.</p>
                  </div>
                )
              )}
            </>
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
          <div className="flex items-center gap-2 border-t border-border bg-background-chat p-3">
            <div className="flex flex-1 items-center rounded-pill border border-border bg-white px-4">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmitInput();
                }}
                placeholder="Type your own answer..."
                className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </div>
            <button
              onClick={handleSubmitInput}
              disabled={!inputValue.trim()}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-pill text-white transition-colors",
                inputValue.trim() ? "bg-brand" : "bg-brand/40"
              )}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        )}
      </div>
    </NavShell>
  );
}
