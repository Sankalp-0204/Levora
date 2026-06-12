# Sprint 2C — Design System Implementation Plan

**Scope:** Apply the existing token system (`globals.css`, `typography.css`, `lib/tokens/`, `lib/constants/layout.ts`) to the Sprint 2 scaffolds. No GSAP, no Firebase, no new routes.

**Current state:** Tokens and typography architecture are defined. Homepage skeleton, Header, Footer, and UI primitives exist but are unstyled. `typography.css` and `layout.css` are not wired into the app.

**Cross-references:** `docs/DESIGN_SYSTEM.md`, `docs/HOMEPAGE_ARCHITECTURE.md`, `docs/COMPONENTS.md`, `lib/tokens/typography.ts`, `lib/constants/layout.ts`

---

## Executive Summary

Sprint 2C turns the design spec into visible UI by wiring CSS layers, creating layout utilities, and applying semantic typography and token-based styling to layout components, UI primitives, and homepage sections — mobile-first, with desktop enhancements.

**Out of scope for 2C:** GSAP scroll animations (Sprint 3), modal form logic (Sprint 7), real media assets, Firebase.

---

## 1. Implementation Order

Execute in this sequence. Each phase depends on the previous.

### Phase 0 — Pre-flight & Token Audit (Day 1, ~2 hrs) ✅ Complete

| Step | Task | Why first | Status |
|------|------|-----------|--------|
| 0.1 | Reconcile `DESIGN_SYSTEM.md` naming with `globals.css` (`luxury-*` → `void-*`, `text-*`) | Avoid building against wrong token names | ✅ |
| 0.2 | Fix `typography.css` line 145: `composes: type-hero-display` is CSS Modules syntax and will not work in a plain CSS file | Broken class before any application | ✅ |
| 0.3 | Decide single typography strategy: **semantic classes** (`.type-*`) as primary; deprecate duplicate utilities in `globals.css` (`.text-caps-luxury`, base `h1–p` overrides) for homepage work | Prevents triple-styling conflicts | ✅ |

**Deliverables:** `docs/SPRINT_2C_PHASE0_AUDIT.md`, updated `docs/DESIGN_SYSTEM.md`

### Phase 1 — CSS Layer Wiring (Day 1, ~3 hrs)

| Step | Task |
|------|------|
| 1.1 | Create `app/layout.css` — container, grid, section spacing, nav geometry utilities mapped from `lib/constants/layout.ts` |
| 1.2 | Import order in `app/globals.css`: `@import "tailwindcss"` → `@import "./typography.css"` → `@import "./layout.css"` |
| 1.3 | Extend `lib/tokens/index.ts` to re-export `typography.ts` and add layout mirror constants (container widths, section spacing, nav heights) |

### Phase 2 — Layout Foundation (Day 1–2, ~4 hrs)

| Step | Task |
|------|------|
| 2.1 | Apply layout utilities to `app/layout.tsx` — page shell, `#page-content` flex column, nav offset compensation |
| 2.2 | Define reusable layout classes: `.container-content`, `.container-stage`, `.container-bleed`, `.section-pad-*`, `.grid-12` |
| 2.3 | Set global document defaults in `globals.css` body (already partially done); remove conflicting `p { letter-spacing: tracking-wide }` — body copy should use `tracking-normal` per spec |

### Phase 3 — UI Primitives (Day 2, ~4 hrs)

| Step | Task |
|------|------|
| 3.1 | Style `components/ui/Button.tsx` — all three variants |
| 3.2 | Style `components/ui/GlassCard.tsx` — dark + gold variants |
| 3.3 | Create optional `components/ui/Card.tsx` (watch/product card shell) if `StaticRenderer` styling exceeds primitive scope |

### Phase 4 — Layout Components (Day 2–3, ~6 hrs)

| Step | Task |
|------|------|
| 4.1 | Style `components/layout/Header.tsx` — transparent default, compact scrolled state (CSS-only; GSAP hook reserved) |
| 4.2 | Style `components/layout/Footer.tsx` — 4-column desktop, accordion mobile |
| 4.3 | Extract `HeaderScrollWrapper.tsx` (`"use client"`) only if scroll state is needed for compact nav — keep styling in CSS, logic minimal |

