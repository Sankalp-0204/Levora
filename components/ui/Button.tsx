/**
 * @file components/ui/Button.tsx
 * @description Luxury action button primitive.
 *
 * Sprint 2 scaffold — semantic structure only. No styling.
 *
 * Used in Section 06 (The Private Salon) for the concierge CTA.
 * Will also be used throughout the site as the primary action element.
 *
 * Sprint 2 full build will add:
 *   - Brushed metallic background gradient
 *   - Thin metallic border (border-[0.5px] border-zinc-700/50)
 *   - Hover reveal of soft gold linear gradient overlay
 *   - Micro-animation on hover (translateY(-2px), duration 0.6s)
 *
 * Variants (to be implemented in Sprint 2 full build):
 *   - "primary"  — gold accent, used for main CTAs
 *   - "ghost"    — transparent, used for secondary actions
 *   - "outline"  — thin border only
 */

interface ButtonProps {
  children: React.ReactNode;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Click handler — required when type="button" */
  onClick?: () => void;
  /** Accessible label — required when button contains only an icon */
  "aria-label"?: string;
  /** Visual variant — styling applied in Sprint 2 full build */
  variant?: "primary" | "ghost" | "outline";
  /** Whether the button action is currently loading */
  disabled?: boolean;
  /** Optional additional class names */
  className?: string;
}

export default function Button({
  children,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
  variant = "primary",
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      data-variant={variant}
      data-component="button"
      className={className}
    >
      {children}
    </button>
  );
}
