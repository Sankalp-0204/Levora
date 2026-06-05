# Firebase Integration Architecture

This document defines the integration framework for Google Firebase services (Auth, Firestore, Storage) inside Next.js 16, utilizing React Server Components (RSC) and Server Actions.

---

## 1. Hybrid Client-Server Architecture

To optimize performance and security, Firebase operations are partitioned into Client and Server domains.

```mermaid
graph LR
    subgraph Client Browser
        ClientApp[Client UI Components] -->|Auth State Observer| FirebaseClient[Firebase Client SDK]
        ClientApp -->|Inquiry/Cart Submit| ServerActions[Next.js Server Actions]
    end
    
    subgraph Vercel Server Environment
        ServerActions -->|Secure Admin Auth| FirebaseAdmin[Firebase Admin SDK]
        RSC[React Server Components] -->|Read-only Queries| FirebaseAdmin
    end

    FirebaseClient -->|Authenticates| FirebaseCloudAPI[Google Firebase Cloud]
    FirebaseAdmin -->|Executes Queries / Writes| FirebaseCloudAPI
```

* **Client Domain**: Limited to monitoring authentication changes (login, logout, active user token management) and light read updates.
* **Server Domain**: All state-modifying database actions (order creation, profile updates, inventory increments) run within Next.js Server Actions using the Firebase Admin SDK. This keeps the larger Admin SDK out of client bundles.

---

## 2. Configuration & Initialization

### Environment Variables
Place these keys in your `.env.local` file (do not check these into version control):

```bash
# Public Client-side Credentials (safe to bundle)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyA..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="levora-prod.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="levora-prod"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="levora-prod.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef..."

# Private Server-side Credentials (strictly server-only)
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@levora-prod.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### Client Initialization Pattern (`lib/firebase/client.ts`)
```typescript
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton initialization pattern to prevent duplicate instances during HMR
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Server Initialization Pattern (`lib/firebase/admin.ts`)
```typescript
import * as admin from 'firebase-admin';

// Initialize Admin SDK with private service account keys
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle multi-line keys
    }),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
```

---

## 3. Server Actions Schema & Execution

Mutations are handled within Next.js Server Actions located inside `app/actions.ts` or scoped folders.

### Inquiry Submission Example flow:
1. Client clicks "Submit Concierge Request" on the UI.
2. The UI invokes `submitInquiry(formData)` which runs on the server.
3. The server action:
   * Validates input fields using a parsing schema (e.g. Zod).
   * Verifies auth state via `adminAuth` checking the session token.
   * Performs an atomic write using `adminDb.collection('orders').add({...})`.
   * Triggers an email alert or notifications payload.
   * Returns a success state to the client UI.

---

## 4. Local Emulator Suite Setup

To develop database interactions locally without incurring costs or writing to the production database:

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```
2. **Initialize Emulators** (in root directory):
   ```bash
   firebase init emulators
   ```
   * Enable: Auth, Firestore, and Storage Emulators.
3. **Running the Emulators**:
   ```bash
   firebase emulators:start
   ```
4. **Client Setup**:
   Modify `lib/firebase/client.ts` to detect local development:
   ```typescript
   if (process.env.NODE_ENV === 'development') {
     connectFirestoreEmulator(db, 'localhost', 8080);
     connectAuthEmulator(auth, 'http://localhost:9099');
   }
   ```
