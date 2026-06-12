"use client";

/**
 * @file components/analytics/AnalyticsProvider.tsx
 * @description Privacy-first analytics injection layer.
 * 
 * Default implementation utilizes Plausible Analytics — a lightweight,
 * cookie-less, privacy-compliant tracking solution. This architecture
 * allows for easy substitution (e.g., GA4) if business requirements change,
 * without needing to rewrite event tracking logic across the application.
 */

import Script from "next/script";

export function AnalyticsProvider() {
  // Only inject the script in production environments.
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      defer
      data-domain="levora.in" // Replace with actual production domain
      src="https://plausible.io/js/script.tagged-events.js"
      strategy="afterInteractive"
    />
  );
}
