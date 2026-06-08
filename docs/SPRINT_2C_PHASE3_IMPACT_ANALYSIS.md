# Sprint 2C Phase 3 — Commerce Impact Analysis

**Document ID**: IMPACT-ANALYSIS-2C-P3  
**Status**: Reference — Do Not Implement Until Approved  
**Date**: 2026-06-08  
**Scope**: Impact of dual-tier commerce system (ARCH-AMD-001 + COMMERCE_ROADMAP.md) on current Sprint 2C deliverables  
**Cross-references**: `ARCHITECTURE_AMENDMENT_001.md` · `COMMERCE_ROADMAP.md` · `HOMEPAGE_ARCHITECTURE.md` · `COMPONENTS.md` · `DATABASE_SCHEMA.md`

---

## Executive Summary

The dual-tier product system (Heritage Concierge + Signature Direct) introduces significant structural additions across the homepage, component library, routing layer, and Firestore schema. The analysis concludes that the majority of commerce additions belong **in Sprint 3**, with a narrow set of low-risk preparatory changes that can be completed as **Sprint 2C Phase 3** prior to Sprint 3 kickoff. No commerce additions should be implemented after Sprint 3.

---

## 1. Homepage Changes Required

### 1.1 Section 05 — The Collection (High Impact)

**Current State** (`HOMEPAGE_ARCHITECTURE.md §2, §3`):  
A single draggable slider presents all 7 Heritage watches. Every card has a single generic "Explore" CTA linking to `/collections/heritage/[slug]`. There is no purchase intent mechanism on this section.

**Required Changes for Dual-Tier**:

| Element | Change | Priority |
|:---|:---|:---|
| Section header | Add collection identity label ("Heritage" vs "Signature") to orient the visitor | Medium |
| `CollectionToggle` | New tab/toggle control to switch between Heritage and Signature sliders | High |
| Heritage slider | Existing slider retained. CTA relabelled: *"Request Private Consultation"* → triggers `ConciergeInquiryModal` | High |
| Signature slider | **Entirely new** slider instance. CTA: *"Add to Collection"* → calls `CartContext.addItem()` | High |
| CTA logic | Per-card CTA must branch on `watch.checkoutType`: `"concierge_inquiry"` → modal; `"direct_checkout"` → cart | High |
| Data source | Section 05 currently reads from static `lib/constants/collection.ts`. Signature data requires Firestore or new constants | Medium |

**Risk**: Section 05 is currently the most interaction-heavy part of the homepage. Adding a toggle and a parallel Signature slider is a structural change that will require layout and component work. This is not a minor amendment.

---

### 1.2 Section 06 — The Private Salon (No Change)

The Salon section (`#salon`) is Heritage-only by intent. Copy, CTA, and the `ConciergeInquiryModal` trigger remain unchanged. The Salon does **not** need to be modified to support Signature.

---

### 1.3 Section 01–04, 07 — No Changes Required

Sections 01 (Threshold), 02 (Dial Revelation), 03 (Chronology), 04 (Atelier), and 07 (Footer) have no commerce dependency. They are purely narrative and brand-building in function. No changes required.

---

## 2. Collection Page Changes Required

**Current State**: `HOMEPAGE_ARCHITECTURE.md §9` defines `/collections/heritage/[slug]` individual watch pages as Sprint 2 deliverables. No collection listing page is built yet.

**Required Additions for Dual-Tier**:

| Route | Change Type | Description |
|:---|:---|:---|
| `/collections` | **New** | Top-level collection listing. Must show both Heritage and Signature collection cards, each linking to their respective listing pages |
| `/collections/heritage` | **New** | Heritage Collection listing page. 7-watch grid. No cart, no pricing display. CTA per card: *"Request Private Consultation"* |
| `/collections/heritage/[slug]` | **New** (planned Sprint 2) | Individual Heritage watch detail page. Full specifications, layered dial showcase, `ConciergeInquiryModal` |
| `/collections/signature` | **New** | Signature Collection listing page. Grid of watches with prices displayed. CTA per card: *"Add to Collection"* → cart |
| `/collections/signature/[slug]` | **New** | Individual Signature watch detail page. Specifications, gallery, pricing, *"Add to Collection"* button |

**Key Distinction**: Heritage detail pages must **not** display pricing publicly (price-on-application). Signature detail pages must display pricing clearly with an add-to-cart mechanism.

---

## 3. Navigation Changes Required

**Current State** (`COMPONENTS.md §1`): Header is a glassmorphic floating component with scroll-aware hide/reveal. Navigation links are sourced from `lib/constants/navigation.ts`. No cart element exists.

