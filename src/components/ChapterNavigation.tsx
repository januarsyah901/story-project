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
    <nav className="flex items-center justify-between gap-2 py-6 border-t border-gray-100 dark:border-gray-800">
    {/* PREVIOUS */}
    <div className="flex-1">
      {prev ? (
        <Link
          href={`/series/${seriesSlug}/${prev.slug}`}
          className="group flex flex-col items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
        >
          <span className="text-xs uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </span>
          <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : null}
    </div>

    {/* CENTER MENU */}
    <Link
      href={`/series/${seriesSlug}`}
      className="p-3 rounded-full bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-600 transition-all"
      title="Back to list"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </Link>

    {/* NEXT */}
    <div className="flex-1 text-right">
      {next ? (
        <Link
          href={`/series/${seriesSlug}/${next.slug}`}
          className="group flex flex-col items-end p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
        >
          <span className="text-xs uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1">
            Next
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : null}
    </div>
  </nav>
  );
}
