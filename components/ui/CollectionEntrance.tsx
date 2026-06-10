/**
 * @file components/ui/CollectionEntrance.tsx
 * @description Client wrapper that wires the Collection section GSAP entrance.
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Wraps the Collection section content and runs
 * lib/gsap/collectionEntrance.ts on mount. Subtle fade-up only.
 * The Slider remains the primary interaction — this entrance merely
 * presents the section with dignity.
 *
 * Children are rendered as-is — this is a transparent animation wrapper.
 */

"use client";

import { useRef, type ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";
import { createCollectionEntrance } from "@/lib/gsap/collectionEntrance";

interface CollectionEntranceProps {
  children: ReactNode;
}

export default function CollectionEntrance({ children }: CollectionEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      if (containerRef.current) {
        createCollectionEntrance(containerRef.current);
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
