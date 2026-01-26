"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SeriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Series Error:", error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <div className="space-y-6">
        {/* Error Icon */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-orange-600 dark:text-orange-400"
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
        </div>

        {/* Error Message */}
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-400">
            Gagal Memuat Series
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Terjadi kesalahan saat memuat data series. Mungkin ada masalah
            dengan koneksi atau data tidak tersedia.
          </p>
          {error.digest && (
            <p className="text-xs text-slate-400 dark:text-slate-600 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5"
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
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
