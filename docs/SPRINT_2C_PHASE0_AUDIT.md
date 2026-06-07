# Sprint 2C Phase 0 — Design Token Audit & Implementation Proposal

**Status:** Phase 0 complete — audit + implementation (0.1–0.3).  
**Scope reviewed:** `docs/DESIGN_SYSTEM.md`, `app/globals.css`, `app/typography.css`, `lib/tokens/index.ts`, `lib/tokens/typography.ts`, `lib/constants/layout.ts`, `docs/SPRINT_2C_PLAN.md`, component scaffolds.

---

## Executive Summary

Levora has a **mature token architecture on paper** but an **incomplete wiring layer in production**. `globals.css` is the richest, most accurate CSS source of truth. `typography.css` and `layout.ts` define a complete semantic system that is **not connected to the app** (`typography.css` is never imported; `layout.css` does not exist). `DESIGN_SYSTEM.md` is **stale** and references token names that do not exist in Tailwind.

The highest-risk issue is **triple typography**: unclassed `h1–p` defaults in `globals.css`, legacy utility classes (`.text-caps-luxury`), and a full `.type-*` role system in `typography.css` — only the first layer is active today.

**Recommendation:** Treat `globals.css @theme` as the canonical CSS token registry, `.type-*` as the canonical typography application layer for Sprint 2C homepage work, and consolidate JS mirrors under `lib/tokens/` with explicit re-exports. Phase 1 should wire CSS layers; Phase 0 decisions below unblock that work.

---

## 1. Design Token Inventory

### 1.1 Color tokens

| Palette | `globals.css @theme` | `lib/tokens/index.ts` | `DESIGN_SYSTEM.md` | Tailwind utilities |
|---------|----------------------|------------------------|--------------------|--------------------|
| Gold 50–600 | ✅ | ✅ | Partial (50–600, no 50 in doc snippet) | `bg-gold-*`, `text-gold-*` |
| Silver 50–600 | ✅ | ✅ | Partial (100–400 only) | `bg-silver-*` |
| Void 000–500 | ✅ | ✅ | ❌ uses `luxury-*` instead | `bg-void-*` |
| Ink 100–300 | ✅ | ✅ | ❌ not documented | `bg-ink-*` |
| Text primary/secondary/muted/gold/inverse | ✅ | ✅ | ❌ `luxury-text-*` | `text-text-primary` etc. |
| State success/warning/error/info | ✅ | ✅ | ❌ not documented | `text-state-*` |
| Cloud palette | ❌ mentioned in comment only | ❌ | ❌ | — |

**Hex values align** where palettes overlap (gold, silver, text colors match between doc and code). Neutral naming diverges entirely (`luxury-black` → `void-50`, `luxury-slate-900` → `void-200`, etc.).

### 1.2 Gradient tokens

| Token | `globals.css` | Utility class | JS mirror |
|-------|---------------|---------------|-----------|
| `--gradient-gold-metallic` | ✅ | `.bg-gradient-gold` | ❌ |
| `--gradient-silver-metallic` | ✅ | `.bg-gradient-silver` | ❌ |
| `--gradient-gold-glow` | ✅ | — | ❌ |
| `--gradient-page-ambient` | ✅ | `.bg-gradient-ambient` | ❌ |
| `--gradient-card-sheen` | ✅ | — | ❌ |

`DESIGN_SYSTEM.md` documents the first three conceptually; glow opacity differs slightly (0.08 vs 0.10 in code).

### 1.3 Typography scale tokens (static)

| Token | `globals.css` | `index.ts typography.size` | `typography.ts fontSize` |
|-------|---------------|------------------------------|--------------------------|
| display (5rem) | ❌ | ❌ | ✅ |
| h1–h4 | ✅ | ✅ | ✅ |
| h5 (1.125rem) | ❌ | ❌ | ✅ |
| body-lg/body/body-sm | ✅ | ✅ | ✅ |
| caps/micro | ✅ | ✅ | ✅ |
| nano (0.625rem) | ❌ | ❌ | ✅ |

