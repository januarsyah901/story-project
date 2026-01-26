import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllChapterPaths,
  getChapter,
  getAdjacentChapters,
  getSeries,
} from "@/lib/content";
import ChapterNavigation from "@/components/ChapterNavigation";

interface Props {
  params: { slug: string; chapter: string };
}

export async function generateStaticParams() {
  const paths = getAllChapterPaths();
  return paths.map((path) => ({
    slug: path.seriesSlug,
    chapter: path.chapterSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chapter = await getChapter(params.slug, params.chapter);

  if (!chapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `${chapter.title} | ${chapter.series} | Janpren`,
    description: `Read ${chapter.title} from ${chapter.series}`,
  };
}

export default async function ReaderPage({ params }: Props) {
  const chapter = await getChapter(params.slug, params.chapter);
  const series = getSeries(params.slug);

  if (!chapter || !series) {
    notFound();
  }

  const { prev, next } = getAdjacentChapters(params.slug, params.chapter);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/series/${params.slug}`}
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {chapter.series}
          </Link>
        </div>
      </nav>

      {/* Chapter Header */}
      <header className="mb-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
          {chapter.series}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {chapter.title}
        </h1>
      </header>

      {/* Chapter Content */}
      <div
        className="prose-reader"
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />

      {/* Navigation */}
      <ChapterNavigation seriesSlug={params.slug} prev={prev} next={next} />
    </article>
  );
}
