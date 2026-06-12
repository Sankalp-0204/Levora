/**
 * @file lib/gsap/chronologyScroll.ts
 * @description Chronology horizontal pan — Section 03 (Chronology of Dynasties).
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Desktop (≥768px):
 *   Vertical scroll drives horizontal x-axis translation of the era card track.
 *   The section pins in place while the inner track pans left.
 *   Scroll distance: 200% of viewport height (forces slowness — you cannot
 *   rush through history).
 *
 * Mobile (<768px):
 *   No pin. No horizontal scroll. Cards remain in vertical stack.
 *   A simple autoAlpha fade-in stagger is applied — each card fades in
 *   as it enters the viewport.
 *
 * Emotional logic:
 *   Walking through a museum corridor. Each step reveals the next dynasty.
 *
 * @param container - The [data-gsap="chronology-scroll"] wrapper element.
 * @returns gsap.Context for lifecycle cleanup.
 */

import {
  gsap,
  ScrollTrigger,
  GSAP_DEFAULTS,
  prefersReducedMotion,
} from "@/lib/gsap/config";

export function createChronologyScroll(container: HTMLElement): gsap.Context {
  const ctx = gsap.context(() => {
    const track = container.querySelector("[data-chronology-track]") as HTMLElement | null;
    const cards = container.querySelectorAll("[data-era-card]");

    if (prefersReducedMotion()) {
      // All cards visible immediately — no motion
      gsap.set(cards, { autoAlpha: 1 });
      return;
    }

    const mm = gsap.matchMedia();

    // ── Desktop: horizontal pan with pinning ──────────────────────────
    mm.add(GSAP_DEFAULTS.breakpoints.desktop, () => {
      if (!track) return;

      // Calculate how far the track needs to translate
      const getScrollDistance = () => {
        const trackWidth = track.scrollWidth;
        const containerWidth = container.offsetWidth;
        return -(trackWidth - containerWidth);
      };

      gsap.to(track, {
        x: getScrollDistance,
        ease: GSAP_DEFAULTS.ease.none,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200%",
          scrub: GSAP_DEFAULTS.scrub.premium,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    // ── Mobile: vertical fade-in stagger ──────────────────────────────
    mm.add(GSAP_DEFAULTS.breakpoints.mobile, () => {
      if (!cards.length) return;

      gsap.set(cards, { autoAlpha: 0, y: 20 });

      cards.forEach((card) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: GSAP_DEFAULTS.duration.standard,
          ease: GSAP_DEFAULTS.ease.reveal,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });
  }, container);

  return ctx;
}