### 1.4 Fluid typography tokens

Defined in **`typography.css @theme`** and **`typography.ts fluidFontSize`** — identical clamp values. **Not imported**, so Tailwind does not generate `text-fluid-*` utilities and `.type-*` classes referencing them are inactive.

### 1.5 Motion, z-index, shadows, radius, glass

| Category | `globals.css @theme` | `index.ts` | Notes |
|----------|---------------------|------------|-------|
| Durations (7) | ✅ | ✅ | Values match |
| Easing (6) | ✅ | ✅ | Values match |
| Z-index (10 layers) | ✅ | ✅ | Values match |
| Shadows (11) | ✅ | ✅ | Values match |
| Radius (7) | ✅ | ✅ | Values match |
| Glass presets (3 variants) | ✅ | ✅ + `.glass-*` classes | Values match |

### 1.6 Spacing / layout tokens

| Token | `globals.css` | `layout.ts` | `layout.css` | `index.ts` |
|-------|---------------|-------------|--------------|------------|
| `--spacing-section-sm/md/lg/xl` | ✅ | ✅ `SECTION_SPACING` | ❌ file missing | ❌ |
| `--spacing-content-max` (1280px) | ✅ | ✅ `CONTAINER.content` | ❌ | ❌ |
| `--spacing-stage-max` (1440px) | ✅ | ✅ `CONTAINER.stage` | ❌ | ❌ |
| Nav height/threshold/padding | ❌ | ✅ `NAV` | ❌ planned | ❌ |
| Grid 12-col + gaps | ❌ | ✅ `GRID` | ❌ planned | ❌ |
| Footer constants | ❌ | ✅ `FOOTER` | ❌ | ❌ |
| Breakpoints | ❌ (CSS media queries only) | ✅ `BREAKPOINTS` | ❌ planned | partial in `typography.ts` |

### 1.7 Runtime wiring state

```txt
app/layout.tsx
  └── imports globals.css ONLY
        └── @import "tailwindcss"
        └── NO typography.css
        └── NO layout.css

Components: unstyled scaffolds — no .type-* or token utilities applied yet
```

---

## 2. Typography Configuration Audit

### 2.1 Three parallel systems (conflict)

| Layer | Location | Active? | Purpose |
|-------|----------|---------|---------|
| **A. Element defaults** | `globals.css` `h1–p` | ✅ Yes | Auto-styles all unclassed headings/paragraphs |
| **B. Legacy utilities** | `globals.css` `.text-caps-luxury`, `.text-section-label` | ✅ Yes | Caps labels, section eyebrows |
| **C. Semantic roles** | `typography.css` `.type-*` (30+ classes) | ❌ Not imported | Canonical Sprint 2C target |

**Problem:** Applying `.type-body` on a `<p>` still inherits nothing from layer C today. Unclassed `<p>` gets `letter-spacing: 0.08em` from layer A, which contradicts both DESIGN_SYSTEM (0.01em) and `.type-body` (0em).

### 2.2 Semantic role coverage

**`typography.css` classes (30):**  
`.type-hero-display`, `--italic`, `.type-page-heading`, `.type-section-heading`, `.type-card-heading`, `.type-sub-heading`, `.type-editorial-heading`, `.type-narrative-lead`, `.type-body`, `--rich`, `.type-caption`, `--credit`, `.type-section-label`, `.type-nav-label`, `.type-button-label`, `.type-tag`, `.type-spec-label`, `.type-spec-value`, `.type-price`, `--large`, `.type-metadata`, `.type-reference-id`, `.type-badge`, `--silver`, `.type-pull-quote`, `--large`, `.type-chapter-marker`, `.type-story-intro`, `.type-story-body`

**`typography.ts typeRoles` (18):** Missing CSS equivalents for `type-editorial-heading`, `type-tag`, `type-story-intro`, `type-story-body`. Maps `priceDisplay` → `.type-price` (naming asymmetry).

