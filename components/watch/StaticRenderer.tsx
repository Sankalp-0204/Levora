/**
 * @file components/watch/StaticRenderer.tsx
 * @description Static dial image card for the Collection section (Section 05).
 *
 * Sprint 2C Phase 4 — Layout Foundation.
 *
 * Renders a <figure> with:
 *   - A 3:4 aspect-ratio image placeholder region with ambient gold glow
 *   - A <figcaption> with watch metadata: reference ID, name, tagline, CTA
 *   - Active/inactive visual states (opacity + scale)
 *
 * Design tokens used:
 *   --color-void-400     (card bg, image placeholder bg)
 *   --gradient-gold-glow (ambient glow behind dial image)
 *   --gradient-card-sheen (top-edge card highlight)
 *   --color-ink-100      (card border)
 *   --radius-lg          (image region), --radius-xl (card)
 *   --shadow-raised / --shadow-gold-sm (card elevation)
 *   --duration-slow, --ease-luxury (transitions)
 *
 * Active state: full opacity, scale 1.
 * Inactive state: opacity-50, scale-95, no hover.
 *
 * Data dependency (Sprint 3):
 *   Watch type from types/watch.ts — name, tagline, slug, assets.primary
 */

import Link from "next/link";

interface StaticRendererProps {
  /** Heritage watch identifier — e.g. "HERITAGE_01" */
  watchId: string;
  /** Display name of the watch */
  watchName: string;
  /** Short tagline describing the dial art */
  tagline: string;
  /** URL slug for the watch detail page */
  slug: string;
  /**
   * Whether this card is the "active" (featured) card in the slider.
   * Active card renders at full opacity; inactive cards are de-emphasized.
   */
  isActive?: boolean;
  /** Purchase routing strategy for the watch card CTA */
  checkoutType?: "concierge_inquiry" | "direct_checkout";
}

export default function StaticRenderer({
  watchId,
  watchName,
  tagline,
  slug,
  isActive = false,
  checkoutType = "concierge_inquiry",
}: StaticRendererProps) {
  return (
    <figure
      aria-label={`${watchName} — ${tagline}`}
      data-watch-id={watchId}
      data-active={isActive}
      style={{
        margin: 0,
        backgroundColor: "var(--color-void-400)",
        border: "0.5px solid var(--color-ink-100)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: isActive ? "var(--shadow-raised)" : "none",
        opacity: isActive ? 1 : 0.5,
        transform: isActive ? "scale(1)" : "scale(0.95)",
        transition: `opacity var(--duration-slow) var(--ease-luxury),
                     transform var(--duration-slow) var(--ease-luxury),
                     box-shadow var(--duration-slow) var(--ease-luxury)`,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/*
       * Image region placeholder — aspect-ratio 3:4 (portrait).
       * Sprint 2 full build: replace with Next.js <Image> using
       *   src={watch.assets.primary.url}
       *   sizes="(max-width: 768px) 90vw, 320px"
       *   alt={watchName}
       */}
      <div
        aria-hidden="true"
        data-placeholder={`watch-image-${watchId}`}
        role="presentation"
        style={{
          aspectRatio: "3 / 4",
          backgroundColor: "var(--color-void-400)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient gold glow behind the watch dial */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--gradient-gold-glow)",
            pointerEvents: "none",
          }}
        />
        {/* Placeholder label — removed in Sprint 3 once real assets arrive */}
        <span
          className="type-reference-id"
          style={{
            position: "relative",
            zIndex: 1,
            color: "var(--color-text-muted)",
          }}
        >
          {watchId}
        </span>
      </div>

      {/* Watch metadata */}
      <figcaption
        style={{
          padding: "1.25rem 1.5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {/* Reference ID */}
        <code className="type-reference-id">{watchId}</code>

        {/* Watch name */}
        <h3
          className="type-card-heading"
          style={{ margin: 0 }}
        >
          {watchName}
        </h3>

        {/* Tagline */}
        <p
          className="type-body"
          style={{ margin: 0, maxWidth: "none" }}
        >
          {tagline}
        </p>

        {/* Explore CTA — links to collection detail page */}
        <div style={{ marginTop: "1rem" }}>
          <Link
            href={`/collections/heritage/${slug}`}
            aria-label={`Explore ${watchName}`}
            className="type-button-label"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "var(--color-text-secondary)",
              padding: "0.75rem 0",
              minHeight: "48px",
              transition: `color var(--duration-fast) var(--ease-luxury)`,
            }}
          >
            Explore →
          </Link>
        </div>
      </figcaption>
    </figure>
  );
}
