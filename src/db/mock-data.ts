import { Inquiry, Phase } from "@/types/inquiry";

export let inquiries: Inquiry[] = [
  {
    id: 'INQ-2026-001',
    clientName: 'Novartis AG',
    contactPerson: 'Anna Mueller',
    eventType: 'Conference',
    eventDate: '2026-03-15',
    guestCount: 120,
    potentialValue: 48500,
    phase: 'offers_received',
    hotels: ['Grand Hotel Zurich', 'Hotel Schweizerhof'],
    notes: 'Client prefers city center location with easy tram access.',
    createdAt: '2026-01-08T10:00:00.000Z', 
    updatedAt: '2026-01-09T14:30:00.000Z',
  },
  {
    id: 'INQ-2026-002',
    clientName: 'Roche Holding',
    contactPerson: 'Marc Meyer',
    eventType: 'Gala Dinner',
    eventDate: '2026-05-20',
    guestCount: 250,
    potentialValue: 65000, 
    phase: 'new',
    hotels: [],
    notes: 'Requires high-end catering and stage setup for 4 piece band.',
    createdAt: '2026-01-10T08:15:00.000Z', 
    updatedAt: '2026-01-10T08:15:00.000Z',
  },
  {
    id: 'INQ-2026-003',
    clientName: 'Nestlé S.A.',
    contactPerson: 'Sophie Cook',
    eventType: 'Workshop',
    eventDate: '2026-02-10',
    guestCount: 45,
    potentialValue: 12000,
    phase: 'sent_to_hotels',
    hotels: ['Hilton Geneva'],
    notes: 'Needs 3 breakout rooms and flipcharts.',
    createdAt: '2026-01-05T12:00:00.000Z',
    updatedAt: '2026-01-06T09:00:00.000Z',
  },
  {
    id: 'INQ-2026-004',
    clientName: 'Google Switzerland',
    contactPerson: 'Lars Schmidt',
    eventType: 'Product Launch',
    eventDate: '2026-06-12',
    guestCount: 500,
    potentialValue: 85000,
    phase: 'new',
    hotels: [],
    notes: 'Massive branding space required in the lobby.',
    createdAt: '2026-01-11T11:00:00.000Z',
    updatedAt: '2026-01-11T11:00:00.000Z',
  },
  {
    id: 'INQ-2026-005',
    clientName: 'UBS Group AG',
    contactPerson: 'Petra Huber',
    eventType: 'Board Meeting',
    eventDate: '2026-02-05',
    guestCount: 15,
    potentialValue: 8500,
    phase: 'completed',
    hotels: ['Park Hyatt Zurich'],
    notes: 'High security requirements. Private entrance needed.',
    createdAt: '2025-12-20T15:00:00.000Z', 
    updatedAt: '2026-01-02T10:30:00.000Z',
  }
];

export const updateInquiryPhase = (id: string, newPhase: Phase) => {
  inquiries = inquiries.map((inq) =>
    inq.id === id ? { ...inq, phase: newPhase, updatedAt: new Date().toISOString() } : inq
  );
};