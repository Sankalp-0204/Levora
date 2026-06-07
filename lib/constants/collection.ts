/**
 * @file lib/constants/collection.ts
 * @description Collection and timepiece configuration constants for Levora.
 *
 * Defines static metadata for watch collections and mapping references for
 * the seven placeholder watches (HERITAGE_01 through HERITAGE_07). Used to
 * configure fallback specs, assets paths, and collection themes prior to
 * database hydration.
 */

import type { HeritageWatchId } from "@/types";

export interface StaticCollectionMetadata {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  primaryColor: string;
  backgroundColor: string;
}

export interface StaticWatchPlaceholder {
  id: HeritageWatchId;
  slug: string;
  defaultName: string;
  tagline: string;
  defaultPrice: number; // in paise
  order: number;
}

/** Static metadata for the initial flagship Heritage Collection. */
export const HERITAGE_COLLECTION_METADATA: StaticCollectionMetadata = {
  id: "heritage",
  name: "Heritage Collection",
  slug: "heritage",
  tagline: "Indian Artistry Transformed into Horology",
  description: "A series of seven unique timepieces, each showcasing a signature Indian craft style on custom-layered dials.",
  primaryColor: "#C5A880", // Gold Accent
  backgroundColor: "#0D0D0D", // Deep Charcoal/Ink Black
} as const;

/**
 * Mapping configuration for the 7 placeholder watches.
 * Used by seeding scripts, fallback routes, and static site generation.
 */
export const WATCH_PLACEHOLDERS: Record<HeritageWatchId, StaticWatchPlaceholder> = {
  HERITAGE_01: {
    id: "HERITAGE_01",
    slug: "heritage-01",
    defaultName: "HERITAGE_01",
    tagline: "HERITAGE_01_INSPIRATION",
    defaultPrice: 28500000, // ₹2,85,000.00
    order: 1,
  },
  HERITAGE_02: {
    id: "HERITAGE_02",
    slug: "heritage-02",
    defaultName: "HERITAGE_02",
    tagline: "HERITAGE_02_INSPIRATION",
    defaultPrice: 32000000, // ₹3,20,000.00
    order: 2,
  },
  HERITAGE_03: {
    id: "HERITAGE_03",
    slug: "heritage-03",
    defaultName: "HERITAGE_03",
    tagline: "HERITAGE_03_INSPIRATION",
    defaultPrice: 35000000, // ₹3,50,000.00
    order: 3,
  },
  HERITAGE_04: {
    id: "HERITAGE_04",
    slug: "heritage-04",
    defaultName: "HERITAGE_04",
    tagline: "HERITAGE_04_INSPIRATION",
    defaultPrice: 29500000, // ₹2,95,000.00
    order: 4,
  },
  HERITAGE_05: {
    id: "HERITAGE_05",
    slug: "heritage-05",
    defaultName: "HERITAGE_05",
    tagline: "HERITAGE_05_INSPIRATION",
    defaultPrice: 31000000, // ₹3,10,000.00
    order: 5,
  },
  HERITAGE_06: {
    id: "HERITAGE_06",
    slug: "heritage-06",
    defaultName: "HERITAGE_06",
    tagline: "HERITAGE_06_INSPIRATION",
    defaultPrice: 38000000, // ₹3,80,000.00
    order: 6,
  },
  HERITAGE_07: {
    id: "HERITAGE_07",
    slug: "heritage-07",
    defaultName: "HERITAGE_07",
    tagline: "HERITAGE_07_INSPIRATION",
    defaultPrice: 34000000, // ₹3,40,000.00
    order: 7,
  },
} as const;

/** List of all placeholders ordered by index. */
export const ORDERED_WATCH_PLACEHOLDERS = Object.values(WATCH_PLACEHOLDERS).sort(
  (a, b) => a.order - b.order
);
