# Design System Specification

This document details the design system, colors, typography, borders, and layout guidelines for Levora, ensuring visual consistency across all pages.

---

## 1. Visual Theme & Core Principles

Levora's aesthetic is built around **Indian Heritage, Cultural Storytelling, and Precious Metals (Gold & Silver)**.
* **Luxury Contrast**: Deep, dark, matte backgrounds contrasted with thin, reflective gold and silver lines.
* **Canvas Philosophy**: Each page layout is treated as a museum gallery page: clean margins, large empty spaces, and high-quality imagery.
* **Glassmorphism**: Layered glass cards with high-radius backdrops, mimicking watch crystals.

---

## 2. Color Palette (Tailwind CSS v4 Mapping)

These variables must be registered in the `@theme` segment of `globals.css`:

```css
@theme inline {
  /* Brand Metal Colors */
  --color-gold-50: #FCF9F2;
  --color-gold-100: #F6EDB9;
  --color-gold-200: #ECD473;
  --color-gold-300: #E2BA39;
  --color-gold-400: #D4AF37; /* Primary Gold Accent */
  --color-gold-500: #B79325;
  --color-gold-600: #98761A;
  
  --color-silver-100: #F2F2F2;
  --color-silver-200: #E6E6E6;
  --color-silver-400: #CCCCCC; /* Primary Silver Accent */
  
  /* Brand Neutrals (Charcoals & Slates) */
  --color-luxury-black: #050505;
  --color-luxury-slate-900: #0D0E11;
  --color-luxury-slate-800: #14161E;
  --color-luxury-charcoal: #121212;

  /* Typography Colors */
  --color-luxury-text-primary: #FCFBF9; /* Soft Off-White */
  --color-luxury-text-secondary: #9F9F9F; /* Clean Grey */
  --color-luxury-text-muted: #626262; /* Dark Muted Grey */
}
```

### Gradients
* **Polished Gold Gradient**: `linear-gradient(135deg, #F6EDB9 0%, #D4AF37 50%, #98761A 100%)`
* **Polished Silver Gradient**: `linear-gradient(135deg, #FFFFFF 0%, #CCCCCC 50%, #888888 100%)`
* **Ambient Backdrop Shadow**: `radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0) 70%)` (for ambient gold glows behind watch showcases).

---

## 3. Typography Hierarchy

We use Google Fonts loaded via Next.js Font Optimizations:
* **Primary Serif Display Font**: `Cormorant Garamond` (Classic, elegant, serif) - used for Titles, Headers, and Quotes.
* **Secondary Sans-Serif Font**: `Outfit` (Geometric, clean, modern) - used for product specs, body copy, and UI tags.

| Level | Font Family | Size (Desktop) | Weight | Tracking (Letter Spacing) | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | Cormorant Garamond | 4.5rem (72px) | Light (300) | `-0.02em` | Flagship Page Headings |
| **H2** | Cormorant Garamond | 2.5rem (40px) | Regular (400) | `normal` | Section Headings |
| **H3** | Cormorant Garamond | 1.75rem (28px) | Medium (500) | `0.02em` | Collection & Watch Names |
| **Body Large** | Outfit | 1.125rem (18px) | Regular (400) | `normal` | Narrative intros |
| **Body Regular** | Outfit | 0.95rem (15px) | Light (300) | `0.01em` | Specifications & Description copy |
| **Caps Tag** | Outfit | 0.75rem (12px) | Semi-Bold (600) | `0.15em` | Buttons, navigation links, and sub-titles |

---

## 4. Border, Shadows & Glassmorphism

Luxury UI components must feel floating and translucent:

* **Micro Borders**:
  * Borders on cards or dividers must be very thin: `border-[0.5px] border-white/5` or `border-[0.5px] border-gold-400/20`.
* **Glassmorphic Surface Blur**:
  * `backdrop-blur-xl bg-luxury-black/60` (or `bg-zinc-950/60`).
* **Luxury Shadows**:
  * Avoid heavy black shadows. Use soft, high-spread shadows: `shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]`.

---

## 5. Layout Grid & Spacing System

* **Max Width**: Grid layouts must be bounded at `max-w-7xl` (1280px) for standard listings, and `max-w-[1440px]` for widescreen storytelling stages.
* **Whitespace**:
  * Section padding: `py-24 sm:py-32` (plenty of breathing room).
  * Column spacing: `gap-8 sm:gap-12`.
* **Responsive Breakpoints**:
  * Focus on mobile-first flex/grid wrapping.
  * Provide dynamic side panels on desktop that convert into bottom drawers on mobile devices.
