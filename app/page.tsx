/**
 * @file app/page.tsx
 * @description Levora homepage — Server Component.
 *
 * Sprint 2 scaffold — section structure and SEO only.
 * No GSAP. No Firebase. No final styling.
 *
 * Architecture reference: docs/HOMEPAGE_ARCHITECTURE.md
 *
 * SEO:
 *   - Exports `metadata` using Next.js Metadata API.
 *   - Injects Organization JSON-LD schema via <script>.
 *   - Single <h1> in Section 01 (The Threshold) only.
 *   - Each section has an <h2> with matching aria-labelledby.
 *
 * Section order (from HOMEPAGE_ARCHITECTURE.md §1):
 *   01. The Threshold      (#threshold)
 *   02. The Dial Revelation (#dial-revelation)
 *   03. Chronology of Dynasties (#chronology)
 *   04. The Atelier        (#atelier)
 *   05. The Collection     (#collection)
 *   06. The Private Salon  (#salon)
 *
 * Header and Footer are rendered from app/layout.tsx.
 */

import type { Metadata } from "next";
import {
  SEO_DEFAULTS,
  OPEN_GRAPH_DEFAULTS,
  TWITTER_DEFAULTS,
  SITE_URL,
  getOrganizationJsonLd,
} from "@/lib/constants/seo";
import { BRAND_IDENTITY, BRAND_PHILOSOPHIES } from "@/lib/constants/brand";
import {
  WATCH_PLACEHOLDERS,
  ORDERED_WATCH_PLACEHOLDERS,
} from "@/lib/constants/collection";
import { SALON_CONTACT_INFO } from "@/lib/constants/contact";

import DynamicVideo from "@/components/story/DynamicVideo";
import LayeredRenderer from "@/components/watch/LayeredRenderer";
import StoryScroller from "@/components/story/StoryScroller";
import WatchContainer from "@/components/watch/WatchContainer";
import Slider from "@/components/ui/Slider";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: SEO_DEFAULTS.defaultTitle,
  description: SEO_DEFAULTS.description,
  keywords: [...SEO_DEFAULTS.keywords],
  creator: SEO_DEFAULTS.creator,
  publisher: SEO_DEFAULTS.publisher,
  robots: "index, follow",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    // Spread readonly tuple → mutable array (Next.js Metadata type requires mutable)
    images: [...OPEN_GRAPH_DEFAULTS.images],
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.description,
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.description,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA: Dial Revelation layer placeholders
// Sprint 3 upgrade: sourced from Watch.assets.layeredDial (Firestore)
// ─────────────────────────────────────────────────────────────────────────────

