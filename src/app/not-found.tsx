import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <div className="space-y-6">
        {/* Error Code */}
        <div className="relative">
          <h1 className="text-8xl font-black text-blue-100 dark:text-blue-900/30 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              Halaman Tidak Ditemukan
            </span>
          </div>
        </div>

        {/* Error Message */}
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Mari kembali dan temukan cerita menarik lainnya.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
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
          <button
            onClick={() => window.history.back()}
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
