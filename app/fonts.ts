/**
 * @file fonts.ts
 * @description Levora brand typography loader.
 *
 * Pattern: CSS Variable method (next/font → `variable` option).
 * Both font CSS variables are injected onto <html> in layout.tsx.
 * Tailwind v4 then picks them up via --font-display / --font-body
 * registered in the @theme block of globals.css.
 *
 * Cormorant Garamond  →  Display / Headings / Quotes  (--font-display)
 * Outfit              →  Body / UI / Specs            (--font-body)
 */

import { Cormorant_Garamond, Outfit } from "next/font/google";

// ─── Display Font ────────────────────────────────────────────────────────────
// Cormorant Garamond is NOT a variable font: explicit weights required.
// Weights selected to cover Light (H1), Regular (H2), Medium (H3), Italic (quotes).
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
  // Disable automatic font fallback adjustment for serif fonts
  adjustFontFallback: false,
});

// ─── Body Font ───────────────────────────────────────────────────────────────
// Outfit IS a variable font: no explicit weight needed, full 100–900 range available.
export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  adjustFontFallback: true,
});