### Phase 5 — Homepage Section Styling (Day 3–4, ~8 hrs)

Apply typography + spacing + layout per `HOMEPAGE_ARCHITECTURE.md` section map:

| Order | Section | Priority |
|-------|---------|----------|
| 5.1 | §01 Threshold | Hero typography, full-bleed, scroll indicator |
| 5.2 | §06 Private Salon | GlassCard + Button reference implementation |
| 5.3 | §07 Footer | Already in Phase 4 |
| 5.4 | §05 Collection | Watch card styling via `StaticRenderer` |
| 5.5 | §04 Atelier | Editorial grid, spec panels |
| 5.6 | §03 Chronology | Era card shells (vertical stack mobile) |
| 5.7 | §02 Dial Revelation | Stage container, layer label typography |
| 5.8 | Cross-section pass | Section labels, consistent `h2` rhythm |

### Phase 6 — Responsive & Accessibility Pass (Day 4–5, ~4 hrs)

| Step | Task |
|------|------|
| 6.1 | Verify all interactive targets ≥ 48×48px |
| 6.2 | Verify `:focus-visible` rings on nav, buttons, footer links |
| 6.3 | Test 375px, 768px, 1280px, 1440px viewports |
| 6.4 | CLS audit — fixed dimensions on placeholders, hero video container |

### Phase 7 — Documentation & Handoff (Day 5, ~2 hrs)

| Step | Task |
|------|------|
| 7.1 | Update `docs/COMPONENTS.md` with final class names and variant tables |
| 7.2 | Add Sprint 2C completion checklist to sprint notes |
| 7.3 | List GSAP integration hooks left as `data-gsap` attributes for Sprint 3 |

---

## 2. Files That Must Be Modified

### Create (new files)

| File | Purpose |
|------|---------|
| `app/layout.css` | Container, grid, section spacing, nav geometry utilities |
| `components/layout/HeaderScrollWrapper.tsx` | Optional — scroll threshold for compact nav (CSS class toggle only) |
| `components/ui/Card.tsx` | Optional — shared product/card shell for Collection + Chronology |

### Modify (required)

| File | Changes |
|------|---------|
| `app/globals.css` | Import chain; fix `p` letter-spacing; resolve duplicate typography utilities |
| `app/typography.css` | Fix `composes`; verify all `--color-*` refs match `globals.css` tokens |
| `app/layout.tsx` | Layout shell classes; optional `padding-top` for fixed header |
| `app/page.tsx` | Section wrapper classes, typography roles, container widths per section |
| `components/layout/Header.tsx` | Nav structure, glass backdrop, typography classes, responsive menu |
| `components/layout/Footer.tsx` | Grid, accordion, form styling, typography roles |
| `components/ui/Button.tsx` | Variant styling via token classes |
| `components/ui/GlassCard.tsx` | Glass variant props (`dark` \| `gold`), radius, padding |
| `components/watch/StaticRenderer.tsx` | Watch card visual treatment, active/inactive states |
| `components/story/DynamicVideo.tsx` | Full-bleed hero container, overlay gradient |
| `components/story/StoryScroller.tsx` | Era card shells, mobile vertical stack |
| `components/watch/LayeredRenderer.tsx` | Stage dimensions, layer label typography |
| `components/ui/Slider.tsx` | Collection carousel layout, active card sizing |
| `lib/tokens/index.ts` | Export typography + layout mirrors |
| `lib/constants/layout.ts` | Minor — only if CSS custom property names need documenting |

### Modify (conditional)

| File | When |
|------|------|
| `components/watch/WatchContainer.tsx` | If card wrapper styles belong at container level |
| `docs/DESIGN_SYSTEM.md` | Align legacy token names with `void-*` / `text-*` scale |
| `docs/COMPONENTS.md` | Post-implementation reference update |

### Do not modify in 2C

| File | Reason |
|------|--------|
| `lib/gsap/*` | Sprint 3 |
| `components/ui/Modal.tsx` | Form wiring is Sprint 7 |
| Firebase / Server Actions | Sprint 6–7 |

---

## 3. Risks Before Implementation

