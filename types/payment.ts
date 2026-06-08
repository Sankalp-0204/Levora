import { FirestoreTimestamp } from "./common";

export interface PaymentInfo {
  gateway: "razorpay";
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;
  status: "initiated" | "captured" | "failed" | "refunded";
  capturedAt: FirestoreTimestamp | null;
  failureReason: string | null;
  method: "card" | "upi" | "netbanking" | "wallet" | null;
  bank: string | null;
  refundId: string | null;
  refundedAt: FirestoreTimestamp | null;
  refundAmount: number | null;
}

export interface RazorpayCheckoutResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
