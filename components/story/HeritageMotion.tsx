"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { generateArchivalSvg } from "@/lib/utils/archivalSvg";

/**
 * @file components/story/HeritageMotion.tsx
 * @description Heritage Motion Library.
 * Delivers specific museum-grade animated treatments for heritage artworks.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export type HeritageMotionType = "warli" | "pattachitra" | "chand_baori" | "bidriware";

interface HeritageMotionProps {
  type: HeritageMotionType;
  className?: string;
}

export function HeritageMotion({ type, className = "" }: HeritageMotionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const trigger = {
        trigger: containerRef.current,
        start: "top 80%",
      };

      if (type === "warli") {
        // Line drawing reveal (simulating SVG dash-offset)
        gsap.fromTo(
          ".warli-stroke",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 2, stagger: 0.1, ease: "power2.out", scrollTrigger: trigger }
        );
      } else if (type === "pattachitra") {
        // Border emergence
        gsap.fromTo(
          ".pattachitra-layer",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 3, stagger: 0.5, ease: "power2.out", scrollTrigger: trigger }
        );
      } else if (type === "chand_baori") {
        // Geometric depth parallax
        gsap.to(".chand-baori-layer", {
          scale: 1.1,
          opacity: 0.8,
          duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      } else if (type === "bidriware") {
        // Oxidation transition (gray to black background, silver pops)
        gsap.fromTo(
          containerRef.current,
          { backgroundColor: "#555" },
          { backgroundColor: "#080808", duration: 3, ease: "power2.inOut", scrollTrigger: trigger }
        );
        gsap.fromTo(
          ".bidriware-silver",
          { stroke: "rgba(255,255,255,0)" },
          { stroke: "rgba(255,255,255,1)", duration: 2, delay: 1, ease: "power2.inOut", scrollTrigger: trigger }
        );
      }
    },
    { scope: containerRef }
  );

  const getSvgContent = () => {
    switch (type) {
      case "warli":
        return generateArchivalSvg("charcoal", "geometry", 3);
      case "pattachitra":
        return generateArchivalSvg("parchment", "manuscript", 5);
      case "chand_baori":
        return generateArchivalSvg("bronze", "geometry", 7);
      case "bidriware":
        return generateArchivalSvg("charcoal", "macro", 9);
      default:
        return "";
    }
  };

  // Inject GSAP target classes into the SVG string based on the type
  const injectClasses = (svg: string) => {
    if (type === "warli") return svg.replace(/<circle /g, '<circle class="warli-stroke" ').replace(/<line /g, '<line class="warli-stroke" ');
    if (type === "pattachitra") return svg.replace(/<g /g, '<g class="pattachitra-layer" ');
    if (type === "chand_baori") return svg.replace(/<g /g, '<g class="chand-baori-layer" ');
    if (type === "bidriware") return svg.replace(/stroke="rgba[^"]+"/g, 'stroke="currentColor" class="bidriware-silver"');
    return svg;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      dangerouslySetInnerHTML={{ __html: injectClasses(getSvgContent()) }}
    />
  );
}