**Required Changes**:

| Element | Change | Component |
|:---|:---|:---|
| Collections nav item | Current single "Collections" link must expand into a dropdown listing both Heritage and Signature collections | `Header.tsx` |
| Cart icon | **New** — appears in the right region of the header nav. Shows a badge with item count from `CartContext`. Visible only when Signature items exist in cart | `Header.tsx` + new `CartIcon.tsx` |
| Cart icon visibility | Must be conditionally rendered. If user has no Signature items in cart, icon is hidden to preserve the ultra-luxury aesthetic | `Header.tsx` |
| Footer nav | `FOOTER_NAV_SECTIONS` constant must add a "Signature Collection" entry under the Collections column | `Footer.tsx` + `navigation.ts` |
| Mobile nav | Collections dropdown needs mobile treatment (accordion or sub-drawer) | `Header.tsx` |

**Risk**: The cart icon is a new visual element in the header. Its introduction must be handled with extreme care to preserve the glassmorphic, restraint-first aesthetic. A badge count that feels garish or e-commerce-generic would undermine brand values.

---

## 4. Component Changes Required

### 4.1 Modified Components

| Component | Current State | Required Change |
|:---|:---|:---|
| `Header.tsx` | Scroll-aware nav, logo transition, no cart | Add `CartIcon` integration; add Collections dropdown |
| `Modal.tsx` | Generic overlay frame | Extend to support `CheckoutModal` variant (form layout differs significantly from `ConciergeInquiryModal`) |
| `Button.tsx` | Single luxury button primitive | Needs a `variant` prop to distinguish "Consultation" (Heritage, muted gold) vs "Add to Collection" (Signature, slightly brighter) |
| `WatchContainer.tsx` | Polymorphic renderer selector (renderType → component) | Must also accept `checkoutType` prop to pass down to `WatchMeta` overlay for CTA branching |
| `StaticRenderer.tsx` | Static image card with "Explore" CTA | Needs to expose `checkoutType`-aware CTA via props |
| `Slider.tsx` | Single-collection drag slider | Must accept a `collectionTier` prop or be instantiable twice side-by-side under `CollectionToggle` |

### 4.2 New Components Required

| Component | Path | Description |
|:---|:---|:---|
| `CollectionToggle` | `components/ui/CollectionToggle.tsx` | Tab toggle: "Heritage" \| "Signature". Controls which slider is active in Section 05 |
| `CartIcon` | `components/ui/CartIcon.tsx` | Header badge showing Signature cart item count |
| `CartDrawer` | `components/ui/CartDrawer.tsx` | Slide-in right-side panel showing cart items, subtotal, checkout CTA |
| `CartItem` | `components/ui/CartItem.tsx` | Single line-item row inside `CartDrawer` |
| `MiniCart` | `components/ui/MiniCart.tsx` | Desktop hover dropdown from `CartIcon` showing item count + subtotal |
| `CheckoutModal` | `components/ui/CheckoutModal.tsx` | Full checkout overlay: shipping address form + order summary |
| `OrderSummary` | `components/ui/OrderSummary.tsx` | Itemised line-item + tax breakdown inside `CheckoutModal` |
| `OrderConfirmation` | `components/ui/OrderConfirmation.tsx` | Post-payment success screen with `orderRef` display |
| `PaymentButton` | `components/ui/PaymentButton.tsx` | Razorpay modal trigger button with loading state |
| `ConciergeInquiryModal` | `components/ui/ConciergeInquiryModal.tsx` | Already referenced in docs. Needs to be formally built if not yet existing |

### 4.3 New Context / State

| File | Description |
|:---|:---|
| `context/CartContext.tsx` | React Context managing Signature cart state, `localStorage` sync, Firestore sync for authenticated users |

---

## 5. Firestore Schema Additions Required

All changes are **additive only**. No existing fields are modified or removed.

### 5.1 `/collections/{collectionId}` — Add Fields

| Field | Type | Required For |
|:---|:---|:---|
| `purchaseTier` | `"concierge" \| "direct"` | Routing and UI branching |
| `maxInventory` | `number \| null` | Stock display and admin reporting |
| `isPubliclyListed` | `boolean` | Future membership gating |
| `launchDate` | `timestamp \| null` | Pre-launch countdown |

### 5.2 `/watches/{watchId}` — No Field Changes

`checkoutType` already exists and covers both tiers. The field is the **single source of truth** for purchase routing.

### 5.3 `/orders/{orderId}` — Add Fields

