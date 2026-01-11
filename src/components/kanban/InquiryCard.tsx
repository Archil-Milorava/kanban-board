'use client';

import { cn } from '@/lib/utils';
import { useInquiryStore } from '@/store/useInquiryStore';
import { Inquiry } from '@/types/inquiry';
import { useDraggable } from '@dnd-kit/core';
import { formatDistanceToNow } from 'date-fns';
import { Briefcase, Calendar, Users } from 'lucide-react';

interface Props {
  inquiry: Inquiry;
  isOverlay?: boolean;
}

export default function InquiryCard({ inquiry, isOverlay }: Props) {
  const { setSelectedInquiryId } = useInquiryStore();
  const { attributes, listeners, setNodeRef, isDragging } =
    useDraggable({
      id: inquiry.id,
      disabled: isOverlay,
    });

  const isHighValue = inquiry.potentialValue >= 50000;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => !isOverlay && setSelectedInquiryId(inquiry.id)}
      className={cn(
        'group relative cursor-grab rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 active:cursor-grabbing',
        'hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md cursor-pointer',
        isDragging && !isOverlay ? 'opacity-0' : 'opacity-100',
        isHighValue ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200',
        isOverlay &&
          'pointer-events-none z-50 rotate-2 border-blue-500 shadow-2xl ring-2 ring-blue-500/20'
      )}
    >
      {isHighValue && (
        <div className="absolute -top-2 -right-2 z-10 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
          VIP
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h4 className="truncate font-bold text-slate-800 transition-colors group-hover:text-blue-600">
          {inquiry.clientName}
        </h4>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Briefcase size={14} className="text-slate-400" />
            <span>{inquiry.eventType}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={14} className="text-slate-400" />
            <span>{new Date(inquiry.eventDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users size={14} className="text-slate-400" />
            <span>{inquiry.guestCount} guests</span>
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between border-t border-slate-100 pt-2">
          <div className="text-[10px] font-medium text-slate-400">
            {formatDistanceToNow(new Date(inquiry.createdAt), {
              addSuffix: true,
            })}
          </div>
          <div className="font-mono text-sm font-bold text-slate-900">
            CHF {inquiry.potentialValue.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
