import { create } from 'zustand';
import { Inquiry, Phase } from '@/types/inquiry';

interface InquiryState {
  inquiries: Inquiry[];
  isLoading: boolean;
  error: string | null;
  filters: {
    search: string;
    minValue: number;
  };
  selectedInquiryId: string | null;
  setSelectedInquiryId: (id: string | null) => void;
  setFilters: (filters: { search: string; minValue: number }) => void;
  fetchInquiries: (filters?: {
    search?: string;
    minValue?: number;
  }) => Promise<void>;
  updateInquiryPhase: (id: string, newPhase: Phase) => Promise<void>;
}

export const useInquiryStore = create<InquiryState>((set, get) => ({
  inquiries: [],
  isLoading: false,
  error: null,
  filters: { search: '', minValue: 0 },
  selectedInquiryId: null,

  setSelectedInquiryId: (id) => set({ selectedInquiryId: id }),

  setFilters: (filters) => set({ filters }),

  fetchInquiries: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const params = new URLSearchParams();
      const searchVal = filters?.search ?? get().filters.search;
      const minVal = filters?.minValue ?? get().filters.minValue;

      if (searchVal) params.append('search', searchVal);
      if (minVal) params.append('minValue', minVal.toString());

      const response = await fetch(`/api/inquiries?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      set({ inquiries: data, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  updateInquiryPhase: async (id, newPhase) => {
    const previousInquiries = get().inquiries;
    set({
      inquiries: previousInquiries.map((inq) =>
        inq.id === id
          ? { ...inq, phase: newPhase, updatedAt: new Date().toISOString() }
          : inq
      ),
    });

    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phase: newPhase }),
      });

      if (!response.ok) throw new Error('Update failed');
    } catch (err) {
      set({
        inquiries: previousInquiries,
        error: `Failed to move inquiry to ${newPhase}. Please try again.`,
      });
      setTimeout(() => set({ error: null }), 3000);
    }
  },
}));
