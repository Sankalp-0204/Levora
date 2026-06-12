/**
 * @file lib/gsap/thresholdEntrance.ts
 * @description Hero headline entrance animation — Section 01 (The Threshold).
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Plays a one-shot entrance sequence on page load:
 *   1. Section eyebrow fades in.
 *   2. Headline words stagger in (opacity + slight y lift).
 *   3. Tagline fades in after headline completes.
 *   4. Scroll indicator fades in last.
 *
 * Word-level stagger (free GSAP, no SplitText license required):
 *   The headline text is pre-split into <span> elements by the component.
 *   Each <span> is a word that GSAP staggers independently.
 *
 * Emotional logic:
 *   The homepage opens with silence. Then the brand speaks — slowly,
 *   precisely. The words arrive like they are being *placed*, not displayed.
 *
 * @param container - The #threshold section element.
 * @returns gsap.Context for lifecycle cleanup.
 */

import {
  gsap,
  GSAP_DEFAULTS,
  prefersReducedMotion,
} from "@/lib/gsap/config";

export function createThresholdEntrance(container: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    const eyebrow = container.querySelector("[data-gsap-entrance='eyebrow']");
    const words = container.querySelectorAll("[data-gsap-entrance='word']");
    const tagline = container.querySelector("[data-gsap-entrance='tagline']");
    const scrollIndicator = container.querySelector("[data-scroll-indicator]");

    // Collect all targets that exist
    const targets = [eyebrow, ...Array.from(words), tagline, scrollIndicator].filter(Boolean);

    if (prefersReducedMotion()) {
      // Immediately reveal everything — no motion
      gsap.set(targets, { autoAlpha: 1, y: 0 });
      return;
    }

    // Set initial hidden state
    gsap.set(targets, { autoAlpha: 0 });
    if (words.length) gsap.set(words, { y: 20 });

    const tl = gsap.timeline({ delay: 0.3 });

    // 1. Eyebrow fades in
    if (eyebrow) {
      tl.to(eyebrow, {
        autoAlpha: 1,
        duration: 0.6,
        ease: GSAP_DEFAULTS.ease.luxury,
      });
    }

    // 2. Headline words stagger in
    if (words.length) {
      tl.to(words, {
        autoAlpha: 1,
        y: 0,
        duration: GSAP_DEFAULTS.duration.slow,
        stagger: GSAP_DEFAULTS.duration.heroStagger,
        ease: GSAP_DEFAULTS.ease.luxury,
      }, eyebrow ? "-=0.2" : 0);
    }

    // 3. Tagline fades in
    if (tagline) {
      tl.to(tagline, {
        autoAlpha: 1,
        duration: GSAP_DEFAULTS.duration.standard,
        ease: GSAP_DEFAULTS.ease.luxury,
      }, "-=0.4");
    }

    // 4. Scroll indicator fades in last
    if (scrollIndicator) {
      tl.to(scrollIndicator, {
        autoAlpha: 1,
        duration: 0.4,
        ease: GSAP_DEFAULTS.ease.luxury,
      }, "-=0.2");
    }
  }, container);

  return ctx;
}
