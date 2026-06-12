"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { createWatchDetailSectionReveal } from "@/lib/gsap/watchDetailScroll";
import { WatchDetailContent } from "@/lib/constants/watchDetail";

interface OwnershipPhilosophySectionProps {
  content: WatchDetailContent;
}

export function OwnershipPhilosophySection({
  content,
}: OwnershipPhilosophySectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGsap(
    (ctx) => {
      createWatchDetailSectionReveal(containerRef.current!);
    },
    [],
    containerRef
  );

  return (
    <section ref={containerRef} className="container-content section-pad-xl">
      <div className="wd-ownership-inner" data-wd-reveal>
        {/* Edition Mark Display */}
        <div className="flex flex-col items-center mb-12">
          <span className="type-caption text-ink-400 uppercase tracking-widest mb-4">
            Strictly Limited Edition
          </span>
          <div className="relative">
            <span className="type-hero-display text-[8rem] leading-none text-gold-raw opacity-40">
              {content.editionTotal}
            </span>
            <span className="absolute bottom-4 -right-12 type-caption text-gold-parchment">
              PIECES
            </span>
          </div>
          <p className="type-caption text-ink-300 italic mt-6 max-w-[40ch]">
            {content.editionMark}
          </p>
        </div>

        <hr className="wd-rule mb-12" />

        {/* Philosophy Narrative */}
        <h2 className="type-h3 text-ink-white mb-8">
          {content.ownershipPhilosophy.title}
        </h2>
        
        <div className="flex flex-col gap-6 text-left">
          {content.ownershipPhilosophy.body.map((paragraph, index) => (
            <p key={index} className="type-body text-ink-200">
              {paragraph}
            </p>
          ))}
        </div>
        
        <hr className="wd-rule mt-12" />
      </div>
    </section>
  );
}
