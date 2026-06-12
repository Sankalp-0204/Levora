/**
 * @file lib/analytics/events.ts
 * @description Strongly typed analytics event registry.
 * 
 * Defines the telemetry schema for the application. Ensures that we are
 * tracking exactly what is needed for product insights without engaging
 * in invasive, cookie-heavy tracking patterns.
 */

// Core event types mapped to the user's journey
export type AnalyticsEvent = 
  | "homepage_engagement"
  | "collection_view"
  | "watch_detail_view"
  | "journal_read"
  | "salon_visit"
  | "salon_submission"
  | "scroll_depth";

// Associated metadata for each event type
export interface EventPayloads {
  homepage_engagement: { section: string };
  collection_view: { collection: string };
  watch_detail_view: { watchId: string; watchName: string };
  journal_read: { articleSlug: string; articleTitle: string };
  salon_visit: { source?: string; intent?: string };
  salon_submission: { watchId?: string; isGeneralInquiry: boolean };
  scroll_depth: { path: string; depthPercent: 25 | 50 | 75 | 100 };
}

/**
 * Tracks a specific interaction within the application.
 * This is the public interface used by React components.
 * 
 * @param eventName The core event identifier
 * @param payload Associated metadata for the event
 */
export function trackEvent<K extends AnalyticsEvent>(eventName: K, payload?: EventPayloads[K]) {
  // In a production environment, this calls the provider implementation (e.g., Plausible).
  // This abstraction ensures components don't know *how* tracking happens, only *what* happened.
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(eventName, { props: payload });
  } else {
    // Development fallback
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] Tracked: ${eventName}`, payload || {});
    }
  }
}
