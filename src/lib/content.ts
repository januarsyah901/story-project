import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Chapter, ChapterMeta, Series, SeriesMeta } from "./types";

const contentDirectory = path.join(process.cwd(), "content");

function getSeriesMeta(seriesSlug: string): SeriesMeta | null {
  const sinopsisPath = path.join(contentDirectory, seriesSlug, "sinopsis.md");

  if (!fs.existsSync(sinopsisPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(sinopsisPath, "utf8");
  const { data } = matter(fileContents);

  return {
    title: data.title || formatSlugToTitle(seriesSlug),
    cover: data.cover,
    description: data.description,
  };
}

export function getAllSeries(): Series[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const seriesFolders = fs.readdirSync(contentDirectory).filter((folder) => {
    const fullPath = path.join(contentDirectory, folder);
    return fs.statSync(fullPath).isDirectory() && folder !== "assets";
  });

  const allSeries: Series[] = seriesFolders.map((folderName) => {
    const chapters = getChaptersInSeries(folderName);
    const meta = getSeriesMeta(folderName);
    const firstChapter = chapters[0];

    return {
      slug: folderName,
      title:
        meta?.title || firstChapter?.series || formatSlugToTitle(folderName),
      cover: meta?.cover,
      description: meta?.description,
      chapters,
    };
  });

  return allSeries.filter((series) => series.chapters.length > 0);
}

export function getChaptersInSeries(seriesSlug: string): ChapterMeta[] {
  const seriesPath = path.join(contentDirectory, seriesSlug);

  if (!fs.existsSync(seriesPath)) {
    return [];
  }

  const files = fs
    .readdirSync(seriesPath)
    .filter((file) => file.endsWith(".md") && file !== "sinopsis.md");

  const chapters: ChapterMeta[] = files.map((fileName) => {
    const filePath = path.join(seriesPath, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ""),
      title: data.title || formatSlugToTitle(fileName.replace(/\.md$/, "")),
      series: data.series || formatSlugToTitle(seriesSlug),
      order: data.order || extractOrderFromFileName(fileName),
      thumbnail: data.thumbnail,
    };
  });

  return chapters.sort((a, b) => a.order - b.order);
}

export function getSeries(seriesSlug: string): Series | null {
  const chapters = getChaptersInSeries(seriesSlug);

  if (chapters.length === 0) {
    return null;
  }

  const meta = getSeriesMeta(seriesSlug);

  return {
    slug: seriesSlug,
    title: meta?.title || chapters[0]?.series || formatSlugToTitle(seriesSlug),
    cover: meta?.cover,
    description: meta?.description,
    chapters,
  };
}

export async function getChapter(
  seriesSlug: string,
  chapterSlug: string,
): Promise<Chapter | null> {
  const filePath = path.join(contentDirectory, seriesSlug, `${chapterSlug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug: chapterSlug,
    title: data.title || formatSlugToTitle(chapterSlug),
    series: data.series || formatSlugToTitle(seriesSlug),
    order: data.order || extractOrderFromFileName(chapterSlug),
    thumbnail: data.thumbnail,
    content: contentHtml,
  };
}

export function getAdjacentChapters(
  seriesSlug: string,
  currentChapterSlug: string,
): { prev: ChapterMeta | null; next: ChapterMeta | null } {
  const chapters = getChaptersInSeries(seriesSlug);
  const currentIndex = chapters.findIndex(
    (ch) => ch.slug === currentChapterSlug,
  );

  return {
    prev: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    next:
      currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
  };
}

export function getAllChapterPaths(): {
  seriesSlug: string;
  chapterSlug: string;
}[] {
  const allSeries = getAllSeries();
  const paths: { seriesSlug: string; chapterSlug: string }[] = [];

  allSeries.forEach((series) => {
    series.chapters.forEach((chapter) => {
      paths.push({
        seriesSlug: series.slug,
        chapterSlug: chapter.slug,
      });
    });
  });

  return paths;
}

function formatSlugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function extractOrderFromFileName(fileName: string): number {
  const match = fileName.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
