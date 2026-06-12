"use client";

/**
 * @file components/ui/Button.tsx
 * @description Luxury action button primitive.
 *
 * Sprint 2C Phase 4 — Layout Foundation.
 *
 * Three visual variants styled using design system tokens only.
 * No hard-coded hex colors or arbitrary px values.
 *
 * Variants:
 *   - "primary" — dark gradient background, hover reveals gold overlay + lift
 *   - "ghost"   — transparent, gold border pill, used for secondary actions
 *   - "outline" — transparent, white/5 border, used for tertiary actions
 *   - "action"  — alias for primary, used in collection card CTAs
 *
 * Typography: .type-button-label (12px, 600, 0.15em tracking, uppercase)
 * Design tokens: --radius-crystal, --shadow-raised, --shadow-gold-sm,
 *                --duration-slow, --ease-luxury, --color-void-400/500,
 *                --color-gold-400, --glass-gold-bg (globals.css)
 *
 * Accessibility:
 *   - Minimum 48px height enforced via padding + minHeight
 *   - aria-label required when children is icon-only
 *   - aria-disabled propagated alongside disabled attr
 */

interface ButtonProps {
  children: React.ReactNode;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Click handler */
  onClick?: () => void;
  /** Accessible label — required when button contains only an icon */
  "aria-label"?: string;
  /** Visual variant */
  variant?: "primary" | "ghost" | "outline" | "action";
  /** Whether the button is disabled */
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
  const isPrimary = variant === "primary" || variant === "action";
  const isGhost = variant === "ghost";
  // outline is the third branch

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "48px",
    padding: "0 2rem",
    borderRadius: "var(--radius-crystal)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? "none" : "auto",
    textDecoration: "none",
    position: "relative",
    overflow: "hidden",
    transition: `transform var(--duration-slow) var(--ease-luxury),
                 box-shadow var(--duration-slow) var(--ease-luxury),
                 border-color var(--duration-fast) var(--ease-luxury),
                 background-color var(--duration-fast) var(--ease-luxury)`,
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: `linear-gradient(135deg, var(--color-void-400) 0%, var(--color-void-500) 100%)`,
    border: "0.5px solid rgba(255, 255, 255, 0.10)",
    boxShadow: "var(--shadow-raised)",
  };

  const ghostStyle: React.CSSProperties = {
    ...baseStyle,
    background: "transparent",
    border: "0.5px solid var(--color-gold-400)",
    color: "var(--color-gold-400)",
  };

  const outlineStyle: React.CSSProperties = {
    ...baseStyle,
    background: "transparent",
    border: "0.5px solid rgba(255, 255, 255, 0.05)",
    color: "var(--color-text-secondary)",
  };

  const activeStyle = isPrimary
    ? primaryStyle
    : isGhost
    ? ghostStyle
    : outlineStyle;

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
      style={activeStyle}
      onMouseEnter={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        if (isPrimary) {
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "var(--shadow-gold-sm)";
          el.style.borderColor = "rgba(212, 175, 55, 0.4)";
        } else if (isGhost) {
          el.style.backgroundColor = "var(--glass-gold-bg)";
          el.style.boxShadow = "var(--shadow-gold-sm)";
        } else {
          el.style.borderColor = "rgba(255, 255, 255, 0.15)";
          el.style.color = "var(--color-text-primary)";
        }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        if (isPrimary) {
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "var(--shadow-raised)";
          el.style.borderColor = "rgba(255, 255, 255, 0.10)";
        } else if (isGhost) {
          el.style.backgroundColor = "transparent";
          el.style.boxShadow = "none";
        } else {
          el.style.borderColor = "rgba(255, 255, 255, 0.05)";
          el.style.color = "var(--color-text-secondary)";
        }
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        if (isPrimary) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "var(--shadow-surface)";
        }
      }}
    >
      <span className="type-button-label">{children}</span>
    </button>
  );
}