const DIAL_REVELATION_LAYERS = [
  { id: "sapphire-glass",   label: "Double-Domed Sapphire Crystal", depth: 5 },
  { id: "hour-hand",        label: "Hand-Applied Hour Hand",        depth: 4 },
  { id: "minute-hand",      label: "Hand-Applied Minute Hand",      depth: 3 },
  { id: "art-canvas",       label: "Heritage Art Canvas Layer",     depth: 2 },
  { id: "filigree-overlay", label: "Laser-Cut Filigree Overlay",    depth: 1 },
  { id: "base-plate",       label: "Hand-Patinated Brass Base",     depth: 0 },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── JSON-LD Organization schema ──────────────────────────── */}
      {/*
       * Injected into the document <head> at render time.
       * See: HOMEPAGE_ARCHITECTURE.md §6.2
       */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getOrganizationJsonLd() }}
      />

      <main id="main-content" aria-label="Levora homepage">

        {/* ══════════════════════════════════════════════════════════
            SECTION 01 — THE THRESHOLD
            Viewport: 100vh | Anchor: #threshold
            Emotional goal: First contact. Silence and restraint.
            ════════════════════════════════════════════════════════ */}
        <section
          id="threshold"
          aria-labelledby="threshold-heading"
          data-section="threshold"
          data-gsap-section="01"
        >
          {/*
           * DynamicVideo: ambient video loop background.
           * src and posterSrc will be supplied once video assets are available.
           * GSAP integration: data-gsap="threshold-video" in DynamicVideo.tsx
           */}
          <DynamicVideo
            accessibleLabel="An ambient video showing light moving across handcrafted watch materials, evoking Indian heritage and horological craftsmanship."
          />

          {/* Headline overlay — single <h1> on this page */}
          <div
            aria-label="Threshold headline"
            data-gsap="threshold-headline"
          >
            <h1
              id="threshold-heading"
              className="type-hero-display"
            >
              {BRAND_IDENTITY.headline}
            </h1>
            <p aria-label="Brand tagline" className="type-narrative-lead">
              {BRAND_IDENTITY.tagline}
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            aria-label="Scroll to explore"
            aria-hidden="true"
            data-scroll-indicator="true"
            role="presentation"
          >
            {/* CSS-animated indicator — styled in Sprint 2 full build */}
            <span>&#8595;</span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 02 — THE DIAL REVELATION
            Viewport: 300vh (GSAP pinned) | Anchor: #dial-revelation
            Emotional goal: Mechanical awe. Layered dial USP.
            Featured watch: HERITAGE_01 — Chand Baori Dial
            ════════════════════════════════════════════════════════ */}
        <section
          id="dial-revelation"
          aria-labelledby="dial-revelation-heading"
          data-section="dial-revelation"
          data-gsap-section="02"
        >
          <h2
            id="dial-revelation-heading"
            className="type-section-heading"
          >
            The Anatomy of a Dial
          </h2>

          <p aria-label="Dial revelation description" className="type-body">
            Every layer of the {WATCH_PLACEHOLDERS.HERITAGE_01.defaultName} is a
            deliberate act of craftsmanship.
          </p>

          {/*
           * LayeredRenderer: placeholder for the GSAP scroll-pinned explosion.
           * GSAP integration: data-gsap="dial-revelation" in LayeredRenderer.tsx
           * Sprint 2 full build: lib/gsap/dialReveal.ts wired here.
           */}
          <LayeredRenderer
            watchId={WATCH_PLACEHOLDERS.HERITAGE_01.id}
            layers={DIAL_REVELATION_LAYERS.map((l) => ({ ...l }))}
          />
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 03 — CHRONOLOGY OF DYNASTIES
            Viewport: 200vh | Anchor: #chronology
            Emotional goal: Intellectual engagement. Living history.
            ════════════════════════════════════════════════════════ */}
        <section
          id="chronology"
          aria-labelledby="chronology-heading"
          data-section="chronology"
          data-gsap-section="03"
        >
          <h2
            id="chronology-heading"
            className="type-section-heading"
          >
            Chronology of Dynasties
          </h2>

          <p aria-label="Chronology description" className="type-body">
            Seven eras. Seven art forms. Seven timepieces.
          </p>

          {/*
           * StoryScroller: horizontal era timeline.
           * GSAP integration: data-gsap="chronology-scroll" in StoryScroller.tsx
           * Sprint 2 full build: lib/gsap/chronologyScroll.ts wired here.
           */}
          <StoryScroller />
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 04 — THE ATELIER
            Viewport: auto | Anchor: #atelier
            Emotional goal: Trust in process and craftsmanship.
            ════════════════════════════════════════════════════════ */}
        <section
          id="atelier"
          aria-labelledby="atelier-heading"
          data-section="atelier"
          data-gsap-section="04"
        >
          <h2
            id="atelier-heading"
            className="type-section-heading"
          >
            The Atelier
          </h2>

          {/*
           * Editorial grid — image + spec panel pairs.
           * Sprint 2 full build: Next.js <Image> assets + GSAP reveal.
           * GSAP integration: data-atelier-panel on each spec block.
           */}
          <div
            aria-label="Craftsmanship showcase"
            data-atelier-grid="true"
          >
            {BRAND_PHILOSOPHIES.map((philosophy, index) => (
              <div
                key={philosophy.title}
                data-atelier-panel={index}
                aria-label={philosophy.title}
              >
                {/* Image placeholder */}
                <div
                  aria-hidden="true"
                  data-placeholder={`atelier-image-${index}`}
                  role="presentation"
                >
                   <span className="type-metadata">[ Atelier image {index + 1} placeholder ]</span>
                </div>

                {/* Spec panel */}
                <div aria-label="Craftsmanship specification">
                  <h3 className="type-card-heading">{philosophy.title}</h3>
                  <p className="type-body">{philosophy.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 05 — THE COLLECTION
            Viewport: auto | Anchor: #collection
            Emotional goal: Curiosity into desire.
            ════════════════════════════════════════════════════════ */}
        <section
          id="collection"
          aria-labelledby="collection-heading"
          data-section="collection"
        >
          <h2
            id="collection-heading"
            className="type-section-heading"
          >
            Heritage Collection
          </h2>

          <p aria-label="Collection description" className="type-body">
            Seven timepieces. Each a strictly numbered edition.
          </p>

          {/*
           * Slider: drag-enabled carousel wrapping WatchContainer cards.
           * Sprint 2 full build: active card tracking, scroll-snap, drag.
           */}
          <Slider ariaLabel="Heritage Collection — seven limited edition timepieces">
            {ORDERED_WATCH_PLACEHOLDERS.map((watch, index) => (
              <WatchContainer
                key={watch.id}
                watchId={watch.id}
                watchName={watch.defaultName}
                tagline={watch.tagline}
                slug={watch.slug}
                renderType="static"
                isActive={index === 0}
              />
            ))}
          </Slider>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 06 — THE PRIVATE SALON
            Viewport: 80vh | Anchor: #salon
            Emotional goal: Exclusivity. Replace checkout with invitation.
            ════════════════════════════════════════════════════════ */}
        <section
          id="salon"
          aria-labelledby="salon-heading"
          data-section="salon"
        >
          {/*
           * GlassCard: glassmorphic container for the salon invite block.
           * Sprint 2 full build: backdrop-filter, bg-zinc-950/40, border.
           */}
          <GlassCard ariaLabel="Private salon invitation">
            <h2
              id="salon-heading"
              className="type-section-heading"
            >
              The Private Salon
            </h2>

            <p aria-label="Salon invitation copy" className="type-narrative-lead">
              By Invitation. Request a private showing with a Levora horology specialist.
            </p>

            <address aria-label="Levora salon address">
              <span className="type-body">{SALON_CONTACT_INFO.address.salonName}</span>
              <span className="type-body">{SALON_CONTACT_INFO.address.city}, {SALON_CONTACT_INFO.address.state}</span>
              <span className="type-metadata">{SALON_CONTACT_INFO.supportHours}</span>
            </address>

            {/*
             * CTA Button: triggers ConciergeInquiryModal.
             * Sprint 2 full build: Modal component with inquiry form wired here.
             * Sprint 3 upgrade: form submission writes to Firestore inquiries.
             */}
            <Button
              type="button"
              aria-label="Request a private consultation with a Levora horology specialist"
              variant="primary"
            >
              Request Private Consultation
            </Button>

            {/*
             * ConciergeInquiryModal placeholder.
             * Sprint 2 full build: Modal.tsx with InquiryForm (types/inquiry.ts).
             * Triggered by Button onClick above.
             */}
            <div
              aria-label="Concierge inquiry modal — placeholder"
              data-placeholder="concierge-modal"
              hidden
              role="dialog"
              aria-modal="true"
              aria-labelledby="concierge-modal-heading"
            >
              <h2 id="concierge-modal-heading" className="type-section-heading">
                Request a Private Consultation
              </h2>
              {/* InquiryForm added in Sprint 2 full build */}
            </div>
          </GlassCard>
        </section>

      </main>
    </>
  );
}
