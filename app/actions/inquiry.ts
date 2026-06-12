"use server";

import { adminDb } from "@/lib/firebase/admin";
import type { CreateInquiryPayload, Inquiry, InquiryId, PreferredContactMethod } from "@/types/inquiry";
import type { WatchId, FirestoreTimestamp } from "@/types/common";

/**
 * @file app/actions/inquiry.ts
 * @description Server Action to handle Private Salon inquiry submissions.
 */

export async function submitSalonInquiry(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const country = formData.get("country") as string;
    const interest = formData.get("interest") as string; // Will map to a watch
    const message = formData.get("message") as string;

    if (!name || !email || !interest) {
      return { success: false, error: "Name, email, and collection interest are required." };
    }

    // In a full implementation, we'd look up the current watch details to populate InquiryItem properly
    // For now, we mock the item based on the interest field.
    const watchId = interest.replace(/-/g, "_").toUpperCase() as WatchId;

    const payload: CreateInquiryPayload = {
      userId: null, // Guest inquiry
      contactInfo: {
        name,
        email,
        phone: country, // Repurposing phone field or we could add country if we extend the type
      },
      preferredContactMethod: "email", // Defaulting to email for this simple form
      preferredTimeframe: "anytime",
      items: [
        {
          watchId,
          watchName: interest, // Mock watch name
          priceAtInquiry: 0, // No ecommerce pricing
          currency: "XXX",
          quantity: 1,
        },
      ],
      customerNotes: message || null,
      totalAmount: 0,
      currency: "XXX",
    };

    if (adminDb) {
      const docRef = adminDb.collection("orders").doc();
      
      const inquiry: Inquiry = {
        ...payload,
        id: docRef.id as InquiryId,
        status: "pending",
        assignedAdminId: null,
        history: [],
        scheduledConsultationAt: null,
        createdAt: new Date().toISOString() as unknown as FirestoreTimestamp, // Mocking timestamp structure
        updatedAt: new Date().toISOString() as unknown as FirestoreTimestamp,
      };

      await docRef.set(inquiry);
      console.log(`[Firestore] Inquiry saved: ${docRef.id}`);
    } else {
      console.log("[Dev Fallback] Firebase Admin not configured. Mocking inquiry save.");
      console.log("Payload:", payload);
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error("Failed to submit inquiry", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
