"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { createCraftsmenCardStagger } from "@/lib/gsap/watchDetailScroll";
import { WatchCraftsman } from "@/lib/constants/watchDetail";

interface AtelierCraftsmenSectionProps {
  craftsmen: readonly WatchCraftsman[];
}

export function AtelierCraftsmenSection({
  craftsmen,
}: AtelierCraftsmenSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGsap(
    (ctx) => {
      createCraftsmenCardStagger(containerRef.current!);
    },
    [],
    containerRef
  );

  return (
    <section ref={containerRef} className="container-content section-pad-lg">
      <div className="mb-12">
        <h2 className="type-h3 text-ink-white">The Makers</h2>
        <p className="type-body text-ink-200 mt-3 max-w-[60ch]">
          Three distinct disciplines. Three separate ateliers. One unified philosophy.
        </p>
      </div>

      <div className="wd-craftsmen-grid">
        {craftsmen.map((craftsman, index) => (
          <div key={index} className="wd-craftsman-card" data-wd-craftsman-card>
            <div className="flex items-center justify-between mb-2">
              <span className="type-caption text-gold-400 uppercase tracking-widest">
                {craftsman.role}
              </span>
              <span className="type-caption text-ink-400">
                0{index + 1}
              </span>
            </div>
            <h3 className="type-h4 text-ink-white m-0">
              {craftsman.generation}
            </h3>
            <span className="type-body-sm text-ink-300">
              {craftsman.location}
            </span>
            <hr className="wd-rule my-2" />
            <p className="type-body-sm text-ink-200 flex-1">
              {craftsman.tradition}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
