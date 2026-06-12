/**
 * @file types/inquiry.ts
 * @description Inquiry and Concierge domain models for Levora.
 *
 * Design decisions:
 *
 * 1. LUXURY CONCIERGE WORKFLOW
 *    Since Levora is a premium heritage-inspired brand, we do not use standard,
 *    impersonal checkout flows for art dials. Instead, the checkout action triggers
 *    a personal "Concierge Inquiry". This file structures the rich inquiry metadata,
 *    including customer availability, communication preferences, and customization
 *    notes.
 *
 * 2. HYBRID GUEST & USER FLOW
 *    Inquiries can be submitted by authenticated users (linking to their profiles)
 *    or by guests. The `userId` field is explicitly nullable, ensuring a seamless
 *    entry point for high-intent buyers without forcing sign-up.
 *
 * 3. COMPREHENSIVE CONCIERGE AUDIT TRAIL
 *    Each inquiry includes a detailed history log (`history`) mapping all interactions
 *    between the administrator (concierge representative) and the client.
 *
 * Firestore path: /orders/{orderId} (mapped as Inquiries in the concierge interface)
 */

import type { WatchId, UserId, AuditFields, Nullable, Brand, FirestoreTimestamp } from "./common";

// ─────────────────────────────────────────────────────────────────────────────
// BRANDED ID
// ─────────────────────────────────────────────────────────────────────────────

/** Firestore document ID for a Concierge Inquiry (`/orders/{orderId}`). */
export type InquiryId = Brand<string, "InquiryId">;

// ─────────────────────────────────────────────────────────────────────────────
// PREFERRED CONTACT DETAILS
// ─────────────────────────────────────────────────────────────────────────────

/** Channels the concierge representative can use to contact the client. */
export type PreferredContactMethod = "email" | "phone" | "whatsapp";

/** Time slots preferred by the client for phone calls or video consultations. */
export type PreferredTimeframe =
  | "morning"   // 09:00 - 12:00
  | "afternoon" // 12:00 - 17:00
  | "evening"   // 17:00 - 21:00
  | "anytime";

// ─────────────────────────────────────────────────────────────────────────────
// INQUIRY STATUS WORKFLOW
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The life cycle stages of a luxury timepiece inquiry.
 *
 * "pending"               → Form submitted, awaiting assignment or review.
 * "assigned"              → Delegated to a specific concierge representative.
 * "contacted"             → First contact initiated (email/phone/WhatsApp).
 * "appointment_scheduled" → Virtual dial showing or private viewing booked.
 * "quote_provided"        → Custom pricing, shipping details, or tax estimates sent.
 * "awaiting_payment"      → Invoice sent, waiting for transaction.
 * "completed"             → Timepiece sold, shipped, and tracking details active.
 * "closed"                → Client passed, or timepiece is no longer available.
 * "spam"                  → Invalid submissions filtered by admins.
 */
export type InquiryStatus =
  | "pending"
  | "assigned"
  | "contacted"
  | "appointment_scheduled"
  | "quote_provided"
  | "awaiting_payment"
  | "completed"
  | "closed"
  | "spam";

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT CONTACT INFO
// ─────────────────────────────────────────────────────────────────────────────

export interface InquiryContactInfo {
  /** First and last name of the client. */
  name: string;

  /** Email address for written communication and invoices. */
  email: string;

