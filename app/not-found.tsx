import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive Not Found | Levora",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="bg-surface-base text-ink-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, var(--color-void-300) 0%, var(--color-void-100) 100%)"
        }}
      />
      
      <div className="relative z-10 max-w-2xl text-center space-y-12">
        <div className="space-y-6">
          <p className="type-metadata text-text-muted tracking-widest uppercase">
            Error 404
          </p>
          <h1 className="type-display-lg text-ink-white">
            The Archive Page Cannot Be Found
          </h1>
          <p className="type-body-lg text-text-muted max-w-xl mx-auto">
            The record you are searching for does not exist in the current Levora archive. It may have been relocated, or it may belong to an edition that has been permanently closed.
          </p>
        </div>

        <div className="pt-8 border-t border-ink-white/10">
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm uppercase tracking-[0.2em]">
            <li>
              <Link 
                href="/collections/heritage/heritage-01" 
                className="text-ink-white hover:text-gold-200 transition-colors duration-300"
              >
                Return to Collections
              </Link>
            </li>
            <li>
              <Link 
                href="/journal" 
                className="text-ink-white hover:text-gold-200 transition-colors duration-300"
              >
                Visit the Journal
              </Link>
            </li>
            <li>
              <Link 
                href="/salon" 
                className="text-ink-white hover:text-gold-200 transition-colors duration-300"
              >
                Enter the Private Salon
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
