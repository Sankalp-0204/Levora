import { Metadata } from "next";
import { notFound } from "next/navigation";
import { WATCH_PLACEHOLDERS } from "@/lib/constants/collection";
import { getWatchDetailBySlug } from "@/lib/constants/watchDetail";

import { HeroSection } from "@/components/watchDetail/HeroSection";
import { CinematicChapter } from "@/components/story/CinematicChapter";
import { MediaAsset } from "@/components/story/MediaLayer";
import { DialTransformationSection } from "@/components/watchDetail/DialTransformationSection";
import { TechnicalArchitectureSection } from "@/components/watchDetail/TechnicalArchitectureSection";
import { AtelierCraftsmenSection } from "@/components/watchDetail/AtelierCraftsmenSection";
import { MovementShowcaseSection } from "@/components/watchDetail/MovementShowcaseSection";
import { OwnershipPhilosophySection } from "@/components/watchDetail/OwnershipPhilosophySection";
import { PrivateSalonCTA } from "@/components/watchDetail/PrivateSalonCTA";

// ─────────────────────────────────────────────────────────────────────────────
// NEXT.JS ROUTING & METADATA
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.values(WATCH_PLACEHOLDERS).map((watch) => ({
    slug: watch.id.toLowerCase().replace(/_/g, "-"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const watch = Object.values(WATCH_PLACEHOLDERS).find(
    (w) => w.id === slug.toUpperCase().replace(/-/g, "_")
  );

  if (!watch) {
    return {
      title: "Watch Not Found | Levora",
    };
  }

  return {
    title: `${watch.defaultName} | Levora Heritage Collection`,
    description: `Discover the ${watch.defaultName}, a limited edition of 7 pieces preserving the ${watch.artworkTitle} tradition.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default async function WatchDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const baseWatch = Object.values(WATCH_PLACEHOLDERS).find(
    (w) => w.id === slug.toUpperCase().replace(/-/g, "_")
  );
  
  const editorialContent = getWatchDetailBySlug(slug);

  if (!baseWatch || !editorialContent) {
    notFound();
  }

  // Determine motion type based on watch ID
  let motionType: "warli" | "pattachitra" | "chand_baori" | "bidriware" | undefined = undefined;
  if (baseWatch.id === "HERITAGE_03") motionType = "warli";
  else if (baseWatch.id === "HERITAGE_04") motionType = "pattachitra";
  else if (baseWatch.id === "HERITAGE_01") motionType = "chand_baori";
  else if (baseWatch.id === "HERITAGE_07") motionType = "bidriware";

  const chapterAsset: MediaAsset = motionType
    ? { type: "heritage-motion", motionType, alt: `${baseWatch.artworkTitle} heritage motion` }
    : { type: "svg", svgContent: `<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#111" /></svg>`, alt: "Background" };

  const chapterSteps = editorialContent.artworkOriginBody.map((paragraph, idx) => ({
    id: `origin-step-${idx}`,
    eyebrow: idx === 0 ? editorialContent.artworkRegion : undefined,
    headline: idx === 0 ? editorialContent.artworkOriginTitle : "",
    body: paragraph,
  }));

  return (
    <main className="bg-surface-base text-ink-white min-h-screen">
      {/* 1. Hero */}
      <HeroSection
        eyebrow={editorialContent.heroEyebrow}
        title={baseWatch.defaultName}
        quote={editorialContent.heroQuote}
      />

      {/* 2. Cinematic Chapter (Replaces Origin & Lesson to avoid presentation deck) */}
      <CinematicChapter
        id="artwork-origin"
        backgroundAsset={chapterAsset}
        steps={chapterSteps}
      />

      {/* 4. Dial Transformation */}
      <DialTransformationSection
        transformationQuote={baseWatch.dialTransformation || ""}
      />

      {/* 5. Technical Architecture */}
      <TechnicalArchitectureSection watch={baseWatch} />

      {/* 6. Atelier Craftsmen */}
      <AtelierCraftsmenSection craftsmen={editorialContent.craftsmen} />

      {/* 7. Movement Showcase */}
      <MovementShowcaseSection content={editorialContent} />

      {/* 8. Ownership Philosophy (Limited Edition) */}
      <OwnershipPhilosophySection content={editorialContent} />

      {/* 9. Private Salon CTA */}
      <PrivateSalonCTA
        invitationCopy={editorialContent.salonInvitation}
        watchName={baseWatch.defaultName}
      />
    </main>
  );
}
