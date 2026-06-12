import { WatchDetailContent } from "@/lib/constants/watchDetail";

interface ArtworkOriginSectionProps {
  content: WatchDetailContent;
}

export function ArtworkOriginSection({ content }: ArtworkOriginSectionProps) {
  return (
    <section className="container-content section-pad-lg relative">
      <div className="absolute top-0 left-8 opacity-5 pointer-events-none select-none">
        <span className="type-hero-display text-[16rem] leading-none">01</span>
      </div>

      <div className="wd-origin-grid relative z-10">
        {/* Left Column: Narrative */}
        <div className="flex flex-col gap-6">
          <h2 className="type-h2 text-ink-white max-w-[18ch]">
            {content.artworkOriginTitle}
          </h2>
          <div className="flex flex-col gap-5 mt-4">
            {content.artworkOriginBody.map((paragraph, index) => (
              <p key={index} className="type-body text-ink-200">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right Column: Spec List */}
        <aside className="bg-surface-raised rounded-lg border border-rule-warm p-8 lg:p-12 self-start sticky top-32">
          <h3 className="type-h4 text-ink-white mb-8 border-b border-rule-warm pb-4">
            Origin Characteristics
          </h3>
          <dl className="wd-spec-list">
            <dt className="type-caption text-ink-400 uppercase tracking-wider">Region</dt>
            <dd className="type-body-sm text-ink-100">{content.artworkRegion}</dd>

            <dt className="type-caption text-ink-400 uppercase tracking-wider mt-4">Period</dt>
            <dd className="type-body-sm text-ink-100 mt-4">{content.artworkPeriod}</dd>

            <dt className="type-caption text-ink-400 uppercase tracking-wider mt-4">Medium</dt>
            <dd className="type-body-sm text-ink-100 mt-4">{content.artworkMedium}</dd>

            <dt className="type-caption text-ink-400 uppercase tracking-wider mt-4">Lineage</dt>
            <dd className="type-body-sm text-ink-100 mt-4">{content.artworkLineage}</dd>
          </dl>
        </aside>
      </div>
    </section>
  );
}
