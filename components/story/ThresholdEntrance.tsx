/**
 * @file components/story/ThresholdEntrance.tsx
 * @description Client wrapper that wires the Threshold GSAP entrance animation.
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * This component wraps the Threshold section content and runs
 * lib/gsap/thresholdEntrance.ts on mount. It must be a client component
 * because GSAP requires browser APIs.
 *
 * The headline text is pre-split into <span> elements with
 * data-gsap-entrance="word" attributes for word-level stagger.
 *
 * Children are rendered as-is — this is a transparent animation wrapper.
 */

"use client";

import { useRef, type ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";
import { createThresholdEntrance } from "@/lib/gsap/thresholdEntrance";

interface ThresholdEntranceProps {
  children: ReactNode;
}

export default function ThresholdEntrance({ children }: ThresholdEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      if (containerRef.current) {
        createThresholdEntrance(containerRef.current);
      }
    },
    [],
    containerRef,
  );

  return (
    <div ref={containerRef} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
