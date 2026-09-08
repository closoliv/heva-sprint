import Link from "next/link";
import { AlertTriangle, CheckCircle2, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/console/dashboard-shell";

type ChatMessage = { from: "patient" | "heva"; text: string };
type Appointment = { title: string; date: string; status: "completed" | "scheduled" };
type InfoRow = { label: string; value: string };

type Patient = {
  name: string;
  demographics: string;
  generalInfo: InfoRow[];
  contactInfo: InfoRow[];
  appointments: Appointment[];
  chatThread: ChatMessage[];
  record: { status: "due" } | { status: "sent"; sentDate: string };
};

const PATIENTS: Record<string, Patient> = {
  "sofia-ramirez": {
    name: "Sofía Ramírez",
    demographics: "Female · 29",
    generalInfo: [
      { label: "Procedure", value: "ACL reconstruction" },
      { label: "Graft type", value: "Hamstring autograft" },
      { label: "Provider", value: "Dr. Bianchi" },
      { label: "Visit date", value: "Sep 8, 2026" },
    ],
    contactInfo: [
      { label: "Preferred channel", value: "WhatsApp" },
      { label: "Phone", value: "+506 8888 1234" },
      { label: "Email", value: "sofia.ramirez@example.com" },
    ],
    appointments: [
      { title: "ACL reconstruction — Dr. Bianchi", date: "Sep 8, 2026 · 9:00 AM", status: "completed" },
      { title: "Post-op suture check — Dr. Bianchi", date: "Sep 22, 2026 · 10:00 AM", status: "scheduled" },
    ],
    chatThread: [
      { from: "patient", text: "Hi, I tore my ACL playing soccer and need surgery. Do you take patients from abroad?" },
      {
        from: "heva",
        text: "Yes! Dr. Bianchi specializes in ACL reconstruction for international patients. Would you like to book a consultation or see available surgery dates?",
      },
      { from: "patient", text: "Available surgery dates please" },
      { from: "heva", text: "Dr. Bianchi has openings on Sep 8 and Sep 15. Which works better for you?" },
      { from: "patient", text: "Sep 8 works for me" },
      {
        from: "heva",
        text: "Booked! You're confirmed for ACL reconstruction with Dr. Bianchi on Sep 8, 2026 at 9:00 AM. We'll send prep instructions this week.",
      },
    ],
    record: { status: "due" },
  },
  "marcus-webb": {
    name: "Marcus Webb",
    demographics: "Male · 41",
    generalInfo: [
      { label: "Procedure", value: "Rotator cuff repair" },
      { label: "Provider", value: "Dr. Bianchi" },
      { label: "Visit date", value: "Sep 5, 2026" },
    ],
    contactInfo: [
      { label: "Preferred channel", value: "WhatsApp" },
      { label: "Phone", value: "+1 305 555 0148" },
      { label: "Email", value: "marcus.webb@example.com" },
    ],
    appointments: [
      { title: "Rotator cuff repair — Dr. Bianchi", date: "Sep 5, 2026 · 1:00 PM", status: "completed" },
      { title: "Follow-up — Dr. Bianchi", date: "Sep 19, 2026 · 11:00 AM", status: "scheduled" },
    ],
    chatThread: [
      { from: "patient", text: "I've had shoulder pain for months, an MRI showed a rotator cuff tear. Can I get a consult?" },
      { from: "heva", text: "Sorry to hear that. Dr. Bianchi can review your MRI — would you like to send it over before booking?" },
      { from: "patient", text: "Yes, attaching it now" },
      { from: "heva", text: "Got it, thanks. Dr. Bianchi confirmed surgery is a good option — booking you for Sep 5." },
    ],
    record: { status: "sent", sentDate: "3 days ago" },
  },
};

const PLACEHOLDER: Patient = {
  name: "Placeholder name",
  demographics: "—",
  generalInfo: [
    { label: "Procedure", value: "Category" },
    { label: "Provider", value: "—" },
    { label: "Visit date", value: "—" },
  ],
  contactInfo: [{ label: "Preferred channel", value: "—" }],
  appointments: [],
  chatThread: [],
  record: { status: "due" },
};

function InfoSection({ title, rows }: { title: string; rows: InfoRow[] }) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <dl className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 text-sm">
            <dt className="text-muted">{row.label}</dt>
            <dd className="text-right font-medium text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.from === "heva") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-lg border border-border bg-white p-3 text-sm text-foreground">
          {message.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-lg bg-brand p-3 text-sm text-white">{message.text}</div>
    </div>
  );
}

export default function PatientFilePage({ params }: { params: { id: string } }) {
  const patient = PATIENTS[params.id] ?? PLACEHOLDER;
  const firstName = patient.name.split(" ")[0];

  return (
    <DashboardShell>
      <div className="space-y-6 p-4 sm:p-8">
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
            <Card className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-pill bg-background-chat" aria-hidden>
                <User size={28} strokeWidth={1.8} className="text-muted" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{patient.name}</h1>
                <p className="text-sm text-muted">{patient.demographics}</p>
              </div>
            </Card>
            <InfoSection title="General info" rows={patient.generalInfo} />
            <InfoSection title="Contact info" rows={patient.contactInfo} />
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
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-background-chat px-2.5 py-1 text-xs font-medium text-slate">
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
                <div className="mt-3 space-y-3 rounded-lg border border-border bg-white p-4">
                  {patient.chatThread.map((m, i) => (
                    <ChatBubble key={i} message={m} />
                  ))}
                </div>
              )}
            </div>

            {patient.record.status === "sent" && (
              <Card className="flex items-center gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-brand" />
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
