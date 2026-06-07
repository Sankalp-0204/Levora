"use client";

/**
 * @file components/story/DynamicVideo.tsx
 * @description Ambient video loop component for Section 01 — The Threshold.
 *
 * Sprint 2 scaffold — structural only. No GSAP. No styling.
 *
 * Marked "use client" because the <video> autoPlay attribute requires
 * a browser environment. Next.js hydrates this on the client after
 * the Server Component shell is served.
 *
 * Accessibility:
 *   - role="img" on the video container communicates it is decorative media.
 *   - aria-hidden="true" prevents screen readers from announcing the video.
 *   - A visually-hidden <p> provides a textual description for screen readers.
 *
 * GSAP integration point:
 *   - data-gsap="threshold-video" reserved for lib/gsap/thresholdEntrance.ts
 *
 * Sprint 3 upgrade:
 *   - src and posterSrc will be sourced from Firestore MediaAsset records.
 */

interface DynamicVideoProps {
  /** Path to the ambient video file (WebM preferred, MP4 fallback). */
  src?: string;
  /** Path to the poster image shown before video loads (AVIF / WebP). */
  posterSrc?: string;
  /** Accessible description for screen reader users. */
  accessibleLabel?: string;
}

export default function DynamicVideo({
  src,
  posterSrc,
  accessibleLabel = "An ambient video showing the craftsmanship and materials of a Levora timepiece.",
}: DynamicVideoProps) {
  return (
    <div
      aria-label="Ambient video background"
      data-gsap="threshold-video"
      role="img"
    >
      {/* Screen reader description — visually hidden */}
      <p className="sr-only">{accessibleLabel}</p>

      {src ? (
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          preload="metadata"
        >
          {/* WebM (VP9) — preferred for Chrome / Firefox */}
          <source src={src.replace(/\.(mp4|mov)$/, ".webm")} type="video/webm" />
          {/* MP4 (H.264) — fallback for Safari */}
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        /*
         * Placeholder state — shown during Sprint 2 development before
         * actual video assets are available.
         */
        <div
          aria-hidden="true"
          data-placeholder="ambient-video"
          role="presentation"
        >
          <span>[ Ambient video placeholder — asset pending ]</span>
        </div>
      )}
    </div>
  );
}
