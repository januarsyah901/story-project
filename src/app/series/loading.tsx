export default function SeriesLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header Skeleton */}
      <div className="space-y-4 mb-12">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-64 animate-pulse"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 animate-pulse"></div>
      </div>

      {/* Series Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[4/5] bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
