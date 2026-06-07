# Pre-Development Documentation Walkthrough (Updated)

This document lists the documentation files generated to support the development of the Levora website. These files establish the data structures, visual guidelines, animation strategies, and backend configurations. 

All watch identities, descriptions, and assets are now modeled using generic, data-driven identifiers (`HERITAGE_01` through `HERITAGE_07`) to decouple the code from final brand decisions.

---

## Generated Documentation Files

All documents are located in the `/docs` directory and root workspace:

1. **[PROJECT_ARCHITECTURE.md](file:///d:/levora/PROJECT_ARCHITECTURE.md)** (Root Workspace)
   * Defines the dynamic slot framework utilizing identifiers `HERITAGE_01` through `HERITAGE_07`.

2. **[DATABASE_SCHEMA.md](file:///d:/levora/docs/DATABASE_SCHEMA.md)**
   * Defines Firestore collections (`collections`, `watches`, `stories`, `users`, `orders`) and sub-collections (`wishlists`).
   * Models the watch records using dynamic fields (e.g. `HERITAGE_01`) mapping to polymorphic render formats (Static, Layered, 3D).

3. **[COMPONENTS.md](file:///d:/levora/docs/COMPONENTS.md)**
   * Outlines modular React folders (`layout`, `ui`, `watch`, `story`).
   * Details the dynamic `WatchContainer` that maps database attributes directly to UI renderers (avoiding hardcoded routes).

4. **[ANIMATION_GUIDE.md](file:///d:/levora/docs/ANIMATION_GUIDE.md)**
   * Establishes GSAP timelines using dynamic refs and layout queries (decoupled from specific watch assets).
   * Lays out performance metrics for hardware acceleration and CLS control.

5. **[DESIGN_SYSTEM.md](file:///d:/levora/docs/DESIGN_SYSTEM.md)**
   * Maps out color palette CSS variables for Tailwind CSS v4, luxury typography scales, and glassmorphic micro-borders.

6. **[CONTENT_STRATEGY.md](file:///d:/levora/docs/CONTENT_STRATEGY.md)**
   * Establishes media pipeline guidelines for compressing image files (AVIF), video loops (VP9/H.264 WebM/MP4), and 3D models (Draco GLB).

7. **[COLLECTIONS.md](file:///d:/levora/docs/COLLECTIONS.md)**
   * Outlines the 7 placeholder slots (`HERITAGE_01` to `HERITAGE_07`) for the initial collection.
   * Maps how database bindings map watch entries to stories.
   * Establishes rules for dynamic multi-collection expansion.

8. **[FIREBASE_ARCHITECTURE.md](file:///d:/levora/docs/FIREBASE_ARCHITECTURE.md)**
   * Partition boundaries between Firebase Client SDK and Server Actions with Admin SDK.
   * Local Emulator setup guidelines.

9. **[HOMEPAGE_EXPERIENCE.md](file:///d:/levora/docs/HOMEPAGE_EXPERIENCE.md)**
   * Outlines the scroll-storytelling flow from Hero threshold to the Private Salon (concierge booking).
   * Maps the visitor psychology journey and GSAP exploded-view layers.
   * Details design standards for mobile optimization (e.g., tap-to-explode fallback).

10. **[SPRINT_PLAN.md](file:///d:/levora/docs/SPRINT_PLAN.md)**
    * Breaks down the visual coding, animation layering, backend configurations, optimization, and deployment phases into 10 development sprints.
    * Highlights objectives, deliverables, and success criteria for each sprint step.

11. **[TypeScript Shared Type Architecture](file:///d:/levora/types/index.ts)** (`/types` directory)
    * Establishes branded ID types, client-to-server data models, and status workflows for Watches, Collections, Stories, MediaAssets, Users, and Concierge Inquiries.

12. **[Constants Architecture](file:///d:/levora/lib/constants/index.ts)** (`/lib/constants` directory)
    * Organizes global brand variables, SEO parameters, private salon contact details, routing paths, and static fallback configurations for `HERITAGE_01` through `HERITAGE_07` placeholders.

---

## Validation & Verification

* **Decoupled Architecture**: All specific watch names have been removed from schemas, code snippets, and catalogs.
* **Shared Type Safety & Constants**: The domain type system and static site variables are modularly integrated under `/types` and `/lib/constants`.
* **Compilation Status**: Verified compile integrity with `npx tsc --noEmit` which runs with 0 warnings/errors.
* **Zero UI/Router Implementation**: No components or visual pages have been generated yet, leaving all rendering systems completely decoupled.
