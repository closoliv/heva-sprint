export type EscalationStatus = "attention" | "in_progress" | "resolved";

export type Escalation = {
  href: string | null;
  patient: string;
  channel: "WhatsApp" | "Instagram";
  appointmentDate: string;
  procedure: string;
  status: EscalationStatus;
};

export const ESCALATIONS: Escalation[] = [
  {
    href: "/console/inbound/sofia-ramirez",
    patient: "Sofía Ramírez",
    channel: "WhatsApp",
    appointmentDate: "Sep 8, 2026",
    procedure: "ACL reconstruction",
    status: "attention",
  },
  {
    href: null,
    patient: "James Okafor",
    channel: "WhatsApp",
    appointmentDate: "Sep 7, 2026",
    procedure: "Rotator cuff repair",
    status: "in_progress",
  },
  {
    href: null,
    patient: "Elena Vasquez",
    channel: "Instagram",
    appointmentDate: "Sep 6, 2026",
    procedure: "Meniscus repair",
    status: "attention",
  },
  {
    href: null,
    patient: "Marcus Webb",
    channel: "WhatsApp",
    appointmentDate: "Sep 5, 2026",
    procedure: "Rotator cuff repair",
    status: "in_progress",
  },
  {
    href: null,
    patient: "Priya Nair",
    channel: "Instagram",
    appointmentDate: "Sep 5, 2026",
    procedure: "Knee arthroscopy",
    status: "attention",
  },
  {
    href: null,
    patient: "Tomás Herrera",
    channel: "WhatsApp",
    appointmentDate: "Sep 4, 2026",
    procedure: "ACL reconstruction",
    status: "in_progress",
  },
  {
    href: null,
    patient: "Grace Kim",
    channel: "Instagram",
    appointmentDate: "Sep 3, 2026",
    procedure: "Meniscus repair",
    status: "attention",
  },
  {
    href: null,
    patient: "Daniel Osei",
    channel: "WhatsApp",
    appointmentDate: "Sep 2, 2026",
    procedure: "Knee arthroscopy",
    status: "resolved",
  },
  {
    href: null,
    patient: "Lucía Fernández",
    channel: "Instagram",
    appointmentDate: "Sep 1, 2026",
    procedure: "ACL reconstruction",
    status: "resolved",
  },
  {
    href: null,
    patient: "Omar Haddad",
    channel: "WhatsApp",
    appointmentDate: "Sep 1, 2026",
    procedure: "Rotator cuff repair",
    status: "resolved",
  },
];

export const ESCALATIONS_NEEDING_ATTENTION = ESCALATIONS.filter((e) => e.status === "attention").length;
