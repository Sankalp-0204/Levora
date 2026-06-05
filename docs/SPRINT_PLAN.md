# Levora Development Sprint Plan

This document outlines the 10-sprint development lifecycle for the Levora luxury watch portal. Sprints are sequenced logically to establish visual design tokens and folders first, build UI routes, layer advanced GSAP motion curves, connect Firebase services, and conclude with optimization, SEO, and live deployment.

---

## Sprint 1: Foundation (Folders, Tokens, Typography & Layout)
* **Objective**: Establish the codebase scaffolding, install dependencies, and implement the global visual theme system using Tailwind CSS v4.
* **Deliverables**:
  * Set up root directory folders: `/components`, `/lib`, `/hooks`, `/context`, `/public/assets`.
  * Map HSL luxury colors, polished gold/silver metallic gradients, and border-blur utility classes inside Tailwind `@theme` variables in `app/globals.css`.
  * Register Google Fonts (`Cormorant Garamond` and `Outfit`) using Next.js font loading optimizations inside `app/layout.tsx`.
* **Success Criteria**:
  * Clean workspace structure compiles with zero TypeScript compiler errors.
  * Tailwind v4 theme variables map correctly to standard elements.
  * Base layout loads with zero layout shifts on initial viewport rendering.

---

## Sprint 2: Structure (Navigation, Homepage Skeleton & Story Content)
* **Objective**: Build the core site navigation, page skeletons, and the visual block layouts for the homepage storytelling elements.
* **Deliverables**:
  * Create `Header.tsx` with dynamic scroll-awareness (floating, translucent glassmorphism backdrop) and standard `Footer.tsx`.
  * Scaffold home page segments using CSS layouts (flex/grid) to hold threshold visual loops, dial explosion markers, and timelines.
  * Create base layout frameworks for text cards and background loops.
* **Success Criteria**:
  * Header transition handles viewport scrolling without layout flicker.
  * Homepage layout renders all sections mobile-first.
  * Nested page segments use semantic HTML5 components.

---

## Sprint 3: Motion (Motion System & GSAP Integration)
* **Objective**: Integrate the GSAP and Framer Motion packages, establishing the weighted luxury transition guidelines.
* **Deliverables**:
  * Register GSAP core library and `ScrollTrigger` safely within Next.js client component hooks.
  * Build the initial scroll-driven timeline to animate target selectors (watch dial parts separating and scaling) based on deep-scrolling.
  * Implement Framer Motion transitions for global routes, dropdown menus, and modal dialogs.
* **Success Criteria**:
  * GSAP timelines clean up properly on route updates (no memory leaks or phantom listeners).
  * Framer Motion transitions work across page route navigations.
  * Touch interactions on mobile disable scroll-pinning and run tap-to-explode fallbacks.

---

## Sprint 4: Collections (Product Showcase Layouts)
* **Objective**: Construct the dynamic collection grid layout and collection landing pages.
* **Deliverables**:
  * Create listing grid page (`app/collections/page.tsx`) mapping multiple collections (e.g. Heritage Collection).
  * Build luxury product card thumbnails displaying model slots (`HERITAGE_01` through `HERITAGE_07`) with hover scaling animations.
  * Implement client-side filtering and sorting frameworks (by metal, dial configuration, or movement details).
* **Success Criteria**:
  * Grid components dynamically handle variable watch numbers.
  * Hover states render at 60fps+ on standard desktop displays.
  * Empty grid states load graceful visual skeletons.

---

## Sprint 5: Watch Details (Dynamic Polymorphic Detail Pages)
* **Objective**: Build the dynamic watch detail route utilizing the `WatchContainer` asset selector.
* **Deliverables**:
  * Build dynamic route path: `app/watch/[slug]/page.tsx` resolving segment parameter promises.
  * Build `WatchContainer.tsx` which parses the config parameters and renders the appropriate viewer (`StaticRenderer`, `LayeredRenderer`, or dynamically imported `ModelRenderer`).
  * Implement specification detail panels and connection links to the related stories.
* **Success Criteria**:
  * The watch layout loads the correct viewer component instantly without breaking the UI.
  * Dynamic parameter promise resolution passes build-time validation.
  * Navigating between sister watches (e.g., model 01 to model 02) triggers the correct client updates.

---

## Sprint 6: Integration (Firebase & Authentication Setup)
* **Objective**: Set up the Firebase project, register the Client SDK and Admin SDK singletons, and implement client authentication.
* **Deliverables**:
  * Initialize Firebase project inside `lib/firebase/client.ts` and `lib/firebase/admin.ts`.
  * Set up local Firebase Emulator suite for local database development.
  * Implement authentication context (`useAuth`) and user profile synchronization routes.
* **Success Criteria**:
  * Client and server run on local emulator configurations without touching production projects.
  * User profile credentials sync to Firestore on first signup.
  * Route endpoints block access depending on permissions (Customer vs. Admin).

---

## Sprint 7: Inquiries (Concierge booking & Order Pipelines)
* **Objective**: Construct the private booking and lead inquiry form system.
* **Deliverables**:
  * Create `ConciergeInquiryModal.tsx` form mapping user inputs.
  * Build a Next.js Server Action running on the Vercel backend using the Firebase Admin SDK to securely parse and write inquiry details to the `/orders` collection.
  * Build a mock email alert trigger to notify administrators of new lead registrations.
* **Success Criteria**:
  * Users can submit inquiry requests (as guests or logged-in profiles) which write to Firestore.
  * Server Actions catch input validation errors using Zod schemes before database interaction.
  * Client form details reset cleanly on submission, showing a premium confirmation panel.

---

## Sprint 8: Optimization (Web Vitals & Performance Tuning)
* **Objective**: Audit bundle sizes, tune image resolutions, and verify instant-navigation caching thresholds.
* **Deliverables**:
  * Enable Next.js `cacheLife` optimizations and apply `'use cache'` directives to static database helper functions.
  * Export `unstable_instant = { prefetch: 'static' }` from product routes and collections.
  * Configure image formats (converting PNG placeholders to AVIF) and bake textures inside GLB models to stay below 3.5MB.
* **Success Criteria**:
  * Core Web Vitals score 90+ on mobile Google Lighthouse reports.
  * Client-side navigations between watches load immediately using static shells.
  * Three.js dynamically loads on user interaction, keeping initial bundle size low.

---

## Sprint 9: SEO (Meta Tags & Sitemap Indexing)
* **Objective**: Implement dynamic SEO optimizations to guarantee pages index with precise rich text.
* **Deliverables**:
  * Add dynamic `generateMetadata` handlers inside App Router segment pages, resolving watch details from the database.
  * Configure search engine schema tags (JSON-LD structured data) for watches.
  * Set up automatic sitemap compilation (`app/sitemap.ts`).
* **Success Criteria**:
  * Each watch dynamic path serves unique title, description, and OpenGraph image tags.
  * Sitemap compiles all active product slugs dynamically.
  * Rich snippet test validators verify the JSON-LD schemas.

---

## Sprint 10: Deployment (Vercel & Live Release)
* **Objective**: Configure the production pipeline on Vercel and complete final end-to-end verification.
* **Deliverables**:
  * Add production environment variables inside the Vercel project dashboard.
  * Trigger the production build and verify asset delivery.
  * Connect custom brand domains, verify SSL certifications, and execute target user verification steps.
* **Success Criteria**:
  * Vercel production build completes with zero errors.
  * Live website handles high load traffic with zero page crashes.
  * Domain redirects correctly to the secure HTTPS prefix.
