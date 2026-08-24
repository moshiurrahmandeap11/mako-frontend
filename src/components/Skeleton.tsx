'use client';

import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[#F0F2F5] border border-[#E4E5E7]/50 rounded-xl ${className}`}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm flex flex-col justify-between h-36">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-9 w-9 rounded-xl" />
      </div>
      <div className="flex items-baseline justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="animate-pulse border-b border-[#E4E5E7]">
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
        <div key={i} className="p-4 rounded-xl bg-white border border-[#E4E5E7] space-y-2 shadow-sm">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}
