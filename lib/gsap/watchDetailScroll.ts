/**
 * @file lib/gsap/watchDetailScroll.ts
 * @description GSAP scroll animations for the Heritage watch detail page.
 *
 * Phase 9A — Heritage Watch Detail Experience.
 *
 * Follows the exact patterns established in:
 *   - lib/gsap/thresholdEntrance.ts  (word-stagger hero entrance)
 *   - lib/gsap/atelierReveal.ts      (panel reveal on scroll)
 *
 * Animation catalogue:
 *   createWatchDetailHeroEntrance  — hero word stagger + quote fade-in
 *   createWatchDetailSectionReveal — generic fade+lift reveal for any section
 *   createCraftsmenCardStagger     — craftsmen card staggered entrance
 *   createPullQuoteReveal          — transformation pull-quote scale+fade
 *
 * All animations respect prefersReducedMotion().
 */

import {
  gsap,
  ScrollTrigger,
  GSAP_DEFAULTS,
  prefersReducedMotion,
} from "@/lib/gsap/config";

// ─────────────────────────────────────────────────────────────────────────────
// HERO ENTRANCE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hero section one-shot entrance animation.
 * Mirrors thresholdEntrance.ts — eyebrow → words → quote → scroll indicator.
 *
 * @param container - The [data-wd-hero] section element.
 * @returns gsap.Context for cleanup.
 */
export function createWatchDetailHeroEntrance(container: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    const eyebrow = container.querySelector("[data-wd-entrance='eyebrow']");
    const words   = container.querySelectorAll("[data-wd-entrance='word']");
    const quote   = container.querySelector("[data-wd-entrance='quote']");
    const scroll  = container.querySelector("[data-wd-entrance='scroll']");

    const targets = [eyebrow, ...Array.from(words), quote, scroll].filter(Boolean);

    if (prefersReducedMotion()) {
      gsap.set(targets, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(targets, { autoAlpha: 0 });
    if (words.length) gsap.set(words, { y: 24 });

    const tl = gsap.timeline({ delay: 0.4 });

    if (eyebrow) {
      tl.to(eyebrow, {
        autoAlpha: 1,
        duration: 0.7,
        ease: GSAP_DEFAULTS.ease.luxury,
      });
    }

    if (words.length) {
      tl.to(words, {
        autoAlpha: 1,
        y: 0,
        duration: GSAP_DEFAULTS.duration.slow,
        stagger: GSAP_DEFAULTS.duration.heroStagger,
        ease: GSAP_DEFAULTS.ease.luxury,
      }, eyebrow ? "-=0.3" : 0);
    }

    if (quote) {
      tl.to(quote, {
        autoAlpha: 1,
        duration: GSAP_DEFAULTS.duration.standard,
        ease: GSAP_DEFAULTS.ease.luxury,
      }, "-=0.5");
    }

    if (scroll) {
      tl.to(scroll, {
        autoAlpha: 1,
        duration: 0.5,
        ease: GSAP_DEFAULTS.ease.luxury,
      }, "-=0.2");
    }
  }, container);

  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERIC SECTION REVEAL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generic fade + lift reveal for editorial panels.
 * Mirrors atelierReveal.ts — each panel triggers independently on scroll.
 *
 * @param container - The section or grid wrapper element.
 * @param selector  - Attribute selector for animatable children. Default: "[data-wd-reveal]"
 * @returns gsap.Context for cleanup.
 */
export function createWatchDetailSectionReveal(
  container: HTMLElement,
  selector = "[data-wd-reveal]",
): gsap.Context {
  const ctx = gsap.context(() => {
    const panels = container.querySelectorAll(selector);

    if (prefersReducedMotion()) {
      gsap.set(panels, { autoAlpha: 1, y: 0 });
      return;
    }

    panels.forEach((panel) => {
      gsap.set(panel, { autoAlpha: 0, y: 40 });

      gsap.to(panel, {
        autoAlpha: 1,
        y: 0,
        duration: GSAP_DEFAULTS.duration.standard,
        ease: GSAP_DEFAULTS.ease.reveal,
        scrollTrigger: {
          trigger: panel,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    });
  }, container);

  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// CRAFTSMEN CARD STAGGER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Staggered entrance for craftsmen cards.
 * All three cards in the row animate together with a 0.15s stagger.
 *
 * @param container - The [data-wd-craftsmen-grid] element.
 * @returns gsap.Context for cleanup.
 */
export function createCraftsmenCardStagger(container: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    const cards = container.querySelectorAll("[data-wd-craftsman-card]");

    if (prefersReducedMotion()) {
      gsap.set(cards, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(cards, { autoAlpha: 0, y: 32 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 78%",
      onEnter: () => {
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: GSAP_DEFAULTS.duration.standard,
          stagger: 0.15,
          ease: GSAP_DEFAULTS.ease.reveal,
        });
      },
    });
  }, container);

  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// PULL-QUOTE REVEAL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scale + fade reveal for the Dial Transformation pull-quote section.
 * Slightly more dramatic than a standard panel reveal — the scale adds
 * a sense of the quote arriving with weight.
 *
 * @param container - The [data-wd-pullquote] element.
 * @returns gsap.Context for cleanup.
 */
export function createPullQuoteReveal(container: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    const quote = container.querySelector("[data-wd-quote-text]");

    if (!quote) return;

    if (prefersReducedMotion()) {
      gsap.set(quote, { autoAlpha: 1, scale: 1 });
      return;
    }

    gsap.set(quote, { autoAlpha: 0, scale: 0.98 });

    gsap.to(quote, {
      autoAlpha: 1,
      scale: 1,
      duration: 1.2,
      ease: GSAP_DEFAULTS.ease.luxury,
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, container);

  return ctx;
}