### 2.3 Tracking / leading drift

| Context | `globals.css` | `typography.css` | `typography.ts` | DESIGN_SYSTEM |
|---------|---------------|------------------|-----------------|----------------|
| Body letter-spacing | `p`: **0.08em** (`--tracking-wide`) | `.type-body`: **0em** | **0em** | **0.01em** |
| H4 / metadata tracking | — | **0.06em** hardcoded | **`open` = 0.06em** | — |
| Caps tracking | `--tracking-luxury` 0.15em | 0.15em | 0.15em | 0.15em ✅ |
| Narrative lead leading | — | **1.9** | **`relaxed` = 1.9** | — |
| Pull-quote leading | — | **2.2** | **`loose` = 2.2** | — |
| `--leading-loose` in globals | **2.0** | — | **`loose` = 2.2** | ⚠️ name collision, different values |

### 2.4 Broken / risky CSS

| Issue | File | Impact |
|-------|------|--------|
| `composes: type-hero-display` | `typography.css:145` | Invalid in plain CSS — `.type-hero-display--italic` gets italic only, not display sizing |
| `font-weight: 100` on `.type-chapter-marker` | `typography.css:585` | Cormorant loaded at 300–600 only (`fonts.ts`) — renders as 300, not featherlight |
| Duplicate `.text-gold` | `globals.css:574` + `typography.css:754` | Modifier in typography uses `!important`; utility in globals does not |
| `@theme inline` in unimported file | `typography.css:36` | Fluid tokens never registered with Tailwind |

### 2.5 Font loading

- **Cormorant Garamond:** weights 300, 400, 500, 600 + italic → `--font-display` ✅
- **Outfit:** variable font → `--font-body` ✅
- **Mono stack:** defined in `typography.css @theme` as `--font-mono`, not in `globals.css` or `fonts.ts`

### 2.6 Prose width system

Defined in `typography.ts proseWidth` and `typography.css @theme` + `.prose-*` classes. Inactive until import. `.type-body` embeds `max-width: var(--prose-standard)` — couples role + width (acceptable, but modifiers like `.prose-centered` needed separately).

---

## 3. Layout Architecture Audit

### 3.1 `lib/constants/layout.ts` — complete JS spec

Well-structured constants for breakpoints, containers, nav geometry, section spacing, grid, footer. **Documented consumer:** `layout.css` — **file does not exist**.

### 3.2 Breakpoint duplication

| Key | `layout.ts BREAKPOINTS` | `typography.ts breakpoints` |
|-----|-------------------------|-------------------------------|
| mobileMin 375 | ✅ | ✅ |
| mobileLg 480 | ✅ | ✅ |
| sm 640 | ✅ | ❌ |
| md/tablet 768 | ✅ | ✅ (as `tablet`) |
| lg 1024 | ✅ | ✅ (as `desktopSm`) |
| xl 1280 | ✅ | ✅ (as `desktop`) |
| 2xl 1440 | ✅ | ✅ (as `desktopWide`) |
| ultraWide 1920 | ✅ | ✅ |

**Risk:** GSAP and CSS media queries may use different breakpoint keys if developers import from the wrong file.

### 3.3 Missing layout CSS surface

Planned but absent (from Sprint 2C plan):

- `.container-content`, `.container-stage`, `.container-bleed`
- `.section-pad-sm/md/lg/xl`
- `.grid-12`
- CSS custom properties: `--nav-height-default`, `--nav-height-compact`, `--nav-scroll-threshold`, `--space-nav-px`

`globals.css` already declares `--spacing-section-*` and `--spacing-content-max` / `--spacing-stage-max` in `@theme`, but no semantic layout utility classes consume them.

---

## 4. Missing Tokens

### 4.1 CSS `@theme` gaps (add to `globals.css` or consolidated theme)

