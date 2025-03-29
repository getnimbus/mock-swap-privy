"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900/20 via-zinc-900 to-orange-900/20 p-4">
          <div className="bg-zinc-900/50 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <h2 className="text-2xl text-red-500 font-medium mb-4">
              Something went wrong
            </h2>
            <p className="text-zinc-300 mb-6">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
