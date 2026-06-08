/**
 * @file app/page.tsx
 * @description Levora homepage — Server Component.
 *
 * Sprint 2C Phase 4 — Layout Foundation.
 *
 * Container system applied to all sections via layout.css utilities:
 *   .container-bleed  — full-width, no padding (hero, full-bleed sections)
 *   .container-stage  — max 1440px (storytelling stages)
 *   .container-content — max 1280px (content grids, salon)
 *
 * Spacing system applied via layout.css utilities:
 *   .section-pad-sm / .section-pad-md / .section-pad-lg / .section-pad-xl
 *
 * Hero layout:
 *   Desktop: two-column (DynamicVideo left, headline + tagline right)
 *   Mobile:  single-column stacked (video top, headline below)
 *
 * Architecture reference: docs/HOMEPAGE_ARCHITECTURE.md
 * Design system reference: docs/DESIGN_SYSTEM.md
 *
 * SEO:
 *   - Exports `metadata` using Next.js Metadata API.
 *   - Injects Organization JSON-LD schema via <script>.
 *   - Single <h1> in Section 01 (The Threshold) only.
 *   - Each section has an <h2> with matching aria-labelledby.
 *
 * Section order:
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
      {/* ── JSON-LD Organization schema ──────────────────────────────── */}
      {/*
       * Injected into the document <head> at render time.
       * See: HOMEPAGE_ARCHITECTURE.md §6.2
       */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getOrganizationJsonLd() }}
      />

      <main id="main-content" aria-label="Levora homepage">

        {/* ════════════════════════════════════════════════════════════
            SECTION 01 — THE THRESHOLD
            Viewport: 100dvh | Anchor: #threshold
            Layout: Full-bleed. Two-column on desktop (video | text).
                    Single-column stacked on mobile (video bg | text centered).
            Container: .container-bleed (full width, no padding)
            ════════════════════════════════════════════════════════ */}
        <section
          id="threshold"
          aria-labelledby="threshold-heading"
          data-section="threshold"
          data-gsap-section="01"
          style={{
            position: "relative",
            minHeight: "100dvh",
            display: "flex",
            alignItems: "stretch",
            overflow: "hidden",
            /* Offset for fixed header */
            paddingTop: "var(--nav-height-default)",
          }}
        >
          {/*
           * DynamicVideo: absolute-positioned behind all content.
           * src and posterSrc will be supplied once video assets are available.
           * GSAP integration: data-gsap="threshold-video" in DynamicVideo.tsx
           */}
          <DynamicVideo
            accessibleLabel="An ambient video showing light moving across handcrafted watch materials, evoking Indian heritage and horological craftsmanship."
          />

          {/*
           * Hero content — sits above the video overlay (z-index: 1).
           * Desktop: 2-column grid (video frame | headline block).
           * Mobile: single column, content centered.
           */}
          <div
            className="container-stage threshold-grid"
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr",
              alignItems: "center",
              width: "100%",
              gap: "0",
            }}
          >
            {/* ── Left column: decorative frame (desktop only) ─────── */}
            <div
              className="threshold-video-col"
              aria-hidden="true"
              style={{ display: "none" }}
            >
              {/*
               * Framing element — a thin gold-bordered rectangle that
               * references the watch bezel form. No content; purely aesthetic.
               * Sprint 3 upgrade: may host a layered watch silhouette.
               */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3 / 4",
                  border: "0.5px solid var(--color-gold-400)",
                  borderRadius: "var(--radius-xl)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--gradient-gold-glow)",
                  }}
                />
              </div>
            </div>

            {/* ── Right column (or full-width on mobile): headline ─── */}
            <div
              className="threshold-headline-col"
              aria-label="Threshold headline"
              data-gsap="threshold-headline"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "4rem var(--space-nav-px)",
                gap: "1.5rem",
              }}
            >
              {/* Section eyebrow */}
              <span className="type-section-label" aria-hidden="true">
                Heritage · Horology · India
              </span>

              {/* Single h1 on this page */}
              <h1
                id="threshold-heading"
                className="type-hero-display"
                style={{ margin: 0 }}
              >
                {BRAND_IDENTITY.headline}
              </h1>

              <p
                aria-label="Brand tagline"
                className="type-narrative-lead prose-centered"
                style={{ textAlign: "center" }}
              >
                {BRAND_IDENTITY.tagline}
              </p>

              {/* Scroll indicator */}
              <div
                aria-label="Scroll to explore"
                aria-hidden="true"
                data-scroll-indicator="true"
                role="presentation"
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  className="type-section-label"
                  style={{ letterSpacing: "0.2em", color: "var(--color-text-muted)" }}
                >
                  Scroll
                </span>
                <span
                  style={{
                    color: "var(--color-gold-400)",
                    fontSize: "1rem",
                    display: "block",
                  }}
                >
                  ↓
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 02 — THE DIAL REVELATION
            Viewport: 300vh (GSAP pinned in Sprint 3)
            Container: .container-stage | Padding: .section-pad-xl
            ════════════════════════════════════════════════════════ */}
        <section
          id="dial-revelation"
          aria-labelledby="dial-revelation-heading"
          data-section="dial-revelation"
          data-gsap-section="02"
          className="section-pad-xl"
          style={{ backgroundColor: "var(--color-void-200)" }}
        >
          <div className="container-stage">
            {/* Section eyebrow */}
            <span className="type-section-label" style={{ display: "block", marginBottom: "1rem" }}>
              Craftsmanship
            </span>

            <h2
              id="dial-revelation-heading"
              className="type-section-heading"
              style={{ marginBottom: "1rem" }}
            >
              The Anatomy of a Dial
            </h2>

            <p aria-label="Dial revelation description" className="type-body" style={{ marginBottom: "3rem" }}>
              Every layer of the {WATCH_PLACEHOLDERS.HERITAGE_01.defaultName} is a
              deliberate act of craftsmanship.
            </p>

            {/*
             * LayeredRenderer: placeholder for the GSAP scroll-pinned explosion.
             * GSAP integration: data-gsap="dial-revelation" in LayeredRenderer.tsx
             * Sprint 3: lib/gsap/dialReveal.ts wired here.
             */}
            <LayeredRenderer
              watchId={WATCH_PLACEHOLDERS.HERITAGE_01.id}
              layers={DIAL_REVELATION_LAYERS.map((l) => ({ ...l }))}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 03 — CHRONOLOGY OF DYNASTIES
            Viewport: 200vh | Container: .container-stage
            Padding: .section-pad-lg
            ════════════════════════════════════════════════════════ */}
        <section
          id="chronology"
          aria-labelledby="chronology-heading"
          data-section="chronology"
          data-gsap-section="03"
          className="section-pad-lg"
          style={{
            backgroundColor: "var(--color-void-300)",
            overflow: "hidden",
          }}
        >
          <div className="container-stage">
            {/* Section eyebrow */}
            <span className="type-section-label" style={{ display: "block", marginBottom: "1rem" }}>
              Heritage Timeline
            </span>

            <h2
              id="chronology-heading"
              className="type-section-heading"
              style={{ marginBottom: "1rem" }}
            >
              Chronology of Dynasties
            </h2>

            <p aria-label="Chronology description" className="type-body" style={{ marginBottom: "3rem" }}>
              Seven eras. Seven art forms. Seven timepieces.
            </p>

            {/*
             * StoryScroller: horizontal era timeline (GSAP-ready).
             * Sprint 3: lib/gsap/chronologyScroll.ts wired here.
             */}
            <StoryScroller />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 04 — THE ATELIER
            Viewport: auto | Container: .container-content
            Padding: .section-pad-lg
            ════════════════════════════════════════════════════════ */}
        <section
          id="atelier"
          aria-labelledby="atelier-heading"
          data-section="atelier"
          data-gsap-section="04"
          className="section-pad-lg"
          style={{ backgroundColor: "var(--color-void-200)" }}
        >
          <div className="container-content">
            {/* Section eyebrow */}
            <span className="type-section-label" style={{ display: "block", marginBottom: "1rem" }}>
              The Craft
            </span>

            <h2
              id="atelier-heading"
              className="type-section-heading"
              style={{ marginBottom: "3rem" }}
            >
              The Atelier
            </h2>

            {/*
             * Editorial grid — image + spec panel pairs.
             * Sprint 3: Next.js <Image> assets + GSAP reveal.
             * data-atelier-panel on each block for GSAP hook.
             */}
            <div
              aria-label="Craftsmanship showcase"
              data-atelier-grid="true"
              className="atelier-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "4rem",
              }}
            >
              {BRAND_PHILOSOPHIES.map((philosophy, index) => (
                <div
                  key={philosophy.title}
                  data-atelier-panel={index}
                  aria-label={philosophy.title}
                  className="atelier-panel"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "2rem",
                    alignItems: "center",
                  }}
                >
                  {/* Image placeholder */}
                  <div
                    aria-hidden="true"
                    data-placeholder={`atelier-image-${index}`}
                    role="presentation"
                    style={{
                      aspectRatio: "16 / 9",
                      backgroundColor: "var(--color-void-400)",
                      borderRadius: "var(--radius-lg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      border: "0.5px solid var(--color-ink-100)",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--gradient-gold-glow)",
                        pointerEvents: "none",
                      }}
                    />
                    <span
                      className="type-metadata"
                      style={{ position: "relative", zIndex: 1, color: "var(--color-text-muted)" }}
                    >
                      [ Atelier image {index + 1} placeholder ]
                    </span>
                  </div>

                  {/* Spec panel */}
                  <div
                    aria-label="Craftsmanship specification"
                    style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                  >
                    <span className="type-section-label">Philosophy {String(index + 1).padStart(2, "0")}</span>
                    <h3
                      className="type-card-heading"
                      style={{ margin: 0 }}
                    >
                      {philosophy.title}
                    </h3>
                    <div
                      style={{
                        width: "2rem",
                        height: "1px",
                        backgroundColor: "var(--color-gold-400)",
                      }}
                      aria-hidden="true"
                    />
                    <p
                      className="type-body"
                      style={{ margin: 0 }}
                    >
                      {philosophy.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atelier responsive grid */}
          <style>{`
            @media (min-width: 768px) {
              .atelier-panel {
                grid-template-columns: 1fr 1fr !important;
              }
              .atelier-panel:nth-child(even) > div:first-child {
                order: 2;
              }
              .atelier-panel:nth-child(even) > div:last-child {
                order: 1;
              }
            }
          `}</style>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 05 — THE COLLECTION
            Viewport: auto | Container: .container-stage
            Padding: .section-pad-md
            ════════════════════════════════════════════════════════ */}
        <section
          id="collection"
          aria-labelledby="collection-heading"
          data-section="collection"
          className="section-pad-md"
          style={{ backgroundColor: "var(--color-void-300)" }}
        >
          <div
            className="container-stage"
            style={{ marginBottom: "2.5rem" }}
          >
            {/* Section eyebrow */}
            <span className="type-section-label" style={{ display: "block", marginBottom: "1rem" }}>
              Heritage Collection
            </span>

            <h2
              id="collection-heading"
              className="type-section-heading"
              style={{ marginBottom: "1rem" }}
            >
              Heritage Collection
            </h2>

            <p aria-label="Collection description" className="type-body">
              Seven timepieces. Each a strictly numbered edition.
            </p>
          </div>

          {/*
           * Slider: drag-enabled carousel wrapping WatchContainer cards.
           * Sprint 3: active card tracking, scroll-snap, drag gesture.
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

        {/* ════════════════════════════════════════════════════════════
            SECTION 06 — THE PRIVATE SALON
            Viewport: 80vh | Container: .container-content
            Padding: .section-pad-md
            ════════════════════════════════════════════════════════ */}
        <section
          id="salon"
          aria-labelledby="salon-heading"
          data-section="salon"
          className="section-pad-md"
          style={{
            backgroundColor: "var(--color-void-200)",
            display: "flex",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <div
            className="container-content"
            style={{ width: "100%" }}
          >
            <div
              style={{
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              {/*
               * GlassCard: glassmorphic container for the salon invite block.
               * Uses .glass-dark via the GlassCard component.
               */}
              <GlassCard ariaLabel="Private salon invitation" variant="dark">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "1.5rem",
                    padding: "1rem",
                  }}
                >
                  {/* Section eyebrow */}
                  <span className="type-section-label">
                    By Invitation Only
                  </span>

                  <h2
                    id="salon-heading"
                    className="type-section-heading"
                    style={{ margin: 0 }}
                  >
                    The Private Salon
                  </h2>

                  <p
                    aria-label="Salon invitation copy"
                    className="type-narrative-lead prose-centered"
                    style={{ textAlign: "center" }}
                  >
                    By Invitation. Request a private showing with a Levora
                    horology specialist.
                  </p>

                  <address
                    aria-label="Levora salon address"
                    style={{
                      fontStyle: "normal",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span className="type-body">
                      {SALON_CONTACT_INFO.address.salonName}
                    </span>
                    <span className="type-body">
                      {SALON_CONTACT_INFO.address.city},{" "}
                      {SALON_CONTACT_INFO.address.state}
                    </span>
                    <span className="type-metadata">
                      {SALON_CONTACT_INFO.supportHours}
                    </span>
                  </address>

                  {/*
                   * CTA Button — triggers ConciergeInquiryModal (Sprint 7).
                   * Sprint 3: form submission writes to Firestore inquiries.
                   */}
                  <div style={{ marginTop: "0.5rem" }}>
                    <Button
                      type="button"
                      aria-label="Request a private consultation with a Levora horology specialist"
                      variant="primary"
                    >
                      Request Private Consultation
                    </Button>
                  </div>

                  {/*
                   * ConciergeInquiryModal placeholder.
                   * Sprint 7: Modal.tsx with InquiryForm (types/inquiry.ts).
                   */}
                  <div
                    aria-label="Concierge inquiry modal — placeholder"
                    data-placeholder="concierge-modal"
                    hidden
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="concierge-modal-heading"
                  >
                    <h2
                      id="concierge-modal-heading"
                      className="type-section-heading"
                    >
                      Request a Private Consultation
                    </h2>
                    {/* InquiryForm added in Sprint 7 */}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

      </main>

      {/* ── Responsive CSS for homepage sections ─────────────────────── */}
      <style>{`
        /* Hero: two-column on desktop */
        @media (min-width: 1024px) {
          .threshold-grid {
            grid-template-columns: 1fr 1fr !important;
            min-height: calc(100dvh - var(--nav-height-default));
          }
          .threshold-video-col {
            display: flex !important;
            align-items: center;
            justify-content: center;
            padding: var(--space-nav-px);
          }
          .threshold-headline-col {
            align-items: flex-start !important;
            text-align: left !important;
          }
          .threshold-headline-col .prose-centered {
            margin-left: 0 !important;
            margin-right: auto !important;
            text-align: left !important;
          }
        }
        /* Atelier: 2-column on tablet+ */
        @media (min-width: 768px) {
          .atelier-grid {
            grid-template-columns: 1fr !important;
            gap: 5rem !important;
          }
        }
      `}</style>
    </>
  );
}
