export interface ChapterMeta {
  slug: string;
  title: string;
  series: string;
  order: number;
  thumbnail?: string;
}

export interface Chapter extends ChapterMeta {
  content: string;
}

export interface SeriesMeta {
  title: string;
  cover?: string;
  description?: string;
}

export interface Series {
  slug: string;
  title: string;
  cover?: string;
  description?: string;
  chapters: ChapterMeta[];
}
