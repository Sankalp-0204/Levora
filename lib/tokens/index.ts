/**
 * @file lib/tokens/index.ts
 * @description JavaScript mirror of the Levora design token system.
 *
 * PURPOSE:
 *   CSS custom properties in globals.css cannot be consumed by JavaScript
 *   animation libraries (GSAP, Framer Motion) at build time. This file
 *   mirrors the same token values as typed TypeScript constants so that
 *   animation code, GSAP timelines, and Framer Motion variants share the
 *   identical values defined in the CSS layer — no magic numbers scattered
 *   across animation files.
 *
 * MAINTAINABILITY RULE:
 *   If a value changes in globals.css @theme, it MUST be updated here too.
 *   Consider this file the single source of truth for JS-land token values.
 *
 * USAGE:
 *   import { colors, motion, z } from '@/lib/tokens';
 *   gsap.to(el, { duration: motion.duration.luxury / 1000, ease: motion.ease.luxury });
 */

// ============================================================================
// 1. COLORS
// ============================================================================

export const colors = {
  gold: {
    50:  "#FCF9F2",
    100: "#F6EDB9",
    200: "#ECD473",
    300: "#E2BA39",
    400: "#D4AF37", // PRIMARY GOLD ACCENT
    500: "#B79325",
    600: "#98761A",
  },
  silver: {
    50:  "#FFFFFF",
    100: "#F2F2F2",
    200: "#E6E6E6",
    300: "#D4D4D4",
    400: "#CCCCCC", // PRIMARY SILVER ACCENT
    500: "#999999",
    600: "#777777",
  },
  void: {
    "000": "#000000",
    50:    "#050505",
    100:   "#0A0A0A",
    200:   "#0D0E11",
    300:   "#121217",
    400:   "#14161E",
    500:   "#1C1E28",
  },
  ink: {
    100: "#212128",
    200: "#2A2B36",
    300: "#363744",
  },
  text: {
    primary:   "#FCFBF9",
    secondary: "#9F9F9F",
    muted:     "#626262",
    gold:      "#D4AF37",
    inverse:   "#050505",
  },
  state: {
    success: "#4CAF7D",
    warning: "#D4AC37",
    error:   "#C94B4B",
    info:    "#5B8DC4",
  },
} as const;


// ============================================================================
// 2. MOTION — Durations & Easing
// ============================================================================

/**
 * Duration values in MILLISECONDS for Framer Motion.
 * Divide by 1000 when using with GSAP (which uses seconds).
 *
 * @example
 * // Framer Motion
 * transition={{ duration: motion.duration.luxury / 1000 }}
 *
 * // GSAP
 * gsap.to(el, { duration: motion.duration.luxury / 1000, ease: motion.ease.luxury })
 */
export const motion = {
  duration: {
    instant:    100,  // ms — micro-feedback
    fast:       200,  // ms — button hover, border transitions
    normal:     350,  // ms — tabs, dropdowns
    slow:       600,  // ms — card reveals, panel slides
    luxury:     900,  // ms — hero text, watch card entries
    cinematic: 1400,  // ms — page transitions, modal opens
    story:     2000,  // ms — story scroll panel fade-ins
  },

  /**
   * Easing curve strings.
   * These are identical to the CSS @theme --ease-* values.
   * Format matches both GSAP custom ease notation and CSS cubic-bezier syntax.
   *
   * For GSAP: use "power3.out" or pass the cubic-bezier array.
   * For Framer Motion: pass as cubic-bezier string or array.
   */
  ease: {
    /** Primary brand ease: fast start, silk deceleration */
    luxury:    "cubic-bezier(0.16, 1.00, 0.30, 1.00)",

    /** Accelerating entries — elements entering the viewport */
    inLuxury:  "cubic-bezier(0.55, 0.00, 1.00, 0.45)",

    /** Explosive deceleration — dramatic reveals */
    outExpo:   "cubic-bezier(0.19, 1.00, 0.22, 1.00)",

    /** Subtle spring finish — natural resting position */
    spring:    "cubic-bezier(0.34, 1.56, 0.64, 1.00)",

    /** Linear — exclusively for GSAP scrub timelines */
    linear:    "linear",

    /** Standard smooth — generic fallback */
    standard:  "cubic-bezier(0.25, 0.10, 0.25, 1.00)",
  },

  /**
   * GSAP ScrollTrigger scrub values.
   * Represents the "lag" in seconds between the scroll position
   * and the animation playhead. Higher = heavier, more premium feel.
   */
  scrub: {
    standard: 1,    // Standard scroll friction
    premium:  1.5,  // Premium, heavy-feeling luxury scrub
  },
} as const;