| Token | Needed for | Priority |
|-------|------------|----------|
| `--text-fluid-display` through `--text-fluid-h5` | Hero/heading scaling | High — move from orphaned `typography.css @theme` |
| `--font-mono` | `.type-reference-id` | Medium |
| `--prose-tight/standard/wide/max` | Prose containers | Medium |
| `--text-display`, `--text-h5`, `--text-nano` | Static fallbacks, badge sizing | Low |
| `--nav-height-default/compact`, `--nav-scroll-threshold` | Header offset, hero `min-h-dvh` | High — Phase 2 |
| `--container-content`, `--container-stage` | Layout utilities | High — Phase 1 |
| `--space-nav-px` (responsive) | Nav horizontal padding | Medium |

### 4.2 JS mirror gaps (`lib/tokens/index.ts`)

Missing exports that animation/layout code will need:

- `spacing` / `sectionSpacing` (mirror `SECTION_SPACING`)
- `layout` (mirror `CONTAINER`, `NAV`, `GRID`, `BREAKPOINTS` — re-export from `layout.ts` or duplicate)
- `gradients` (for inline styles / GSAP)
- Re-export of `typography.ts` (`typeRoles`, `fluidFontSize`, `proseWidth`)
- `breakpoints` — single canonical export (dedupe with `layout.ts`)

### 4.3 Documentation gaps

- `DESIGN_SYSTEM.md`: entire neutral palette, ink scale, state colors, motion, z-index, glass variants
- `DESIGN_SYSTEM.md`: no fluid typography, no `.type-*` role map
- No token migration table (`luxury-*` → `void-*`)

---

## 5. Conflicting Tokens

### 5.1 Naming conflicts (doc vs code)

| DESIGN_SYSTEM.md | Canonical (globals.css) | Action |
|------------------|-------------------------|--------|
| `--color-luxury-black` | `--color-void-50` | Doc alias table |
| `--color-luxury-slate-900` | `--color-void-200` | Doc alias table |
| `--color-luxury-slate-800` | `--color-void-400` | Doc alias table |
| `--color-luxury-charcoal` | `--color-void-300` | Doc alias table |
| `--color-luxury-text-primary` | `--color-text-primary` | Doc alias table |
| `bg-luxury-black/60` | `bg-void-200/60` or `.glass-dark` | Doc + examples |

### 5.2 Typography conflicts

| Conflict | Resolution (proposed) |
|----------|----------------------|
| Unclassed `p` uses `tracking-wide` (0.08em) | Remove from global `p`; scope to legacy utility or delete |
| `.text-section-label` (globals) vs `.type-section-label` (typography.css) | Deprecate globals utility; keep `.type-section-label` |
| `.text-caps-luxury` vs `.type-nav-label` / `.type-button-label` | Deprecate globals utility |
| `--leading-loose: 2.0` vs `lineHeight.loose: 2.2` | Rename one token (`--leading-editorial: 2.2`) |
| `--tracking-wide: 0.08em` vs `letterSpacing.open: 0.06em` | Rename `--tracking-wide` → `--tracking-label` (0.08em for `.type-tag`); use `--tracking-open: 0.06em` consistently |
| Duplicate `typography` export in `index.ts` vs full `typography.ts` | Remove partial duplicate; re-export from `typography.ts` |

### 5.3 Structural conflicts

| Conflict | Resolution |
|----------|------------|
| Spacing in both `globals.css @theme` and planned `layout.css` | `@theme` owns values; `layout.css` owns utility classes referencing them |
| Breakpoints in `typography.ts` and `layout.ts` | **`layout.ts` is canonical**; typography imports or re-exports |
| `@theme inline` in two CSS files | **Single `@theme` block in `globals.css`** for all Tailwind-generatable tokens; `typography.css` contains only `.type-*` classes |

### 5.4 Tailwind utility naming quirk

Semantic text colors generate as `text-text-primary` (double "text"). This is correct Tailwind v4 behavior given `--color-text-primary`, but reads awkwardly. **Keep as-is** — renaming would break `layout.tsx` (`text-text-primary` already in use).

---

## 6. Proposed Final Token Structure

