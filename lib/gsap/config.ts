/**
 * @file lib/gsap/config.ts
 * @description Centralized GSAP configuration and shared defaults.
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Responsibilities:
 *   1. Register ScrollTrigger plugin (idempotent).
 *   2. Export shared animation constants (durations, easings, scrub values).
 *   3. Export breakpoint media queries for gsap.matchMedia().
 *   4. Export a prefersReducedMotion() utility.
 *
 * All animation factory modules in lib/gsap/ import from this file
 * instead of hard-coding values. Changes to timing, easing, or breakpoints
 * propagate automatically across every animation.
 *
 * No side effects on import beyond ScrollTrigger registration.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─────────────────────────────────────────────────────────────────────────────
// PLUGIN REGISTRATION (idempotent — safe to call multiple times)
// ─────────────────────────────────────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// SHARED ANIMATION DEFAULTS
// ─────────────────────────────────────────────────────────────────────────────

export const GSAP_DEFAULTS = {
  /**
   * Scrub values — how tightly the animation follows the scroll position.
   * Higher values = more physical drag/friction feel.
   */
  scrub: {
    /** Standard scrub for most scroll-linked animations */
    standard: 1,
    /** Premium scrub for the Chronology horizontal pan — heavier, more weighted */
    premium: 1.2,
  },

  /**
   * Easing functions.
   * Luxury motion uses deceleration curves — fast start, slow finish.
   * No bounce. No spring. No elastic.
   */
  ease: {
    /** Primary luxury ease — smooth deceleration */
    luxury: "power2.out",
    /** Linear — required for scrub-driven timelines (scrub provides its own friction) */
    none: "none",
    /** Entrance ease — slightly more pronounced deceleration for reveals */
    reveal: "power3.out",
  },

  /**
   * Duration presets in seconds.
   * Luxury brands animate slowly. Sub-0.3s durations feel cheap.
   */
  duration: {
    /** Quick UI response (header hide/show) */
    fast: 0.4,
    /** Standard reveal (panel entrance, section fade) */
    standard: 0.8,
    /** Slow reveal (hero headline, dramatic moments) */
    slow: 1.2,
    /** Hero entrance word stagger interval */
    heroStagger: 0.08,
  },

  /**
   * Media query breakpoints for gsap.matchMedia().
   * Matches the project's CSS breakpoint at 768px.
   */
  breakpoints: {
    /** Mobile-first: screens below the tablet breakpoint */
    mobile: "(max-width: 767px)",
    /** Desktop/tablet: screens at or above the tablet breakpoint */
    desktop: "(min-width: 768px)",
  },

  /**
   * Header scroll-hide threshold.
   * Minimum scroll distance (px) before direction detection activates.
   * Prevents micro-jitter from touch scrolling or trackpad overscroll.
   */
  headerScrollThreshold: 80,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ACCESSIBILITY: prefers-reduced-motion
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Checks whether the user has requested reduced motion.
 *
 * Every animation factory must call this before building timelines.
 * If true: use gsap.set() to place elements at their final state immediately.
 *
 * Safe to call during SSR — returns false when window is unavailable.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ─────────────────────────────────────────────────────────────────────────────
// RE-EXPORTS for convenience
// ─────────────────────────────────────────────────────────────────────────────

export { gsap, ScrollTrigger };
