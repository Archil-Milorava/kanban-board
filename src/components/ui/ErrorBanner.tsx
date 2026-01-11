'use client';

import { useInquiryStore } from '@/store/useInquiryStore';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBanner() {
  const { error, fetchInquiries } = useInquiryStore();
  
  if (!error) return null;

  return (
    <div className="sticky top-0 z-110 border-b border-red-100 bg-red-50 p-4 animate-in slide-in-from-top duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-red-700">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
        <button
          onClick={() => fetchInquiries()}
          className="flex items-center gap-1 rounded bg-red-100 px-3 py-1 text-sm font-bold transition-colors hover:bg-red-200"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    </div>
  );
}