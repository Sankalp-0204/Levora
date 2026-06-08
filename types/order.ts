import { UserId, FirestoreTimestamp, Nullable } from "./common";
import { PaymentInfo } from "./payment";

export type OrderTier = "heritage" | "signature";
export type CheckoutType = "concierge_inquiry" | "direct_checkout";

// Extended status merging Concierge and Direct tracks
export type OrderStatus =
  // Concierge Track
  | "pending_inquiry"
  | "inquiry_reviewed"
  | "consultation_scheduled"
  | "sale_agreed"
  | "declined"
  | "awaiting_payment"
  // Direct Checkout Track
  | "cart_checkout"
  | "payment_initiated"
  | "payment_failed"
  | "payment_captured"
  // Shared Terminal States
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "archived";

export interface OrderContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ConciergeInfo {
  interestedWatchIds: string[];
  preferredContactTime: string | null;
  preferredContactMethod: "phone" | "email" | "whatsapp";
  budget: string | null;
  message: string | null;
  assignedSpecialistId: string | null;
  consultationDate: FirestoreTimestamp | null;
  consultationNotes: string | null;
  followUpDue: FirestoreTimestamp | null;
}

export interface OrderItem {
  watchId: string;
  collectionId: string;
  name: string;
  priceAtPurchase: number;
  quantity: number;
  thumbnailUrl: string;
}

export interface Order {
  id: string;
  orderRef: string;
  userId: Nullable<UserId>;
  checkoutType: CheckoutType;
  tier: OrderTier;
  contactInfo: OrderContactInfo;
  shippingAddress: any | null; // To be defined
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentInfo: PaymentInfo | null;
  conciergeInfo: ConciergeInfo | null;
  notes: string | null;
  adminNotes: string | null;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}
