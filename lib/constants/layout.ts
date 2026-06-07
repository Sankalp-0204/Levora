/**
 * @file lib/constants/layout.ts
 * @description Levora Layout Architecture Constants
 *
 * Defines the measurable, structural constants that govern page geometry.
 * These are consumed by:
 *   – layout.css  (CSS custom properties / utility classes)
 *   – GSAP        (ScrollTrigger bounds, pin offsets)
 *   – Next.js     (generateViewport, image sizes)
 *   – components  (inline style fallbacks, ResizeObserver thresholds)
 *
 * Rule: every spatial value that appears in more than one file MUST be
 * defined here. Never hard-code px or rem values in components.
 */

// ─────────────────────────────────────────────────────────────────────────────
// BREAKPOINTS
//
// Breakpoints are authored as NUMBER values (pixels) so they can be used
// directly in JavaScript (GSAP media queries, matchMedia, ResizeObserver).
// The CSS equivalents are written in layout.css using these same numbers.
// ─────────────────────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  /** 375px — Minimum supported mobile viewport (iPhone SE) */
  mobileMin:    375,
  /** 480px — Large mobile / landscape phone */
  mobileLg:     480,
  /** 640px — Small tablet portrait (Tailwind `sm`) */
  sm:           640,
  /** 768px — Tablet portrait — GSAP pinning disabled below this */
  md:           768,
  /** 1024px — Tablet landscape / small laptop (Tailwind `lg`) */
  lg:           1024,
  /** 1280px — Standard desktop — primary design target (Tailwind `xl`) */
  xl:           1280,
  /** 1440px — Widescreen — storytelling stage max-width */
  "2xl":        1440,
  /** 1920px — Ultra-wide — hero image max render size */
  ultraWide:    1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// ─────────────────────────────────────────────────────────────────────────────
// CONTAINER WIDTHS
//
// Three distinct content widths are used across Levora, each serving a
// specific hierarchy of importance.
// ─────────────────────────────────────────────────────────────────────────────

export const CONTAINER = {
  /**
   * 1280px — Standard grid container.
   * Used for: collection grids, specification tables, editorial text columns.
   * Provides comfortable margins on 1440px screens.
   */
  content: "80rem",   // 1280px

  /**
   * 1440px — Cinematic storytelling stage.
   * Used for: hero sections, dial explosion stages, GSAP scroll theatres.
   * Fills more of the viewport for maximum visual impact.
   */
  stage:   "90rem",   // 1440px

  /**
   * 100% — Full-bleed.
   * Used for: ambient video backgrounds, full-width image banners.
   * No maximum width. No horizontal padding.
   */
  bleed:   "100%",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
//
// The navigation bar has three geometric states based on scroll position.
// These exact pixel values are consumed by GSAP ScrollTrigger, sticky
// offset calculations, and CSS `top` / `padding-top` compensation.
// ─────────────────────────────────────────────────────────────────────────────

export const NAV = {
  /**
   * 88px — Default navigation height (above the fold).
   * Generous height — the brand mark is centered, the nav feels anchored.
   */
  heightDefault: 88,

  /**
   * 64px — Scrolled (compact) navigation height.
   * When the user scrolls past 80px, the nav contracts to this height
   * to reclaim vertical space without disappearing entirely.
   */
  heightCompact: 64,

  /**
   * 80px — Scroll threshold in pixels that triggers the compact transition.
   * Chosen to be just past the typical hero headline text height.
   */
  scrollThreshold: 80,

  /**
   * 600ms — Duration of the height and opacity transition.
   * Must match `--duration-slow` in globals.css.
   */
  transitionDuration: 600,

  /**
   * Horizontal padding applied inside the nav container.
   * Maps to `--space-nav-px` in layout.css.
   */
  horizontalPadding: {
    mobile:  "1.25rem",  // 20px
    tablet:  "2rem",     // 32px
    desktop: "3rem",     // 48px
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SECTION SPACING
//
// Section spacing is the primary tool for creating gallery-quality breathing
// room between page sections. All sections use vertical padding only.
// Horizontal rhythm is managed by the container system.
// ─────────────────────────────────────────────────────────────────────────────

export const SECTION_SPACING = {
  /**
   * SM — 96px — Mobile section padding / compact secondary sections.
   * Used for: supplementary sections, footer blocks.
   */
  sm:  "6rem",

  /**
   * MD — 128px — Standard section vertical padding.
   * Used for: collection grids, specification sections, editorial sections.
   */
  md:  "8rem",

  /**
   * LG — 192px — Feature section padding.
   * Used for: flagship feature sections, atelier showcase, story chapters.
   */
  lg:  "12rem",

  /**
   * XL — 256px — Cinematic breathing room.
   * Used for: hero transitions, GSAP pinned dial stages, full-scroll chapters.
   */
  xl:  "16rem",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// GRID SYSTEM
//
// Levora uses a 12-column grid. Most layouts use standard subsets
// (12, 6, 4, 3 columns). Column gaps are token-based.
// ─────────────────────────────────────────────────────────────────────────────

export const GRID = {
  columns: 12,

  gap: {
    /** 1.5rem (24px) — Card grids, tight column pairs */
    sm:  "1.5rem",
    /** 2rem (32px) — Standard grid gap */
    md:  "2rem",
    /** 3rem (48px) — Feature grids, storytelling column pairs */
    lg:  "3rem",
    /** 4rem (64px) — Wide editorial splits (text + image) */
    xl:  "4rem",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────

export const FOOTER = {
  /** Top padding — generous separation from last page section */
  paddingTop:    "6rem",
  /** Bottom padding — legal row margin from the browser edge */
  paddingBottom: "2.5rem",
  /** Number of columns in the footer link grid on desktop */
  linkColumns:    4,
} as const;
