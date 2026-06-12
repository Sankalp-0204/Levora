import { WatchDetailContent } from "@/lib/constants/watchDetail";

interface MovementShowcaseSectionProps {
  content: WatchDetailContent;
}

export function MovementShowcaseSection({
  content,
}: MovementShowcaseSectionProps) {
  return (
    <section className="bg-surface-vault container-bleed section-pad-lg border-y border-rule-warm">
      <div className="container-content wd-movement-grid">
        {/* Left Column: Specs */}
        <div>
          <h2 className="type-h3 text-ink-white mb-8">The Movement</h2>
          <dl className="wd-spec-list">
            <dt className="type-caption text-ink-400 uppercase tracking-wider">Calibre</dt>
            <dd className="type-body-sm text-ink-100">{content.movementCalibre}</dd>

            <dt className="type-caption text-ink-400 uppercase tracking-wider mt-4">Frequency</dt>
            <dd className="type-body-sm text-ink-100 mt-4">{content.movementFrequency}</dd>

            <dt className="type-caption text-ink-400 uppercase tracking-wider mt-4">Jewels</dt>
            <dd className="type-body-sm text-ink-100 mt-4">{content.movementJewels}</dd>

            <dt className="type-caption text-ink-400 uppercase tracking-wider mt-4">Reserve</dt>
            <dd className="type-body-sm text-ink-100 mt-4">{content.movementReserve}</dd>

            <dt className="type-caption text-ink-400 uppercase tracking-wider mt-4">Finishing</dt>
            <dd className="type-body-sm text-ink-100 mt-4">{content.movementFinish}</dd>
          </dl>
        </div>

        {/* Right Column: Narrative */}
        <div className="flex flex-col gap-6 pt-2 md:pt-0">
          <blockquote className="type-pull-quote text-gold-parchment italic m-0 pb-6 border-b border-rule-warm">
            "The art on the dial is Indian; the engine beneath it is strictly Swiss."
          </blockquote>
          <p className="type-body text-ink-200 mt-2">
            Every Heritage piece is powered by a high-beat automatic calibre
            rated to chronometer-grade tolerances. The exhibition caseback
            reveals the mechanical architecture, deliberately finished using
            traditional Swiss techniques — Côtes de Genève and perlage — to
            provide a stark aesthetic contrast to the Indian heritage art on the
            dial above it.
          </p>
        </div>
      </div>
    </section>
  );
}
