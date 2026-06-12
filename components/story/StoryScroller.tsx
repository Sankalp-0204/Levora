/**
 * @file components/story/StoryScroller.tsx
 * @description Chronology of Dynasties horizontal scroll stage — Section 03.
 *
 * Sprint 2 scaffold — structural only. No GSAP. No horizontal scroll logic.
 *
 * Renders seven era cards — one per Heritage watch (HERITAGE_01–07).
 * Each card shows an era date, a blurred watch silhouette slot, and a
 * short narrative description.
 *
 * GSAP integration point:
 *   data-gsap="chronology-scroll" — consumed by lib/gsap/chronologyScroll.ts
 *   which will translate the inner track horizontally as the user scrolls.
 *
 * Mobile behaviour:
 *   The horizontal scroll stage converts to a vertical stacked list below
 *   BREAKPOINTS.md (768px). This is handled via CSS in Sprint 2 full build.
 *   No JS matchMedia logic needed at this scaffold stage.
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
    >
      {/*
       * Outer clip container — overflow hidden.
       * GSAP will translate the inner track element horizontally.
       */}
      <div
        aria-hidden="true"
        data-chronology-clip="true"
        role="presentation"
      >
        {/*
         * Inner track — this element will be translated by GSAP.
         * Width = number of era cards × card width (set in CSS).
         */}
        <ol
          aria-label="Heritage watch timeline"
          data-chronology-track="true"
        >
          {ORDERED_WATCH_PLACEHOLDERS.map((watch, index) => (
            <li
              key={watch.id}
              data-era-card={watch.id}
              aria-label={`Era ${index + 1}: ${watch.defaultName}`}
            >
              {/* Cultural era date — copy finalised in Sprint 2 full build */}
              <p
                data-era-date={watch.id}
                aria-label="Cultural era period"
              >
                {/* Placeholder era label — will be replaced with real heritage data */}
                Era {String(index + 1).padStart(2, "0")}
              </p>

              {/*
               * Watch silhouette placeholder.
               * Sprint 2 full build: replace with blurred <Image> or
               * a CSS-blurred StaticRenderer at low opacity.
               */}
              <div
                aria-hidden="true"
                data-placeholder={`silhouette-${watch.id}`}
                data-era-silhouette={watch.id}
                role="presentation"
              >
                <span>[ {watch.id} silhouette ]</span>
              </div>

              {/* Watch name and tagline */}
              <div data-era-description={watch.id}>
                <h3>{watch.defaultName}</h3>
                <p>{watch.tagline}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/*
       * SVG gold connector lines placeholder.
       * Sprint 2 full build: inline SVG with dynamic <line> elements
       * connecting era dates to watch silhouettes.
       */}
      <div
        aria-hidden="true"
        data-placeholder="chronology-connectors"
        role="presentation"
      >
        {/* SVG connector lines — added in Sprint 2 full build */}
      </div>
    </div>
  );
}
