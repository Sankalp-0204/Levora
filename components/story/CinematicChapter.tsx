"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MediaLayer, MediaAsset } from "@/components/story/MediaLayer";

/**
 * @file components/story/CinematicChapter.tsx
 * @description A GSAP ScrollTrigger pinned narrative chapter.
 * Implements Level 3 of the Motion Hierarchy (Pinned Storytelling).
 * Used sparingly (1-2 times per page) to deliver high-impact emotional beats.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChapterStep {
  id: string;
  eyebrow?: string;
  headline: string;
  body: string;
}

interface CinematicChapterProps {
  id: string;
  backgroundAsset: MediaAsset;
  steps: ChapterStep[];
}

export function CinematicChapter({ id, backgroundAsset, steps }: CinematicChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const panels = gsap.utils.toArray<HTMLElement>(".chapter-step");

      // Pin the background and crossfade the text panels as the user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${steps.length * 100}%`,
          pin: true,
          scrub: 1, // Smooth scrubbing
        },
      });

      // Simple staggered fade up for the text panels
      panels.forEach((panel, i) => {
        // Initial state: hide panel (unless it's the first one, which is visible at the start)
        if (i !== 0) {
          gsap.set(panel, { autoAlpha: 0, y: 50 });
        }

        // Fade out previous panel
        if (i !== 0) {
          tl.to(panels[i - 1], {
            autoAlpha: 0,
            y: -50,
            duration: 1,
            ease: "power2.inOut",
          });
        }

        // Fade in current panel
        if (i !== 0) {
          tl.to(panel, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.inOut",
          });
        }
      });

      // Fade out the last panel at the very end
      tl.to(panels[panels.length - 1], {
        autoAlpha: 0,
        y: -50,
        duration: 1,
        ease: "power2.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id={id} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 opacity-50">
        <MediaLayer asset={backgroundAsset} />
        {/* Vignette to ensure text legibility */}
        <div className="absolute inset-0 bg-radial-vignette from-transparent to-black/80" />
      </div>

      {/* Foreground Narrative Steps */}
      <div ref={textContainerRef} className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-3xl px-6 mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`chapter-step absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col items-center text-center ${
                index === 0 ? "opacity-100" : "opacity-0 invisible"
              }`}
            >
              {step.eyebrow && (
                <span className="type-caption text-[var(--color-gold-400)] uppercase tracking-widest mb-6 block">
                  {step.eyebrow}
                </span>
              )}
              <h2 className="type-h2 text-ink-white mb-8">
                {step.headline}
              </h2>
              <p className="type-body-lg text-ink-200 leading-relaxed max-w-2xl mx-auto">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
