'use client';

import { cn } from '@/lib/utils';

export function SkeletonCard() {
  return (
    <div className="h-32 w-full animate-pulse rounded-lg border border-slate-200 bg-white/60 p-4 shadow-sm">
      <div className="mb-3 h-4 w-3/4 rounded bg-slate-200" />
      <div className="mb-2 h-3 w-1/2 rounded bg-slate-100" />
      <div className="h-3 w-1/3 rounded bg-slate-100" />
    </div>
  );
}

export function SkeletonColumn({ cardCount = 3 }: { cardCount?: number }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-transparent p-1', 
        'h-[calc(100vh-220px)] min-h-125 w-[320px] shrink-0',
        'bg-slate-200' 
      )}
    >
      {/* Header Section Skeleton */}
      <div className="shrink-0 space-y-2 p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-300" />
          <div className="h-5 w-6 animate-pulse rounded bg-white/50" />
        </div>
        <div className="h-3 w-32 animate-pulse rounded bg-slate-300/50" />
      </div>

      {/* Cards List Skeleton */}
      <div className="mt-2 flex flex-col gap-3 overflow-hidden px-1.5 py-4">
        {[...Array(cardCount)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default function KanbanSkeleton() {
  const counts = [4, 2, 5, 3];

  return (
    <div className="flex w-full flex-row gap-6 overflow-x-auto overflow-y-hidden px-4 pt-2 pb-6 xl:justify-center">
      {counts.map((count, i) => (
        <SkeletonColumn key={i} cardCount={count} />
      ))}
    </div>
  );
}