### High severity

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Triple typography system** — `globals.css` base tags, utility classes, and `typography.css` semantic classes all define heading/body styles | Unpredictable cascade; sections look inconsistent | Pick `.type-*` as canonical for homepage; strip or scope base `h1–p` rules to `.prose` contexts only |
| **`typography.css` `composes` syntax** | `.type-hero-display--italic` silently fails | Replace with explicit property duplication or `@apply` if Tailwind v4 supports it in CSS layers |
| **`layout.css` missing but referenced** | Layout constants in TS with no CSS counterpart | Create `layout.css` in Phase 1 before any component styling |
| **Fixed header + 100vh hero** | Content hidden under header; incorrect `100vh` on mobile browsers | Use `min-h-dvh`; add `--nav-height` CSS variable; offset threshold headline |

### Medium severity

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Token drift** — `lib/tokens/index.ts` vs `globals.css` vs `typography.ts` | GSAP (Sprint 3) reads wrong values | Single audit checklist; add layout tokens to `index.ts` |
| **`DESIGN_SYSTEM.md` vs `globals.css` naming** | Developers use non-existent Tailwind classes (`luxury-black`) | Treat `globals.css` as source of truth; update doc in Phase 7 |
| **Glassmorphism performance** | Jank on low-end mobile with multiple `backdrop-filter` panels | Limit blur to Header + Salon GlassCard; use solid fallback below 768px if needed |
| **Header scroll state without GSAP** | Compact nav requires client JS | Minimal `useScroll` or `IntersectionObserver` wrapper; keep GSAP hook as `data-gsap` for Sprint 3 swap |
| **Slider + card blur on mobile** | Adjacent cards hidden per spec — easy to break touch targets | Follow HOMEPAGE_ARCHITECTURE §5: 90vw active card, hidden blurred adjacents |

### Low severity

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Placeholder assets** | Styled layout with empty boxes | Use `aspect-ratio` + `bg-void-400` placeholders with fixed dimensions for CLS |
| **Footer accordion without JS** | `<details>/<summary>` vs custom accordion | Prefer native `<details>` for zero-JS mobile accordion |
| **Newsletter form unstyled submit button** | Inconsistent with `Button.tsx` | Reuse `Button` variant or shared `.type-button-label` classes |

---

## 4. Desktop and Mobile Behavior

Breakpoints from `lib/constants/layout.ts`:

| Token | px | Usage |
|-------|-----|-------|
| `mobileMin` | 375 | Minimum design target |
| `mobileLg` | 480 | Small typography overrides |
| `md` | 768 | GSAP disabled below; layout mode switches |
| `lg` | 1024 | Header inline nav visible |
| `xl` | 1280 | `.container-content` max-width |
| `2xl` | 1440 | `.container-stage` max-width |

### Global layout

| Behavior | Desktop (≥ 768px) | Mobile (< 768px) |
|----------|-------------------|------------------|
| Page background | `bg-void-200` + optional ambient gradient | Same |
| Content width | `max-w-7xl` (1280px) standard; `max-w-[1440px]` storytelling stages | Full width with `px-5` (20px) nav padding |
| Section padding | `py-32` (128px) standard; `py-48` (192px) feature sections | `py-24` (96px) standard |
| Header | Fixed, 88px height, horizontal nav + concierge CTA | 64px compact default; hamburger or condensed nav |
| Header scroll | Contracts to 64px after 80px scroll; glass backdrop intensifies | Same threshold; no hide-on-scroll until GSAP (Sprint 3) |

### Per-section (from `HOMEPAGE_ARCHITECTURE.md` §5)

| Section | Desktop | Mobile |
|---------|---------|--------|
| **Threshold** | 100dvh full-bleed video; `.type-hero-display` centered; scroll indicator bottom-center | Video retained; headline scales via fluid clamp; tagline `.type-body`; indicator smaller |
| **Dial Revelation** | Pinned stage container 1440px wide; layer labels flanking watch | Vertical stack; tap-to-explode UI shell (CSS transitions only); bottom drawer for layer details |
| **Chronology** | Horizontal timeline row inside overflow stage | Vertical stacked era cards; gold connector becomes left border rule |
| **Atelier** | 2-column editorial grid (`gap-12`) | Single column; images full-width |
| **Collection** | Drag slider; active card full scale; adjacent blurred/scaled | Touch swipe; active card 90vw; adjacent cards hidden |
| **Salon** | Centered GlassCard ~600px wide; 80vh section | Full-width card; padding `px-5`; backdrop blur retained |
| **Footer** | 4-column link grid + newsletter sidebar | Single column; `<details>` accordion per nav section |

