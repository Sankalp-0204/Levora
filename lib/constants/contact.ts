/**
 * @file lib/constants/contact.ts
 * @description Contact, Salon, and Concierge constants for Levora.
 *
 * Configures the physical showroom coordinates, concierge working hours,
 * contact form configuration variables, and preferred communication timeframes.
 */

export const SALON_CONTACT_INFO = {
  phone: "+91 11 4987 6543",
  whatsapp: "+91 98765 43210",
  email: "concierge@levora.in",
  supportHours: "10:00 AM - 7:00 PM IST | Monday - Saturday",
  address: {
    salonName: "The Private Salon — Levora",
    street: "14, Chanakyapuri Diplomatic Enclave",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110021",
    country: "India",
    googleMapsUrl: "https://maps.google.com/?q=Chanakyapuri+New+Delhi",
  },
} as const;

export const INQUIRY_FORM_OPTIONS = {
  /** Preferred methods of communication presented to clients in the form. */
  contactMethods: [
    { value: "email", label: "Email Correspondence" },
    { value: "phone", label: "Direct Phone Call" },
    { value: "whatsapp", label: "WhatsApp Message" },
  ] as const,

  /** Timeframes presented for scheduled consultation call-backs. */
  timeframes: [
    { value: "morning", label: "Morning (10:00 AM - 12:00 PM)" },
    { value: "afternoon", label: "Afternoon (12:00 PM - 5:00 PM)" },
    { value: "evening", label: "Evening (5:00 PM - 7:00 PM)" },
    { value: "anytime", label: "Anytime Convenient" },
  ] as const,

  /** Common subjects or interest points for inquiries. */
  subjects: [
    { value: "purchase", label: "Request Purchase Invitation" },
    { value: "viewing", label: "Book a Virtual Showing" },
    { value: "customization", label: "Discuss Custom Engraving" },
    { value: "commission", label: "Bespoke Atelier Commission" },
  ] as const,
} as const;
