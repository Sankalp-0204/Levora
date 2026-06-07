/**
 * @file lib/tokens/typography.ts
 * @description Levora Complete Typography Token System — JavaScript/TypeScript layer.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FONT SELECTION RATIONALE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * DISPLAY: Cormorant Garamond
 *   Chosen for its extreme elegance and deep historical provenance. Claude
 *   Garamond's original cuts (16th century) were the reference for high-luxury
 *   French print — the same aesthetic language used by Hermès, Cartier, and
 *   Patek Philippe. The condensed proportions give tall, architectural
 *   letterforms that mirror the vertical geometry of Indian stepwells and
 *   temple columns. The italic is unusually expressive — ideal for story
 *   pullquotes. NOT trendy; it has been "correct" for 500 years.
 *
 * BODY: Outfit
 *   A geometric sans-serif with clean, open apertures and balanced proportions.
 *   It is a variable font (100–900 weight axis), making it extremely efficient
 *   at a single HTTP request. Its circular geometry subtly echoes the watch
 *   face — a circle as a letter. Not fashionable (avoids "startup" associations
 *   of Inter or DM Sans). Not old (avoids stuffiness of Gill Sans or Futura).
 *
 * WHY NOT ALTERNATIVES:
 *   — Playfair Display: Overused in Indian luxury; lacks the delicacy of Cor.
 *   — Didot / Bodoni: Too fashion-editorial; contrast too extreme for UI text.
 *   — Libre Caslon: Too literary, not enough architectural gravitas.
 *   — Raleway: Decorative geometric; becomes dated quickly.
 *   — EB Garamond: Good alternative but slightly less refined at display sizes.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SCALE APPROACH: Contextual Fluid Sizing (not pure modular scale)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Pure modular scales (Major Third 1.25×, Perfect Fourth 1.333×) produce
 * mathematically pleasing but optically wrong results for luxury typography —
 * the H1 to H2 jump feels abrupt, and body sizes feel disconnected from
 * headings. Levora uses a CONTEXTUAL scale:
 *
 *   • H1 is set for maximum cinematic impact at full viewport
 *   • Each lower level reduces by the amount needed for optical rhythm
 *   • Body sizes are calibrated for reading comfort at the line length used
 *
 * Fluid sizing uses CSS clamp() to avoid hard breakpoint jumps. The formula:
 *   clamp(min, preferred, max)
 *   preferred = calc(base + (max - min) * ((100vw - minVW) / (maxVW - minVW)))
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW THIS FILE RELATES TO CSS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   globals.css @theme  ←  CSS custom properties (Tailwind utility generation)
 *   typography.css      ←  Semantic role classes, fluid clamp values, responsive
 *   THIS FILE           ←  JS mirror for GSAP / Framer Motion / inline styles
 *
 * USAGE:
 *   import { type TypographyRole, typeScale, typeRoles } from '@/lib/tokens/typography';
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. FONT FAMILIES
// ─────────────────────────────────────────────────────────────────────────────

export const fontFamily = {
  /**
   * Cormorant Garamond — Display, Headings, Pull-quotes, Prices.
   * Loaded as CSS variable by Next.js. Falls back to system serif.
   */
  display: "var(--font-display), 'Georgia', 'Times New Roman', serif",

  /**
   * Outfit — Body copy, UI labels, Specs, Navigation, Captions.
   * Variable font (100–900 axis). Falls back to system sans-serif.
   */
  body: "var(--font-body), 'system-ui', '-apple-system', sans-serif",

  /**
   * Monospace — Technical watch specifications (movement, serial numbers).
   * Uses system monospace for exact character-width alignment of spec tables.
   */
  mono: "'ui-monospace', 'SF Mono', 'Fira Code', 'Consolas', monospace",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 2. FONT WEIGHTS
// Named by role, not by number — prevents arbitrary weight choices.
// ─────────────────────────────────────────────────────────────────────────────

