/**
 * @file lib/gsap/headerScroll.ts
 * @description Header hide/reveal on scroll velocity — global header animation.
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Behaviour:
 *   - Scroll down past threshold → header slides up out of view (translateY(-100%)).
 *   - Scroll up → header slides back into view (translateY(0)).
 *   - A minimum scroll threshold (80px) prevents micro-jitter from
 *     touch overscroll or trackpad momentum.
 *
 * This is velocity-based, not position-based. The header responds to
 * the *direction* of scrolling, not the absolute scroll position.
 *
 * Emotional logic:
 *   When you are inside the museum, the frame disappears.
 *   When you look up, it returns.
 *
 * @param header - The <header> element (#site-header).
 * @returns gsap.Context for lifecycle cleanup.
 */

import {
  gsap,
  ScrollTrigger,
  GSAP_DEFAULTS,
  prefersReducedMotion,
} from "@/lib/gsap/config";

export function createHeaderScroll(header: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) {
      // Header stays permanently visible — no hide/show
      return;
    }

    let lastScrollY = 0;
    let isHidden = false;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const currentScrollY = self.scroll();
        const delta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        // Don't activate until past the threshold
        if (currentScrollY < GSAP_DEFAULTS.headerScrollThreshold) {
          if (isHidden) {
            gsap.to(header, {
              y: 0,
              duration: GSAP_DEFAULTS.duration.fast,
              ease: GSAP_DEFAULTS.ease.luxury,
              overwrite: true,
            });
            isHidden = false;
          }
          return;
        }

        // Scrolling down — hide header
        if (delta > 0 && !isHidden) {
          gsap.to(header, {
            y: "-100%",
            duration: GSAP_DEFAULTS.duration.fast,
            ease: GSAP_DEFAULTS.ease.luxury,
            overwrite: true,
          });
          isHidden = true;
        }
        // Scrolling up — show header
        else if (delta < 0 && isHidden) {
          gsap.to(header, {
            y: 0,
            duration: GSAP_DEFAULTS.duration.fast,
            ease: GSAP_DEFAULTS.ease.luxury,
            overwrite: true,
          });
          isHidden = false;
        }
      },
    });
  }, header);

  return ctx;
}
