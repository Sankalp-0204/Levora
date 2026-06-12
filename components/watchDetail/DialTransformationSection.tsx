"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { createPullQuoteReveal } from "@/lib/gsap/watchDetailScroll";

interface DialTransformationSectionProps {
  transformationQuote: string;
}

export function DialTransformationSection({
  transformationQuote,
}: DialTransformationSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGsap(
    (ctx) => {
      createPullQuoteReveal(containerRef.current!);
    },
    [],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      className="container-bleed bg-surface-stone section-pad-xl border-y border-rule-warm"
      data-wd-pullquote
    >
      <div className="container-content flex flex-col items-center text-center">
        <span className="type-caption text-gold-parchment uppercase tracking-widest mb-10">
          The Transformation
        </span>
        <blockquote
          data-wd-quote-text
          className="type-pull-quote--large text-ink-white max-w-[28ch] italic m-0"
        >
          {transformationQuote}
        </blockquote>
      </div>
    </section>
  );
}
