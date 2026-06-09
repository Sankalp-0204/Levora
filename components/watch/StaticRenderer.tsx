/**
 * @file components/watch/StaticRenderer.tsx
 * @description Static dial image card for the Collection section (Section 05).
 *
 * Sprint 2C Phase 5 — Collection Experience.
 *
 * Renders a <figure> with:
 *   - A 3:4 aspect-ratio image placeholder region with ambient gold glow
 *   - A <figcaption> with watch metadata: reference ID, name, tagline, CTA
 *   - Active/inactive visual states (opacity + scale)
 *   - Signature "Coming Soon" overlay state
 *   - CTA branching on checkoutType
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
 * Active state:   full opacity (1), scale 1, shadow visible.
 * Inactive state: opacity 0.75, scale 0.95, no shadow.
 *
 * Signature Coming Soon: renders a premium "Coming Soon" overlay instead of
 * watch imagery. No commerce logic. CTA renders "View Details" (placeholder).
 *
 * Data dependency (Sprint 3):
 *   Watch type from types/watch.ts — name, tagline, slug, assets.primary
 */

import Button from "@/components/ui/Button";

interface StaticRendererProps {
  /** Heritage or Signature watch identifier — e.g. "HERITAGE_01" */
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
  /**
   * Purchase routing strategy for the watch card CTA.
   * - "concierge_inquiry" → "Request Private Consultation" (Heritage)
   * - "direct_checkout"   → "View Details" (Signature)
   * No commerce logic is executed at this phase.
   */
  checkoutType?: "concierge_inquiry" | "direct_checkout";
  /**
   * Whether this card represents a Signature Coming Soon placeholder.
   * When true, renders the premium Coming Soon overlay instead of watch details.
   */
  isComingSoon?: boolean;
}

export default function StaticRenderer({
  watchId,
  watchName,
  tagline,
  slug,
  isActive = false,
  checkoutType = "concierge_inquiry",
  isComingSoon = false,
}: StaticRendererProps) {
  const ctaLabel =
    checkoutType === "direct_checkout"
      ? "View Details"
      : "Request Private Consultation";

  return (
    <figure
      aria-label={isComingSoon ? `${watchName} — Coming Soon` : `${watchName} — ${tagline}`}
      data-watch-id={watchId}
      data-active={isActive}
      data-checkout-type={checkoutType}
      data-coming-soon={isComingSoon}
      style={{
        margin: 0,
        backgroundColor: "var(--color-void-400)",
        border: isActive
          ? "0.5px solid rgba(212, 175, 55, 0.25)"
          : "0.5px solid var(--color-ink-100)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: isActive ? "var(--shadow-raised)" : "none",
        opacity: isActive ? 1 : 0.75,
        transform: isActive ? "scale(1)" : "scale(0.95)",
        transition: `opacity var(--duration-slow) var(--ease-luxury),
                     transform var(--duration-slow) var(--ease-luxury),
                     box-shadow var(--duration-slow) var(--ease-luxury),
                     border-color var(--duration-slow) var(--ease-luxury)`,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        /* Future GSAP hook: data-gsap="watch-card" */
      }}
    >
      {/* ── Image / Coming Soon region ──────────────────────────────────── */}
      {isComingSoon ? (
        /* ── Signature Coming Soon premium placeholder ─────────────────── */
        <div
          aria-label="Coming Soon"
          role="img"
          style={{
            aspectRatio: "3 / 4",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            overflow: "hidden",
            background: `linear-gradient(160deg, var(--color-void-500) 0%, var(--color-void-300) 100%)`,
          }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 60%, rgba(212, 175, 55, 0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Decorative ring motif */}
          <div
            aria-hidden="true"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "0.5px solid rgba(212, 175, 55, 0.20)",
              boxShadow: "0 0 32px rgba(212, 175, 55, 0.08)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "0.5px solid rgba(212, 175, 55, 0.12)",
              }}
            />
          </div>

          {/* "Coming Soon" typography */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              textAlign: "center",
              padding: "0 1.5rem",
            }}
          >
            <span
              className="type-section-label"
              style={{ color: "var(--color-gold-400)" }}
            >
              Signature Collection
            </span>
            <span
              className="type-card-heading"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              Coming Soon
            </span>
            <p
              className="type-body"
              style={{
                color: "var(--color-text-muted)",
                margin: 0,
                maxWidth: "16ch",
                textAlign: "center",
              }}
            >
              A new era of accessible luxury.
            </p>
          </div>
        </div>
      ) : (
        /* ── Heritage static watch image placeholder ───────────────────── */
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
      )}

      {/* ── Watch metadata ────────────────────────────────────────────────── */}
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
        <h3 className="type-card-heading" style={{ margin: 0 }}>
          {isComingSoon ? "Signature — TBA" : watchName}
        </h3>

        {/* Tagline */}
        <p className="type-body" style={{ margin: 0, maxWidth: "none" }}>
          {isComingSoon ? "Design reveal forthcoming." : tagline}
        </p>

        {/* CTA */}
        <div style={{ marginTop: "1rem" }}>
          <Button
            type="button"
            variant={checkoutType === "direct_checkout" ? "ghost" : "outline"}
            aria-label={
              isComingSoon
                ? `${watchId} — Coming Soon`
                : `${ctaLabel} for ${watchName}`
            }
            /*
             * Sprint 2C Phase 5: No commerce logic.
             * onClick is intentionally a no-op placeholder.
             * Sprint 3 wires:
             *   concierge_inquiry → ConciergeInquiryModal
             *   direct_checkout   → CartContext.addItem()  (disabled)
             */
            onClick={undefined}
            disabled={isComingSoon}
          >
            {isComingSoon ? "Coming Soon" : ctaLabel}
          </Button>
        </div>
      </figcaption>
    </figure>
  );
}
