'use client';

import { useState, useEffect } from 'react';
import { useInquiryStore } from '@/store/useInquiryStore';
import { PHASES, Phase } from '@/types/inquiry';
import {
  X,
  Calendar,
  User,
  Building,
  Clock,
  Users,
  Banknote,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function InquiryDetail() {
  const {
    inquiries,
    selectedInquiryId,
    setSelectedInquiryId,
    updateInquiryPhase,
  } = useInquiryStore();

  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inquiry = inquiries.find((i) => i.id === selectedInquiryId);

  useEffect(() => {
    setShowSuccess(false);
    setIsUpdating(false);
  }, [selectedInquiryId]);

  if (!inquiry) return null;

  const handlePhaseChange = async (newPhase: Phase) => {
    if (newPhase === inquiry.phase) return;

    setIsUpdating(true);
    setShowSuccess(false);

    try {
      await updateInquiryPhase(inquiry.id, newPhase);
      setIsUpdating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    } catch (err) {
      setIsUpdating(false);
      setShowSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="animate-in fade-in absolute inset-0 bg-slate-900/60 backdrop-blur-sm duration-200"
        onClick={() => setSelectedInquiryId(null)}
      />

      {/* Modal Content */}
      <div className="animate-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl duration-200">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b bg-white p-6">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
              {inquiry.id}
            </p>
            <h2 className="text-xl font-bold text-slate-900">
              Inquiry Details
            </h2>
          </div>
          <button
            onClick={() => setSelectedInquiryId(null)}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-8 overflow-y-auto p-8">
          <section>
            <h3 className="text-3xl leading-tight font-extrabold text-slate-900">
              {inquiry.clientName}
            </h3>
            <div className="mt-2 flex items-center gap-4">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-600">
                {inquiry.eventType}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-500">
                <Users size={16} /> {inquiry.guestCount} Guests
              </span>
            </div>
          </section>

          {/* Interaction Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Value Display */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <p className="mb-1 flex items-center gap-1 text-[10px] font-bold text-blue-500 uppercase">
                <Banknote size={12} /> Potential Value
              </p>
              <p className="font-mono text-xl font-bold text-slate-900">
                CHF {inquiry.potentialValue.toLocaleString()}
              </p>
            </div>

            {/* Status  */}
            <div
              className={cn(
                'relative overflow-hidden rounded-xl border p-4 transition-all duration-300',
                isUpdating
                  ? 'border-blue-200 bg-blue-50/50'
                  : showSuccess
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-100 bg-slate-50'
              )}
            >
              {/* Progress */}
              {isUpdating && (
                <div className="absolute top-0 left-0 h-0.5 w-full animate-pulse bg-blue-500" />
              )}

              <p
                className={cn(
                  'mb-1 text-[10px] font-bold uppercase transition-colors ',
                  isUpdating
                    ? 'text-blue-500'
                    : showSuccess
                      ? 'text-emerald-600'
                      : 'text-slate-500'
                )}
              >
                {isUpdating ? 'Updating...' : 'Status Phase'}
              </p>

              <div className="flex items-center justify-between gap-2 ">
                <select
                  disabled={isUpdating}
                  value={inquiry.phase}
                  onChange={(e) => handlePhaseChange(e.target.value as Phase)}
                  className={cn(
                    'w-full cursor-pointer border-none bg-transparent p-0 text-sm font-bold transition-colors focus:ring-0',
                    isUpdating
                      ? 'text-blue-400'
                      : showSuccess
                        ? 'text-emerald-700'
                        : 'text-blue-600'
                  )}
                >
                  {PHASES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>

                {/* Status Icons */}
                <div className="shrink-0">
                  {isUpdating && (
                    <Loader2 size={16} className="animate-spin text-blue-500" />
                  )}
                  {showSuccess && (
                    <CheckCircle2
                      size={16}
                      className="animate-in zoom-in text-emerald-500"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 text-slate-800 sm:grid-cols-2">
            <DetailItem
              icon={<User size={18} />}
              label="Contact Person"
              value={inquiry.contactPerson}
            />
            <DetailItem
              icon={<Calendar size={18} />}
              label="Event Date"
              value={format(new Date(inquiry.eventDate), 'PPPP')}
            />
            <DetailItem
              icon={<Building size={18} />}
              label="Hotels"
              value={inquiry.hotels.join(', ') || 'No hotels selected'}
            />
          </div>

          <section>
            <h4 className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
              Internal Notes
            </h4>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">
              {inquiry.notes || 'No notes provided for this inquiry.'}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t bg-slate-50 p-6 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> Last Updated:{' '}
            {format(new Date(inquiry.updatedAt), 'Pp')}
          </span>
          <span className="font-medium">
            Created: {format(new Date(inquiry.createdAt), 'P')}
          </span>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 text-slate-400">{icon}</div>
      <div>
        <p className="text-[10px] font-bold tracking-tight text-slate-400 uppercase">
          {label}
        </p>
        <p className="text-sm leading-tight font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}
