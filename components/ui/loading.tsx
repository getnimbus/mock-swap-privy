"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce"></div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="h-8 w-8 rounded-full animate-spin" />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <LoadingDots />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