export const fontWeight = {
  /** Cormorant Garamond at 300: maximum elegance for large display text. */
  featherlight: 100,
  /** Cormorant Garamond at 300: maximum elegance for large display text. */
  light:        300,
  /** Default paragraph weight. Outfit 400 is highly legible on dark BG. */
  regular:      400,
  /** Sub-headings, watch names, mid-emphasis labels. */
  medium:       500,
  /** Navigation items, UI button text, spec labels. */
  semibold:     600,
  /** Decorative use only. Cormorant 700 is rarely needed. */
  bold:         700,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 3. FONT SIZES — Static values (used in CSS @theme, desktop reference)
// ─────────────────────────────────────────────────────────────────────────────

export const fontSize = {
  // ── Display (Cormorant Garamond) ──────────────────────────────────────────
  /** 80px — Hero headline. "History is not written. It is assembled." */
  display:    "5rem",
  /** 72px — Flagship page heading (H1). Section-defining single lines. */
  h1:         "4.5rem",
  /** 40px — Section heading (H2). Collection names, chapter titles. */
  h2:         "2.5rem",
  /** 28px — Watch / article name (H3). Card headings. */
  h3:         "1.75rem",
  /** 22px — Sub-section labels (H4). Used sparingly. */
  h4:         "1.375rem",
  /** 18px — Pull-quote / editorial emphasis (H5). */
  h5:         "1.125rem",

  // ── Body (Outfit) ─────────────────────────────────────────────────────────
  /** 18px — Narrative intro paragraphs, editorial leads. */
  bodyLarge:  "1.125rem",
  /** 15px — Standard body copy, specifications, descriptions. */
  body:       "0.9375rem",
  /** 14px — Secondary body, captions beneath images and video. */
  bodySmall:  "0.875rem",

  // ── UI Micro (Outfit) ─────────────────────────────────────────────────────
  /** 12px — All-caps navigation links, section tags, button text. */
  caps:       "0.75rem",
  /** 11px — Metadata: timestamps, reference numbers, technical IDs. */
  micro:      "0.6875rem",
  /** 10px — Legal / fine print. Barely visible; used decoratively. */
  nano:       "0.625rem",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 4. FLUID FONT SIZES — clamp() values for responsive scaling
//
//    Every display/heading size uses CSS clamp() to flow naturally between
//    mobile and desktop without hard breakpoints causing jarring jumps.
//
//    Formula: clamp(mobile-min, fluid-preferred, desktop-max)
//    Fluid-preferred calculated for 375px → 1440px viewport range.
//
//    Body sizes use fixed values — fluid body text creates visual instability.
// ─────────────────────────────────────────────────────────────────────────────

export const fluidFontSize = {
  /**
   * Display — 36px (mobile) → 80px (desktop)
   * Used for the hero headline. Scales smoothly across all viewports.
   */
  display:  "clamp(2.25rem, 1.023rem + 5.231vw, 5rem)",

  /**
   * H1 — 32px (mobile) → 72px (desktop)
   * Flagship page headings. Reads as definitive on mobile, cinematic on desktop.
   */
  h1:       "clamp(2rem, 0.923rem + 4.615vw, 4.5rem)",

  /**
   * H2 — 24px (mobile) → 40px (desktop)
   * Section headings. Comfortable to read at both scales.
   */
  h2:       "clamp(1.5rem, 1.077rem + 1.846vw, 2.5rem)",

  /**
   * H3 — 20px (mobile) → 28px (desktop)
   * Watch names, card headings. Tight scaling — almost fixed.
   */
  h3:       "clamp(1.25rem, 1.038rem + 0.923vw, 1.75rem)",

  /**
   * H4 — 17px (mobile) → 22px (desktop)
   */
  h4:       "clamp(1.0625rem, 0.929rem + 0.577vw, 1.375rem)",

  /**
   * H5 / Pull-quote — 16px (mobile) → 18px (desktop)
   */
  h5:       "clamp(1rem, 0.946rem + 0.231vw, 1.125rem)",

  /**
   * Body Large — Fixed at 18px. Narrative intro paragraphs.
   * Body text should NOT scale fluidly — it creates reflow during resize.
   */
  bodyLarge: "1.125rem",

  /**
   * Body — Fixed at 15px on all viewports.
   */
  body:      "0.9375rem",

  /**
   * Body Small — Fixed at 14px. Captions, helper text.
   */
  bodySmall: "0.875rem",

  /**
   * Caps label — Fixed at 12px.
   */
  caps:      "0.75rem",

  /**
   * Micro — Fixed at 11px.
   */
  micro:     "0.6875rem",

  /**
   * Nano — Fixed at 10px.
   */
  nano:      "0.625rem",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 5. LETTER SPACING (TRACKING)
//
//    This is the single biggest contributor to "luxury feel" in typography.
//    Tight tracking on large serifs. Wide tracking on small all-caps labels.
//    Never apply luxury tracking to body text — it destroys legibility.
// ─────────────────────────────────────────────────────────────────────────────

export const letterSpacing = {
  /**
   * -0.02em — Used exclusively on H1 display text.
   * Pulls letters together for visual weight and gravitas at large sizes.
   * At 72px, -0.02em = -1.44px — barely perceptible but critical.
   */
  tight:    "-0.02em",

  /**
   * 0em — Default for H2, H3, and all body copy.
   * The browser default; no visual noise.
   */
  normal:   "0em",

  /**
   * +0.02em — Used on H3 and watch name labels.
   * Adds slight breathing room between characters for watch names displayed
   * at medium sizes where tight tracking would cause crowding.
   */
  relaxed:  "0.02em",

  /**
   * +0.06em — Used on H4, sub-labels in mixed-case.
   */
  open:     "0.06em",

  /**
   * +0.15em — Used exclusively on CAPS TAGS, navigation links, button text.
   * This is the hallmark of luxury brand typography — it signals restraint
   * and prestige. Never apply to body copy longer than 3 words.
   */
  luxury:   "0.15em",

  /**
   * +0.25em — Ultra-wide for decorative section labels.
   * HERITAGE  ·  ATELIER  ·  COLLECTIONS
   * Maximum spacing; purely decorative, very short strings only.
   */
  ultra:    "0.25em",

  /**
   * +0.35em — Reserved for single-character or 2-letter monograms.
   * The Levora "L" mark or collection initials.
   */
  monogram: "0.35em",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 6. LINE HEIGHTS (LEADING)
// ─────────────────────────────────────────────────────────────────────────────

export const lineHeight = {
  /**
   * 1.0 — Absolute display headlines where descenders must not add space.
   * Used only for single-line hero text that overflows intentionally.
   */
  flat:     1.0,

  /**
   * 1.05 — Standard display heading leading.
   * At H1 72px, 1.05 = 75.6px per line. Multiple headline lines sit tight,
   * creating a typographic block with visual weight.
   */
  display:  1.05,

  /**
   * 1.2 — Section headings (H2, H3).
   * Comfortable for 2–3 line section headings. Feels deliberate.
   */
  heading:  1.2,

  /**
   * 1.35 — Card titles, watch names, 3–5 word labels.
   * Snug enough to read as a unit, open enough to breathe.
   */
  snug:     1.35,

  /**
   * 1.6 — Compact body copy (specs, technical descriptions).
   * Denser than standard body for tabular/reference content.
   */
  compact:  1.6,

  /**
   * 1.7 — Standard body copy.
   * Calibrated for Outfit at 15px on dark backgrounds.
   * Slightly above standard 1.5 for improved legibility on dark surfaces.
   */
  body:     1.7,

  /**
   * 1.9 — Narrative editorial text (story sections, cultural copy).
   * Wide leading for immersive, magazine-quality reading.
   */
  relaxed:  1.9,

  /**
   * 2.2 — Pull-quotes and sparse italic commentary.
   * Maximum breathing room. Used when the TEXT is the visual element.
   */
  loose:    2.2,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 7. TYPOGRAPHIC ROLES
//
//    The complete definition of every semantic type role in the system.
//    Each role bundles: family, size (fluid), weight, tracking, leading, color.
//    Use this as the reference when composing CSS classes in typography.css.
// ─────────────────────────────────────────────────────────────────────────────

export interface TypeRole {
  family:         string;
  /** Fluid clamp() size value */
  size:           string;
  /** Numeric weight */
  weight:         number;
  letterSpacing:  string;
  lineHeight:     number;
  /** CSS color token reference */
  color:          string;
  /** Whether italic is part of the visual intent */
  italic?:        boolean;
  /** Whether text-transform: uppercase applies */
  uppercase?:     boolean;
  /** Note for design reference */
  note:           string;
}

export const typeRoles: Record<string, TypeRole> = {

  // ── Display / Hero ─────────────────────────────────────────────────────────

  /**
   * HERO DISPLAY
   * The cinematic opening headline. One or two words maximum.
   * Example: "LEVORA" / "Heritage." / "Every dial is a canvas."
   */
  heroDisplay: {
    family:        fontFamily.display,
    size:          fluidFontSize.display,
    weight:        fontWeight.light,
    letterSpacing: letterSpacing.tight,
    lineHeight:    lineHeight.flat,
    color:         "var(--color-text-primary)",
    note:          "Max 12 words. Single thought. Full viewport centered.",
  },

  /**
   * PAGE HEADING (H1)
   * The defining heading of each page. One per page.
   * Example: "The Heritage Collection" / "HERITAGE_01 — The Chand Baori"
   */
  pageHeading: {
    family:        fontFamily.display,
    size:          fluidFontSize.h1,
    weight:        fontWeight.light,
    letterSpacing: letterSpacing.tight,
    lineHeight:    lineHeight.display,
    color:         "var(--color-text-primary)",
    note:          "Use semantic <h1>. Light weight creates elegance at large size.",
  },

  /**
   * SECTION HEADING (H2)
   * Introduces major content sections.
   * Example: "The Atelier" / "Craftsmanship" / "The Story"
   */
  sectionHeading: {
    family:        fontFamily.display,
    size:          fluidFontSize.h2,
    weight:        fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    lineHeight:    lineHeight.heading,
    color:         "var(--color-text-primary)",
    note:          "Regular weight. Section names are confident, not urgent.",
  },

  /**
   * CARD HEADING / WATCH NAME (H3)
   * Watch model names, collection card titles, story panel titles.
   * Example: "Heritage 01" / "The Chand Baori Dial"
   */
  cardHeading: {
    family:        fontFamily.display,
    size:          fluidFontSize.h3,
    weight:        fontWeight.medium,
    letterSpacing: letterSpacing.relaxed,
    lineHeight:    lineHeight.snug,
    color:         "var(--color-text-primary)",
    note:          "Medium weight. Slight tracking opens watch names at card size.",
  },

  /**
   * SUB-HEADING (H4)
   * Labels inside cards, spec section headers, attribute names.
   * Example: "Movement" / "Case Diameter" / "Power Reserve"
   */
  subHeading: {
    family:        fontFamily.display,
    size:          fluidFontSize.h4,
    weight:        fontWeight.medium,
    letterSpacing: letterSpacing.open,
    lineHeight:    lineHeight.snug,
    color:         "var(--color-text-secondary)",
    note:          "Cormorant at medium sizes bridges display and UI comfortably.",
  },

  /**
   * PULL QUOTE / STORY VERSE (H5)
   * Heritage story pull-quotes. Italic Cormorant. Rare usage.
   * Example: "Time is not measured. It is remembered."
   */
  pullQuote: {
    family:        fontFamily.display,
    size:          fluidFontSize.h5,
    weight:        fontWeight.regular,
    letterSpacing: letterSpacing.relaxed,
    lineHeight:    lineHeight.loose,
    color:         "var(--color-text-primary)",
    italic:        true,
    note:          "Italic Cormorant. Max 30 words. Preceded by gold rule line.",
  },

  // ── Body Copy ──────────────────────────────────────────────────────────────

  /**
   * NARRATIVE LEAD
   * The first paragraph of story sections, heritage descriptions.
   * Larger, looser than standard body — sets the editorial tone.
   */
  narrativeLead: {
    family:        fontFamily.body,
    size:          fluidFontSize.bodyLarge,
    weight:        fontWeight.light,
    letterSpacing: letterSpacing.normal,
    lineHeight:    lineHeight.relaxed,
    color:         "var(--color-text-secondary)",
    note:          "Outfit Light at 18px. Used for first paragraph only.",
  },

  /**
   * BODY COPY
   * Standard descriptive text: watch descriptions, collection copy,
   * heritage narrative paragraphs (after the lead).
   */
  body: {
    family:        fontFamily.body,
    size:          fluidFontSize.body,
    weight:        fontWeight.light,
    letterSpacing: letterSpacing.normal,
    lineHeight:    lineHeight.body,
    color:         "var(--color-text-secondary)",
    note:          "Outfit Light at 15px. Primary reading copy.",
  },

  /**
   * CAPTION
   * Image captions, video credit lines, figure labels.
   * Sits beneath visual assets as descriptive support text.
   */
  caption: {
    family:        fontFamily.body,
    size:          fluidFontSize.bodySmall,
    weight:        fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    lineHeight:    lineHeight.compact,
    color:         "var(--color-text-muted)",
    note:          "Outfit Regular at 14px. Muted — never competes with the image.",
  },

  // ── UI / Functional Labels ─────────────────────────────────────────────────

  /**
   * SECTION LABEL (Decorative)
   * All-caps eyebrow labels above headings.
   * Example: "HERITAGE COLLECTION" / "THE ATELIER" / "OUR STORY"
   * Preceded by a thin gold horizontal rule.
   */
  sectionLabel: {
    family:        fontFamily.body,
    size:          fluidFontSize.micro,
    weight:        fontWeight.semibold,
    letterSpacing: letterSpacing.ultra,
    lineHeight:    lineHeight.body,
    color:         "var(--color-gold-400)",
    uppercase:     true,
    note:          "Gold colored. Max 3 words. Always above a heading.",
  },

  /**
   * NAV LABEL
   * Primary navigation link text.
   * Example: "COLLECTIONS" / "HERITAGE" / "ATELIER" / "JOURNAL"
   */
  navLabel: {
    family:        fontFamily.body,
    size:          fluidFontSize.caps,
    weight:        fontWeight.semibold,
    letterSpacing: letterSpacing.luxury,
    lineHeight:    lineHeight.body,
    color:         "var(--color-text-secondary)",
    uppercase:     true,
    note:          "0.15em tracking. Hover reveals gold color. Max 10 chars.",
  },

  /**
   * BUTTON LABEL
   * CTA button text.
   * Example: "REQUEST CONSULTATION" / "EXPLORE COLLECTION" / "VIEW DETAILS"
   */
  buttonLabel: {
    family:        fontFamily.body,
    size:          fluidFontSize.caps,
    weight:        fontWeight.semibold,
    letterSpacing: letterSpacing.luxury,
    lineHeight:    lineHeight.body,
    color:         "var(--color-text-primary)",
    uppercase:     true,
    note:          "Same as nav. Uppercase 12px with luxury tracking.",
  },

  /**
   * SPECIFICATION LABEL
   * Technical watch specification attribute names (left column of spec tables).
   * Example: "Movement" / "Case Diameter" / "Water Resistance"
   */
  specLabel: {
    family:        fontFamily.body,
    size:          fluidFontSize.caps,
    weight:        fontWeight.semibold,
    letterSpacing: letterSpacing.luxury,
    lineHeight:    lineHeight.compact,
    color:         "var(--color-text-muted)",
    uppercase:     true,
    note:          "All-caps. Muted color — attribute name defers to its value.",
  },

  /**
   * SPECIFICATION VALUE
   * Technical watch specification values (right column of spec tables).
   * Example: "Swiss ETA 2824-2" / "40mm" / "5 ATM"
   */
  specValue: {
    family:        fontFamily.body,
    size:          fluidFontSize.body,
    weight:        fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    lineHeight:    lineHeight.compact,
    color:         "var(--color-text-primary)",
    note:          "Regular weight. Primary emphasis within spec rows.",
  },

  /**
   * PRICE DISPLAY
   * Watch price. Uses Cormorant Garamond for prestige signalling.
   * Example: "₹2,85,000"
   */
  priceDisplay: {
    family:        fontFamily.display,
    size:          fluidFontSize.h3,
    weight:        fontWeight.regular,
    letterSpacing: letterSpacing.relaxed,
    lineHeight:    lineHeight.snug,
    color:         "var(--color-gold-400)",
    note:          "Gold tint. Cormorant gives price a heritage, not commercial, feel.",
  },

  /**
   * METADATA / TIMESTAMP
   * Date strings, article metadata, collection edition numbers.
   * Example: "Limited Edition · 7 Pieces" / "Est. 2024" / "Geneva, Switzerland"
   */
  metadata: {
    family:        fontFamily.body,
    size:          fluidFontSize.micro,
    weight:        fontWeight.regular,
    letterSpacing: letterSpacing.open,
    lineHeight:    lineHeight.body,
    color:         "var(--color-text-muted)",
    note:          "11px. Muted. Decorative information only.",
  },

  /**
   * SERIAL / REFERENCE NUMBER
   * Watch model identifiers, reference numbers, technical codes.
   * Example: "HERITAGE_01" / "Ref. LVR-H01-GD-40"
   * Uses monospace for precise character-width alignment.
   */
  referenceId: {
    family:        fontFamily.mono,
    size:          fluidFontSize.micro,
    weight:        fontWeight.regular,
    letterSpacing: letterSpacing.open,
    lineHeight:    lineHeight.compact,
    color:         "var(--color-text-muted)",
    note:          "Monospace. Reference IDs must have consistent character width.",
  },

  /**
   * BADGE / TAG
   * Short status tags: "SOLD OUT" / "LIMITED" / "NEW" / "HERITAGE"
   */
  badge: {
    family:        fontFamily.body,
    size:          fluidFontSize.nano,
    weight:        fontWeight.semibold,
    letterSpacing: letterSpacing.luxury,
    lineHeight:    lineHeight.body,
    color:         "var(--color-gold-400)",
    uppercase:     true,
    note:          "10px, ultra-tracked. Used inside pill badges only.",
  },

  /**
   * STORY CHAPTER MARKER
   * The numbered chapter label inside story scroll sections.
   * Example: "01" / "02" displayed as large decorative numerals.
   */
  chapterMarker: {
    family:        fontFamily.display,
    size:          fluidFontSize.display,
    weight:        fontWeight.light,
    letterSpacing: letterSpacing.tight,
    lineHeight:    lineHeight.flat,
    color:         "var(--color-ink-300)",
    note:          "100 weight. Decorative background number — very low contrast.",
  },

} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 8. BREAKPOINTS — Reference values for responsive typography decisions
// ─────────────────────────────────────────────────────────────────────────────

export const breakpoints = {
  /** 375px — Minimum supported mobile viewport */
  mobileMin:   375,
  /** 480px — Large mobile / small mobile landscape */
  mobileLg:    480,
  /** 768px — Tablet portrait — GSAP pinning disabled below this */
  tablet:      768,
  /** 1024px — Tablet landscape / small desktop */
  desktopSm:   1024,
  /** 1280px — Standard desktop — content max-width boundary */
  desktop:     1280,
  /** 1440px — Widescreen — storytelling stage max-width */
  desktopWide: 1440,
  /** 1920px — Ultra-wide — hero image max render size */
  ultraWide:   1920,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 9. PROSE WIDTH — Optimal reading line lengths
// ─────────────────────────────────────────────────────────────────────────────

export const proseWidth = {
  /**
   * 45ch — Tight reading column. Spec lists, short captions.
   * At 15px with Outfit, this is approximately 45 characters per line.
   */
  tight:    "45ch",

  /**
   * 60ch — Standard prose column. Body copy, descriptions.
   * The classic Bringhurst recommendation for comfortable reading.
   */
  standard: "60ch",

  /**
   * 72ch — Wide narrative column. Heritage story sections.
   * Allowed because the large leading (1.9) compensates for width.
   */
  wide:     "72ch",

  /**
   * 90ch — Maximum allowed. Editorial full-width text stages only.
   */
  max:      "90ch",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPE EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export type FontFamily     = typeof fontFamily;
export type FontWeight     = typeof fontWeight;
export type FontSize       = typeof fontSize;
export type FluidFontSize  = typeof fluidFontSize;
export type LetterSpacing  = typeof letterSpacing;
export type LineHeight     = typeof lineHeight;
export type TypeRoleMap    = typeof typeRoles;
export type BreakpointMap  = typeof breakpoints;
export type ProseWidthMap  = typeof proseWidth;
