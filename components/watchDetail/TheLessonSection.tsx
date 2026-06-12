"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { createWatchDetailSectionReveal } from "@/lib/gsap/watchDetailScroll";

interface TheLessonSectionProps {
  title: string;
  body: readonly string[];
}

export function TheLessonSection({ title, body }: TheLessonSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGsap(
    (ctx) => {
      createWatchDetailSectionReveal(containerRef.current!);
    },
    [],
    containerRef
  );

  return (
    <section ref={containerRef} className="container-content section-pad-lg">
      <div className="wd-lesson-inner" data-wd-reveal>
        <div className="flex items-center gap-4 mb-8">
          <hr className="wd-rule wd-rule--short" />
          <span className="type-caption text-gold-parchment uppercase tracking-widest">
            The Lesson
          </span>
          <hr className="wd-rule wd-rule--short" />
        </div>

        <h2 className="type-h3 text-ink-white mb-8">{title}</h2>
        
        <div className="flex flex-col gap-6">
          {body.map((paragraph, index) => (
            <p key={index} className="type-body text-ink-200">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
