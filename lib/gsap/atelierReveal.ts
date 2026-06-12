/**
 * @file lib/gsap/atelierReveal.ts
 * @description Atelier panel reveal animation — Section 04 (The Atelier).
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Each of the 5 craft dimension panels reveals independently as it enters
 * the viewport:
 *   1. Image region — autoAlpha 0 → 1, y 40px → 0.
 *   2. Spec text block — same, with a 0.15s delay after image.
 *
 * Panels trigger independently — the natural scroll position creates the
 * stagger effect. No global stagger needed.
 *
 * Emotional logic:
 *   Each craft dimension is revealed like lifting a cloth off a workbench.
 *   The image appears first (the object), then the text (the explanation).
 *
 * @param container - The [data-atelier-grid] wrapper element.
 * @returns gsap.Context for lifecycle cleanup.
 */

import {
  gsap,
  GSAP_DEFAULTS,
  prefersReducedMotion,
} from "@/lib/gsap/config";

export function createAtelierReveal(container: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    const panels = container.querySelectorAll("[data-atelier-panel]");

    if (prefersReducedMotion()) {
      // All panels visible immediately
      panels.forEach((panel) => {
        const imageRegion = panel.querySelector(".atelier-image-region");
        const specPanel = panel.querySelector("[data-gsap='atelier-reveal']");
        gsap.set([imageRegion, specPanel].filter(Boolean), { autoAlpha: 1, y: 0 });
      });
      return;
    }

    panels.forEach((panel) => {
      const imageRegion = panel.querySelector(".atelier-image-region");
      const specPanel = panel.querySelector("[data-gsap='atelier-reveal']");

      const targets = [imageRegion, specPanel].filter(Boolean);
      if (!targets.length) return;

      // Set initial hidden state
      gsap.set(targets, { autoAlpha: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // 1. Image region reveals first
      if (imageRegion) {
        tl.to(imageRegion, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: GSAP_DEFAULTS.ease.reveal,
        });
      }

      // 2. Spec text reveals with slight overlap
      if (specPanel) {
        tl.to(specPanel, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: GSAP_DEFAULTS.ease.reveal,
        }, imageRegion ? "-=0.55" : 0);
      }
    });
  }, container);

  return ctx;
}
