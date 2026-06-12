/**
 * @file components/ui/GlassCard.tsx
 * @description Glassmorphic container primitive.
 *
 * Sprint 2 scaffold — structural wrapper only. No styling.
 *
 * Used in Section 06 (The Private Salon) as the container for the
 * concierge invitation copy block and CTA button.
 *
 * Sprint 2 full build will add:
 *   - backdrop-filter: blur(24px) glassmorphism effect
 *   - bg-zinc-950/40 background
 *   - border border-white/5 micro-border
 *   - shadow-2xl depth
 *
 * Accepts any children and an optional className for section-specific
 * layout overrides.
 */

interface GlassCardProps {
  children: React.ReactNode;
  /** Optional additional class names for layout overrides */
  className?: string;
  /** aria-label for accessibility if the card has standalone meaning */
  ariaLabel?: string;
}

export default function GlassCard({
  children,
  className,
  ariaLabel,
}: GlassCardProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={className}
      data-component="glass-card"
    >
      {children}
    </div>
  );
}
