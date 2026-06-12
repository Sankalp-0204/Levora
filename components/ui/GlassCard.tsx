/**
 * @file components/ui/GlassCard.tsx
 * @description Glassmorphic container primitive.
 *
 * Sprint 2C Phase 4 — Layout Foundation.
 *
 * Applies lightweight glassmorphism using design system tokens from globals.css.
 * Two variants:
 *   - "dark"  → .glass-dark  (default) — deep charcoal glass, white micro-border
 *   - "gold"  → .glass-gold            — gold-tinted glass, gold border
 *
 * Used in Section 06 (The Private Salon) as the concierge invitation container.
 * Glassmorphism is limited to this and the Header for mobile performance safety.
 *
 * Design tokens:
 *   --glass-dark-bg, --glass-dark-blur, --glass-dark-border   (globals.css)
 *   --glass-gold-bg, --glass-gold-blur, --glass-gold-border   (globals.css)
 *   --radius-2xl (32px), --shadow-float, --shadow-gold-md     (globals.css)
 */

interface GlassCardProps {
  children: React.ReactNode;
  /** Visual glass variant */
  variant?: "dark" | "gold";
  /** Optional additional class names for layout overrides */
  className?: string;
  /** aria-label for accessibility if the card has standalone meaning */
  ariaLabel?: string;
}

export default function GlassCard({
  children,
  variant = "dark",
  className,
  ariaLabel,
}: GlassCardProps) {
  const variantClass = variant === "gold" ? "glass-gold" : "glass-dark";

  return (
    <div
      aria-label={ariaLabel}
      className={`${variantClass} ${className ?? ""}`.trim()}
      data-component="glass-card"
      data-variant={variant}
      style={{
        borderRadius: "var(--radius-2xl)",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/*
       * Sheen highlight — top-edge gradient overlay.
       * Mimics the light catching the top edge of a watch crystal.
       * Purely decorative, aria-hidden.
       */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--gradient-card-sheen)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}
