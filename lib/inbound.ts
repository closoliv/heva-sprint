export type InboundStatus = "record_due" | "record_sent";

export type InboundItem = {
  href: string | null;
  patient: string;
  channel: "WhatsApp" | "Instagram";
  appointmentDate: string;
  procedure: string;
  status: InboundStatus;
};

export const INBOUND: InboundItem[] = [
  {
    href: "/console/inbound/sofia-ramirez",
    patient: "Sofía Ramírez",
    channel: "WhatsApp",
    appointmentDate: "Sep 8, 2026",
    procedure: "ACL reconstruction",
    status: "record_due",
  },
  {
    href: "/console/inbound/marcus-webb",
    patient: "Marcus Webb",
    channel: "WhatsApp",
    appointmentDate: "Sep 8, 2026",
    procedure: "Rotator cuff repair",
    status: "record_sent",
  },
  {
    href: null,
    patient: "Elena Vasquez",
    channel: "Instagram",
    appointmentDate: "Sep 8, 2026",
    procedure: "Meniscus repair",
    status: "record_due",
  },
  {
    href: null,
    patient: "James Okafor",
    channel: "WhatsApp",
    appointmentDate: "Sep 8, 2026",
    procedure: "Rotator cuff repair",
    status: "record_sent",
  },
  {
    href: null,
    patient: "Priya Nair",
    channel: "Instagram",
    appointmentDate: "Sep 7, 2026",
    procedure: "Knee arthroscopy",
    status: "record_due",
  },
  {
    href: null,
    patient: "Tomás Herrera",
    channel: "WhatsApp",
    appointmentDate: "Sep 7, 2026",
    procedure: "ACL reconstruction",
    status: "record_sent",
  },
  {
    href: null,
    patient: "Grace Kim",
    channel: "Instagram",
    appointmentDate: "Sep 7, 2026",
    procedure: "Meniscus repair",
    status: "record_due",
  },
  {
    href: null,
    patient: "Daniel Osei",
    channel: "WhatsApp",
    appointmentDate: "Sep 6, 2026",
    procedure: "Knee arthroscopy",
    status: "record_sent",
  },
  {
    href: null,
    patient: "Lucía Fernández",
    channel: "Instagram",
    appointmentDate: "Sep 6, 2026",
    procedure: "ACL reconstruction",
    status: "record_due",
  },
  {
    href: null,
    patient: "Omar Haddad",
    channel: "WhatsApp",
    appointmentDate: "Sep 6, 2026",
    procedure: "Rotator cuff repair",
    status: "record_sent",
  },
];

export const INBOUND_COUNT = INBOUND.length;
