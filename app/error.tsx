"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900/20 via-zinc-900 to-orange-900/20">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-medium text-white">
          Something went wrong
        </h1>
        <p className="text-zinc-400 text-sm">
          An error occurred while loading this page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-green-500 py-2 px-4 rounded-md text-sm font-medium text-white hover:bg-green-600 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-zinc-800 py-2 px-4 rounded-md text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
