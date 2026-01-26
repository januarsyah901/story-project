import Link from "next/link";
import type { ChapterMeta } from "@/lib/types";

interface ChapterListProps {
  seriesSlug: string;
  chapters: ChapterMeta[];
}

export default function ChapterList({
  seriesSlug,
  chapters,
}: ChapterListProps) {
  return (
    <div className="space-y-2">
      {chapters.map((chapter, index) => (
        <Link
          key={chapter.slug}
          href={`/series/${seriesSlug}/${chapter.slug}`}
          className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {index + 1}
          </span>
          <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
            {chapter.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