| Field | Type | Required For |
|:---|:---|:---|
| `orderRef` | `string` | Human-readable order reference (`LVR-YYYY-XXXXXX`) |
| `tier` | `"heritage" \| "signature"` | Admin dashboard filtering |
| `subtotal` | `number` | Pre-tax amount display |
| `tax` | `number` | GST line item |
| `conciergeInfo` | `ConciergeInfo \| null` | Heritage-specific consultation tracking |
| `notes` | `string \| null` | Customer note at checkout |
| `adminNotes` | `string \| null` | Internal specialist notes |

Extended `status` enum — full list defined in `ARCHITECTURE_AMENDMENT_001.md §3.4`.

### 5.4 `/carts/{cartId}` — New Collection

Entirely new. Full schema defined in `ARCHITECTURE_AMENDMENT_001.md §2.3`. Required for Signature cart persistence for authenticated users.

### 5.5 Security Rules — Additions Required

```
/carts/{cartId}:
  allow read, write: if isSignedIn() && request.auth.uid == cartId
```

Guest cart writes go exclusively through the Admin SDK via Server Actions.

---

## 6. Routing Additions Required

| Route | Type | Purpose | Sprint |
|:---|:---|:---|:---|
| `/collections` | New page | Both-tier collection listing | Sprint 3 |
| `/collections/heritage` | New page | Heritage listing (7 watches, concierge CTA) | Sprint 3 |
| `/collections/heritage/[slug]` | Dynamic page | Individual Heritage watch detail | Sprint 3 |
| `/collections/signature` | New page | Signature listing with pricing and cart CTA | Sprint 3 |
| `/collections/signature/[slug]` | Dynamic page | Individual Signature watch detail | Sprint 3 |
| `/cart` | New page | Full cart page (fallback for narrow viewports) | Sprint 3 |
| `/checkout` | New page | Dedicated checkout page (SEO + deep-link accessible) | Sprint 3 |
| `/orders/[orderRef]` | Dynamic page | Post-purchase order confirmation and status tracking | Sprint 3 |
| `/account/orders` | Protected page | Authenticated order history dashboard | Sprint 3+ |

---

## 7. Conflicts with Existing Architecture

### 7.1 Conflict: Section 05 Slider is Heritage-Only

**Current**: `HOMEPAGE_ARCHITECTURE.md §3` documents Section 05 as a single `Slider` containing `WatchContainer × 7` Heritage watches with a generic "Explore" CTA.

**Conflict**: Dual-tier requires two parallel sliders with distinct CTAs and a toggle control. The current architecture assumes a single unified collection presentation.

**Resolution**: Section 05 architecture must be formally revised in `HOMEPAGE_ARCHITECTURE.md` before Sprint 3 implementation. The `Slider` component must be made instantiable with collection-tier props.

---

### 7.2 Conflict: `Button.tsx` Is a Single-Variant Primitive

**Current** (`COMPONENTS.md §3`): `Button.tsx` is described as a single luxury button aesthetic (brushed metallic, amber hover). There is no `variant` prop.

**Conflict**: Heritage CTAs ("Request Private Consultation") and Signature CTAs ("Add to Collection") should have visually distinct treatments to reinforce tier differentiation. Applying the same button to both undermines product tier signalling.

**Resolution**: `Button.tsx` must be extended with a `variant` prop before commerce component work begins in Sprint 3.

---

### 7.3 Conflict: `Modal.tsx` Has No Variant System

**Current** (`COMPONENTS.md §2`): `Modal.tsx` is a generic overlay frame. `ConciergeInquiryModal` already consumes it.

**Conflict**: `CheckoutModal` (Signature checkout) requires a fundamentally different internal layout — order summary column + shipping form column — that cannot be satisfied by the same generic frame without significant layout-specific overrides, which would make `Modal.tsx` brittle.

**Resolution**: `Modal.tsx` should be refactored to accept a `size` prop and optionally a `layout` prop (`"centered"` for concierge, `"split"` for checkout) before `CheckoutModal` is built.

---

### 7.4 Conflict: Header Has No Cart Affordance

**Current** (`COMPONENTS.md §1`): The header is designed around restraint and minimal surface area. No cart element was ever planned in Sprint 2. Adding a cart badge was not part of the original header specification.

**Conflict**: A cart icon is a new persistent visual element that will alter the visual weight and layout of the header for all visitors, even those who never interact with the Signature collection.

**Resolution**: The cart icon must be **conditionally rendered** (only when cart count > 0) and its visual weight must be discussed and locked before implementation. A thin gold numeral badge is preferable to a standard shopping bag icon, which would break the brand voice.

---

### 7.5 Conflict: Existing `orders` Schema Has No `orderRef` or `tier`

