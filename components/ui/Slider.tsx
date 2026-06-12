"use client";

/**
 * @file components/ui/Slider.tsx
 * @description Collection drag-carousel — Section 05.
 *
 * Sprint 2C Phase 5 — Collection Experience.
 *
 * Native CSS scroll-snap carousel. No custom drag or pointer event logic.
 * Pointer drag is explicitly omitted to preserve future GSAP motion
 * architecture ownership (Sprint 3+).
 *
 * Scroll behaviour:
 *   - overflow-x: auto  (native horizontal scrolling)
 *   - scroll-snap-type: x mandatory
 *   - Each child snaps via scroll-snap-align: center
 *   - Scrollbar hidden on all platforms via CSS
 *
 * Active card tracking:
 *   - A passive IntersectionObserver watches each child at threshold 0.6
 *   - The most-intersecting card is considered active
 *   - Active index is tracked in React state and passed via data attributes
 *   - Children must accept data-slider-item={index}
 *
 * Responsive card widths (set on the track via CSS custom properties):
 *   Mobile  (<768px)   : 85vw per card
 *   Tablet  (768–1023px): 48vw per card
 *   Desktop (≥1024px)  : 30vw per card (max 340px)
 *
 * Accessibility:
 *   - role="region" + aria-label on the outer wrapper
 *   - aria-roledescription="carousel" on the track
 *   - Pagination dots reflect active position, aria-hidden
 *   - Tab focus on children moves them into view via scroll-snap
 *
 * Motion preservation note:
 *   data-gsap-slider is reserved on the track for Sprint 3 GSAP integration.
 *
 * No commerce logic. No Firebase. No routing.
 */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";

interface SliderProps {
  children: React.ReactNode;
  /** Accessible label for the carousel region */
  ariaLabel?: string;
  /** Unique id used for aria-controls from CollectionToggle */
  panelId?: string;
}

export default function Slider({
  children,
  ariaLabel = "Watch collection carousel",
  panelId,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const childArray = Children.toArray(children);
  const count = childArray.length;

  /* ── Active card tracking via IntersectionObserver ────────────────────── */
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      itemRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (items.length === 0) return;

    const scores = new Map<HTMLDivElement, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          scores.set(entry.target as HTMLDivElement, entry.intersectionRatio);
        });

        /* Pick the item with the highest intersection ratio */
        let best = 0;
        let bestScore = -1;
        items.forEach((item, i) => {
          const score = scores.get(item) ?? 0;
          if (score > bestScore) {
            bestScore = score;
            best = i;
          }
        });

        setActiveIndex(best);
      },
      {
        root: trackRef.current,
        threshold: [0, 0.25, 0.5, 0.6, 0.75, 1],
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [count]);

  /* ── Scroll to card (used by dot pagination) ───────────────────────────── */
  const scrollToIndex = useCallback((index: number) => {
    const item = itemRefs.current[index];
    if (!item) return;
    item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, []);

  return (
    <section
      id={panelId}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      data-component="collection-slider"
      style={{ width: "100%", position: "relative" }}
    >
      {/* ── Scrollable track ─────────────────────────────────────────────── */}
      <div
        ref={trackRef}
        data-slider-track="true"
        data-gsap-slider /* reserved — Sprint 3 GSAP hook point */
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: "1.25rem",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          /* Hide scrollbar — all platforms */
          scrollbarWidth: "none",      /* Firefox */
          msOverflowStyle: "none",     /* IE / Edge legacy */
          /* Horizontal padding so first/last cards center at snap point */
          paddingLeft: "var(--slider-inset, 1.25rem)",
          paddingRight: "var(--slider-inset, 1.25rem)",
          paddingBottom: "1rem",       /* space for any residual scrollbar */
          /* Passive — no pointer-event interception */
          WebkitOverflowScrolling: "touch",
        }}
      >
        {childArray.map((child, index) => (
          <div
            key={index}
            ref={(el) => setItemRef(el, index)}
            data-slider-item={index}
            data-active={index === activeIndex}
            aria-label={`Item ${index + 1} of ${count}`}
            style={{
              /* Card width — responsive via inline clamp */
              flexShrink: 0,
              width: "clamp(260px, 85vw, 340px)",
              /* Tablet: ~48vw; Desktop: cap at 340px */
              scrollSnapAlign: "center",
              scrollSnapStop: "always",
            }}
          >
            {/* Pass isActive down to the watch card */}
            {isValidElement(child)
              ? cloneElement(child as ReactElement<{ isActive?: boolean }>, {
                  isActive: index === activeIndex,
                })
              : child}
          </div>
        ))}
      </div>

      {/* ── Hide WebKit scrollbar ─────────────────────────────────────────── */}
      <style>{`
        [data-slider-track]::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 768px) {
          [data-slider-track] > [data-slider-item] {
            width: clamp(280px, 48vw, 340px);
          }
        }
        @media (min-width: 1024px) {
          [data-slider-track] > [data-slider-item] {
            width: clamp(300px, 30vw, 340px);
          }
        }
      `}</style>

      {/* ── Pagination dots ───────────────────────────────────────────────── */}
      {count > 1 && (
        <div
          aria-hidden="true"
          role="presentation"
          data-slider-pagination="true"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          {childArray.map((_, index) => (
            <button
              key={index}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => scrollToIndex(index)}
              style={{
                appearance: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                width: index === activeIndex ? "1.5rem" : "0.375rem",
                height: "0.375rem",
                borderRadius: "var(--radius-crystal)",
                backgroundColor:
                  index === activeIndex
                    ? "var(--color-gold-400)"
                    : "var(--color-ink-300)",
                transition: `width var(--duration-normal) var(--ease-luxury),
                             background-color var(--duration-normal) var(--ease-luxury)`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
