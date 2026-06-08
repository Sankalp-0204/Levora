import { WatchId, UserId, FirestoreTimestamp } from "./common";

export interface CartItem {
  watchId: WatchId | string;
  collectionId: string;
  name: string;
  slug: string;
  priceSnapshot: number;
  quantity: number;
  thumbnailUrl: string;
  addedAt: FirestoreTimestamp;
}

export interface Cart {
  cartId: string;
  userId: UserId | null;
  sessionId: string;
  items: CartItem[];
  subtotal: number;
  currency: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  expiresAt: FirestoreTimestamp;
}