### Touch rules (mandatory)

- All hover states have tap/active equivalents (`:active`, `aria-current`)
- Minimum tap target: **48×48px**
- No scroll-hijacking below 768px
- `:focus-visible` outline: `1px solid gold-400/40` with 2px offset

---

## 5. Design Token Usage

### Token layer architecture

```txt
globals.css @theme          ← Tailwind utilities (color-gold-400, shadow-float, etc.)
typography.css              ← Semantic .type-* roles
layout.css                  ← Structural .container-*, .section-pad-*, .grid-*
lib/tokens/index.ts         ← JS mirror (GSAP prep, inline styles)
lib/tokens/typography.ts    ← Full type role definitions
lib/constants/layout.ts     ← Breakpoints, nav, spacing numbers
```

### Color tokens — when to use what

| Token | Tailwind / CSS | Use |
|-------|----------------|-----|
| `void-200` | `bg-void-200` | Page background |
| `void-300` / `void-400` | `bg-void-300` | Card surfaces, nav backdrop base |
| `gold-400` | `text-gold-400`, `border-gold-400/20` | Primary accent — nav hover, CTAs, section labels |
| `silver-400` | `text-silver-400` | Secondary metal accents, badge variant |
| `text-primary` | `text-text-primary` | Headings, button labels |
| `text-secondary` | `text-text-secondary` | Body, nav default |
| `text-muted` | `text-text-muted` | Captions, spec labels, metadata |

### Gradient tokens

| Token | Use |
|-------|-----|
| `--gradient-gold-metallic` | Button hover overlay, decorative word highlight (`.text-gradient-gold`) |
| `--gradient-page-ambient` | Section background washes |
| `--gradient-gold-glow` | Hero watch showcase ambient glow behind collection cards |
| `--gradient-card-sheen` | Card top-edge highlight |

### Glass tokens

| Class | Component |
|-------|-----------|
| `.glass-dark` | Header scrolled, Modal backdrop (future), watch card overlays |
| `.glass-gold` | Salon GlassCard accent variant, featured collection card |
| `.glass-frost` | Rare — newsletter input field background |

### Motion tokens (CSS-only in 2C)

| Token | Use in 2C |
|-------|-----------|
| `--duration-fast` (200ms) | Nav link color, button border |
| `--duration-slow` (600ms) | Header height transition, card hover lift |
| `--duration-luxury` (900ms) | Hero headline fade-in (CSS `@keyframes` placeholder for GSAP) |
| `--ease-luxury` | All UI transitions |

### Spacing tokens

| Token | Value | Use |
|-------|-------|-----|
| `--spacing-section-sm` | 96px / 6rem | Mobile section padding, footer |
| `--spacing-section-md` | 128px / 8rem | Standard sections |
| `--spacing-section-lg` | 192px / 12rem | Atelier, Chronology |
| `--spacing-section-xl` | 256px / 16rem | Hero transitions, dial stage |
| `--spacing-content-max` | 1280px | Collection grid, spec tables |
| `--spacing-stage-max` | 1440px | Hero, dial revelation, chronology stage |

### Z-index tokens

| Token | Use in 2C |
|-------|-----------|
| `--z-sticky` (50) | Fixed header |
| `--z-raised` (10) | Active collection card lift |
| `--z-drawer` (200) | Mobile nav drawer / dial layer drawer |
| `--z-modal` (300) | Reserved — modal styling only in 2C if shell exists |

---

## 6. Navigation Styling

### Header structure (post-2C)

```txt
<header>                          fixed, top-0, w-full, z-sticky
  <div.container-stage>           flex, items-center, justify-between
    <Link.brand>                  Cormorant, type-card-heading or logo SVG
    <nav>                         hidden below lg, flex at lg+
      <ul>                        gap-8
        <Link.type-nav-label>     per HEADER_NAV_LINKS
    <a.concierge-cta>             type-nav-label + gold border pill (desktop only)
    <button.menu-toggle>          lg:hidden, 48×48, aria-expanded
```

