export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <div className="space-y-6">
        {/* Loading Animation */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Memuat...
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Mohon tunggu sebentar
          </p>
        </div>

        {/* Loading Skeleton */}
        <div className="max-w-md mx-auto space-y-3 pt-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-4/5"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/5"></div>
        </div>
      </div>
    </div>
  );
}
