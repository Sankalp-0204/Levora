/**
 * @file types/watch.ts
 * @description Watch domain model — the core entity of the Levora platform.
 *
 * Design decisions:
 *
 * 1. POLYMORPHIC RENDER SCHEMA
 *    The Watch schema is intentionally polymorphic: the same type supports
 *    three distinct viewer modes (static, layered, 3D) controlled by the
 *    `renderType` discriminant field. The `WatchContainer` component reads
 *    this field at runtime and mounts the correct renderer.
 *
 *    This means no code changes are needed when a watch's render mode changes.
 *    The admin updates the Firestore document; the front-end adapts.
 *
 * 2. PLACEHOLDER IDS
 *    All seven watches use internal placeholder identifiers (HERITAGE_01–07).
 *    This decouples the front-end routing and asset loading from the final
 *    watch names, which are resolved dynamically from Firestore. The site can
 *    be built and demoed with mock data before final creative decisions are made.
 *
 * 3. PRICE IN MINOR UNITS
 *    Prices are stored as integers in minor units (paise for INR).
 *    ₹2,85,000 → 28500000 paise. This avoids floating-point rounding errors
 *    in financial data and matches industry standards (Stripe, Razorpay).
 *
 * Firestore path: /watches/{watchId}
 */

import type { WatchId, CollectionId, StoryId, AuditFields, Slug, CurrencyCode } from "./common";
import type { WatchAssetBundle } from "./media";

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER WATCH IDS — Sprint 1 identifiers
//
// These are string literal union types, not just `string`, so the compiler
// can catch typos and guarantee only valid IDs are used in routing and
// database queries.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The seven placeholder watch identifiers for the Heritage Collection.
 * These are used as Firestore document IDs, route slugs (after transformation),
 * and asset path prefixes.
 *
 * When the final watch names are decided, update `WatchDocument.name` and
 * `WatchDocument.slug` in Firestore — this constant remains stable as the
 * permanent internal identifier.
 */
export type HeritageWatchId =
  | "HERITAGE_01"
  | "HERITAGE_02"
  | "HERITAGE_03"
  | "HERITAGE_04"
  | "HERITAGE_05"
  | "HERITAGE_06"
  | "HERITAGE_07";

/**
 * Exhaustive tuple of all Heritage watch IDs.
 * Used for iteration (generating static paths, seeding mock data).
 */