### 6.1 Layer model

```txt
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1 — @theme registry (app/globals.css)                │
│  Colors, spacing, motion, shadows, radius, glass, static type │
│  + fluid type tokens + layout dimension tokens                │
│  → Generates Tailwind utilities                             │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2 — Semantic CSS (app/typography.css)                │
│  .type-* roles, .prose-*, modifiers (.text-gradient-gold)   │
│  NO @theme block (avoid split registration)                 │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3 — Structural CSS (app/layout.css) [NEW]            │
│  .container-*, .section-pad-*, .grid-12, nav geometry vars  │
│  References @theme custom properties only                   │
├─────────────────────────────────────────────────────────────┤
│  LAYER 4 — Composed utilities (app/globals.css tail)        │
│  .glass-*, .bg-gradient-*, .transition-luxury, .will-animate │
│  (Keep; deprecate legacy typography utilities)              │
├─────────────────────────────────────────────────────────────┤
│  LAYER 5 — JS mirrors (lib/tokens/)                         │
│  index.ts      → colors, motion, z, shadows, glass, radius  │
│  typography.ts → typeRoles, fluidFontSize, proseWidth       │
│  layout.ts     → BREAKPOINTS, CONTAINER, NAV, GRID (exists)  │
│  index.ts re-exports all; no duplicated partial mirrors     │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Source-of-truth hierarchy

1. **CSS runtime truth:** `globals.css @theme`
2. **Typography application truth:** `.type-*` classes (not unclassed tags)
3. **JS animation truth:** `lib/tokens/*` (must match CSS numerically)
4. **Human-readable spec:** `DESIGN_SYSTEM.md` (updated to mirror globals, not vice versa)

### 6.3 Typography strategy (Phase 0 decision)

| Rule | Detail |
|------|--------|
| **Canonical for homepage (Sprint 2C)** | Explicit `.type-*` on every text element in homepage sections |
| **Global tag defaults** | Reduce to minimal reset: inherit color/font from `body`; **remove** `h1–p` sizing from globals OR scope under `.prose-legacy` wrapper |
| **Legacy utilities** | Mark `.text-caps-luxury`, `.text-section-label` deprecated; remove in Phase 7 doc pass |
| **Tailwind type utilities** | Use for one-off overrides only (`text-gold-400`, `font-display`); not for full roles |
| **Single `<h1>`** | `.type-hero-display` on Threshold; other sections use `h2.type-section-heading` |

### 6.4 Token naming convention (final)

```txt
CSS custom property:     --[category]-[name]-[variant]
Tailwind color utility:  bg-void-200, text-gold-400, text-text-primary
Semantic type class:     .type-[role]  (--modifier for variants)
Layout utility:          .container-[mode], .section-pad-[size]
JS export:               colors.void[200], typeRoles.sectionHeading
```

### 6.5 Complete `@theme` registry (proposed additions to globals.css)

Merge fluid tokens from `typography.css` and layout dimension tokens from `layout.ts`:

```css
/* Fluid type — from typography.css */
--text-fluid-display, --text-fluid-h1 … --text-fluid-h5

/* Static gaps */
--text-display: 5rem;
--text-h5: 1.125rem;
--text-nano: 0.625rem;

/* Mono + prose */
--font-mono: …;
--prose-tight/standard/wide/max: …;

