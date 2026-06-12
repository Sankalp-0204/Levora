/**
 * @file app/layout.tsx
 * @description Root layout for Levora.
 *
 * Font strategy:
 *   Both fonts use the CSS variable method (font.variable) so that
 *   globals.css @theme can consume them via var(--font-display) and
 *   var(--font-body). The font objects are defined in app/fonts.ts
 *   and imported here to keep layout.tsx clean.
 *
 * Layout additions (Sprint 2):
 *   Header and Footer are persistent layout components rendered here
 *   so they appear on every page without re-mounting on navigation.
 */

import type { Metadata } from "next";
import { cormorantGaramond, outfit } from "./fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Levora — Indian Luxury Heritage Watches",
    template: "%s | Levora",
  },
  description:
    "Levora crafts Indian luxury watches inspired by cultural heritage, historical art, and architectural geometry. Every dial tells a story.",
  keywords: ["luxury watches", "Indian heritage", "art dials", "Levora", "horology"],
  authors: [{ name: "Levora" }],
  creator: "Levora",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Levora",
    title: "Levora — Indian Luxury Heritage Watches",
    description:
      "Levora crafts Indian luxury watches inspired by cultural heritage, historical art, and architectural geometry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      // Inject both font CSS variables onto <html>.
      // Tailwind v4 @theme picks up var(--font-display) and var(--font-body)
      // from globals.css. The antialiased class ensures sub-pixel rendering.
      className={`${cormorantGaramond.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void-200 text-text-primary">
        {/*
         * Header and Footer are persistent — they do not remount on
         * client-side navigation between routes.
         */}
        <Header />
        <div id="page-content" className="flex flex-col flex-1">
          {children}
        </div>
        <Footer />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
