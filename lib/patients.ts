export type ChatMessage = { from: "patient" | "heva"; text: string };
export type Appointment = { title: string; date: string; status: "completed" | "scheduled" };
export type InfoRow = { label: string; value: string };

export type Patient = {
  name: string;
  demographics: string;
  generalInfo: InfoRow[];
  contactInfo: InfoRow[];
  appointments: Appointment[];
  chatThread: ChatMessage[];
  record: { status: "due" } | { status: "sent"; sentDate: string };
};

export const PATIENTS: Record<string, Patient> = {
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

export const PLACEHOLDER_PATIENT: Patient = {
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
