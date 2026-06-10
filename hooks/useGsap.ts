/**
 * @file hooks/useGsap.ts
 * @description Reusable React hook for GSAP animation lifecycle management.
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Wraps gsap.context() creation and cleanup in a single hook.
 * Every component that uses GSAP calls this hook instead of manually
 * managing useEffect + ctx.revert().
 *
 * Features:
 *   - Automatic gsap.context() scoped to a container ref.
 *   - Automatic cleanup on unmount (ctx.revert()).
 *   - Hot Module Reload safe (cleanup runs before re-creation).
 *   - SSR safe (no-ops when window is unavailable).
 *
 * Usage:
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   useGsap((ctx) => {
 *     // Build timelines, ScrollTriggers, etc.
 *     // All queries are automatically scoped to containerRef.
 *   }, [deps], containerRef);
 */

"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap } from "@/lib/gsap/config";

/**
 * React hook that manages a GSAP animation context lifecycle.
 *
 * @param factory - A function that receives the gsap.Context and builds animations.
 *                  All GSAP queries inside this function are automatically scoped
 *                  to the containerRef element.
 * @param deps    - React dependency array. The context is rebuilt when deps change.
 * @param containerRef - A React ref to the container element that scopes all
 *                       GSAP selector queries (e.g., gsap.to("[data-x]", ...)).
 */
export function useGsap(
  factory: (ctx: gsap.Context) => void,
  deps: DependencyList,
  containerRef: RefObject<HTMLElement | null>,
): void {
  // Store the factory in a ref to avoid re-triggering the effect when the
  // function identity changes (common with inline arrow functions).
  const factoryRef = useRef(factory);
  factoryRef.current = factory;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      factoryRef.current(ctx);
    }, container);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
