# Cerpen Reader 📚

A clean, distraction-free static web reader for short stories and novels written in Markdown.

## Features

- 📖 **Reading-focused UI** - Centered text, comfortable typography, no clutter
- 🌓 **Dark mode** - Automatic detection with manual toggle
- 📱 **Responsive** - Works great on desktop and mobile
- ⚡ **Static Generation** - Fast, SEO-friendly, no database needed
- 🚀 **Vercel-ready** - One-click deployment

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- gray-matter + remark for Markdown

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the reader.

## Content Structure

Stories are organized in the `content/` folder:

```
content/
  series-name/
    chapter-1.md
    chapter-2.md
    assets/
      image.png
```

### Markdown Format

Each markdown file should have this frontmatter:

```markdown
---
title: "Chapter Title"
series: "Series Name"
order: 1
cover: "/content/series-name/assets/cover.png" # optional
---

Your story content here...
```

## Deploy to Vercel

1. Push your code to GitHub
2. Import the project to [Vercel](https://vercel.com)
3. Deploy!

The project is configured for static export (`output: 'export'`), so it works with Vercel's free tier.

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout with theme provider
    page.tsx          # Homepage - list all series
    series/
      [slug]/
        page.tsx      # Series page - list chapters
        [chapter]/
          page.tsx    # Reader page - chapter content
  components/
    Header.tsx        # Navigation header
    ThemeProvider.tsx # Dark mode context
    SeriesCard.tsx    # Series preview card
    ChapterList.tsx   # Chapter listing
    ChapterNavigation.tsx # Prev/Next navigation
  lib/
    content.ts        # Markdown parsing utilities
    types.ts          # TypeScript types
content/
  developer-biasa/    # Example series
  kemarin/            # Example series
```

## Customization

### Typography

Edit `src/app/globals.css` to adjust the reading styles in `.prose-reader`.

### Theme Colors

Modify the color variables in `globals.css` or extend Tailwind in `tailwind.config.ts`.

### Site Title

Update `src/app/layout.tsx` metadata.

## License

MIT