### Visual spec

| State | Background | Height | Border |
|-------|------------|--------|--------|
| **Default (top of page)** | Transparent | 88px (`NAV.heightDefault`) | None |
| **Scrolled (> 80px)** | `.glass-dark` | 64px (`NAV.heightCompact`) | `border-b border-white/5` (0.5px) |
| **Mobile menu open** | `.glass-dark` full viewport overlay | 100dvh drawer | Left gold rule |

### Link styling

| Element | Class | Default | Hover / Active |
|---------|-------|---------|----------------|
| Primary nav links | `.type-nav-label` | `text-secondary` | `text-gold-400` |
| Brand mark | `.type-card-heading` or SVG | `text-primary` | No color change |
| Concierge CTA | `.type-nav-label` + button shell | Ghost outline | Gold border glow (`shadow-gold-sm`) |
| Current page | `aria-current="page"` | `text-gold-400` | — |

### Footer nav styling

| Element | Class | Notes |
|---------|-------|-------|
| Column headings | `.type-sub-heading` | Cormorant, secondary color |
| Footer links | `.type-body` or `.type-tag` | 15px Outfit, muted → primary on hover |
| Social links | `.type-nav-label` at reduced tracking | 12px caps |
| Legal links | `.type-caption` | 14px muted |

### Mobile nav behavior

- **< 1024px:** Primary links in slide-down drawer or full-screen overlay
- **≥ 1024px:** Inline horizontal list with `gap-8`
- Drawer uses `--z-drawer`; body scroll locked when open (`overflow-hidden` on `<body>`)
- Escape key closes drawer (accessibility requirement for client wrapper)

---

## 7. Button Styling

### Variants (implement on `Button.tsx`)

#### Primary (default) — Salon CTA, collection "Explore"

```txt
Structure:  <button> → <span.type-button-label>{children}</span>
Background: linear gradient zinc-800 → zinc-900 (or void-400 → void-500)
Border:     0.5px solid white/10
Radius:     --radius-crystal (pill) OR --radius-lg (rectangular — pick one, document in COMPONENTS.md)
Padding:    px-8 py-4 (min height 48px)
Shadow:     --shadow-raised default; --shadow-gold-sm on hover
Hover:      translateY(-2px); gold gradient overlay via ::before; border-gold-400/40
Active:     translateY(0); shadow-surface
Disabled:   opacity-40; pointer-events-none
Transition: --duration-slow, --ease-luxury
```

#### Ghost — secondary actions, header concierge

```txt
Background: transparent
Border:     0.5px solid gold-400/20
Text:       text-secondary → text-primary on hover
Hover:      bg-gold-400/6 (matches --glass-gold-bg)
```

#### Outline — tertiary, footer subscribe

```txt
Background: transparent
Border:     0.5px solid white/5
Text:       type-button-label, text-secondary
Hover:      border-white/15
```

### Button × typography

- All button text uses `.type-button-label` internally (12px, 600 weight, 0.15em tracking, uppercase)
- Never use Cormorant on buttons
- Icon buttons (future): 48×48 min, `aria-label` required

### Responsive

| Viewport | Behavior |
|----------|----------|
| Mobile | Full-width primary CTAs in Salon section; inline elsewhere |
| Desktop | Auto width with `min-w-[200px]` on primary CTAs |

---

## 8. Card Styling

### GlassCard (`components/ui/GlassCard.tsx`)

Used in Section 06 (Salon). Becomes the reference card primitive.

| Prop | `dark` (default) | `gold` |
|------|------------------|--------|
| Background | `--glass-dark-bg` | `--glass-gold-bg` |
| Blur | 20px | 16px |
| Border | `0.5px white/5` | `0.5px gold-400/20` |
| Radius | `--radius-2xl` (32px) | Same |
| Shadow | `--shadow-float` | `--shadow-gold-md` |
| Padding | `p-8 md:p-12` | Same |

Optional inner sheen: `::before` with `--gradient-card-sheen` at top edge.

### Watch Card (`StaticRenderer.tsx` / optional `Card.tsx`)

Collection slider card (Section 05):