  /** Phone number (with country code) for calls and instant messaging. */
  phone: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMIZATION & ENGRAVING OPTIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface TimepieceCustomization {
  /**
   * Optional custom case-back engraving request.
   * Max character length enforced at the form layer (typically 20-30 chars).
   */
  caseBackEngraving?: string;

  /**
   * Special strap preference selected by the client during inquiry.
   * Example: "hand-stitched alligator tan", "matte black ostrich".
   */
  strapPreference?: string;

  /**
   * Additional bespoke requests (e.g., dial modifications, presentation box personalization).
   */
  bespokeRequestNotes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// INQUIRY ITEM DETAILS
// ─────────────────────────────────────────────────────────────────────────────

export interface InquiryItem {
  /** Reference to the watch. Maps to a HeritageWatchId or future watch. */
  watchId: WatchId;

  /**
   * Watch name at the time of inquiry submission.
   * Denormalized to ensure the inquiry record remains readable even if
   * the watch collection metadata is archived or modified in the future.
   */
  watchName: string;

  /**
   * Price at inquiry time (stored in paise/minor units).
   * Captured to record the initial catalog price shown to the user.
   */
  priceAtInquiry: number;

  /** ISO 4217 currency code of `priceAtInquiry` (e.g. "INR"). */
  currency: string;

  /** Quantity requested. Default is 1 for luxury watches. */
  quantity: number;

  /** Client-requested watch customizations (engraving, strap, etc.). */
  customization?: TimepieceCustomization;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCIERGE INTERACTION HISTORY LOG
// ─────────────────────────────────────────────────────────────────────────────

export interface ConciergeHistoryEntry {
  /** Unique ID for tracking this log entry. */
  id: string;

  /** Date and time of the interaction. */
  timestamp: FirestoreTimestamp;

  /** The admin representative who recorded the interaction. */
  adminId: UserId;

  /** Type of interaction recorded. */
  type: "email_sent" | "call_made" | "whatsapp_sent" | "status_change" | "internal_note" | "showing_held";

  /** Short descriptive summary. Example: "Status changed from pending to contacted" */
  summary: string;

  /** Exhaustive notes / dialogue details from the contact event. */
  details?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// INQUIRY — Core domain entity
// ─────────────────────────────────────────────────────────────────────────────

export interface Inquiry extends AuditFields {
  /** Unique inquiry identifier. Maps to Firestore document ID. */
  id: InquiryId;

  /**
   * Associated customer user ID.
   * Nullable to allow guest inquiry submission without prior account creation.
   */
  userId: Nullable<UserId>;

  /** Customer contact metadata. */
  contactInfo: InquiryContactInfo;

  /** Client's preferred route of contact. */
  preferredContactMethod: PreferredContactMethod;

  /** Client's preferred timeframe for contact (mostly phone calls). */
  preferredTimeframe: PreferredTimeframe;

  /** Timepieces included in this concierge inquiry request. */
  items: InquiryItem[];

  /** Current administrative status of this inquiry. */
  status: InquiryStatus;

  /** The active admin representative assigned to this client. Null if unassigned. */
  assignedAdminId: Nullable<UserId>;

  /** Additional initial context, questions, or requests written by the customer. */
  customerNotes: Nullable<string>;

  /** Full historical audit timeline of concierge touchpoints and status changes. */
  history: ConciergeHistoryEntry[];

  /** Scheduled timestamp for a private consultation, digital showing, or call. */
  scheduledConsultationAt: Nullable<FirestoreTimestamp>;

  /** Sum total of inquiry value in minor units (derived from item prices). */
  totalAmount: number;

  /** ISO 4217 currency code for total transaction values. */
  currency: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVER ACTION PAYLOADS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Payload required to submit a brand new concierge inquiry from the client-side form.
 * The server calculates `id`, sets the initial status to `"pending"`, and generates timestamps.
 */
export type CreateInquiryPayload = Omit<
  Inquiry,
  "id" | "status" | "assignedAdminId" | "history" | "scheduledConsultationAt" | "createdAt" | "updatedAt"
>;

/**
 * Administrative payload to update status, assign concierge members, or log interactions.
 */
export type UpdateInquiryPayload = Partial<
  Omit<Inquiry, "id" | "createdAt" | "updatedAt">
>;

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT FORM DATA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Data collected from the client-side ConciergeInquiryModal form.
 */
export interface ConciergeInquiryFormData {
  name: string;
  email: string;
  phone: string;
  interestedWatchIds: string[];
  preferredContactMethod: "phone" | "email" | "whatsapp";
  preferredContactTime?: string;
  budget?: string;
  message?: string;
}

