import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSeries, getSeries } from "@/lib/content";
import ChapterList from "@/components/ChapterList";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const allSeries = getAllSeries();
  return allSeries.map((series) => ({
    slug: series.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const series = getSeries(params.slug);

  if (!series) {
    return { title: "Series Not Found" };
  }

  return {
    title: `${series.title} | Janpren`,
    description:
      series.description ||
      `Read ${series.title} - ${series.chapters.length} chapters available`,
  };
}

export default function SeriesPage({ params }: Props) {
  const series = getSeries(params.slug);

  if (!series) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="mb-8">
        <Link
          href="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all series
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          {series.title}
        </h1>

        {series.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {series.description}
          </p>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {series.chapters.length}{" "}
          {series.chapters.length === 1 ? "chapter" : "chapters"}
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Chapters
        </h2>
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <ChapterList seriesSlug={series.slug} chapters={series.chapters} />
        </div>
      </section>
    </div>
  );
}
