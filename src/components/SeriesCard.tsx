import Link from "next/link";
import type { Series } from "@/lib/types";

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const chapterCount = series.chapters.length;

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group relative block h-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300"
    >
      {/* Cover Image Container */}
      {series.cover && (
        <div className="relative mb-5 aspect-[3/4] rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
          <img
            src={series.cover}
            alt={series.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          {/* Overlay Gradient untuk Text Protection (opsional jika ingin taruh teks di atas gambar) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge Jumlah Chapter di Atas Gambar */}
          <div className="absolute bottom-3 left-3">
             <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 rounded-full backdrop-blur-md shadow-sm">
                {chapterCount} {chapterCount === 1 ? "Chapter" : "Chapters"}
             </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-[var(--font-plus-jakarta)]">
          {series.title}
        </h2>
        
        {/* Deskripsi Singkat (Jika ada di type Series, tambahkan di sini) */}
        {/* @ts-ignore - Menampilkan deskripsi jika ada */}
        {series.description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {series.description}
          </p>
        )}

        {/* Action Hint - Muncul saat di-hover */}
        <div className="pt-2 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Mulai Membaca 
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}