/**
 * @file components/watch/WatchContainer.tsx
 * @description Polymorphic watch renderer selector.
 *
 * Sprint 2 scaffold — structural placeholder only.
 *
 * This component acts as the orchestrator defined in COMPONENTS.md §2.
 * It reads the watch's renderType and delegates to the correct renderer:
 *   - "static"  → StaticRenderer   (collection cards, fallback)
 *   - "layered" → LayeredRenderer  (dial explosion stage)
 *   - "3d"      → ModelRenderer    (Sprint 3, lazy-loaded via next/dynamic)
 *
 * Sprint 2 behaviour:
 *   All renderTypes resolve to the StaticRenderer placeholder until
 *   full renderer implementations are complete.
 *
 * Data dependency (Sprint 3):
 *   Watch.renderType from types/watch.ts
 */

import StaticRenderer from "./StaticRenderer";

type RenderType = "static" | "layered" | "3d";

interface WatchContainerProps {
  /** Heritage watch identifier — e.g. "HERITAGE_01" */
  watchId: string;
  /** Display name of the watch */
  watchName: string;
  /** Short tagline for the dial art */
  tagline: string;
  /** URL slug for the detail page */
  slug: string;
  /**
   * How this watch should be rendered.
   * Sprint 2: all types fall through to StaticRenderer.
   * Sprint 3: "layered" → LayeredRenderer, "3d" → ModelRenderer.
   */
  renderType?: RenderType;
  /** Whether this is the active card in the Collection slider */
  isActive?: boolean;
}

export default function WatchContainer({
  watchId,
  watchName,
  tagline,
  slug,
  renderType = "static",
  isActive = false,
}: WatchContainerProps) {
  /**
   * Sprint 2: renderType is logged as a data attribute for future
   * switching logic. Full routing added in Sprint 2 full build.
   */
  return (
    <div
      data-watch-container={watchId}
      data-render-type={renderType}
    >
      {/*
       * Sprint 2 scaffold: all watches render as StaticRenderer.
       * Sprint 3 upgrade: switch(renderType) → LayeredRenderer | ModelRenderer
       */}
      <StaticRenderer
        watchId={watchId}
        watchName={watchName}
        tagline={tagline}
        slug={slug}
        isActive={isActive}
      />
    </div>
  );
}
