# Levora Commerce Roadmap

This document outlines the strategic roadmap for Levora's commerce capabilities, supporting the dual-tier product system defined in the architecture amendment. It defines workflows, lifecycles, and future feature integrations (wishlists and memberships).

---

## 1. Heritage Commerce Flow (Concierge)

The Heritage Collection operates on a **qualified-lead capture system**. Transacting directly online is not possible; instead, the customer is invited into a high-touch private consultation process.

**Flow:**
1. **Discovery:** Visitor explores Heritage models online (static views, layered dial compositions, future 3D models).
2. **Inquiry:** Visitor clicks "Request Private Consultation" on the Homepage Salon or individual watch page.
3. **Capture:** Visitor completes the `ConciergeInquiryModal`, providing contact information, model interest, budget, and preferred contact time.
4. **Processing (Server-Side):** A Server Action validates the inquiry and creates an order document in Firestore with `checkoutType: "concierge_inquiry"` and `status: "pending_inquiry"`.
5. **Assignment:** A Levora horology specialist (admin) is notified and assigned the inquiry.
6. **Consultation:** Admin engages the buyer personally (phone, email, or WhatsApp) to discuss specifications, pricing, and availability. Admin updates Firestore with notes and schedules.
7. **Acquisition:** If the sale is agreed, an offline invoice or secure custom payment link is generated, finalizing the transaction. Shipping is manually arranged.

---

## 2. Direct Commerce Flow (Signature)

The Signature Collection is designed for affluent buyers seeking immediate acquisition. It offers a seamless, premium direct-checkout experience.

**Flow:**
1. **Discovery:** Visitor explores Signature models.
2. **Intent:** Visitor clicks "Add to Collection".
3. **Cart Assembly:** Item is added to the session-persistent cart (localStorage and/or Firestore sync). The Cart Drawer updates.
4. **Checkout Initiation:** Visitor proceeds to checkout. They provide shipping and contact information via the `CheckoutModal`.
5. **Server Validation:** Server Action verifies current stock and pricing dynamically against Firestore.
6. **Payment Gateway:** A Razorpay order is generated server-side. The Razorpay checkout modal opens on the client.
7. **Transaction:** Customer successfully completes payment (card, UPI, netbanking).
8. **Verification:** Client sends Razorpay payment ID and signature to the Server Action. Server cryptographically verifies the signature (HMAC-SHA256).
9. **Fulfillment:** Order status updates to `payment_captured`, stock is decremented in a transaction, and a confirmation email is dispatched.

---

## 3. Order Lifecycle

Orders, whether Concierge or Direct, live in the `/orders/{orderId}` Firestore collection and follow parallel status tracks that converge at fulfillment.

### Concierge Track:
- `pending_inquiry`: Initial state after form submission.
- `inquiry_reviewed`: Specialist has viewed the request.
- `consultation_scheduled`: Contact has been established and scheduled.
- `sale_agreed`: Customer commits to purchase.
- `declined`: Customer declines or abandons.
- `awaiting_payment`: Custom invoice issued.
- `paid`: Offline or custom payment confirmed.

### Direct Track:
- `cart_checkout`: User has begun the checkout modal.
- `payment_initiated`: Razorpay order generated, awaiting user completion.
- `payment_failed`: User abandoned Razorpay modal or payment was declined (returns to cart).
- `payment_captured`: Server verified the Razorpay signature.

### Shared Terminal Track:
- `processing`: Warehouse preparing the physical watch.
- `shipped`: Handed over to logistics partner (courier details appended).
- `delivered`: Confirmed receipt by customer.
- `cancelled`: Admin or system voided order pre-shipment.
- `refunded`: Funds returned post-payment.
- `archived`: Soft-delete mechanism.

---

## 4. Payment Lifecycle (Razorpay)

Payment handling applies strictly to the Signature tier and operates on a server-authoritative model to prevent client-side manipulation.

