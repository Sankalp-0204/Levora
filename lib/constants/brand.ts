/**
 * @file lib/constants/brand.ts
 * @description Core brand identity constants for Levora.
 *
 * Stores immutable brand-specific attributes such as names, social handles,
 * established dates, taglines, and aesthetic philosophies. Shared across
 * layouts, footers, and institutional pages.
 */

export const BRAND_IDENTITY = {
  name: "Levora",
  legalName: "Levora Horology Private Limited",
  tagline: "Indian Heritage Art Dials",
  headline: "History is not written. It is assembled.",
  philosophy: "Fusing centuries of Indian heritage art forms with high-precision horological craftsmanship.",
  establishedYear: 2026,
  origin: "Geneva & New Delhi",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/levorahorology",
  youtube: "https://youtube.com/@levorahorology",
  pinterest: "https://pinterest.com/levorahorology",
  linkedin: "https://linkedin.com/company/levora-horology",
} as const;

export const BRAND_PHILOSOPHIES = [
  {
    title: "Heritage Conservation",
    description: "Every dial is a micro-canvas dedicated to preserving dying Indian art forms (such as Minakari, Pichwai, and wood inlay).",
  },
  {
    title: "Horological Precision",
    description: "Equipped with high-precision automatic calibres, ensuring that artistic expression meets mechanical excellence.",
  },
  {
    title: "Extreme Rarity",
    description: "Produced in strictly numbered editions. Once a series is closed, it is never re-commissioned.",
  },
] as const;

/**
 * Sprint 2C Phase 6 — Atelier + Chronology Experience.
 *
 * Five craft dimensions that power Section 04 — The Atelier editorial grid.
 * Each dimension reveals one layer of the obsessive Levora craft process,
 * ordered to follow the collector's journey of comprehension:
 *   Artists → Materials → Craft → Precision → Movement
 *
 * This constant is intentionally separate from BRAND_PHILOSOPHIES —
 * it is editorial craft storytelling, not brand philosophy copy.
 *
 * Sprint 3: these will be enriched with real imagery paths (assets.atelierImage)
 * once photography assets are delivered.
 */
export const ATELIER_DIMENSIONS = [
  {
    /** Machine key — used for data-atelier-dimension attribute and data-placeholder keys. */
    dimension: "artists",
    /** Panel h3 heading. */
    title: "The Artists",
    /** Decorative label inside the image placeholder region. aria-hidden. */
    imageLabel: "Master Craftsmen \u00b7 Three Generations",
    /** Primary body copy — 2\u20133 sentences. */
    description:
      "Our artisans are not hired; they are identified within generational craft families. A single Heritage dial requires the collaboration of three distinct masters: the brass engraver, the regional heritage artist (from Puri, Jaipur, or Bidar), and the horology finisher in our Geneva atelier. They do not share a workshop, but they share a singular obsession.",
    /** Spec-level detail — smaller, muted. Reward for close reading. */
    craftDetail:
      "Training under a master begins at age 12. A Levora dial artisan requires a minimum of nine years of apprenticeship before working on a numbered Heritage edition.",
  },
  {
    dimension: "materials",
    title: "The Materials",
    imageLabel: "Sapphire \u00b7 Brass \u00b7 22-Karat Gold",
    description:
      "Double-domed sapphire crystal grown in a single-crystal Verneuil furnace. Hand-patinated brass base plate treated with traditional Bidri oxidation. 22-karat gold leaf sourced from the heritage foil workshops of Patan, Gujarat.",
    craftDetail:
      "The sapphire crystal requires 14 days of precision grinding before it reaches optical clarity. Hardness: 9 on the Mohs scale. Second only to diamond.",
  },
  {
    dimension: "craft",
    title: "The Craft",
    imageLabel: "47 Steps \u00b7 One Dial",
    description:
      "Each Heritage dial undergoes 47 individual assembly steps \u2014 from brass casting to final certification. No adhesives are used in the art application process. Each decorative layer is mechanically bonded using traditional cloisonn\u00e9 and lost-wax binding techniques.",
    craftDetail:
      "Assembly time per dial: 120 to 180 hours depending on the art form. HERITAGE_07 (Bidriware) holds the atelier record at 214 hours \u2014 three weeks of continuous craft.",
  },
  {
    dimension: "precision",
    title: "The Precision",
    imageLabel: "20-Micron Laser \u00b7 Carved by Hand",
    description:
      "A 20-micron fibre laser carves heritage motifs into the brass base plate with surgical accuracy \u2014 reproducing strokes no human hand could achieve at this scale. The laser path is programmed by a master craftsman who traces each original artwork stroke by stroke, before the machine executes it.",
    craftDetail:
      "A single dial face contains between 8,000 and 24,000 individual laser passes. Carving depth is controlled to within 2 microns to preserve the hand-patinated surface beneath.",
  },
  {
    dimension: "movement",
    title: "The Movement",
    imageLabel: "Automatic Calibre \u00b7 72-Hour Reserve",
    description:
      "Beneath the heritage artwork lies a high-beat automatic calibre rated to chronometer standards of \u00b13 seconds per day. The exhibition caseback reveals the mechanical architecture: rhodium-plated bridges, perlage decoration, and a custom tungsten rotor. The art on the dial is Indian; the engine beneath it is strictly Swiss.",
    craftDetail:
      "Each calibre is regulated across five positions for a minimum of 21 days before installation. Power reserve: 72 hours. Service interval: 5 years.",
  },
] as const;
