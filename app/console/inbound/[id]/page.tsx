import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/console/dashboard-shell";
import { PatientAvatarCard, PatientInfoSection } from "@/components/console/patient-overview";
import { HevaAvatar, PatientAvatar } from "@/components/console/chat-avatars";
import { ChatInputBar } from "@/components/console/chat-input-bar";
import { PATIENTS, PLACEHOLDER_PATIENT, type ChatMessage } from "@/lib/patients";

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.from === "heva") {
    return (
      <div className="flex items-end justify-end gap-2">
        <div className="max-w-[80%] rounded-lg bg-brand p-3 text-sm text-white">{message.text}</div>
        <HevaAvatar />
      </div>
    );
  }
  return (
    <div className="flex items-end justify-start gap-2">
      <PatientAvatar />
      <div className="max-w-[80%] rounded-lg border border-border bg-white p-3 text-sm text-foreground">
        {message.text}
      </div>
    </div>
  );
}

export default function PatientFilePage({ params }: { params: { id: string } }) {
  const patient = PATIENTS[params.id] ?? PLACEHOLDER_PATIENT;
  const firstName = patient.name.split(" ")[0];

  return (
    <DashboardShell>
      <div className="min-h-full space-y-6 bg-background-chat p-4 sm:p-8">
        {patient.record.status === "due" && (
          <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="mt-0.5 shrink-0 text-red-600" />
              <div>
                <p className="text-sm font-semibold text-foreground">Escalation: post-visit record not yet sent</p>
                <p className="mt-0.5 text-sm text-muted">
                  {firstName} hasn&apos;t received their post-visit record. Complete it with heva — takes about a
                  minute.
                </p>
              </div>
            </div>
            <Link href="/console/post-visit" className="w-full shrink-0 sm:w-auto">
              <Button variant="primary" className="w-full">
                Complete with heva
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Overview column */}
          <div className="space-y-4">
            <PatientAvatarCard name={patient.name} demographics={patient.demographics} as="h1" />
            <PatientInfoSection title="General info" rows={patient.generalInfo} />
            <PatientInfoSection title="Contact info" rows={patient.contactInfo} />
          </div>

          {/* Appointments + chat column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Appointments</h2>
              <div className="mt-3 space-y-2">
                {patient.appointments.length === 0 && <p className="text-sm text-muted">No appointments on file.</p>}
                {patient.appointments.map((a) => (
                  <Card key={a.title} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="mt-0.5 text-sm text-muted">{a.date}</p>
                    </div>
                    {a.status === "completed" ? (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                        <CheckCircle2 size={12} />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex shrink-0 items-center rounded-pill bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand">
                        Scheduled
                      </span>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Chat thread</h2>
              <p className="mt-1 text-sm text-muted">Initial Q&amp;A and booking, via heva chat.</p>
              {patient.chatThread.length === 0 ? (
                <p className="mt-3 text-sm text-muted">No conversation on file.</p>
              ) : (
                <div className="mt-3 overflow-hidden rounded-lg border border-border bg-white">
                  <div className="space-y-3 p-4">
                    {patient.chatThread.map((m, i) => (
                      <ChatBubble key={i} message={m} />
                    ))}
                  </div>
                  <ChatInputBar />
                </div>
              )}
            </div>

            {patient.record.status === "sent" && (
              <Card className="flex items-center gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Post-visit record</h2>
                  <p className="mt-1 text-sm text-muted">Sent via WhatsApp · {patient.record.sentDate}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
