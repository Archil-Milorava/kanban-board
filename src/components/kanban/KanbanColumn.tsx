'use client';

import { useDroppable } from '@dnd-kit/core';
import { Inquiry, Phase } from '@/types/inquiry';
import InquiryCard from './InquiryCard';
import { cn } from '@/lib/utils';
import NoInquiryCard from './NoInquiryCard';

interface Props {
  phase: { id: Phase; label: string };
  inquiries: Inquiry[];
}

export default function KanbanColumn({ phase, inquiries }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: phase.id,
  });

  const totalValue = inquiries.reduce(
    (sum, inq) => sum + inq.potentialValue,
    0
  );

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-transparent p-1 transition-colors',
        'h-[calc(100vh-220px)] min-h-125 w-[320px] shrink-0',
        isOver ? 'bg-blue-50 ring-2 ring-blue-200' : 'bg-slate-200'
      )}
    >
      {/* Header Section */}
      <div className="shrink-0 p-4 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wider text-slate-700 uppercase">
            {phase.label}
          </h3>
          <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-bold text-slate-500">
            {inquiries.length}
          </span>
        </div>

        <div className="mt-1 text-[11px] font-medium text-slate-400">
          Total:{' '}
          <span className="font-bold text-slate-600">
            CHF {totalValue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Card Container */}
      <div className="custom-scrollbar flex flex-col gap-3 overflow-x-hidden overflow-y-auto px-1.5 py-4">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} />
          ))
        ) : (
          <NoInquiryCard />
        )}
      </div>
    </div>
  );
}