| State | Visual |
|-------|--------|
| **Active** | Full opacity; scale 1; `.glass-dark` or solid `void-400`; gold micro-border on hover |
| **Inactive (desktop)** | `opacity-50`; `scale-95`; `blur-sm` on image |
| **Inactive (mobile)** | Hidden (`hidden md:block` for adjacents) |

Structure:

```txt
<figure.card-watch>
  <div.card-image>           aspect-[3/4], overflow-hidden, radius-lg
    [Image placeholder]       bg-void-400, gradient-gold-glow center
  <figcaption.card-meta>     p-6
    <span.type-reference-id>  HERITAGE_01
    <h3.type-card-heading>    Watch name
    <p.type-body>             Tagline
    <Button variant="ghost">  Explore →
```

### Era Card (Chronology — `StoryScroller.tsx`)

| Desktop | Mobile |
|---------|--------|
| Fixed width ~320px in horizontal track | Full-width stacked |
| `.glass-dark`, radius-xl | Same with `mb-6` stack gap |
| Gold connector SVG between cards | Left gold border rule replaces connector |

### Atelier Spec Panel

| Element | Treatment |
|---------|-----------|
| Panel container | No glass — editorial text on void background |
| Image | Full-bleed, radius-none or radius-sm |
| Spec block | `.type-section-label` eyebrow + `.type-section-heading` + `.type-body` |
| Divider | `border-t border-white/5` (0.5px) |

---

## 9. Spacing System

### Vertical rhythm (sections)

Map `SECTION_SPACING` from `layout.ts` to CSS utilities in `layout.css`:

| Utility class | Token | Mobile | Desktop (≥ sm) |
|---------------|-------|--------|----------------|
| `.section-pad-sm` | `sm` | `py-16` (64px) | `py-24` (96px) |
| `.section-pad-md` | `md` | `py-24` (96px) | `py-32` (128px) |
| `.section-pad-lg` | `lg` | `py-24` | `py-48` (192px) |
| `.section-pad-xl` | `xl` | `py-32` | `py-64` (256px) |

### Section → padding assignment

| Section | Padding class | Container |
|---------|---------------|-----------|
| Threshold | None (100dvh bleed) | `.container-bleed` |
| Dial Revelation | `.section-pad-xl` | `.container-stage` |
| Chronology | `.section-pad-lg` | `.container-stage` |
| Atelier | `.section-pad-lg` | `.container-content` |
| Collection | `.section-pad-md` | `.container-stage` |
| Salon | `.section-pad-md` | `.container-content` |
| Footer | `.section-pad-sm` | `.container-content` |

### Horizontal spacing

| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Nav padding | 20px (`NAV.horizontalPadding.mobile`) | 32px | 48px |
| Content inset | 20px | 32px | auto (centered container) |
| Grid gap | `gap-8` (32px) | `gap-8` | `gap-12` (48px) |
| Card internal padding | `p-5` | `p-6` | `p-8` |

### Grid system

12-column grid from `GRID` constants:

| Layout | Columns | Gap token |
|--------|---------|-----------|
| Footer links | 4 × col-3 | `GRID.gap.md` |
| Atelier editorial | 2 × col-6 | `GRID.gap.xl` |
| Collection slider | Flex, not grid | — |

### CSS custom properties to expose in `layout.css`

```css
--nav-height-default: 88px;
--nav-height-compact: 64px;
--nav-scroll-threshold: 80px;
--space-nav-px: 1.25rem;        /* responsive via media queries */
--container-content: 80rem;
--container-stage: 90rem;
```

---

## 10. Typography Application

### Canonical rule

**Use semantic `.type-*` classes on elements. Do not rely on unclassed `h1–p` tag defaults for homepage sections.**

### Homepage typography map

