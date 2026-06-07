/**
 * @file components/watch/LayeredRenderer.tsx
 * @description Scaffold for the dial explosion stage — Section 02.
 *
 * Sprint 2 scaffold — structural only. No GSAP. No styling.
 *
 * This component is the placeholder for the GSAP ScrollTrigger
 * dial layer separation animation defined in HOMEPAGE_ARCHITECTURE.md §7.
 *
 * Future implementation:
 *   - Each layer will be absolutely positioned inside a relative container.
 *   - lib/gsap/dialReveal.ts will animate scale, y, and opacity per layer
 *     mapped to the layer's `depth` value from the Watch type.
 *   - GSAP pinning (pin: true) will lock the viewport for 200% scroll distance.
 *   - Mobile: pinning disabled via matchMedia below BREAKPOINTS.md (768px).
 *
 * GSAP integration attribute:
 *   data-gsap="dial-revelation" — consumed by lib/gsap/dialReveal.ts
 *
 * Data dependency (Sprint 3):
 *   LayeredDialAsset[] from types/media.ts → Watch.assets.layeredDial
 */

interface DialLayerPlaceholder {
  /** Unique label for this layer slot — e.g. "sapphire-glass", "hour-hand" */
  id: string;
  /** Display name shown in the side label */
  label: string;
  /**
   * Z-depth order (0 = base, higher = closer to viewer).
   * GSAP will map this to translateY and scale during animation.
   */
  depth: number;
}

interface LayeredRendererProps {
  /**
   * Ordered array of dial layer descriptors.
   * Sourced from Watch.assets.layeredDial in Sprint 3.
   * Sprint 2: static placeholder array passed from page.tsx.
   */
  layers: DialLayerPlaceholder[];
  /** Watch identifier for aria labelling */
  watchId: string;
}

export default function LayeredRenderer({
  layers,
  watchId,
}: LayeredRendererProps) {
  return (
    <div
      aria-label={`Exploded dial view for watch ${watchId}`}
      data-gsap="dial-revelation"
      data-watch-id={watchId}
    >
      {/*
       * Relative container — each layer will be absolute-positioned here
       * once GSAP animation is implemented in Sprint 2 full build.
       */}
      <div
        aria-hidden="true"
        role="presentation"
        data-layer-stage="true"
      >
        {layers.map((layer) => (
          <div
            key={layer.id}
            data-layer-id={layer.id}
            data-layer-depth={layer.depth}
            aria-hidden="true"
          >
            {/* Placeholder layer slot — image asset added in Sprint 2 full build */}
            <div
              data-placeholder={`layer-${layer.id}`}
              role="presentation"
            />
          </div>
        ))}
      </div>

      {/* Side labels — visible to screen readers, animated by GSAP in Sprint 2 */}
      <ol aria-label="Dial layer breakdown">
        {layers.map((layer, index) => (
          <li key={layer.id} data-layer-label={layer.id}>
            <span aria-hidden="true">Layer {String(index + 1).padStart(2, "0")}</span>
            <span>{layer.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