**Lifecycle:**
1. **Initiation (`payment_initiated`):** Server generates a secure Razorpay order using total amount, currency, and the Firestore order ID as the receipt reference.
2. **Client Interaction:** The user interacts securely with Razorpay's UI. Levora never handles sensitive card details directly.
3. **Capture (`payment_captured`):** Razorpay returns a `payment_id` and `signature`. The Next.js Server Action verifies the signature using the private `RAZORPAY_KEY_SECRET`. Upon success, the payment is logged in the `paymentInfo` map.
4. **Refunds (`refunded`):** If an order is cancelled post-capture, an admin initiates a refund via the Razorpay API, updating the order's `paymentInfo.status` to `refunded` and logging the `refundId` and `refundAmount`.

---

## 5. Cart Lifecycle

The cart system (`/carts`) is designed exclusively for the Signature Collection. Heritage watches cannot be added to a cart.

**Lifecycle:**
1. **Creation:** A cart is instantiated in state upon the first addition. A `cartId` is assigned (user's `uid` if logged in, or a UUID for guests).
2. **Persistence:**
   - **Guest:** State is saved to `localStorage`.
   - **Authenticated:** State is synced securely to Firestore at `/carts/{uid}`.
3. **Validation:** Items in the cart hold snapshot prices. At the moment of checkout, the Server Action dynamically re-reads `/watches` to verify price accuracy and stock availability.
4. **Clearance:** Upon successful order capture, the cart is emptied locally and cleared from Firestore.
5. **Expiration:** Carts have an `expiresAt` TTL (Time To Live), typically 7 days. A planned Cloud Function (`pruneExpiredCarts`) will clean up stale carts.

---

## 6. Guest Checkout Behavior

Levora allows frictionless purchases without requiring an upfront account.

- **Cart Storage:** Guest carts persist solely in the browser's `localStorage`.
- **Order Association:** Guest orders omit the `userId` field (saved as `null`).
- **Post-Purchase:** Confirmation is handled via email.
- **Conversion:** Following a successful guest checkout, the confirmation screen will offer an option to "Create a Levora Account" using the provided email, automatically linking the newly created order.

---

## 7. Account Creation Behavior

Accounts enhance the collector's experience, offering portfolio tracking and streamlined purchasing.

- **Registration:** Users create an account via Firebase Auth.
- **Cart Merge:** If a guest with items in their local cart registers or logs in, the local items are merged into their Firestore cart (`/carts/{uid}`).
- **Order History:** Authenticated users gain access to a `/account/orders` dashboard, querying Firestore for orders matching their `userId`.
- **Pre-filled Data:** Subsequent checkouts dynamically pull contact and shipping info from the user's profile.

---

## 8. Future Wishlist Architecture

Wishlists allow collectors to save intent for later, bridging the gap between browsing and acquiring.

- **Storage:** Wishlists will be stored as a sub-collection under the user: `/users/{uid}/wishlists/{watchId}`.
- **Functionality:** Users can toggle a heart icon on any watch (Heritage or Signature).
- **Data Capture:** Adding an item to a wishlist stores the `watchId` and `addedAt` timestamp.
- **Utility:** For Heritage items, the wishlist acts as a "dream board". For Signature items, the user can move items directly from wishlist to cart.
- **Admin Value:** Wishlists provide highly qualified intent data for the Concierge team to leverage during personalized outreach.

---

## 9. Inventory Strategy

Inventory management varies drastically between the two tiers.

- **Heritage Collection (Fixed Edition):** Stock is fundamentally restricted. The `maxInventory` field on the collection defines the absolute ceiling (e.g., 7 pieces). These are manually decremented upon successful concierge sales.
- **Signature Collection (Open or Batched):** Stock is managed dynamically. `maxInventory` may be `null` (open production) or batched. The `stock` field on `/watches/{watchId}` is programmatically decremented via a Firestore transaction only *after* Razorpay payment capture. If `stock` reaches 0, the UI automatically reflects "Out of Stock" or "Waitlist".

---

## 10. Future Membership Strategy

Levora plans to implement a multi-tiered collector membership to cultivate brand loyalty and exclusivity.

- **Role Expansion:** The `users` collection `role` field will expand beyond `"customer"` and `"admin"` to include tags like `"collector"`, `"ambassador"`, or `"heritage_owner"`.
- **Access Control:** Membership status will gate access to specific product launches. The `isPubliclyListed` flag on new collections can hide items from the general public, while security rules allow read access only to users with specific roles.
- **Pre-Release Events:** Members will gain early access to Signature releases or exclusive invites to Heritage viewings, enforced at the routing and database levels.
