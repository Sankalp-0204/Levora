/**
 * @file lib/gsap/collectionEntrance.ts
 * @description Collection section entrance — Section 05 (The Collection).
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * A subtle fade-up on first viewport entry:
 *   1. Section heading block (eyebrow + h2 + description) — autoAlpha 0 → 1, y 30px → 0.
 *   2. CollectionSection component container — autoAlpha 0 → 1, y 20px → 0, with 0.2s delay.
 *
 * No scale effects. No dramatic movement. The slider remains the primary
 * interaction — this entrance merely presents the section with dignity.
 *
 * Emotional logic:
 *   The collection is presented — not thrown at you.
 *   The watches arrive on a velvet tray, lifted gently into view.
 *
 * @param container - The section#collection element.
 * @returns gsap.Context for lifecycle cleanup.
 */

import {
  gsap,
  GSAP_DEFAULTS,
  prefersReducedMotion,
} from "@/lib/gsap/config";

export function createCollectionEntrance(container: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    const heading = container.querySelector("[data-gsap-entrance='collection-heading']");
    const sliderContainer = container.querySelector("[data-gsap-entrance='collection-slider']");

    const targets = [heading, sliderContainer].filter(Boolean);

    if (prefersReducedMotion()) {
      gsap.set(targets, { autoAlpha: 1, y: 0 });
      return;
    }

    // Set initial hidden state
    if (heading) gsap.set(heading, { autoAlpha: 0, y: 30 });
    if (sliderContainer) gsap.set(sliderContainer, { autoAlpha: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 1. Heading block fades in
    if (heading) {
      tl.to(heading, {
        autoAlpha: 1,
        y: 0,
        duration: GSAP_DEFAULTS.duration.standard,
        ease: GSAP_DEFAULTS.ease.luxury,
      });
    }

    // 2. Slider container fades in with slight delay
    if (sliderContainer) {
      tl.to(sliderContainer, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: GSAP_DEFAULTS.ease.luxury,
      }, heading ? "-=0.5" : 0);
    }
  }, container);

  return ctx;
}
