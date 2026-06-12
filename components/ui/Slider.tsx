/**
 * @file components/ui/Slider.tsx
 * @description Collection drag-carousel — Section 05 scaffold.
 *
 * Sprint 2 scaffold — structural only. No drag logic. No styling.
 *
 * Renders a scrollable container with role="region" and an accessible label.
 * Children are the WatchContainer cards — one per Heritage watch.
 *
 * Sprint 2 full build will add:
 *   - CSS scroll-snap for native mobile swipe
 *   - Mouse drag logic (pointer events — no external library)
 *   - Active card tracking (CSS :has() or JS state via "use client")
 *   - Active card full opacity, adjacent cards blurred + scaled down
 *
 * This scaffold is a Server Component — no "use client" needed yet.
 */

interface SliderProps {
  children: React.ReactNode;
  /** Accessible label for the carousel region */
  ariaLabel?: string;
}

export default function Slider({
  children,
  ariaLabel = "Watch collection carousel",
}: SliderProps) {
  return (
    <section
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      data-component="collection-slider"
    >
      {/*
       * Scrollable track container.
       * Sprint 2 full build: overflow-x: scroll + scroll-snap-type: x mandatory
       * Mouse drag logic added via pointer event listeners in a client wrapper.
       */}
      <div
        aria-label="Collection cards"
        data-slider-track="true"
        role="group"
      >
        {children}
      </div>

      {/*
       * Pagination indicators placeholder.
       * Sprint 2 full build: dots or numeric position indicator.
       */}
      <div
        aria-label="Carousel position indicator"
        data-placeholder="slider-pagination"
        aria-hidden="true"
        role="presentation"
      />
    </section>
  );
}
