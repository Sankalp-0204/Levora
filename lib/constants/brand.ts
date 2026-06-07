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
