/**
 * @file types/common.ts
 * @description Shared primitive types, branded ID types, and utility generics
 * used across every Levora domain model.
 *
 * WHY BRANDED IDs:
 *   TypeScript's `string` type is too permissive — a WatchId and a CollectionId
 *   are both strings at runtime but must never be confused at the type level.
 *   Branded types (a.k.a. nominal types) enforce this distinction at compile
 *   time with zero runtime cost.
 *
 *   Example — this is caught as a compile error:
 *     const id: WatchId = "HERITAGE_01" as CollectionId; // ❌ Error
 */

// ─────────────────────────────────────────────────────────────────────────────
// BRANDED ID PRIMITIVE
//
// Uses TypeScript declaration merging with a unique symbol to create a nominal
// type. The `__brand` property never exists at runtime — it is erased.
// ─────────────────────────────────────────────────────────────────────────────

declare const __brand: unique symbol;

/**
 * Brand<T, B> wraps a base type T with a unique brand marker B.
 * Use the domain-specific aliases below rather than this type directly.
 */
export type Brand<T, B extends string> = T & { readonly [__brand]: B };

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN ID TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Firestore document ID for a Watch (`/watches/{watchId}`). */
export type WatchId = Brand<string, "WatchId">;

/** Firestore document ID for a Collection (`/collections/{collectionId}`). */
export type CollectionId = Brand<string, "CollectionId">;

/** Firestore document ID for a Story (`/stories/{storyId}`). */
export type StoryId = Brand<string, "StoryId">;

/** Firestore document ID for an Order / Inquiry (`/orders/{orderId}`). */
export type OrderId = Brand<string, "OrderId">;

/** Firebase Auth UID for a User (`/users/{uid}`). */
export type UserId = Brand<string, "UserId">;

/** Unique asset identifier — used for MediaAsset deduplication. */
export type AssetId = Brand<string, "AssetId">;

// ─────────────────────────────────────────────────────────────────────────────
// TIMESTAMP
//
// Firestore Timestamps are server-side objects. On the client, documents
// arrive as Firestore Timestamp objects; after serialisation (JSON), they
// become plain objects with `seconds` and `nanoseconds` fields.
// FirestoreTimestamp represents the serialised wire format safe for Next.js
// RSC serialisation. Use the converter helpers in lib/firebase/ to convert.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Serialised Firestore Timestamp — safe to pass through Next.js RSC boundaries.
 * The raw `firebase-admin` Timestamp type is NOT serialisable and must be
 * converted before returning from Server Components or Server Actions.
 */
export interface FirestoreTimestamp {
  seconds:     number;
  nanoseconds: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SLUG
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A URL-friendly, lowercase, hyphen-separated string.
 * Example: "heritage-01", "the-chand-baori-dial"
 *
 * Not a branded type because slugs are often constructed and compared as
 * plain strings in routing logic, unlike IDs which are opaque identifiers.
 */
export type Slug = string;

// ─────────────────────────────────────────────────────────────────────────────
// CURRENCY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ISO 4217 currency code.
 * Levora's primary currency is INR. Other currencies reserved for future
 * international expansion.
 */
export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

// ─────────────────────────────────────────────────────────────────────────────
// RECORD AUDITING — timestamps present on every Firestore document
// ─────────────────────────────────────────────────────────────────────────────

/**
 * AuditFields — mixed into every Firestore document type.
 * Every record must carry creation and modification timestamps.
 */
export interface AuditFields {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY GENERICS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Nullable<T> — explicitly marks a field as intentionally nullable.
 * Prefer `Nullable<T>` over `T | null` for documentation clarity.
 */
export type Nullable<T> = T | null;

/**
 * Optional<T> — explicitly marks a field as possibly undefined.
 * Prefer over `T | undefined` for documentation clarity.
 */
export type Optional<T> = T | undefined;

/**
 * MaybeNull<T> — a field that may be null or undefined.
 * Used for Firestore fields that are conditionally written.
 */
export type MaybeNull<T> = T | null | undefined;

/**
 * WithId<T> — used when a Firestore document needs its own `id` field
 * mixed back in after a query, since Firestore doc.id is separate from
 * doc.data().
 */
export type WithId<T> = T & { id: string };

/**
 * PartialBy<T, K> — makes specific keys of T optional.
 * Used for "create" payloads where server-set fields (id, timestamps)
 * should not be required from the caller.
 *
 * @example
 *   type CreateWatchPayload = PartialBy<Watch, "id" | "createdAt" | "updatedAt">;
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * ServerTimestamp — a sentinel value that Firestore replaces with the
 * actual server timestamp on write. Used in "create" payload types.
 */
export type ServerTimestamp = "SERVER_TIMESTAMP";