export const HERITAGE_WATCH_IDS: readonly HeritageWatchId[] = [
  "HERITAGE_01",
  "HERITAGE_02",
  "HERITAGE_03",
  "HERITAGE_04",
  "HERITAGE_05",
  "HERITAGE_06",
  "HERITAGE_07",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// RENDER TYPE — Discriminant for the polymorphic asset schema
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Controls which renderer component `WatchContainer` mounts.
 *
 * "static"  → StaticRenderer (Next.js Image, zoom on hover)
 * "layered" → LayeredRenderer (GSAP scroll-driven dial layer separation)
 * "3d"      → ModelRenderer  (React Three Fiber GLB viewer, lazy-loaded)
 */
export type RenderType = "static" | "layered" | "3d";

// ─────────────────────────────────────────────────────────────────────────────
// CHECKOUT TYPE — Controls purchase flow
// ─────────────────────────────────────────────────────────────────────────────

/**
 * "concierge_inquiry"  → Opens the ConciergeInquiryModal. No direct purchase.
 *                        Leads go to the /orders collection as inquiries.
 *                        Used for all Heritage collection models.
 *
 * "direct_checkout"    → Standard e-commerce cart flow. Reserved for future use.
 */
export type CheckoutType = "concierge_inquiry" | "direct_checkout";

// ─────────────────────────────────────────────────────────────────────────────
// AVAILABILITY STATUS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Current availability status of a watch.
 * Computed from `stock` at the database layer, but stored as a
 * denormalised field for fast UI rendering without re-computation.
 */
export type WatchAvailability =
  | "available"       // In stock, can be inquired / purchased
  | "limited"         // Low stock (stock <= 2)
  | "sold_out"        // stock === 0; inquiry form still accessible
  | "coming_soon"     // Not yet released; visible but not purchasable
  | "discontinued";   // No longer produced; archive/museum listing

// ─────────────────────────────────────────────────────────────────────────────
// WATCH SPECIFICATIONS — Physical and mechanical attributes
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Technical specifications for a watch model.
 * Displayed in the specification table on the watch detail page.
 * All values are human-readable strings (not structured numbers) to allow
 * flexible, non-uniform spec copy per model.
 */
export interface WatchSpecifications {
  /** Movement calibre. Example: "Swiss ETA 2824-2" / "Proprietary Calibre L98" */
  movement: string;

  /** Case diameter with unit. Example: "40mm" / "38mm" */
  caseDiameter: string;

  /** Case material. Example: "316L Stainless Steel" / "18k Yellow Gold" */
  caseMaterial: string;

  /** Case thickness. Example: "9.5mm" */
  caseThickness: string;

  /** Water resistance rating. Example: "5 ATM" / "50 Metres" */
  waterResistance: string;

  /** Crystal type. Example: "Double-domed Sapphire Crystal, AR-coated" */
  crystal: string;

  /** Power reserve duration. Example: "42 Hours" / "70 Hours" */
  powerReserve: string;

  /** Strap material and clasp type. Example: "Handstitched Alligator, Deployment Clasp" */
  strap: string;

  /**
   * Total number of units produced.
   * Example: "Limited to 7 Pieces" — matches the 7-model Heritage series.
   * Optional because some models may be open-edition.
   */
  limitedEdition?: string;

  /**
   * Dial construction description — the core Levora differentiator.
   * Example: "Laser-cut layered dial; 4 transparent silver layers over
   * hand-applied gold leaf base canvas."
   */
  dialConstruction: string;

  /**
   * Watch weight with unit. Example: "89g with strap"
   */
  weight?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// WATCH — Core domain entity
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A Levora watch model.
 *
 * This is the central entity of the platform. Every page, every animation,
 * every inquiry, and every story traces back to a Watch document.
 *
 * @example
 *   {
 *     id:           "HERITAGE_01" as WatchId,
 *     collectionId: "heritage" as CollectionId,
 *     name:         "Heritage 01 — The Chand Baori",
 *     slug:         "heritage-01",
 *     price:        28500000,   // ₹2,85,000 in paise
 *     currency:     "INR",
 *     stock:        7,
 *     availability: "limited",
 *     isFeatured:   true,
 *     checkoutType: "concierge_inquiry",
 *     renderType:   "layered",
 *     storyIds:     ["story_heritage_01" as StoryId],
 *     ...
 *   }
 */
export interface Watch extends AuditFields {
  /**
   * Internal identifier. One of the 7 Heritage placeholders or a future
   * collection ID. Cast with `as WatchId` when constructing from strings.
   */
  id: WatchId;

  /** The parent collection. Example: "heritage" as CollectionId. */
  collectionId: CollectionId;

  /**
   * Dynamically resolved watch name from Firestore.
   * Front-end code never hardcodes this — always reads from the document.
   * Example: "Heritage 01 — The Chand Baori"
   */
  name: string;

  /**
   * URL-friendly slug for the watch detail route.
   * Route: /watch/[slug]
   * Example: "heritage-01" → /watch/heritage-01
   */
  slug: Slug;

  /**
   * Short one-line descriptor for listing cards and meta descriptions.
   * Example: "A tribute to the geometry of Chand Baori stepwell."
   */
  tagline: string;

  /**
   * Price in the currency's minor units.
   * INR: stored in paise (1 INR = 100 paise).
   * Example: ₹2,85,000 → 28500000
   * Format for display using Intl.NumberFormat in the UI layer.
   */
  price: number;

  /** ISO 4217 currency code. Default: "INR". */
  currency: CurrencyCode;

  /**
   * Number of units available.
   * Decremented by Server Actions on confirmed order/inquiry.
   * 0 = sold_out (inquiry form remains accessible).
   */
  stock: number;

  /**
   * Denormalised availability status.
   * Derived from `stock` but stored for O(1) listing-page rendering.
   * Must be updated by a Firestore trigger when `stock` changes.
   */
  availability: WatchAvailability;

  /**
   * When true, this watch appears in the homepage featured section
   * and is promoted in collection listings.
   */
  isFeatured: boolean;

  /**
   * Controls the purchase / inquiry flow.
   * All Heritage Collection models use "concierge_inquiry".
   */
  checkoutType: CheckoutType;

  /**
   * Determines which renderer component is mounted.
   * The `WatchContainer` component reads this and mounts:
   *   "static"  → StaticRenderer
   *   "layered" → LayeredRenderer
   *   "3d"      → ModelRenderer (dynamically imported)
   */
  renderType: RenderType;

  /**
   * References to connected Story documents.
   * A watch may be linked to multiple cultural narratives.
   * Example: ["story_heritage_01" as StoryId]
   */
  storyIds: StoryId[];

  /** Technical specifications displayed on the detail page. */
  specifications: WatchSpecifications;

  /** All media assets for this watch (images, video, layers, 3D model). */
  assets: WatchAssetBundle;

  /**
   * SEO meta description for the /watch/[slug] page.
   * Populated by the admin. Exported via `generateMetadata` in the page.
   */
  metaDescription: string;

  /**
   * Display order within the collection.
   * Determines card position in the collection grid and slider.
   */
  order: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// WATCH SUMMARY — Lightweight projection for listing pages
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A minimal watch projection used in collection listing grids and
 * the homepage featured carousel. Avoids fetching full spec and asset bundles.
 *
 * Derived from Watch via `Pick` — automatically stays in sync with the
 * parent interface without manual duplication.
 */
export type WatchSummary = Pick<
  Watch,
  | "id"
  | "collectionId"
  | "name"
  | "slug"
  | "tagline"
  | "price"
  | "currency"
  | "availability"
  | "isFeatured"
  | "renderType"
  | "order"
> & {
  /** Static hero image URL only — no full WatchAssetBundle needed in listings. */
  heroImageUrl: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// SERVER ACTION PAYLOADS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Payload for creating a new watch via Admin Server Action.
 * `id` is provided explicitly (one of HERITAGE_WATCH_IDS or a future ID).
 * `createdAt`/`updatedAt` are set server-side via FieldValue.serverTimestamp().
 */
export type CreateWatchPayload = Omit<Watch, "createdAt" | "updatedAt">;

/**
 * Payload for updating an existing watch.
 * All fields are optional. `id` and `createdAt` are immutable.
 */
export type UpdateWatchPayload = Partial<
  Omit<Watch, "id" | "createdAt" | "updatedAt">
>;
