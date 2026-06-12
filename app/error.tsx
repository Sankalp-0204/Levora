"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/events";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Silently log the error without breaking the luxury immersion
    console.error("Levora Runtime Exception:", error);
    // In production, this would fire to Sentry/Datadog, but we track a generic failure
    trackEvent("homepage_engagement", { section: "error_boundary_triggered" });
  }, [error]);

  return (
    <main className="bg-surface-base text-ink-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, var(--color-void-300) 0%, var(--color-void-100) 100%)"
        }}
      />
      
      <div className="relative z-10 max-w-2xl text-center space-y-12">
        <div className="space-y-6">
          <p className="type-metadata text-text-muted tracking-widest uppercase">
            System Interruption
          </p>
          <h1 className="type-display-lg text-ink-white">
            The Archive is Temporarily Unavailable
          </h1>
          <p className="type-body-lg text-text-muted max-w-xl mx-auto">
            We are experiencing an interruption in accessing the Levora archives. Our custodians have been notified. Please refresh the page or return to the main hall.
          </p>
        </div>

        <div className="pt-8 border-t border-ink-white/10">
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm uppercase tracking-[0.2em]">
            <li>
              <button 
                onClick={() => reset()}
                className="text-ink-white hover:text-gold-200 transition-colors duration-300 uppercase tracking-widest"
              >
                Attempt Recovery
              </button>
            </li>
            <li>
              <Link 
                href="/" 
                className="text-ink-white hover:text-gold-200 transition-colors duration-300"
              >
                Return to Entrance
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
