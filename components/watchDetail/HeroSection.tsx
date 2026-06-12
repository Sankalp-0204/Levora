"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { createWatchDetailHeroEntrance } from "@/lib/gsap/watchDetailScroll";

interface HeroSectionProps {
  eyebrow: string;
  title: string;
  quote: string;
}

export function HeroSection({ eyebrow, title, quote }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGsap(
    (ctx) => {
      createWatchDetailHeroEntrance(containerRef.current!);
    },
    [],
    containerRef
  );

  // Split title into words for GSAP stagger
  const titleWords = title.split(" ").map((word, index) => (
    <span
      key={index}
      data-wd-entrance="word"
      className="inline-block whitespace-pre"
    >
      {word}{" "}
    </span>
  ));

  return (
    <section ref={containerRef} data-wd-hero className="wd-hero container-bleed">
      <div className="container-content wd-hero-content">
        <p
          data-wd-entrance="eyebrow"
          className="type-caption text-gold-parchment uppercase tracking-widest"
        >
          {eyebrow}
        </p>
        
        <h1 className="type-hero-display text-ink-white m-0 max-w-[15ch]">
          {titleWords}
        </h1>

        <p
          data-wd-entrance="quote"
          className="type-pull-quote text-gold-raw italic mt-4"
        >
          &ldquo;{quote}&rdquo;
        </p>

        <div
          data-wd-entrance="scroll"
          className="absolute bottom-12 left-0 w-full flex justify-between items-center container-content"
        >
          <span className="type-caption text-ink-300 uppercase tracking-widest">
            Scroll to explore
          </span>
          <hr className="wd-rule flex-1 ml-8" />
        </div>
      </div>
    </section>
  );
}