// ============================================================================
// 3. Z-INDEX LAYERING
// ============================================================================

export const z = {
  base:      0,
  raised:    10,
  dialLayer: 20,   // GSAP dial separation base
  sticky:    50,
  dropdown:  100,
  drawer:    200,
  modal:     300,
  toast:     400,
  overlay:   500,
  cursor:    999,
} as const;


// ============================================================================
// 4. TYPOGRAPHY — JS-accessible font tokens
// ============================================================================

export const typography = {
  family: {
    display: "var(--font-display)",  // Cormorant Garamond
    body:    "var(--font-body)",     // Outfit
  },
  size: {
    h1:      "4.5rem",
    h2:      "2.5rem",
    h3:      "1.75rem",
    h4:      "1.375rem",
    bodyLg:  "1.125rem",
    body:    "0.9375rem",
    bodySm:  "0.875rem",
    caps:    "0.75rem",
    micro:   "0.6875rem",
  },
  weight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
  tracking: {
    tight:   "-0.02em",
    normal:   "0em",
    relaxed:  "0.02em",
    wide:     "0.08em",
    luxury:   "0.15em",
    ultra:    "0.25em",
  },
  leading: {
    display: 1.05,
    heading: 1.2,
    snug:    1.35,
    body:    1.7,
    loose:   2.0,
  },
} as const;


// ============================================================================
// 5. SHADOWS — JS values for inline styles / GSAP filter animations
// ============================================================================

export const shadows = {
  none:        "none",
  surface:     "0 1px 3px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.20)",
  raised:      "0 4px 16px rgba(0,0,0,0.40), 0 2px 6px rgba(0,0,0,0.25)",
  float:       "0 8px 30px rgba(0,0,0,0.50), 0 4px 12px rgba(0,0,0,0.30)",
  modal:       "0 25px 60px rgba(0,0,0,0.70), 0 10px 25px rgba(0,0,0,0.40)",
  deep:        "0 40px 80px rgba(0,0,0,0.80), 0 15px 35px rgba(0,0,0,0.50)",
  goldSm:      "0 0 12px rgba(212,175,55,0.20), 0 0 4px rgba(212,175,55,0.10)",
  goldMd:      "0 0 30px rgba(212,175,55,0.25), 0 0 12px rgba(212,175,55,0.15)",
  goldLg:      "0 0 60px rgba(212,175,55,0.30), 0 0 25px rgba(212,175,55,0.20), 0 0 8px rgba(212,175,55,0.12)",
} as const;


// ============================================================================
// 6. GLASSMORPHISM — Composable glass panel values for inline style usage
// ============================================================================

export const glass = {
  dark: {
    background:  "rgba(13, 14, 17, 0.60)",
    blur:        "20px",
    border:      "0.5px solid rgba(255, 255, 255, 0.05)",
    shadow:      shadows.float,
  },
  gold: {
    background:  "rgba(212, 175, 55, 0.06)",
    blur:        "16px",
    border:      "0.5px solid rgba(212, 175, 55, 0.20)",
    shadow:      shadows.goldMd,
  },
  frost: {
    background:  "rgba(255, 255, 255, 0.04)",
    blur:        "24px",
    border:      "0.5px solid rgba(255, 255, 255, 0.10)",
    shadow:      shadows.raised,
  },
} as const;


// ============================================================================
// 7. RADIUS
// ============================================================================

export const radius = {
  none:    "0px",
  sm:      "2px",
  md:      "6px",
  lg:      "12px",
  xl:      "20px",
  "2xl":   "32px",
  crystal: "9999px",
} as const;


// ============================================================================
// TYPE EXPORTS — Derive TypeScript types from const values for strict typing
// ============================================================================

export type ColorScale      = typeof colors;
export type MotionTokens    = typeof motion;
export type ZIndexTokens    = typeof z;
export type TypographyScale = typeof typography;
export type ShadowTokens    = typeof shadows;
export type GlassTokens     = typeof glass;
export type RadiusTokens    = typeof radius;
