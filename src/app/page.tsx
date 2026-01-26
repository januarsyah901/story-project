import { getAllSeries } from "@/lib/content";
import SeriesCard from "@/components/SeriesCard";

export default function HomePage() {
  const allSeries = getAllSeries();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      {/* Hero Section - Lebih Compact & Clean */}
      <header className="mb-16 text-left md:text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-orange-600 dark:text-blue-400">Janpren</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Temukan imajinasi dalam setiap kata. Pengalaman membaca yang tenang dan bebas gangguan.
        </p>
      </header>

      {allSeries.length > 0 ? (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
              Terbaru & Terpopuler
            </h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
          </div>
          
          {/* Grid yang lebih rapat & rapi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSeries.map((series) => (
              <SeriesCard key={series.slug} series={series} />
            ))}
          </div>
        </section>
      ) : (
        /* Empty State yang lebih simple */
        <section className="text-center py-16 px-4 border border-gray-100 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/30">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Belum ada konten yang tersedia.
          </p>
          <code className="inline-block bg-white dark:bg-gray-800 px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-400">
            /content/your-story.md
          </code>
        </section>
      )}
    </div>
  );
}