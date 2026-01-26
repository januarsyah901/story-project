"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log global error untuk debugging
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-6">
          <div className="max-w-md mx-auto text-center space-y-6">
            {/* Error Code */}
            <div className="relative">
              <h1 className="text-6xl font-black text-red-100 dark:text-red-900/30 select-none">
                ⚠️
              </h1>
              <div className="mt-4">
                <span className="text-xl font-semibold text-red-600 dark:text-red-400">
                  Kesalahan Sistem
                </span>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Aplikasi mengalami kesalahan kritis. Silakan muat ulang halaman
                atau coba lagi nanti.
              </p>
              {error.digest && (
                <p className="text-xs text-slate-400 dark:text-slate-600 font-mono">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
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
                Muat Ulang
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
