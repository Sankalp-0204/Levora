/**
 * @file lib/constants/collection.ts
 * @description Collection and timepiece configuration constants for Levora.
 *
 * Defines static metadata for watch collections and mapping references for
 * the seven placeholder watches (HERITAGE_01 through HERITAGE_07). Used to
 * configure fallback specs, assets paths, and collection themes prior to
 * database hydration.
 *
 * Sprint 2C Phase 6 — Atelier + Chronology Experience.
 * Added 5 optional narrative fields to StaticWatchPlaceholder:
 *   artworkTitle      — Part 1: the name of the artwork / art form
 *   artworkSubtitle   — Part 1: poetic subtitle of the artwork
 *   eraPeriod         — Part 2: century + region label
 *   storyContext      — Parts 2+3: historical context + moral (2–3 sentences)
 *   dialTransformation — Part 4: how the art became the dial (1 sentence)
 * All fields are optional (?: string) so existing consumers are unaffected.
 * Sprint 3: these become required when Firestore Watch type hydrates.
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
  // ── Sprint 2C Phase 6: Chronology 4-part narrative fields ──────────────
  /** Part 1 — The artwork name, rendered as the card h3 heading. */
  artworkTitle?: string;
  /** Part 1 — Poetic subtitle of the artwork. Italic, muted. */
  artworkSubtitle?: string;
  /** Part 2 — Century + Indian region label. e.g. "8th Century · Rajputana" */
  eraPeriod?: string;
  /** Parts 2 + 3 — Historical context flowing into the moral/message. 2–3 sentences. */
  storyContext?: string;
  /** Part 4 — How the art form became a watch dial. 1 sentence, italic. */
  dialTransformation?: string;
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
    defaultName: "Chand Baori",
    tagline: "The Geometry of Eternity",
    defaultPrice: 28500000, // ₹2,85,000.00
    order: 1,
    artworkTitle: "Chand Baori",
    artworkSubtitle: "The Geometry of Eternity",
    eraPeriod: "8th Century · Rajputana",
    storyContext:
      "Commissioned by King Chanda of the Nikumbha dynasty, Chand Baori descends 30 metres into the earth across 3,500 hand-cut steps — the largest stepwell ever constructed. It was not built for utility alone. It was built to worship the mathematics of water, light, and time.",
    dialTransformation:
      "The stepwell's descending geometric rings are laser-etched into the brass base plate — each concentric layer of the dial mirrors one tier of the ancient structure.",
  },
  HERITAGE_02: {
    id: "HERITAGE_02",
    slug: "heritage-02",
    defaultName: "Pichwai",
    tagline: "The Temple Behind the Idol",
    defaultPrice: 32000000, // ₹3,20,000.00
    order: 2,
    artworkTitle: "Pichwai",
    artworkSubtitle: "The Temple Behind the Idol",
    eraPeriod: "17th Century · Nathdwara",
    storyContext:
      "Pichwai paintings served as the backdrop of the deity Shrinathji in the Nathdwara temple — devotional art created exclusively for sacred use, never for commerce. The Pichwai artist did not sign his name. He signed with devotion. This is the oldest definition of mastery.",
    dialTransformation:
      "Miniature Pichwai lotuses and Shrinathji motifs are hand-applied in micro-enamel across the dial surface using traditional Minakari techniques from Jaipur.",
  },
  HERITAGE_03: {
    id: "HERITAGE_03",
    slug: "heritage-03",
    defaultName: "Warli",
    tagline: "The Mathematics of the Village",
    defaultPrice: 35000000, // ₹3,50,000.00
    order: 3,
    artworkTitle: "Warli",
    artworkSubtitle: "The Mathematics of the Village",
    eraPeriod: "3,000 Years · Maharashtra",
    storyContext:
      "The Warli people of Maharashtra have painted on mud walls using only rice paste and a bamboo stick for over three thousand years. No perspective — only geometry. A circle is the sun, the moon, and the cycle of life. Warli asks: what is the minimum needed to say everything?",
    dialTransformation:
      "Warli geometric figures — circles, triangles, and squares — are silver-etched onto a hand-patinated brass canvas, transforming the dial face into a living village tableau.",
  },
  HERITAGE_04: {
    id: "HERITAGE_04",
    slug: "heritage-04",
    defaultName: "Pattachitra",
    tagline: "The Scroll That Never Ends",
    defaultPrice: 29500000, // ₹2,95,000.00
    order: 4,
    artworkTitle: "Pattachitra",
    artworkSubtitle: "The Scroll That Never Ends",
    eraPeriod: "12th Century · Odisha",
    storyContext:
      "Pattachitra Chitrakars were the temple artists of 12th century Odisha, binding natural pigments with the gum of the wood apple tree to paint the cosmology of Jagannath across treated cloth. In Pattachitra, empty space is considered an error. Every millimetre must be filled with divine narrative; the border of the canvas is as sacred as its centre.",
    dialTransformation:
      "The traditional floral borders are hand-painted in miniature lacquer, framing a central dial of 22-karat gold leaf where the Pattachitra narrative is applied using a sealed micro-pigment transfer technique.",
  },
  HERITAGE_05: {
    id: "HERITAGE_05",
    slug: "heritage-05",
    defaultName: "Tanjore",
    tagline: "Gold Speaks When Words Cannot",
    defaultPrice: 31000000, // ₹3,10,000.00
    order: 5,
    artworkTitle: "Tanjore",
    artworkSubtitle: "Gold Speaks When Words Cannot",
    eraPeriod: "16th Century · Thanjavur",
    storyContext:
      "Developed under the Nayaka rulers and perfected under the Marathas, Tanjore painting abandons flat canvas in favour of three-dimensional relief, embedding solid gold foil and semi-precious stones directly into the gesso surface. Tanjore does not represent wealth; it is constructed from it. It is devotion rendered in literal weight.",
    dialTransformation:
      "A base layer of hardened limestone paste is built up on the dial plate to create relief, over which 22-karat gold foil is hand-pressed and set with a single cabochon ruby at the 12 o'clock index.",
  },
  HERITAGE_06: {
    id: "HERITAGE_06",
    slug: "heritage-06",
    defaultName: "Madhubani",
    tagline: "Art Born from Ceremony",
    defaultPrice: 38000000, // ₹3,80,000.00
    order: 6,
    artworkTitle: "Madhubani",
    artworkSubtitle: "Art Born from Ceremony",
    eraPeriod: "Ancient · Mithila, Bihar",
    storyContext:
      "First documented during the wedding of Sita as described in the Ramayana, Madhubani was painted by women on the walls of their homes and kept secret from the outside world for millennia. It was a private language — lines and patterns that carried women's stories when no other medium was permitted.",
    dialTransformation:
      "Madhubani fish, peacock, and lotus motifs are reproduced through a hand-guided laser engraving process that precisely mimics the bamboo-and-ink strokes of the original tradition.",
  },
  HERITAGE_07: {
    id: "HERITAGE_07",
    slug: "heritage-07",
    defaultName: "Bidriware",
    tagline: "Darkness as a Canvas",
    defaultPrice: 34000000, // ₹3,40,000.00
    order: 7,
    artworkTitle: "Bidriware",
    artworkSubtitle: "Darkness as a Canvas",
    eraPeriod: "14th Century · Bidar",
    storyContext:
      "Developed in 14th century Bidar by Persian craftsmen under the Bahmani Sultanate, Bidriware fuses Islamic geometric artistry with Indian metalworking. The zinc alloy darkens on contact with air, making the inlaid silver emerge from blackness. The deep beauty of Bidri is inseparable from its darkness.",
    dialTransformation:
      "Pure silver inlay is hand-pressed into laser-cut grooves on a zinc-alloy base plate. Natural oxidation darkens the base over 72 hours — the Bidri technique, unaltered.",
  },
} as const;

