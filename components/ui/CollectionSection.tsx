"use client";

/**
 * @file components/ui/CollectionSection.tsx
 * @description Client wrapper for Section 05 — The Collection.
 *
 * Sprint 2C Phase 5 — Collection Experience.
 *
 * Owns the CollectionTier state and conditionally renders Heritage or
 * Signature sliders. Keeps app/page.tsx as a pure Server Component.
 *
 * Heritage slider  → ORDERED_WATCH_PLACEHOLDERS (7 watches)
 * Signature slider → ORDERED_SIGNATURE_WATCH_PLACEHOLDERS (2 Coming Soon cards)
 *
 * All CTA buttons are no-op placeholders — no commerce logic.
 *
 * Responsive:
 *   Mobile  (<768px)  : 85vw card width, touch swipe
 *   Tablet  (768–1023): 48vw card width, trackpad/touch
 *   Desktop (≥1024px) : 30vw card width, max 340px, trackpad scroll
 *
 * Accessibility:
 *   - CollectionToggle uses role="tablist" + role="tab" + aria-controls
 *   - Each Slider panel has role="region" + matching id
 *   - Inactive slider panel has aria-hidden="true"
 */

import { useState } from "react";
import CollectionToggle, {
  type CollectionTier,
} from "@/components/ui/CollectionToggle";
import Slider from "@/components/ui/Slider";
import WatchContainer from "@/components/watch/WatchContainer";
import {
  ORDERED_WATCH_PLACEHOLDERS,
  ORDERED_SIGNATURE_WATCH_PLACEHOLDERS,
} from "@/lib/constants/collection";

export default function CollectionSection() {
  const [activeTier, setActiveTier] = useState<CollectionTier>("heritage");

  return (
    <div data-component="collection-section">
      {/* ── Tier toggle ──────────────────────────────────────────────────── */}
      <div className="container-stage" style={{ paddingBottom: 0 }}>
        <CollectionToggle
          activeTier={activeTier}
          onChange={setActiveTier}
        />
      </div>

      {/* ── Heritage slider panel ─────────────────────────────────────────── */}
      <div
        role="tabpanel"
        id="collection-panel-heritage"
        aria-labelledby="collection-tab-heritage"
        aria-hidden={activeTier !== "heritage"}
        hidden={activeTier !== "heritage"}
      >
        <Slider
          ariaLabel="Heritage Collection — seven limited edition timepieces"
          panelId="collection-panel-heritage"
        >
          {ORDERED_WATCH_PLACEHOLDERS.map((watch, index) => (
            <WatchContainer
              key={watch.id}
              watchId={watch.id}
              watchName={watch.defaultName}
              tagline={watch.tagline}
              slug={watch.slug}
              renderType="static"
              isActive={index === 0}
              checkoutType="concierge_inquiry"
            />
          ))}
        </Slider>
      </div>

      {/* ── Signature Coming Soon slider panel ───────────────────────────── */}
      <div
        role="tabpanel"
        id="collection-panel-signature"
        aria-labelledby="collection-tab-signature"
        aria-hidden={activeTier !== "signature"}
        hidden={activeTier !== "signature"}
      >
        <Slider
          ariaLabel="Signature Collection — coming soon"
          panelId="collection-panel-signature"
        >
          {ORDERED_SIGNATURE_WATCH_PLACEHOLDERS.map((watch, index) => (
            <WatchContainer
              key={watch.id}
              watchId={watch.id}
              watchName={watch.defaultName}
              tagline={watch.tagline}
              slug={watch.slug}
              renderType="static"
              isActive={index === 0}
              checkoutType="direct_checkout"
              isComingSoon
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