**Current** (`DATABASE_SCHEMA.md §5`): Existing `orders` documents do not include `orderRef`, `tier`, `subtotal`, or `tax` fields.

**Conflict**: The admin dashboard (if already started) or any query relying on the existing schema will encounter null-field reads for these new properties on legacy documents.

**Resolution**: A backfill migration script (`scripts/migrate-001-dual-tier.ts` defined in `ARCHITECTURE_AMENDMENT_001.md §9.4`) must be run before the admin dashboard or order tracking pages are built. The migration is non-destructive (additive only).

---

### 7.6 Minor Conflict: `WatchContainer` Has No CTA Awareness

**Current** (`COMPONENTS.md §2`): `WatchContainer` is described purely as a renderer selector (maps `renderType` to `StaticRenderer`, `LayeredRenderer`, or `ModelRenderer`). It has no knowledge of purchase intent or `checkoutType`.

**Conflict**: The collection slider in Section 05 requires the watch card overlay to render a CTA that varies by `checkoutType`. This logic cannot live in `Slider.tsx` without coupling the slider to commerce logic.

**Resolution**: `WatchContainer` should accept an optional `checkoutType` prop that it passes through to the rendered card overlay (`WatchMeta`). This keeps commerce logic scoped to the meta overlay, not the renderer.

---

## 8. Recommendation: Implementation Timing

### A. Before Sprint 3 — Sprint 2C Phase 3 (Preparatory Only)

These are foundational changes with zero commerce logic. They reduce risk in Sprint 3 by ensuring the component and type infrastructure is clean before Firebase and Razorpay integrations begin.

| Task | Rationale |
|:---|:---|
| Extend `Button.tsx` with `variant` prop | Unblocks all commerce CTAs in Sprint 3 |
| Extend `Modal.tsx` with `size` and `layout` props | Unblocks `CheckoutModal` and `ConciergeInquiryModal` build in Sprint 3 |
| Add `checkoutType` prop to `WatchContainer` | Allows CTA branching when the Signature slider is added in Sprint 3 |
| Create `types/cart.ts` | Type definitions only, no logic |
| Create `types/payment.ts` | Type definitions only, no logic |
| Extend `types/order.ts` | Add new fields to type interface |
| Extend `types/collection.ts` | Add `purchaseTier`, `maxInventory`, `isPubliclyListed`, `launchDate` |
| Update `lib/constants/collection.ts` | Add Signature Collection placeholder constants |

**Do NOT** implement `CartContext`, cart UI components, payment flows, or new routes before Sprint 3. The risk surface is too large to safely scope into Sprint 2C.

---

### B. During Sprint 3 (Core Commerce Implementation)

The bulk of the dual-tier commerce system belongs here, once Firebase is fully integrated and the data layer is live.

| Task Group | Components Affected |
|:---|:---|
| Firebase live data integration | `WatchContainer`, `Slider`, all collection pages |
| Cart system | `CartContext`, `CartDrawer`, `CartItem`, `CartIcon`, `MiniCart` |
| Signature checkout | `CheckoutModal`, `OrderSummary`, `PaymentButton`, `OrderConfirmation` |
| Razorpay integration | `app/actions/payment.ts` Server Actions |
| Concierge flow completion | `ConciergeInquiryModal`, `app/actions/concierge.ts` |
| Collection pages | `/collections`, `/collections/heritage`, `/collections/signature`, and `[slug]` variants |
| Homepage Section 05 | `CollectionToggle`, dual-slider implementation, branched CTA |
| Header amendments | `CartIcon` integration, Collections dropdown |
| Firestore schema migration | Run `scripts/migrate-001-dual-tier.ts` |
| New routes | `/cart`, `/checkout`, `/orders/[orderRef]` |

---

### C. After Sprint 3 (Post-Commerce Extensions)

These are enhancement-tier features that require a live, stable commerce layer to build upon.

| Task | Rationale |
|:---|:---|
| Wishlist (`/users/{uid}/wishlists`) | Requires auth system to be fully live and tested |
| `/account/orders` dashboard | Requires stable order schema + auth gating |
| Membership roles (`collector`, `ambassador`) | Requires post-launch user cohort data |
| Cloud Functions (`pruneExpiredCarts`, `onOrderCreated`) | Requires production Firebase project |
| `isPubliclyListed` gating + role-based access | Requires membership roles to be defined |
| Admin CRM dashboard for concierge management | Separate admin surface, post-launch priority |

---

## 9. Recommended Implementation Sequence

### Phase 3 — Sprint 2C (Preparatory, No Commerce Logic)