/** List of all placeholders ordered by index. */
export const ORDERED_WATCH_PLACEHOLDERS = Object.values(WATCH_PLACEHOLDERS).sort(
  (a, b) => a.order - b.order
);

/** Static metadata for the Signature Collection. */
export const SIGNATURE_COLLECTION_METADATA: StaticCollectionMetadata = {
  id: "signature",
  name: "Signature Collection",
  slug: "signature",
  tagline: "Accessible Luxury, Delivered.",
  description: "A contemporary collection designed for seamless direct acquisition.",
  primaryColor: "#E5E7EB", // Silver/Platinum Accent
  backgroundColor: "#111827", // Cool Slate
} as const;

/**
 * Mapping configuration for Signature placeholder watches.
 */
export const SIGNATURE_WATCH_PLACEHOLDERS: Record<string, StaticWatchPlaceholder> = {
  SIGNATURE_01: {
    id: "SIGNATURE_01" as HeritageWatchId, // Cast to avoid type error
    slug: "signature-01",
    defaultName: "SIGNATURE_01",
    tagline: "SIGNATURE_01_INSPIRATION",
    defaultPrice: 12500000, // ₹1,25,000.00
    order: 1,
  },
  SIGNATURE_02: {
    id: "SIGNATURE_02" as HeritageWatchId,
    slug: "signature-02",
    defaultName: "SIGNATURE_02",
    tagline: "SIGNATURE_02_INSPIRATION",
    defaultPrice: 14500000, // ₹1,45,000.00
    order: 2,
  },
} as const;

/** List of all Signature placeholders ordered by index. */
export const ORDERED_SIGNATURE_WATCH_PLACEHOLDERS = Object.values(SIGNATURE_WATCH_PLACEHOLDERS).sort(
  (a, b) => a.order - b.order
);
