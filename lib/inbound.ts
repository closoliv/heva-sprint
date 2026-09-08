export type InboundStatus = "new_inquiry" | "booked";

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
    href: null,
    patient: "Amara Chukwu",
    channel: "WhatsApp",
    appointmentDate: "Not yet scheduled",
    procedure: "ACL reconstruction",
    status: "new_inquiry",
  },
  {
    href: null,
    patient: "Liam O'Connor",
    channel: "Instagram",
    appointmentDate: "Sep 14, 2026",
    procedure: "Rotator cuff repair",
    status: "booked",
  },
  {
    href: null,
    patient: "Ines Duarte",
    channel: "WhatsApp",
    appointmentDate: "Not yet scheduled",
    procedure: "Meniscus repair",
    status: "new_inquiry",
  },
  {
    href: null,
    patient: "Noah Bergström",
    channel: "Instagram",
    appointmentDate: "Sep 16, 2026",
    procedure: "Knee arthroscopy",
    status: "booked",
  },
  {
    href: null,
    patient: "Aisha Rahman",
    channel: "WhatsApp",
    appointmentDate: "Not yet scheduled",
    procedure: "ACL reconstruction",
    status: "new_inquiry",
  },
  {
    href: null,
    patient: "Mateo Rossi",
    channel: "Instagram",
    appointmentDate: "Sep 18, 2026",
    procedure: "Rotator cuff repair",
    status: "booked",
  },
  {
    href: null,
    patient: "Yuki Tanaka",
    channel: "WhatsApp",
    appointmentDate: "Not yet scheduled",
    procedure: "Knee arthroscopy",
    status: "new_inquiry",
  },
  {
    href: null,
    patient: "Chloé Laurent",
    channel: "Instagram",
    appointmentDate: "Sep 20, 2026",
    procedure: "Meniscus repair",
    status: "booked",
  },
  {
    href: null,
    patient: "Rashid Al-Farsi",
    channel: "WhatsApp",
    appointmentDate: "Not yet scheduled",
    procedure: "ACL reconstruction",
    status: "new_inquiry",
  },
  {
    href: null,
    patient: "Hana Kowalski",
    channel: "Instagram",
    appointmentDate: "Sep 22, 2026",
    procedure: "Rotator cuff repair",
    status: "booked",
  },
];

export const INBOUND_COUNT = INBOUND.length;
