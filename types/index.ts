/**
 * @file types/index.ts
 * @description Central barrel file exporting the entire shared TypeScript type architecture
 * for the Levora luxury brand platform.
 *
 * This architecture defines clean, type-safe, and robust interfaces that map
 * directly to Firestore database documents while providing compile-time safety via
 * branded types, type guards, and payload projections.
 *
 * Usage:
 *   import { Watch, WatchId, Collection, User, Inquiry } from "@/types";
 */

// Common primitives, branded ID helpers, and utility types
export * from "./common";

// Media structures (images, video stacks, 3D GLB references)
export * from "./media";

// Collection models (themes, summaries, and admin controls)
export * from "./collection";

// Watch catalog models (specifications, polymorphic renders, placeholder IDs)
export * from "./watch";

// Editorial storytelling layers (rich narrative contents, scroll sequences)
export * from "./story";

// User account and profile profiles (roles, security, wishlists)
export * from "./user";

// Luxury Concierge Inquiries (consultations, contact preferences, logs)
export * from "./inquiry";
