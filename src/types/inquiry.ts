
export type Phase = 'new' | 'sent_to_hotels' | 'offers_received' | 'completed';

export interface Inquiry {
  id: string;
  clientName: string;
  contactPerson: string;
  eventType: string;
  eventDate: string; 
  guestCount: number;
  potentialValue: number;
  phase: Phase;
  hotels: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const PHASES: { id: Phase; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'sent_to_hotels', label: 'Sent to Hotels' },
  { id: 'offers_received', label: 'Offers Received' },
  { id: 'completed', label: 'Completed' },
];