| Location | Element | Class | Notes |
|----------|---------|-------|-------|
| §01 Threshold | Headline | `.type-hero-display` | Single `<h1>` on page |
| §01 Threshold | Tagline | `.type-narrative-lead.text-center` | Below headline |
| §01–§06 | Section title | `.type-section-heading` | Always `<h2>` |
| §01–§06 | Eyebrow | `.type-section-label` + gold rule `::before` | Above each `<h2>` |
| §01–§06 | Intro paragraph | `.type-narrative-lead` | First paragraph only |
| §01–§06 | Body paragraphs | `.type-body` | Subsequent copy |
| §02 Dial | Layer labels | `.type-spec-label` + `.type-spec-value` | Side labels |
| §03 Chronology | Era title | `.type-card-heading` | Per era card |
| §03 Chronology | Era date | `.type-metadata` | |
| §03 Chronology | Era description | `.type-body` | |
| §04 Atelier | Philosophy title | `.type-card-heading` | `<h3>` |
| §04 Atelier | Description | `.type-body` | |
| §05 Collection | Watch name | `.type-card-heading` | `<h3>` |
| §05 Collection | Reference ID | `.type-reference-id` | |
| §05 Collection | Tagline | `.type-body` | |
| §05 Collection | Explore CTA | `.type-button-label` inside Button | |
| §06 Salon | Heading | `.type-section-heading` | |
| §06 Salon | Invitation copy | `.type-narrative-lead.prose-centered` | |
| §06 Salon | Address | `.type-caption` | `<address>` styled reset |
| Header nav | Links | `.type-nav-label` | |
| Footer | Column titles | `.type-sub-heading` | `<h3>` |
| Footer | Links | `.type-body` | |
| Footer | Newsletter heading | `.type-sub-heading` | |
| Footer | Legal | `.type-caption` | |

### Heading hierarchy (SEO compliance)

Per `HOMEPAGE_ARCHITECTURE.md` §6.3:

```txt
h1  →  Threshold headline only
h2  →  Each section title (Dial, Chronology, Atelier, Collection, Salon)
h3  →  Sub-items (watch names, era titles, footer columns, atelier panels)
h4  →  Spec sub-labels (optional)
```

### Fluid vs fixed sizing

| Role | Sizing | Reason |
|------|--------|--------|
| Display, H1–H5 | Fluid `clamp()` via `--text-fluid-*` | Cinematic scaling |
| Body, caps, micro | Fixed px | Reading stability |
| Button, nav labels | Fixed 12px | UI consistency |

### Prose width application

| Content type | Container class |
|--------------|-----------------|
| Salon invitation | `.prose-wide.prose-centered` |
| Section intros | `.prose.prose-centered` |
| Atelier descriptions | `.prose` |
| Spec tables | `.prose-tight` |

### Mobile typography overrides (from `typography.css` §11)

- Pull quotes: revert centered layout to left-rule block
- Section labels: tracking reduced to `0.20em`
- Prose containers: `max-width: 100%`
- Hero display: `line-height: 1.05` at ≤479px

---

## Success Criteria for Sprint 2C

| # | Criterion |
|---|-----------|
| 1 | `typography.css` and `layout.css` imported and functional |
| 2 | Header renders glass compact state on scroll without layout shift |
| 3 | Button and GlassCard match DESIGN_SYSTEM.md metal/glass aesthetic |
| 4 | All 7 homepage sections have correct spacing, containers, and typography roles |
| 5 | Mobile (< 768px) and desktop (≥ 1280px) both pass visual review at 375px and 1440px |
| 6 | Zero hard-coded hex colors or px spacing in components — tokens only |
| 7 | WCAG AA contrast on `text-primary` / `text-secondary` over `void-200` backgrounds |
| 8 | All interactive elements ≥ 48×48px tap target |
| 9 | Single `<h1>` preserved; heading hierarchy intact |
| 10 | `data-gsap` hooks untouched for Sprint 3 handoff |

---

## Suggested Task Breakdown (for tracking)

| ID | Task | Estimate |
|----|------|----------|
| 2C-01 | Wire CSS layers + fix typography.css | 3h |
| 2C-02 | Create layout.css utilities | 4h |
| 2C-03 | Button + GlassCard styling | 4h |
| 2C-04 | Header + mobile nav | 6h |
| 2C-05 | Footer grid + accordion | 4h |
| 2C-06 | Threshold + Salon sections | 4h |
| 2C-07 | Collection cards + Slider layout | 5h |
| 2C-08 | Atelier + Chronology + Dial shells | 6h |
| 2C-09 | Responsive + a11y pass | 4h |
| 2C-10 | Docs update + visual QA | 2h |

**Total estimate:** ~42 hours (~5 working days)

---

*Document status: Sprint 2C Reference — Pre-implementation blueprint.*
*Last updated: Sprint 2C planning.*
