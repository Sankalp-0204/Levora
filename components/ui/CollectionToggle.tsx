"use client";

/**
 * @file components/ui/CollectionToggle.tsx
 * @description Tab toggle for switching between Heritage and Signature sliders.
 *
 * Sprint 2C Phase 5 — Collection Experience.
 *
 * Controls which collection slider is visible in Section 05 (#collection).
 * State is lifted to the parent (CollectionSection client wrapper in page.tsx).
 *
 * Design:
 *   - Two tabs: "Heritage Collection" | "Signature Collection"
 *   - Active tab: gold bottom border + primary text
 *   - Inactive tab: muted text, no border
 *   - Heritage uses --color-gold-400 accent (warm antique gold)
 *   - Signature uses --color-silver-400 accent (cool platinum)
 *   - Minimum 48×48px tap target on both tabs
 *
 * Accessibility:
 *   - role="tablist" on the container
 *   - role="tab" + aria-selected on each tab
 *   - aria-controls points to the matching slider panel id
 *   - Keyboard: Left/Right arrows navigate between tabs (roving tabindex)
 *
 * Motion:
 *   - Active indicator uses CSS transition only.
 *   - No GSAP. GSAP motion ownership is preserved for Sprint 3 ScrollTrigger.
 *
 * No commerce logic. No Firebase. No routing.
 */

import { useCallback, useRef } from "react";

export type CollectionTier = "heritage" | "signature";

interface CollectionToggleProps {
  /** Currently active tier */
  activeTier: CollectionTier;
  /** Callback fired when the user selects a tier */
  onChange: (tier: CollectionTier) => void;
}

const TABS: { tier: CollectionTier; label: string; accent: string }[] = [
  {
    tier: "heritage",
    label: "Heritage Collection",
    accent: "var(--color-gold-400)",
  },
  {
    tier: "signature",
    label: "Signature Collection",
    accent: "var(--color-silver-400)",
  },
];

export default function CollectionToggle({
  activeTier,
  onChange,
}: CollectionToggleProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /** Roving tabindex — arrow key navigation between tabs */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let next = index;
      if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
      else if (e.key === "ArrowLeft")
        next = (index - 1 + TABS.length) % TABS.length;
      else return;

      e.preventDefault();
      tabRefs.current[next]?.focus();
      onChange(TABS[next].tier);
    },
    [onChange]
  );

  return (
    <div
      role="tablist"
      aria-label="Collection tier selector"
      data-component="collection-toggle"
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        gap: 0,
        borderBottom: "0.5px solid var(--color-ink-200)",
        marginBottom: "2.5rem",
      }}
    >
      {TABS.map(({ tier, label, accent }, index) => {
        const isActive = activeTier === tier;
        return (
          <button
            key={tier}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={`collection-tab-${tier}`}
            aria-selected={isActive}
            aria-controls={`collection-panel-${tier}`}
            tabIndex={isActive ? 0 : -1}
            type="button"
            onClick={() => onChange(tier)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            data-tier={tier}
            style={{
              /* Reset */
              appearance: "none",
              background: "none",
              cursor: "pointer",
              /* Layout */
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "48px",
              padding: "0.75rem 1.75rem",
              /* Typography */
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caps)",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "var(--tracking-luxury)",
              textTransform: "uppercase",
              /* Active vs inactive colour */
              color: isActive
                ? "var(--color-text-primary)"
                : "var(--color-text-muted)",
              /* Active bottom indicator */
              borderBottom: isActive
                ? `1.5px solid ${accent}`
                : "1.5px solid transparent",
              /* Shift up 0.5px to sit on top of the container border */
              marginBottom: "-0.5px",
              /* Transition */
              transition: `color var(--duration-normal) var(--ease-luxury),
                           border-color var(--duration-normal) var(--ease-luxury)`,
              /* No other borders */
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
