"use client";

import type React from "react";
import { ErrorBoundary } from "./error-boundary";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gradient-to-br from-blue-900/20 via-zinc-900 to-orange-900/20 overflow-hidden">
        <main className="flex-1 w-full overflow-x-auto">{children}</main>
      </div>
    </ErrorBoundary>
  );
}
