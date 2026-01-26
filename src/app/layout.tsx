import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Janpren — Ruang Baca Tenang",
  description: "Pengalaman membaca cerita pendek dan novel yang bersih, estetik, dan bebas gangguan.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.className} antialiased min-h-screen bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-200 selection:bg-blue-100 dark:selection:bg-blue-900`}
      >
        {/* Background Gradient Samar (Bikin tampilan gak flat) */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-50/50 dark:from-blue-900/10 to-transparent blur-3xl" />
        </div>

        <div className="flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-1">
            {children}
          </main>

          {/* Footer Lebih Proper */}
          <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h2 className="font-bold text-xl tracking-tight text-blue-600">Janpren</h2>
                </div>
                
                <div className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} — Membaca lebih fokus, lebih seru.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800/50 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                  Made with ❤️ for readers
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}