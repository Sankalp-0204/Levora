"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MediaLayer, MediaAsset } from "@/components/story/MediaLayer";

/**
 * @file components/story/DynamicVideo.tsx
 * @description Maison Film Section for Section 01 — The Threshold.
 * Loops through a series of cinematic MediaAssets (SVG abstractions or Video).
 * Uses slow, deliberate GSAP fades to establish a luxury documentary atmosphere.
 */

interface DynamicVideoProps {
  accessibleLabel?: string;
}

// Fallback sequence representing the cinematic chapters:
// Macro dial, Artisan hands, Heritage pattern, Movement assembly
const FILM_SEQUENCE: MediaAsset[] = [
  { type: "heritage-motion", motionType: "bidriware", alt: "Dial Macro Cinematography" },
  { type: "heritage-motion", motionType: "warli", alt: "Artisan Hands at Work" },
  { type: "heritage-motion", motionType: "pattachitra", alt: "Heritage Visuals" },
  { type: "heritage-motion", motionType: "chand_baori", alt: "Movement Assembly Details" },
];

export default function DynamicVideo({
  accessibleLabel = "A cinematic montage showing Levora's craftsmanship, heritage arts, and horological assembly.",
}: DynamicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slow fade loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FILM_SEQUENCE.length);
    }, 6000); // 6 seconds per scene

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const slides = gsap.utils.toArray<HTMLElement>(".film-slide");
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          gsap.to(slide, { opacity: 1, duration: 2, ease: "power2.inOut" });
          // Very subtle slow zoom for cinematic effect
          gsap.fromTo(
            slide,
            { scale: 1 },
            { scale: 1.05, duration: 8, ease: "none", overwrite: "auto" }
          );
        } else {
          gsap.to(slide, { opacity: 0, duration: 2, ease: "power2.inOut" });
        }
      });
    },
    { dependencies: [currentIndex], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-label={accessibleLabel}
      data-gsap="threshold-video"
      role="img"
      className="absolute inset-0 z-0 overflow-hidden bg-black"
    >
      <p className="sr-only">{accessibleLabel}</p>

      {FILM_SEQUENCE.map((asset, idx) => (
        <div
          key={idx}
          className="film-slide absolute inset-0 opacity-0 will-change-[opacity,transform]"
        >
          <MediaLayer asset={asset} />
        </div>
      ))}

      {/* Overlay gradient to fade into page background */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-b from-transparent to-[var(--color-void-200)] pointer-events-none"
      />

      {/* Dark overlay for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 pointer-events-none"
      />
    </div>
  );
}