/* Layout dimensions — mirror layout.ts */
--nav-height-default: 88px;
--nav-height-compact: 64px;
--nav-scroll-threshold: 80px;
--container-content: 80rem;
--container-stage: 90rem;
--space-nav-px: 1.25rem;  /* override at breakpoints in layout.css */
```

---

## 7. CSS Wiring Strategy (Phase 1 preview)

### 7.1 Import chain

```css
/* app/globals.css */
@import "tailwindcss";
@import "./typography.css";
@import "./layout.css";
```

Import order matters: Tailwind base first, then semantic layers, then structural utilities. All three loaded once via `layout.tsx` → `globals.css` (no direct typography import in layout).

### 7.2 File responsibilities after wiring

| File | Contains | Does NOT contain |
|------|----------|------------------|
| `globals.css` | Full `@theme`, `:root`/`body`, glass/gradient utilities, transitions | `.type-*` classes |
| `typography.css` | `.type-*`, `.prose-*`, responsive type overrides, `.text-gradient-*`, `.sr-only` | `@theme` block (relocate tokens to globals) |
| `layout.css` | Container/section/grid/nav utilities, responsive `--space-nav-px` | Color or typography definitions |

### 7.3 Phase 0 fixes deferred to Phase 1 (implementation queue)

1. Remove `@theme inline` block from `typography.css`; merge tokens into `globals.css`
2. Fix `.type-hero-display--italic` — duplicate base properties or use multiple classes (`type-hero-display type-hero-display--italic`)
3. Fix chapter marker weight → `300` or add weight `100` to Cormorant loader
4. Scope or remove global `h1–p` rules
5. Fix `p { letter-spacing }` → `var(--tracking-normal)`
6. Deprecate `.text-caps-luxury` / `.text-section-label` in comments

---

## 8. Tailwind v4 Integration Strategy

### 8.1 How tokens become utilities today

Tailwind v4 reads `@theme inline` in CSS. Registered tokens generate utilities automatically:

| `@theme` variable | Generated utility examples |
|-------------------|---------------------------|
| `--color-void-200` | `bg-void-200`, `text-void-200`, `border-void-200` |
| `--color-text-primary` | `text-text-primary` |
| `--spacing-section-md` | `py-section-md`, `p-section-md` (if in spacing namespace) |
| `--font-display` | `font-display` |
| `--text-h1` | `text-h1` |
| `--shadow-float` | `shadow-float` |
| `--radius-2xl` | `rounded-2xl` |
| `--duration-luxury` | `duration-luxury` |
| `--z-sticky` | `z-sticky` |

### 8.2 What stays as custom CSS classes (not Tailwind utilities)

| Pattern | Reason |
|---------|--------|
| `.type-*` semantic roles | Multi-property bundles; not expressible as utility composition |
| `.glass-dark/gold/frost` | Multi-property (bg + blur + border + shadow) |
| `.bg-gradient-gold` | Gradients are `--gradient-*` props, not `@theme` colors |
| `.transition-luxury` | Multi-property transition bundles |
| `.container-content` | Max-width + horizontal padding + centering |

### 8.3 Component styling pattern (Sprint 2C)

```tsx
/* Preferred */
<h2 className="type-section-heading">The Atelier</h2>
<section className="section-pad-lg container-content bg-void-200">
<button className="glass-dark rounded-2xl shadow-float duration-slow">

