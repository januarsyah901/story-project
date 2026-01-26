import Link from "next/link";
import type { ChapterMeta } from "@/lib/types";

interface ChapterNavigationProps {
  seriesSlug: string;
  prev: ChapterMeta | null;
  next: ChapterMeta | null;
}

export default function ChapterNavigation({
  seriesSlug,
  prev,
  next,
}: ChapterNavigationProps) {
  return (
    <nav className="flex items-center justify-between gap-4 py-8 border-t border-gray-200 dark:border-gray-800">
      {prev ? (
        <Link
          href={`/series/${seriesSlug}/${prev.slug}`}
          className="group flex-1 flex flex-col items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
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
            Previous
          </span>
          <span className="text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      <Link
        href={`/series/${seriesSlug}`}
        className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        title="Back to chapter list"
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
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </Link>

      {next ? (
        <Link
          href={`/series/${seriesSlug}/${next.slug}`}
          className="group flex-1 flex flex-col items-end p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-right"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
            Next
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <span className="text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
