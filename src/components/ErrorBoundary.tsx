"use client";

import { Component, ReactNode } from "react";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="max-w-md mx-auto px-6 py-16 text-center">
          <div className="space-y-6">
            {/* Error Icon */}
            <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.134 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            {/* Error Message */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                Terjadi Kesalahan
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Komponen ini mengalami masalah. Silakan muat ulang halaman atau
                coba lagi nanti.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Muat Ulang
              </button>
              <Link
                href="/"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook untuk error boundary yang lebih mudah digunakan
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: any) => void,
) {
  return function WrappedComponent(props: T) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