/* Avoid */
<h2 className="font-display text-h2 tracking-normal">  /* partial role */
<p>Unstyled paragraph inheriting global p rules</p>
```

### 8.4 `@apply` policy

Use `@apply` sparingly in `layout.css` for structural repeats (e.g. container centering). **Do not** `@apply` typography utilities into `.type-*` — keep explicit properties referencing CSS variables for debuggability and GSAP compatibility.

### 8.5 Font variable circular reference

Current pattern is correct for Tailwind v4 + `next/font`:

```css
/* globals.css @theme */
--font-display: var(--font-display), "Georgia", serif;
```

Next.js sets `--font-display` on `<html>`; `@theme` registers the Tailwind `font-display` utility. No change needed.

### 8.6 PostCSS pipeline

Already configured: `tailwindcss` v4 + `@tailwindcss/postcss`. No additional config file required if `@import "tailwindcss"` remains the entry point.

---

## 9. Implementation Proposal — Phased Execution

### Phase 0 completion

| # | Decision / task | Status |
|---|-----------------|--------|
| 0.1 | `globals.css @theme` = canonical CSS tokens | ✅ Decided |
| 0.2 | `.type-*` = canonical typography application | ✅ Decided + documented in `globals.css`, `typography.css` |
| 0.3 | `layout.ts` = canonical breakpoints/layout numbers | ✅ Decided |
| 0.4 | Deprecate `luxury-*` naming in docs | ✅ `DESIGN_SYSTEM.md` updated with migration table |
| 0.5 | Single `@theme` block (no split across files) | ✅ Decided — implement in Phase 1 |
| 0.6 | Merge fluid tokens into globals before import wiring | ✅ Decided — implement in Phase 1 |
| 0.7 | Fix `composes` in `typography.css` | ✅ Modifier pattern (`type-hero-display type-hero-display--italic`) |
| 0.8 | Deprecate `.text-caps-luxury`, `.text-section-label` | ✅ Comments in `globals.css` |
| 0.9 | Align legacy `p` letter-spacing with `.type-body` | ✅ `tracking-normal` |

### Phase 1 — CSS layer wiring (~3 hrs)

1. Consolidate `@theme` tokens into `globals.css`
2. Strip `@theme` from `typography.css`
3. Create `layout.css` with container/section/grid/nav utilities
4. Add import chain to `globals.css`
5. Fix `composes`, italic variant, chapter-marker weight

### Phase 2 — Layout foundation (~4 hrs)

1. Apply shell classes to `layout.tsx` (`padding-top: var(--nav-height-default)`)
2. Scope/remove global `h1–p` defaults
3. Fix `p` letter-spacing conflict

### Phase 3+ — Per Sprint 2C plan

UI primitives → layout components → homepage sections → responsive pass → docs

### Documentation deliverables (Phase 7, but start tracking now)

1. Update `DESIGN_SYSTEM.md` with void/ink/text token map + migration table
2. Add `.type-*` role table to `COMPONENTS.md`
3. Add token sync checklist: "change globals.css → update index.ts → update typography.ts if role affected"

---

## 10. Risk Register (carried into implementation)

| Risk | Severity | Mitigation |
|------|----------|------------|
| Triple typography cascade | **High** | Scope tag defaults; enforce `.type-*` in homepage |
| Split `@theme` blocks | **High** | Consolidate before wiring |
| JS/CSS drift | **Medium** | Single re-export barrel; PR checklist |
| Breakpoint duplication | **Medium** | Import `BREAKPOINTS` from `layout.ts` everywhere |
| `text-text-primary` awkwardness | **Low** | Document; do not rename mid-sprint |
| Font weight 100 unavailable | **Low** | Use 300 or extend font loader |
| Inactive typography.css gives false confidence | **High** | Wire imports in Phase 1 before any styling work |

---

## Appendix A — Token sync matrix (globals.css ↔ index.ts)

| Category | In sync? |
|----------|----------|
| colors | ✅ |
| motion | ✅ |
| z | ✅ |
| shadows | ✅ |
| glass | ✅ |
| radius | ✅ |
| typography (partial in index.ts) | ⚠️ missing display, h5, nano, fluid |
| spacing/section | ❌ CSS only |
| gradients | ❌ CSS only |
| layout/nav/grid | ❌ layout.ts only |
| typeRoles | ❌ typography.ts only |

---

## Appendix B — Legacy → canonical quick reference

| Legacy | Canonical |
|--------|-----------|
| `luxury-black` | `void-50` |
| `luxury-slate-900` | `void-200` |
| `luxury-slate-800` | `void-400` |
| `luxury-charcoal` | `void-300` |
| `luxury-text-primary` | `text-text-primary` |
| `.text-caps-luxury` | `.type-nav-label` or `.type-button-label` |
| `.text-section-label` | `.type-section-label` |
| Unclassed `h2` | `h2.type-section-heading` |

---

*Document status: Sprint 2C Phase 0 — Complete. Next: Phase 1 CSS layer wiring.*  
*Cross-references: `docs/SPRINT_2C_PLAN.md`, `docs/DESIGN_SYSTEM.md`, `docs/HOMEPAGE_ARCHITECTURE.md`*
