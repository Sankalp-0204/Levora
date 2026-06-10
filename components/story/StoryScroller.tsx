/**
 * @file components/story/StoryScroller.tsx
 * @description Chronology of Dynasties — Section 03.
 *
 * Sprint 2C Phase 6 — Atelier + Chronology Experience.
 *
 * Server Component — no "use client" directive.
 *
 * Each era card tells a 4-part story arc:
 *   Part 1: The Artwork    — artworkTitle (h3) + artworkSubtitle (italic)
 *   Part 2: The Era        — eraPeriod centered below the motif circle
 *   Parts 2+3: History + Moral — storyContext prose (2–3 sentences)
 *   Part 4: Transformation — dialTransformation italic (the payoff line)
 *
 * Emotional goals:
 *   Curiosity         — artwork title leads before anything else. The reader
 *                       is drawn in before they know what they are reading.
 *   Pride in heritage — storyContext names dynasties, geographies, real people.
 *   Collector obsession — dialTransformation is the magic moment: how a
 *                         centuries-old tradition became a watch dial.
 *   Exclusivity       — HERITAGE_01 reference ID is visible but secondary;
 *                       it signals that this is a numbered, codified object.
 *
 * Layout:
 *   Mobile  (<768px):  vertical flex stack, full-width cards, gold left-rule.
 *   Desktop (≥768px): horizontal flex track, 360px cards, gold top-rule.
 *                     Native overflow-x: auto scroll. No GSAP in Phase 6.
 *
 * GSAP integration points (Sprint 3):
 *   data-gsap="chronology-scroll"     — outer wrapper, lib/gsap/chronologyScroll.ts
 *   data-chronology-clip="true"       — ScrollTrigger pin target
 *   data-era-card={watch.id}          — per-card hook
 *   data-era-index={index}            — stagger target
 *   data-placeholder="chronology-connectors" — SVG connector replacement
 *
 * CSS dependencies (app/layout.css, appended Sprint 2C Phase 6):
 *   .era-card::before (connector hairline), .era-transformation
 *
 * Defensive field rendering:
 *   All new fields (artworkTitle, artworkSubtitle, eraPeriod, storyContext,
 *   dialTransformation) are optional. Fallbacks ensure no machine IDs appear
 *   as visible content even if a field is undefined.
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
       * Outer clip container.
       * Desktop: overflow-x: auto (native horizontal scroll).
       * Mobile: overflow visible — cards stack vertically.
       * Sprint 3: GSAP ScrollTrigger pins this container and translates
       * the inner track horizontally (replacing native scroll).
       */}
      <div
        data-chronology-clip="true"
        className="chronology-clip"
        style={{ overflowX: "hidden" }}
      >
        {/*
         * Inner track — vertical stack on mobile, horizontal row on desktop.
         * Each <li> is a self-contained story card.
         */}
        <ol
          aria-label="Heritage watch timeline"
          data-chronology-track="true"
          className="chronology-track"
          style={{
            listStyle: "none",
            margin: 0,
            padding: "1rem 0 2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {ORDERED_WATCH_PLACEHOLDERS.map((watch, index) => (
            <li
              key={watch.id}
              data-era-card={watch.id}
              data-era-index={index}
              aria-label={watch.artworkTitle ?? watch.defaultName}
              className="glass-dark era-card"
              style={{
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                /* Mobile: gold left-rule. Desktop: overridden to top-rule via CSS. */
                borderLeft: "2px solid var(--color-gold-400)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                flexShrink: 0,
              }}
            >

              {/* ── PART 1: THE ARTWORK ──────────────────────────────────
               * The hook. Artwork title is the h3 — the first thing read.
               * Reference ID sits above it as a secondary muted signal.
               * artworkSubtitle (italic) deepens the intrigue below the title.
               */}

              {/* Reference ID — muted, above the title. Visual-only for the
                  collector who recognises it; irrelevant to the first reader. */}
              <span
                className="type-reference-id"
                aria-hidden="true"
                style={{ color: "var(--color-text-muted)" }}
              >
                {watch.id}
              </span>

              {/* Artwork title — the h3 hero of the card */}
              <h3
                className="type-card-heading"
                style={{ margin: 0 }}
              >
                {watch.artworkTitle ?? watch.defaultName}
              </h3>

              {/* Artwork subtitle — poetic, italic, muted */}
              {(watch.artworkSubtitle ?? watch.tagline) && (
                <span
                  className="type-metadata"
                  style={{
                    fontStyle: "italic",
                    color: "var(--color-text-muted)",
                    marginTop: "-0.5rem",
                  }}
                >
                  {watch.artworkSubtitle ?? watch.tagline}
                </span>
              )}

              {/* ── VISUAL PAUSE: MOTIF CIRCLE ───────────────────────────
               * A CSS-only concentric gold ring — the watch's circular form
               * without requiring an image asset.
               * Sprint 3: replace the outer div with a blurred <Image> of
               * the watch face. Same fixed 72px container — no layout shift.
               * data-placeholder key is deterministic for the swap.
               */}
              <div
                aria-hidden="true"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                {/* Outer ring — 72px diameter concentric motif */}
                <div
                  data-placeholder={`chronology-motif-${watch.id}`}
                  aria-hidden="true"
                  role="presentation"
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    border: "0.5px solid rgba(212, 175, 55, 0.20)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    flexShrink: 0,
                    /* Ambient radial glow — the ghost of the dial beneath */
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
                  }}
                >
                  {/* Inner ring — second concentric circle */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "0.5px solid rgba(212, 175, 55, 0.12)",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Era period — centred below the motif, gold-tinted metadata */}
                {watch.eraPeriod && (
                  <span
                    className="type-metadata"
                    style={{
                      color: "rgba(212, 175, 55, 0.55)",
                      textAlign: "center",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {watch.eraPeriod}
                  </span>
                )}
              </div>

              {/* ── PARTS 2 + 3: HISTORY + MORAL ─────────────────────────
               * The grounding. 2–3 sentences of prose that move from
               * historical fact to philosophical meaning.
               * The collector learns something real about India here.
               */}
              <p
                className="type-body"
                data-era-story={watch.id}
                style={{ margin: 0, maxWidth: "none" }}
              >
                {watch.storyContext ?? watch.tagline}
              </p>

              {/* ── VISUAL SEPARATOR ──────────────────────────────────────
               * A gold hairline between history/moral and the transformation.
               * This is the moment before the reveal.
               */}
              <div
                aria-hidden="true"
                style={{
                  width: "2rem",
                  height: "1px",
                  backgroundColor: "var(--color-gold-400)",
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />

              {/* ── PART 4: THE TRANSFORMATION ────────────────────────────
               * The payoff. The magic moment: how this centuries-old art
               * tradition became a watch dial.
               * Italic — reads differently from the prose above.
               * This is where collector obsession crystallises.
               */}
              {watch.dialTransformation && (
                <p
                  className="type-body era-transformation"
                  data-era-transformation={watch.id}
                  style={{ margin: 0, maxWidth: "none" }}
                >
                  {watch.dialTransformation}
                </p>
              )}

            </li>
          ))}
        </ol>
      </div>

      {/*
       * SVG gold connector lines placeholder.
       * Sprint 3: inline SVG with dynamic <line> elements connecting
       * era period labels to the motif circles across cards.
       * Hidden on mobile — the card's left gold border serves the
       * same "thread" function on vertical stacks.
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

      {/*
       * Responsive CSS — scoped to StoryScroller class names.
       * Desktop: horizontal flex, fixed 360px card width, gold top-rule.
       * Mobile default: vertical flex, full-width, gold left-rule (inline style).
       *
       * Note: .era-card::before (the connector hairline between cards on
       * desktop) is defined in app/layout.css (Phase 6 addition).
       */}
      <style>{`
        @media (min-width: 768px) {
          .chronology-track {
            flex-direction: row !important;
            gap: 1.5rem !important;
            padding: 1rem 0 2.5rem !important;
          }
          .era-card {
            width: 360px !important;
            border-left: none !important;
            border-top: 2px solid var(--color-gold-400) !important;
          }
          .chronology-clip {
            overflow-x: auto !important;
            /* Hide scrollbar — desktop horizontal scroll is passive */
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .chronology-clip::-webkit-scrollbar {
            display: none;
          }
          .chronology-connectors-desktop {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