```
Step 1:  Extend types/
         ├── types/cart.ts         [NEW]
         ├── types/payment.ts      [NEW]
         ├── types/order.ts        [EXTEND — new fields]
         └── types/collection.ts   [EXTEND — purchaseTier, maxInventory, etc.]

Step 2:  Extend UI primitives
         ├── components/ui/Button.tsx    [Add variant prop]
         └── components/ui/Modal.tsx     [Add size + layout props]

Step 3:  Thread checkoutType through watch components
         └── components/watch/WatchContainer.tsx  [Accept + pass checkoutType prop]

Step 4:  Add Signature constants
         └── lib/constants/collection.ts  [Add SIGNATURE placeholder entries]

Step 5:  Update docs
         └── docs/HOMEPAGE_ARCHITECTURE.md  [Amend Section 05 architecture spec]
```

---

### Sprint 3 — Commerce Core (Sequential)

```
Step 1:  Run Firestore migration script
         └── scripts/migrate-001-dual-tier.ts

Step 2:  Firebase data layer
         ├── Firestore /collections — add purchaseTier + seed Signature collection
         ├── Firestore /watches    — seed Signature watch documents
         └── Integrate live watch reads in WatchContainer, Slider

Step 3:  Concierge flow (Heritage)
         ├── components/ui/ConciergeInquiryModal.tsx  [Build if not done]
         └── app/actions/concierge.ts                 [submitConciergeInquiry]

Step 4:  Cart system (Signature)
         ├── context/CartContext.tsx
         ├── components/ui/CartIcon.tsx
         ├── components/ui/CartDrawer.tsx
         └── components/ui/CartItem.tsx

Step 5:  Header + nav amendments
         ├── components/layout/Header.tsx  [CartIcon, Collections dropdown]
         └── lib/constants/navigation.ts  [Add Signature to footer + dropdown]

Step 6:  Homepage Section 05 amendments
         ├── components/ui/CollectionToggle.tsx  [NEW]
         └── app/page.tsx                        [Dual-slider + toggle integration]

Step 7:  Collection pages
         ├── app/collections/page.tsx
         ├── app/collections/heritage/page.tsx
         ├── app/collections/heritage/[slug]/page.tsx
         ├── app/collections/signature/page.tsx
         └── app/collections/signature/[slug]/page.tsx

Step 8:  Razorpay payment integration
         ├── app/actions/payment.ts  [initiateCheckout, verifyPayment]
         ├── components/ui/CheckoutModal.tsx
         ├── components/ui/OrderSummary.tsx
         ├── components/ui/PaymentButton.tsx
         └── components/ui/OrderConfirmation.tsx

Step 9:  Order routes
         ├── app/cart/page.tsx
         ├── app/checkout/page.tsx
         └── app/orders/[orderRef]/page.tsx

Step 10: Security rules + Firestore validation
         └── firestore.rules  [Add /carts rules]
```

---

### Post-Sprint 3 — Extensions

```
Step 1:  Wishlist sub-collection UI
Step 2:  /account/orders dashboard
Step 3:  Cloud Functions (pruneExpiredCarts, onOrderCreated, generateOrderRef)
Step 4:  Membership roles + isPubliclyListed gating
Step 5:  Admin CRM dashboard (concierge pipeline view)
```

---

## Conflict Resolution Summary

| Conflict ID | Description | Resolution | Timing |
|:---|:---|:---|:---|
| C-01 | Section 05 is Heritage-only in current architecture | Update `HOMEPAGE_ARCHITECTURE.md` §05 spec; add dual-slider + toggle | Phase 3 (doc) + Sprint 3 (code) |
| C-02 | `Button.tsx` has no variant system | Add `variant` prop before commerce CTA work | Phase 3 |
| C-03 | `Modal.tsx` has no layout variants | Add `size` + `layout` props before `CheckoutModal` build | Phase 3 |
| C-04 | Header has no cart affordance | Conditional `CartIcon` (hidden when cart is empty) | Sprint 3, Step 5 |
| C-05 | Legacy `orders` documents missing new fields | Backfill migration script before admin dashboard | Sprint 3, Step 1 |
| C-06 | `WatchContainer` has no CTA awareness | Add optional `checkoutType` prop | Phase 3, Step 3 |

---

*Document status: Analysis complete — awaiting Sprint 2C Phase 3 approval.*  
*No files should be modified until this document is reviewed and the Phase 3 scope is confirmed.*  
*Cross-references: `docs/ARCHITECTURE_AMENDMENT_001.md` · `docs/COMMERCE_ROADMAP.md` · `docs/HOMEPAGE_ARCHITECTURE.md` · `docs/COMPONENTS.md` · `docs/DATABASE_SCHEMA.md`*
