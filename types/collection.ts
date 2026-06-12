/**
 * @file types/collection.ts
 * @description Collection domain model.
 *
 * A Collection is the top-level organisational unit for Levora watch series.
 * The initial collection is "Heritage Collection" (7 models).
 * Future collections (e.g. "Royal Chronographs") are added without code changes
 * by inserting new Firestore documents — the front-end queries dynamically.
 *
 * Firestore path: /collections/{collectionId}
 */

import type { CollectionId, AuditFields, Slug } from "./common";

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION THEME — Per-collection CSS visual overrides
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CollectionTheme holds display-level color overrides used to style the
 * collection showcase page with a distinct aesthetic per series.
 *
 * Values are CSS-compatible hex color strings.
 * Both fields override the global design token defaults only for pages
 * and components scoped to this collection.
 */
export interface CollectionTheme {
  /**
   * Primary accent color for this collection.
   * Overrides the global `--color-gold-400` on collection-scoped pages.
   * Example: "#D4AF37" (gold) for Heritage, "#CCCCCC" (silver) for Royal.
   */
  primaryColor: string;

  /**
   * Ambient background color for the collection showcase hero section.
   * Should be a very dark, desaturated tone consistent with luxury aesthetics.
   * Example: "#0D0E11" (default void-200), "#0F1018" (slightly cooler blue-black)
   */
  backgroundColor: string;

  /**
   * Optional secondary accent used for hover states and highlighted text.
   * Falls back to `primaryColor` if absent.
   */
  accentColor?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A watch Collection — a named series grouping multiple Watch models.
 *
 * @example
 *   {
 *     id:          "heritage" as CollectionId,
 *     name:        "Heritage Collection",
 *     slug:        "heritage",
 *     tagline:     "History, assembled on the wrist.",
 *     description: "Seven dials. Seven dynasties. One unbroken thread of craft.",
 *     theme:       { primaryColor: "#D4AF37", backgroundColor: "#0D0E11" },
 *     order:       1,
 *     isActive:    true,
 *     createdAt:   { seconds: 1700000000, nanoseconds: 0 },
 *     updatedAt:   { seconds: 1700000000, nanoseconds: 0 },
 *   }
 */
export interface Collection extends AuditFields {
  /** Firestore document ID. Example: "heritage", "royal_chronographs". */
  id: CollectionId;

  /** Human-readable series name. Example: "Heritage Collection". */
  name: string;

  /**
   * URL-friendly slug used in routing.
   * Example: "heritage" → /collections/heritage
   */
  slug: Slug;

  /**
   * Defines the primary purchasing workflow for items in this collection.
   * Overrides can exist on individual watches via checkoutType.
   */
  purchaseTier: "concierge" | "direct";

  /**
   * Maximum inventory allowed for this collection.
   * Null indicates open production (e.g. Signature).
   */
  maxInventory: number | null;

  /**
   * Controls visibility of this collection in public listings.
   * Useful for gated/membership-only collections.
   */
  isPubliclyListed: boolean;

  /**
   * Scheduled launch date (ISO string).
   * Used for countdowns and pre-launch gating.
   */
  launchDate: string | null;

  /**
   * One-line luxury subtitle displayed beneath the collection name.
   * Example: "Seven dials. Seven dynasties."
   */
  tagline: string;

  /**
   * Full editorial description of the collection — its cultural inspiration,
   * design philosophy, and heritage background.
   * Supports plain text. Markdown may be introduced in a future sprint.
   */
  description: string;

  /**
   * Cover image URL for the collection card in the collections listing.
   * Reference to an asset URL; full ImageAsset type used at the component level.
   */
  coverImageUrl: string;

  /** Per-collection visual theme overrides. */
  theme: CollectionTheme;

  /**
   * Display order in navigation and listings.
   * Lower number = appears first. Allows reordering without code changes.
   */
  order: number;

  /**
   * Controls whether this collection is visible on the public-facing site.
   * Admin can toggle this to hide unreleased collections.
   */
  isActive: boolean;

  /**
   * Total number of watch models in this collection.
   * Denormalised from the `watches` collection for fast listing rendering.
   * Must be kept in sync by a Firestore Cloud Function on watch create/delete.
   */
  watchCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION SUMMARY — Lightweight card representation
//
// Used in listing grids and navigation dropdowns where the full Collection
// object is not needed. Avoids over-fetching from Firestore.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A lightweight summary of a Collection for use in listing cards,
 * navigation menus, and breadcrumb trails.
 */
export type CollectionSummary = Pick<
  Collection,
  "id" | "name" | "slug" | "tagline" | "coverImageUrl" | "theme" | "order" | "isActive" | "watchCount"
>;

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION CREATE PAYLOAD — Used in Server Actions for admin writes
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Payload for creating a new Collection via a Server Action.
 * `id` is generated server-side. `createdAt`/`updatedAt` are set by
 * the server using `FieldValue.serverTimestamp()`.
 */
export type CreateCollectionPayload = Omit<Collection, "id" | "createdAt" | "updatedAt">;

/**
 * Payload for updating an existing Collection.
 * All fields are optional — partial updates are supported.
 * `id`, `createdAt` are immutable and excluded.
 */
export type UpdateCollectionPayload = Partial<
  Omit<Collection, "id" | "createdAt" | "updatedAt">
>;
