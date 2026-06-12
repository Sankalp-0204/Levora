import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Archive | Levora",
  description: "Levora's commitments to client privacy and data protection.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-surface-base text-ink-white min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <header className="space-y-6 border-b border-ink-white/10 pb-12">
          <p className="type-metadata text-text-muted tracking-widest uppercase">
            Legal & Compliance
          </p>
          <h1 className="type-display-md text-ink-white">
            Privacy Archive
          </h1>
        </header>

        <div className="space-y-12 type-body-base text-text-muted">
          <section className="space-y-6">
            <h2 className="text-xl text-ink-white uppercase tracking-widest">
              Our Commitment
            </h2>
            <p>
              At Levora, discretion is a fundamental requirement of luxury. This document outlines how we protect, manage, and archive the information provided to us by collectors, salon guests, and digital visitors.
            </p>
            <p className="italic">
              [ Detailed Privacy Policy legal copy to be supplied by counsel prior to public launch. ]
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
