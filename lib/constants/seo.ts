/**
 * @file lib/constants/seo.ts
 * @description SEO and metadata constants for Levora.
 *
 * Defines site-wide default metadata configs, OpenGraph parameters,
 * Twitter card options, fallback keywords, and Structured Data (JSON-LD)
 * schemas for Next.js layout metadata.
 */

import { BRAND_IDENTITY } from "./brand";

export const SITE_URL = "https://levora.in";

export const SEO_DEFAULTS = {
  titleTemplate: `%s | ${BRAND_IDENTITY.name} — ${BRAND_IDENTITY.tagline}`,
  defaultTitle: `${BRAND_IDENTITY.name} — ${BRAND_IDENTITY.tagline}`,
  description: `${BRAND_IDENTITY.philosophy} Discover our strictly limited edition art dial timepieces.`,
  keywords: [
    "Levora",
    "luxury watches",
    "art dials",
    "Indian heritage watches",
    "Pichwai watches",
    "Minakari watch",
    "Tarkashi watch",
    "automatic watches",
    "concierge horology",
    "limited edition timepieces",
  ],
  creator: BRAND_IDENTITY.name,
  publisher: BRAND_IDENTITY.name,
} as const;

export const OPEN_GRAPH_DEFAULTS = {
  type: "website",
  locale: "en_IN",
  url: SITE_URL,
  siteName: BRAND_IDENTITY.name,
  images: [
    {
      url: `${SITE_URL}/assets/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: `${BRAND_IDENTITY.name} — Indian Heritage Art Dials`,
    },
  ],
} as const;

export const TWITTER_DEFAULTS = {
  card: "summary_large_image",
  site: "@levorahorology",
  creator: "@levorahorology",
} as const;

/**
 * Returns a template JSON-LD string representing the Brand / Organization
 * for SEO indexation schemas.
 */
export function getOrganizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BRAND_IDENTITY.name,
    "legalName": BRAND_IDENTITY.legalName,
    "url": SITE_URL,
    "logo": `${SITE_URL}/assets/logo.png`,
    "foundingDate": String(BRAND_IDENTITY.establishedYear),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "concierge services",
      "telephone": "+91-11-4987-6543",
      "email": "concierge@levora.in",
    },
  });
}
