/**
 * @file types/user.ts
 * @description User domain model — Firebase Auth profiles and application roles.
 *
 * Levora has two user archetypes:
 *
 * 1. CUSTOMER — A private collector or watch enthusiast.
 *    Submits concierge inquiries, manages a personal wishlist.
 *    May browse the site as a guest (no account required for inquiries).
 *
 * 2. ADMIN — A Levora team member.
 *    Manages the product catalog, stories, and media assets via the admin
 *    dashboard. Has write access to all Firestore collections.
 *
 * Firebase Auth is the authentication source of truth. The Firestore
 * `/users/{uid}` document stores additional profile data beyond what Auth
 * provides (role, wishlist, preferences). The `uid` field directly mirrors
 * the Firebase Auth UID.
 *
 * Firestore path: /users/{uid}
 */

import type { UserId, WatchId, AuditFields, Nullable } from "./common";

// ─────────────────────────────────────────────────────────────────────────────
// USER ROLE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Application-level role.
 * Enforced by Firestore Security Rules via `isAdmin()` helper function.
 *
 * "customer" — Read-only access to public data. Can create inquiries.
 * "admin"    — Full read/write access to all collections.
 */
export type UserRole = "customer" | "admin";

// ─────────────────────────────────────────────────────────────────────────────
// USER PREFERENCES — Personalisation settings
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Optional user preferences stored in the Firestore profile.
 * All preferences are optional and default to sensible values.
 */
export interface UserPreferences {
  /**
   * Whether the user has opted into the newsletter / heritage journal.
   * Default: false.
   */
  newsletterOptIn: boolean;

  /**
   * The user's preferred currency for price display.
   * Does not affect transaction currency (always INR for now).
   * Default: "INR".
   */
  displayCurrency: string;

  /**
   * Whether the user prefers reduced motion.
   * When true, GSAP animations are simplified or disabled.
   * Synced from the OS `prefers-reduced-motion` media query on first login.
   * Default: false.
   */
  reducedMotion: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// USER — Core domain entity
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A Levora platform user.
 *
 * This type represents the Firestore `/users/{uid}` document.
 * The Firebase Auth record (email, emailVerified, photoURL) is the primary
 * auth source — this document extends it with application-specific data.
 *
 * @example
 *   {
 *     uid:         "firebase-auth-uid-xyz" as UserId,
 *     email:       "collector@example.com",
 *     displayName: "Arjun Sharma",
 *     role:        "customer",
 *     preferences: { newsletterOptIn: true, displayCurrency: "INR", reducedMotion: false },
 *     createdAt:   { seconds: 1700000000, nanoseconds: 0 },
 *     updatedAt:   { seconds: 1700000000, nanoseconds: 0 },
 *   }
 */
export interface User extends AuditFields {
  /**
   * Firebase Auth UID — the primary identifier.
   * Set from `firebase.auth().currentUser.uid` on account creation.
   */
  uid: UserId;

  /**
   * User's email address (mirrored from Firebase Auth for server-side queries).
   * Must stay in sync with Auth via a Cloud Function on email change.
   */
  email: string;

  /**
   * Display name shown in the admin dashboard and personalised UI.
   * Example: "Arjun Sharma"
   * Nullable — user may not have set a name yet.
   */
  displayName: Nullable<string>;

  /**
   * Avatar / profile photo URL (mirrored from Firebase Auth).
   * May be a Google profile photo URL or a custom upload.
   * Nullable — not all users have a photo.
   */
  photoUrl: Nullable<string>;

  /** Application role controlling Firestore Security Rule access. */
  role: UserRole;

  /**
   * Personalisation preferences.
   * Stored here (not in Auth) because they are application-level settings.
   */
  preferences: UserPreferences;

  /**
   * The last sign-in timestamp.
   * Used by the admin dashboard for activity monitoring.
   * Updated by a Firestore Cloud Function triggered on Auth sign-in events.
   */
  lastSignedInAt: Nullable<{ seconds: number; nanoseconds: number }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// WISHLIST ENTRY — Sub-collection document
//
// Stored at: /users/{uid}/wishlists/{watchId}
// One document per wishlisted watch — the watchId is both the doc ID and
// a field value (for portability if the sub-collection is ever flattened).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single wishlist entry in a user's personal wishlist sub-collection.
 * The document ID equals `watchId` for instant existence checks.
 *
 * @example
 *   // Check if HERITAGE_01 is wishlisted:
 *   await getDoc(doc(db, "users", uid, "wishlists", "HERITAGE_01"));
 */
export interface WishlistEntry {
  /** Watch ID — mirrors the Firestore document ID. */
  watchId: WatchId;

  /**
   * Watch name at the time of wishlisting.
   * Denormalised to display the wishlist without a second Firestore query
   * to the watch document. May become stale if the watch name changes.
   */
  watchName: string;

  /**
   * Watch hero image URL at the time of wishlisting.
   * Denormalised for the same reason as `watchName`.
   */
  watchHeroImageUrl: string;

  /**
   * Price at time of wishlisting (minor units).
   * Stored for reference — does not guarantee current pricing.
   */
  priceAtWishlist: number;

  /** ISO 4217 currency code of `priceAtWishlist`. */
  currency: string;

  /** Timestamp when the user added this watch to their wishlist. */
  addedAt: { seconds: number; nanoseconds: number };
}

// ─────────────────────────────────────────────────────────────────────────────
// USER SESSION — Client-side representation (not stored in Firestore)
//
// Returned by the `useAuth` hook. Combines the Firebase Auth user object
// with the application User profile from Firestore. Used throughout the
// client-side component tree for role-based rendering.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The client-side authenticated session.
 * Returned by `useAuth()` hook from context/AuthContext.tsx.
 *
 * `authUser` is the raw Firebase Auth user object.
 * `profile` is the Firestore application profile (may be null while loading).
 *
 * This is NOT a Firestore document type. It is a runtime construct
 * assembled by the AuthContext provider.
 */
export interface UserSession {
  /**
   * Firebase Auth user.
   * Contains: uid, email, displayName, photoURL, emailVerified.
   * Type: import("firebase/auth").User — imported lazily in the hook.
   */
  authUser: {
    uid:            string;
    email:          Nullable<string>;
    displayName:    Nullable<string>;
    photoURL:       Nullable<string>;
    emailVerified:  boolean;
  };

  /**
   * The application profile from Firestore.
   * Null while the Firestore document is being fetched, or if the profile
   * has not been created yet (first login race condition).
   */
  profile: Nullable<User>;

  /**
   * Whether the profile is still being loaded from Firestore.
   * Components should show loading states while this is true.
   */
  isLoadingProfile: boolean;

  /** Convenience role check — true if profile.role === "admin". */
  isAdmin: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVER ACTION PAYLOADS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Payload for initialising a new user profile on first sign-in.
 * Called by the auth Server Action when a new Firebase Auth account is detected.
 * `uid`, `createdAt`, `updatedAt` are set server-side.
 */
export type CreateUserProfilePayload = Omit<User, "createdAt" | "updatedAt">;

/**
 * Payload for updating an existing user profile.
 * `uid`, `createdAt` are immutable. All other fields are optional.
 */
export type UpdateUserProfilePayload = Partial<
  Pick<User, "displayName" | "photoUrl" | "preferences">
>;
