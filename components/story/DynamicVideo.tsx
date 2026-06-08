"use client";

/**
 * @file components/story/DynamicVideo.tsx
 * @description Ambient video loop component for Section 01 — The Threshold.
 *
 * Sprint 2C Phase 4 — Layout Foundation.
 *
 * Full-bleed container filling the hero section.
 * Renders either an ambient video loop or a styled placeholder when no src.
 * An overlay gradient fades the video into the page background at the bottom,
 * creating a seamless transition into Section 02.
 *
 * Accessibility:
 *   - role="img" on the video container communicates decorative media.
 *   - aria-hidden="true" on <video> prevents screen reader announcement.
 *   - Visually-hidden <p> provides a textual description for screen readers.
 *
 * Design tokens used:
 *   --color-void-200 (overlay fade)
 *   --color-void-400 (placeholder bg)
 *   --gradient-gold-glow (placeholder ambient glow)
 *   --color-text-muted (placeholder label)
 *
 * GSAP integration point:
 *   data-gsap="threshold-video" reserved for lib/gsap/thresholdEntrance.ts (Sprint 3)
 *
 * Sprint 3 upgrade:
 *   src and posterSrc will be sourced from Firestore MediaAsset records.
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
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Screen reader description — visually hidden */}
      <p
        className="sr-only"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {accessibleLabel}
      </p>

      {src ? (
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          {/* WebM (VP9) — preferred for Chrome / Firefox */}
          <source src={src.replace(/\.(mp4|mov)$/, ".webm")} type="video/webm" />
          {/* MP4 (H.264) — fallback for Safari */}
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        /*
         * Placeholder state — shown during development before
         * actual video assets are available.
         * Styled to occupy the same space as a real video would.
         */
        <div
          aria-hidden="true"
          data-placeholder="ambient-video"
          role="presentation"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-void-400)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Ambient gold glow — visual placeholder for watch dial atmosphere */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--gradient-gold-glow)",
              pointerEvents: "none",
            }}
          />
          <span
            className="type-metadata"
            style={{
              position: "relative",
              zIndex: 1,
              color: "var(--color-text-muted)",
            }}
          >
            [ Ambient video — asset pending ]
          </span>
        </div>
      )}

      {/*
       * Overlay gradient — fades the bottom of the video into the page background.
       * Creates visual continuity between the hero and Section 02.
       */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: `linear-gradient(to bottom, transparent 0%, var(--color-void-200) 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Dark overlay to ensure text legibility over the video */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(5, 5, 5, 0.35)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
