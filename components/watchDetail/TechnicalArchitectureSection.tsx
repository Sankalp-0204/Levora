"use client";

import { useRef } from "react";
import { useGsap } from "@/hooks/useGsap";
import { createWatchDetailSectionReveal } from "@/lib/gsap/watchDetailScroll";
import { StaticWatchPlaceholder } from "@/lib/constants/collection";

interface TechnicalArchitectureSectionProps {
  watch: StaticWatchPlaceholder;
}

export function TechnicalArchitectureSection({
  watch,
}: TechnicalArchitectureSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGsap(
    (ctx) => {
      // Re-use generic reveal for the grid panels
      createWatchDetailSectionReveal(containerRef.current!, ".wd-tech-panel");
    },
    [],
    containerRef
  );

  return (
    <section ref={containerRef} className="container-content section-pad-xl">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="type-h2 text-ink-white">Technical Architecture</h2>
        <p className="type-body text-ink-200 mt-4 max-w-[50ch]">
          The art is traditional. The horological chassis housing it meets
          modern Swiss chronometer-grade tolerances.
        </p>
      </div>

      <div className="wd-tech-grid">
        {/* Panel 1: The Dial Canvas */}
        <div className="wd-tech-panel">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="type-caption text-gold-400">01</span>
              <hr className="wd-rule flex-1" />
            </div>
            <h3 className="type-h3 text-ink-white">The Dial Canvas</h3>
            <p className="type-body text-ink-200">
              A composite structure designed to support organic heritage materials
              while maintaining mechanical stability under varying thermal loads.
            </p>
            <dl className="wd-spec-list border-t border-rule-warm pt-6 mt-2">
              <dt className="type-caption text-ink-400 uppercase tracking-wider">Base Plate</dt>
              <dd className="type-body-sm text-ink-100">Hand-patinated brass</dd>
              <dt className="type-caption text-ink-400 uppercase tracking-wider mt-3">Art Layer</dt>
              <dd className="type-body-sm text-ink-100 mt-3">{watch.artworkTitle}</dd>
              <dt className="type-caption text-ink-400 uppercase tracking-wider mt-3">Indexes</dt>
              <dd className="type-body-sm text-ink-100 mt-3">Applied or integrated per tradition</dd>
            </dl>
          </div>
          <div className="wd-image-region">
            <span className="absolute inset-0 flex items-center justify-center type-caption text-ink-400 z-10">
              Dial Canvas Placeholder
            </span>
          </div>
        </div>

        {/* Panel 2: The Case Construction */}
        <div className="wd-tech-panel">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="type-caption text-gold-400">02</span>
              <hr className="wd-rule flex-1" />
            </div>
            <h3 className="type-h3 text-ink-white">Case Construction</h3>
            <p className="type-body text-ink-200">
              Milled from a solid block of surgical-grade stainless steel. The
              bezel profile is kept deliberately minimal to maximise the dial
              aperture.
            </p>
            <dl className="wd-spec-list border-t border-rule-warm pt-6 mt-2">
              <dt className="type-caption text-ink-400 uppercase tracking-wider">Material</dt>
              <dd className="type-body-sm text-ink-100">316L Surgical Stainless Steel</dd>
              <dt className="type-caption text-ink-400 uppercase tracking-wider mt-3">Diameter</dt>
              <dd className="type-body-sm text-ink-100 mt-3">40mm</dd>
              <dt className="type-caption text-ink-400 uppercase tracking-wider mt-3">Crystal</dt>
              <dd className="type-body-sm text-ink-100 mt-3">Double-domed sapphire, internal AR</dd>
              <dt className="type-caption text-ink-400 uppercase tracking-wider mt-3">Resistance</dt>
              <dd className="type-body-sm text-ink-100 mt-3">5 ATM (50m)</dd>
            </dl>
          </div>
          <div className="wd-image-region">
            <span className="absolute inset-0 flex items-center justify-center type-caption text-ink-400 z-10">
              Case Profile Placeholder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
