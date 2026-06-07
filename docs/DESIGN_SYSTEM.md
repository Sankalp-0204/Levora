# Design System Specification

This document details the design system, colors, typography, borders, and layout guidelines for Levora, ensuring visual consistency across all pages.

**Source of truth:** `app/globals.css` (`@theme` registry). This doc mirrors that file.  
**Typography roles:** `app/typography.css` (`.type-*` classes) — see [Typography Strategy](#6-typography-strategy).  
**Token audit:** `docs/SPRINT_2C_PHASE0_AUDIT.md`

---

## 1. Visual Theme & Core Principles

Levora's aesthetic is built around **Indian Heritage, Cultural Storytelling, and Precious Metals (Gold & Silver)**.

* **Luxury Contrast**: Deep, dark, matte backgrounds contrasted with thin, reflective gold and silver lines.
* **Canvas Philosophy**: Each page layout is treated as a museum gallery page: clean margins, large empty spaces, and high-quality imagery.
* **Glassmorphism**: Layered glass cards with high-radius backdrops, mimicking watch crystals.

---

## 2. Color Palette (Tailwind CSS v4)

All variables are registered in the `@theme inline` block of `app/globals.css`. Use Tailwind utilities generated from these tokens — do not hard-code hex values in components.

### Brand metals

| Token | Hex | Tailwind utility | Usage |
|-------|-----|------------------|-------|
| `--color-gold-400` | `#D4AF37` | `text-gold-400`, `border-gold-400` | Primary gold accent — borders, CTAs, highlights |
| `--color-gold-50`–`600` | (scale) | `bg-gold-*`, `text-gold-*` | Full gold scale |
| `--color-silver-400` | `#CCCCCC` | `text-silver-400` | Primary silver accent |
| `--color-silver-50`–`600` | (scale) | `bg-silver-*`, `text-silver-*` | Full silver scale |

### Backgrounds (void scale)

| Token | Hex | Tailwind utility | Usage |
|-------|-----|------------------|-------|
| `--color-void-50` | `#050505` | `bg-void-50` | True base black |
| `--color-void-200` | `#0D0E11` | `bg-void-200` | Primary page background |
| `--color-void-300` | `#121217` | `bg-void-300` | Card surfaces, nav backdrop |
| `--color-void-400` | `#14161E` | `bg-void-400` | Raised surfaces, glass layers |
| `--color-void-500` | `#1C1E28` | `bg-void-500` | Elevated surfaces, modal backdrop |

### Surfaces (ink scale)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-ink-100` | `#212128` | Section borders, rule lines |
| `--color-ink-200` | `#2A2B36` | Dividers inside components |
| `--color-ink-300` | `#363744` | Inactive tabs, skeleton loaders |

### Semantic text colors

| Token | Hex | Tailwind utility | Usage |
|-------|-----|------------------|-------|
| `--color-text-primary` | `#FCFBF9` | `text-text-primary` | Headings, primary copy |
| `--color-text-secondary` | `#9F9F9F` | `text-text-secondary` | Body, sub-headings |
| `--color-text-muted` | `#626262` | `text-text-muted` | Captions, placeholders |
| `--color-text-gold` | `#D4AF37` | via `.text-gold` utility | Gold-tinted labels, prices |
| `--color-text-inverse` | `#050505` | `text-text-inverse` | Text on gold/light backgrounds |

### State colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-state-success` | `#4CAF7D` | Confirmations |
| `--color-state-warning` | `#D4AC37` | Warnings |
| `--color-state-error` | `#C94B4B` | Errors |
| `--color-state-info` | `#5B8DC4` | Informational |

### Legacy name migration

Do not use these names in new code. They appear in older docs and examples only.

| Legacy (deprecated) | Canonical token | Tailwind utility |
|---------------------|-------------------|------------------|
| `luxury-black` | `--color-void-50` | `bg-void-50` |
| `luxury-slate-900` | `--color-void-200` | `bg-void-200` |
| `luxury-charcoal` | `--color-void-300` | `bg-void-300` |
| `luxury-slate-800` | `--color-void-400` | `bg-void-400` |
| `luxury-text-primary` | `--color-text-primary` | `text-text-primary` |
| `luxury-text-secondary` | `--color-text-secondary` | `text-text-secondary` |
| `luxury-text-muted` | `--color-text-muted` | `text-text-muted` |
| `bg-luxury-black/60` | `.glass-dark` or `bg-void-200/60` | — |

### Gradients

Declared as CSS custom properties in `globals.css` (not Tailwind color tokens):

| Property | Utility class | Usage |
|----------|---------------|-------|
| `--gradient-gold-metallic` | `.bg-gradient-gold` | Button hover, decorative highlights |
| `--gradient-silver-metallic` | `.bg-gradient-silver` | Secondary metal accents |
| `--gradient-gold-glow` | — | Ambient glow behind watch showcases |
| `--gradient-page-ambient` | `.bg-gradient-ambient` | Section background washes |
| `--gradient-card-sheen` | — | Card top-edge highlight |

---

## 3. Typography Hierarchy

Fonts are loaded via Next.js in `app/fonts.ts` and injected as CSS variables on `<html>`:

* **Display:** Cormorant Garamond → `--font-display` → `font-display`
* **Body:** Outfit → `--font-body` → `font-body`

### Static size tokens (desktop reference)

| Role | Font | Size | Weight | Tracking | CSS token |
|------|------|------|--------|----------|-----------|
| H1 | Cormorant | 4.5rem (72px) | 300 | `-0.02em` | `--text-h1` |
| H2 | Cormorant | 2.5rem (40px) | 400 | `0em` | `--text-h2` |
| H3 | Cormorant | 1.75rem (28px) | 500 | `0.02em` | `--text-h3` |
| H4 | Cormorant | 1.375rem (22px) | 500 | `0.02em` | `--text-h4` |
| Body large | Outfit | 1.125rem (18px) | 300 | `0em` | `--text-body-lg` |
| Body | Outfit | 0.9375rem (15px) | 300 | `0em` | `--text-body` |
| Caps / nav | Outfit | 0.75rem (12px) | 600 | `0.15em` | `--text-caps` |

Display headings use fluid `clamp()` sizes via `--text-fluid-*` tokens (wired in Phase 1). Apply sizes through `.type-*` semantic classes, not unclassed heading tags.

Full role definitions: `app/typography.css`, `lib/tokens/typography.ts`.

---

## 4. Border, Shadows & Glassmorphism

Luxury UI components must feel floating and translucent:

* **Micro borders:** `border-[0.5px] border-white/5` or `border-gold-400/20`
* **Glass panels:** use composed classes — `.glass-dark`, `.glass-gold`, `.glass-frost` (defined in `globals.css`)
* **Shadows:** use token utilities — `shadow-float`, `shadow-modal`, `shadow-gold-sm` — not arbitrary rgba values

Example glass header (scrolled state):

```html
<header class="glass-dark border-b border-white/5 z-sticky">...</header>
```

---

## 5. Layout Grid & Spacing System

Constants live in `lib/constants/layout.ts`. CSS utilities arrive in `app/layout.css` (Phase 1).

| Context | Value | Token / constant |
|---------|-------|------------------|
| Content max width | 1280px | `--spacing-content-max`, `CONTAINER.content` |
| Storytelling stage | 1440px | `--spacing-stage-max`, `CONTAINER.stage` |
| Section padding (standard) | 128px | `--spacing-section-md`, `SECTION_SPACING.md` |
| Column gap (standard) | 32px | `GRID.gap.md` |
| Nav height (default) | 88px | `NAV.heightDefault` |
| Nav height (scrolled) | 64px | `NAV.heightCompact` |

Breakpoints: 375, 480, 640, 768, 1024, 1280, 1440, 1920px — see `BREAKPOINTS` in `layout.ts`.

---

## 6. Typography Strategy

Sprint 2C establishes a single application layer for typography:

| Layer | Location | Status | Use for |
|-------|----------|--------|---------|
| **Primary** | `.type-*` in `typography.css` | Canonical | All homepage and new UI text |
| **Legacy utilities** | `.text-caps-luxury`, `.text-section-label` in `globals.css` | Deprecated | Do not use in new code |
| **Tag defaults** | `h1–p` in `globals.css` | Fallback only | Unstyled prose outside homepage; removed in Phase 2 |

### Canonical examples

```html
<h1 class="type-hero-display">History is not written.</h1>
<h2 class="type-section-heading">The Atelier</h2>
<span class="type-section-label">Heritage Collection</span>
<a class="type-nav-label" href="/collections">Collections</a>
<p class="type-body">Standard descriptive copy.</p>
```

### Legacy → canonical class map

| Legacy | Canonical |
|--------|-----------|
| `.text-caps-luxury` | `.type-nav-label` or `.type-button-label` |
| `.text-section-label` | `.type-section-label` |
| Unclassed `h2` | `h2.type-section-heading` |

---

## 7. JavaScript token mirrors

Animation and layout code reads typed constants from `lib/tokens/`:

* `lib/tokens/index.ts` — colors, motion, z-index, shadows, glass, radius
* `lib/tokens/typography.ts` — type roles, fluid sizes, prose widths
* `lib/constants/layout.ts` — breakpoints, containers, nav, grid

When a value changes in `globals.css @theme`, update the matching JS mirror in the same PR.
