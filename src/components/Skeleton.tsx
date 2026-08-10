'use client';

import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-slate-800/60 border border-slate-800/40 rounded-xl ${className}`}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between h-36">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-9 w-9 rounded" />
      </div>
      <div className="flex items-baseline justify-between">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="animate-pulse border-b border-slate-800/60">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="py-4 px-6">
          <Skeleton className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

export function SessionListSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}
