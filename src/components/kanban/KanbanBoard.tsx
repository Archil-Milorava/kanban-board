'use client';

import { useInquiryStore } from '@/store/useInquiryStore';
import { Inquiry, PHASES, Phase } from '@/types/inquiry';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InquiryCard from './InquiryCard';
import KanbanColumn from './KanbanColumn';
import KanbanSkeleton from './KanbanSkeleton';

export default function KanbanBoard() {
  const { inquiries, isLoading, fetchInquiries, updateInquiryPhase } =
    useInquiryStore();
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const searchParams = useSearchParams(); 
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 }, 
    })
  );

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const minValue = Number(searchParams.get('minValue')) || 0;

    fetchInquiries({ search, minValue });
  }, [fetchInquiries, searchParams]);

  const handleDragStart = (event: DragStartEvent) => {
    const inquiry = inquiries.find((i) => i.id === event.active.id);
    if (inquiry) setActiveInquiry(inquiry);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveInquiry(null);

    if (!over) return;

    const inquiryId = active.id as string;
    const newPhase = over.id as Phase;

    const inquiry = inquiries.find((i) => i.id === inquiryId);
    if (inquiry && inquiry.phase !== newPhase) {
      updateInquiryPhase(inquiryId, newPhase);
    }
  };

  if (isLoading) {
    return <KanbanSkeleton />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex w-full flex-row gap-6 overflow-x-auto overflow-y-hidden px-4 pt-2 pb-6 xl:justify-center">
        {PHASES.map((phase) => (
          <KanbanColumn
            key={phase.id}
            phase={phase}
            inquiries={inquiries.filter((i) => i.phase === phase.id)}
          />
        ))}
      </div>


          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: { active: { opacity: '0.5' } },
              }),
            }}
          >
            {activeInquiry ? (
              <div className="scale-105 rotate-3 shadow-2xl">
                <InquiryCard inquiry={activeInquiry} isOverlay={true} />
              </div>
            ) : null}
          </DragOverlay>
    </DndContext>
  );
}
