"use client";

/**
 * @file components/story/AtelierSection.tsx
 * @description Section 04 — The Atelier editorial grid.
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Client Component — "use client" required for GSAP lifecycle hook.
 * Renders 5 craft dimension panels from ATELIER_DIMENSIONS (lib/constants/brand.ts).
 *
 * Each panel is an editorial pairing of:
 *   - An image region placeholder (.atelier-image-region) with ambient glow
 *     and a decorative art-form label
 *   - A spec panel: eyebrow, h3, gold divider, description, craft detail
 *
 * Panels alternate column order on desktop (≥768px) via CSS .atelier-panel
 * nth-child(even) order rules in app/layout.css.
 *
 * The 5-panel sequence is deliberate — it follows the collector's journey:
 *   Artists → Materials → Craft → Precision → Movement
 *
 * Emotional goals:
 *   Collector obsession  — craft detail numbers (47 steps, 214 hours, 20 microns)
 *   Exclusivity          — "Craft 01" eyebrow language; numbered process
 *   Pride in heritage    — artisan geography (Puri, Jaipur, Patan)
 *
 * GSAP integration points (Sprint 3):
 *   data-atelier-grid="true"     — container, lib/gsap/atelierReveal.ts
 *   data-atelier-panel={index}   — per-panel ScrollTrigger trigger
 *   data-atelier-dimension       — per-panel machine key
 *   data-gsap="atelier-reveal"   — per spec panel, fade + slide-up, no pin
 *
 * CSS dependencies (app/layout.css, appended Sprint 2C Phase 6):
 *   .atelier-grid, .atelier-panel, .atelier-image-region,
 *   .atelier-spec-divider, .atelier-craft-detail
 *
 * Data dependency (Sprint 3):
 *   ATELIER_DIMENSIONS will be enriched with assets.atelierImage paths
 *   once photography assets are delivered. The image region <div> becomes
 *   <Image fill> with the same container — zero structural change required.
 */

import { useRef } from "react";
import { ATELIER_DIMENSIONS } from "@/lib/constants/brand";
import { useGsap } from "@/hooks/useGsap";
import { createAtelierReveal } from "@/lib/gsap/atelierReveal";

export default function AtelierSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      if (containerRef.current) {
        createAtelierReveal(containerRef.current);
      }
    },
    [],
    containerRef,
  );

  return (
    <div
      ref={containerRef}
      aria-label="Craftsmanship showcase"
      data-atelier-grid="true"
      className="atelier-grid"
    >
      {ATELIER_DIMENSIONS.map((dimension, index) => (
        <div
          key={dimension.dimension}
          data-atelier-panel={index}
          data-atelier-dimension={dimension.dimension}
          aria-label={dimension.title}
          className="atelier-panel"
        >
          {/* ── Image region ────────────────────────────────────────────── */}
          {/*
           * Placeholder for editorial photography.
           * Sprint 3 upgrade: replace this <div> with Next.js <Image fill>
           * using the same .atelier-image-region container — no layout shift.
           * data-placeholder key is deterministic for the swap.
           */}
          <div
            aria-hidden="true"
            data-placeholder={`atelier-image-${dimension.dimension}`}
            role="presentation"
            className="atelier-image-region"
          >
            {/* Ambient gold radial glow — atmosphere behind future photography */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--gradient-gold-glow)",
                pointerEvents: "none",
              }}
            />

            {/* Top-edge card sheen */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--gradient-card-sheen)",
                pointerEvents: "none",
              }}
            />

            {/*
             * Decorative art-form label — bottom-left of the image region.
             * Communicates what the image will show without requiring an asset.
             * aria-hidden: purely decorative, not meaningful to screen readers.
             */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1.25rem",
                zIndex: 1,
                color: "var(--color-atelier-brass)",
                letterSpacing: "0.15em",
                fontSize: "0.6875rem",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {dimension.imageLabel}
            </span>
          </div>

          {/* ── Spec panel ──────────────────────────────────────────────── */}
          {/*
           * No background — editorial text on void-200 page surface.
           * This creates a museum-catalogue feeling: image and text as equals.
           * GSAP hook: data-gsap="atelier-reveal" reserved for Sprint 3
           * fade + slide-up reveal (start: "top 80%", no pin, no scrub).
           */}
          <div
            aria-label={`${dimension.title} — craft detail`}
            data-gsap="atelier-reveal"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            {/* Sequential craft eyebrow — "Craft 01" through "Craft 05" */}
            <span
              className="type-section-label"
              style={{ color: "var(--color-silver-movement)" }}
            >
              Craft {String(index + 1).padStart(2, "0")}
            </span>

            {/* Craft dimension heading */}
            <h3
              className="type-card-heading"
              style={{ margin: 0 }}
            >
              {dimension.title}
            </h3>

            {/* Gold hairline divider — visual pause between heading and body */}
            <hr
              aria-hidden="true"
              className="atelier-spec-divider"
            />

            {/* Primary editorial description */}
            <p
              className="type-body"
              style={{ margin: 0 }}
            >
              {dimension.description}
            </p>

            {/*
             * Craft detail — spec-level secondary text.
             * Smaller, muted — a reward for the reader who looks closely.
             * The numbers here (47 steps, 214 hours, 20 microns) create
             * collector obsession without the copy ever using the word "exclusive".
             */}
            <p
              className="atelier-craft-detail"
              aria-label={`Technical detail: ${dimension.craftDetail}`}
            >
              {dimension.craftDetail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
