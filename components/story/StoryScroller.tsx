/**
 * @file components/story/StoryScroller.tsx
 * @description Chronology of Dynasties horizontal scroll stage — Section 03.
 *
 * Sprint 2C Phase 4 — Layout Foundation.
 *
 * Desktop: era cards displayed in a horizontal flex track.
 * Mobile: cards convert to a vertical stacked list (CSS only, no JS).
 *
 * Card styling uses .glass-dark for the glassmorphic card shell.
 * Each card is fixed-width on desktop (~300px), full-width on mobile.
 * A gold left-border rule replaces the SVG connector lines on mobile.
 *
 * GSAP integration point:
 *   data-gsap="chronology-scroll" — consumed by lib/gsap/chronologyScroll.ts
 *   Sprint 3 will add horizontal pan via GSAP ScrollTrigger.
 *
 * Design tokens used:
 *   .glass-dark, --radius-xl, --color-gold-400, --color-ink-100,
 *   --color-void-500, --shadow-float (globals.css)
 *
 * Data dependency (Sprint 3):
 *   Watch[] from types/watch.ts — id, defaultName, tagline, story.era
 */

import { ORDERED_WATCH_PLACEHOLDERS } from "@/lib/constants/collection";

export default function StoryScroller() {
  return (
    <div
      aria-label="Chronology of Dynasties — heritage timeline"
      data-gsap="chronology-scroll"
      style={{ position: "relative" }}
    >
      {/*
       * Outer clip container — overflow-x hidden on desktop.
       * GSAP (Sprint 3) will translate the inner track horizontally.
       * Mobile: overflow visible, cards stack vertically.
       */}
      <div
        data-chronology-clip="true"
        style={{ overflowX: "hidden" }}
        className="chronology-clip"
      >
        {/*
         * Inner track — horizontal flex on desktop, vertical stack on mobile.
         * Width flows from card count on desktop; auto on mobile.
         */}
        <ol
          aria-label="Heritage watch timeline"
          data-chronology-track="true"
          className="chronology-track"
          style={{
            listStyle: "none",
            margin: 0,
            padding: "1rem 0 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {ORDERED_WATCH_PLACEHOLDERS.map((watch, index) => (
            <li
              key={watch.id}
              data-era-card={watch.id}
              aria-label={`Era ${index + 1}: ${watch.defaultName}`}
              className="glass-dark era-card"
              style={{
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                borderLeft: "2px solid var(--color-gold-400)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flexShrink: 0,
              }}
            >
              {/* Cultural era label */}
              <span
                data-era-date={watch.id}
                aria-label="Cultural era period"
                className="type-section-label"
              >
                Era {String(index + 1).padStart(2, "0")}
              </span>

              {/*
               * Watch silhouette placeholder.
               * Sprint 3: replace with blurred <Image> or low-opacity StaticRenderer.
               */}
              <div
                aria-hidden="true"
                data-placeholder={`silhouette-${watch.id}`}
                data-era-silhouette={watch.id}
                role="presentation"
                className="era-silhouette"
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--color-void-500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Ambient glow */}
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
                  className="type-reference-id"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {watch.id}
                </span>
              </div>

              {/* Watch name and tagline */}
              <div
                data-era-description={watch.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <h3
                  className="type-card-heading"
                  style={{ margin: 0 }}
                >
                  {watch.defaultName}
                </h3>
                <p
                  className="type-body"
                  style={{ margin: 0, maxWidth: "none" }}
                >
                  {watch.tagline}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/*
       * SVG gold connector lines placeholder.
       * Sprint 3: inline SVG with dynamic <line> elements
       * connecting era dates to watch silhouettes.
       * Hidden on mobile — replaced by the card's left gold border.
       */}
      <div
        aria-hidden="true"
        data-placeholder="chronology-connectors"
        role="presentation"
        className="chronology-connectors-desktop"
        style={{ display: "none" }}
      >
        {/* SVG connector lines — Sprint 3 */}
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (min-width: 768px) {
          .chronology-track {
            flex-direction: row !important;
            gap: 1.5rem !important;
            padding: 1rem 0 2rem !important;
          }
          .era-card {
            width: 300px !important;
            border-left: none !important;
            border-top: 2px solid var(--color-gold-400) !important;
          }
          .era-silhouette {
            aspect-ratio: 1 / 1 !important;
          }
          .chronology-clip {
            overflow-x: auto !important;
          }
          .chronology-connectors-desktop {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
