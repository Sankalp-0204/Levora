/**
 * @file components/watch/StaticRenderer.tsx
 * @description Static dial image card for the Collection section (Section 05).
 *
 * Sprint 2 scaffold — structural only. No styling.
 *
 * Renders a <figure> with a placeholder image region and a <figcaption>
 * showing the watch name and tagline. An explore link points to the
 * watch's collection detail page.
 *
 * Next.js <Image> will replace the placeholder div in the Sprint 2
 * full implementation once dial render assets are available.
 *
 * Data dependency (Sprint 3):
 *   Watch type from types/watch.ts — name, tagline, slug, assets.primary
 */

import Link from "next/link";

interface StaticRendererProps {
  /** Heritage watch identifier — e.g. "HERITAGE_01" */
  watchId: string;
  /** Display name of the watch */
  watchName: string;
  /** Short tagline describing the dial art */
  tagline: string;
  /** URL slug for the watch detail page */
  slug: string;
  /**
   * Whether this card is the "active" (featured) card in the slider.
   * Active card renders at full opacity; inactive cards are de-emphasized.
   */
  isActive?: boolean;
}

export default function StaticRenderer({
  watchId,
  watchName,
  tagline,
  slug,
  isActive = false,
}: StaticRendererProps) {
  return (
    <figure
      aria-label={`${watchName} — ${tagline}`}
      data-watch-id={watchId}
      data-active={isActive}
    >
      {/*
       * Image region placeholder.
       * Sprint 2 full build: replace with Next.js <Image> using
       *   src={watch.assets.primary.url}
       *   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
       *   alt={watchName}
       */}
      <div
        aria-hidden="true"
        data-placeholder={`watch-image-${watchId}`}
        role="presentation"
      >
        <span>[ {watchId} dial image placeholder ]</span>
      </div>

      {/* Watch metadata overlay */}
      <figcaption>
        <h3>{watchName}</h3>
        <p>{tagline}</p>

        {/* Explore CTA — links to collection detail page */}
        <Link
          href={`/collections/heritage/${slug}`}
          aria-label={`Explore ${watchName}`}
        >
          Explore
        </Link>
      </figcaption>
    </figure>
  );
}
