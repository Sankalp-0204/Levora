import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Engagement | Levora",
  description: "Terms and conditions governing the use of the Levora digital archive.",
};

export default function TermsPage() {
  return (
    <main className="bg-surface-base text-ink-white min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <header className="space-y-6 border-b border-ink-white/10 pb-12">
          <p className="type-metadata text-text-muted tracking-widest uppercase">
            Legal & Compliance
          </p>
          <h1 className="type-display-md text-ink-white">
            Terms of Engagement
          </h1>
        </header>

        <div className="space-y-12 type-body-base text-text-muted">
          <section className="space-y-6">
            <h2 className="text-xl text-ink-white uppercase tracking-widest">
              Digital Access
            </h2>
            <p>
              By accessing the Levora archive, you agree to be bound by the conditions outlined herein. The content, imagery, and narratives contained within this platform are the exclusive intellectual property of Levora Horology.
            </p>
            <p className="italic">
              [ Detailed Terms of Service legal copy to be supplied by counsel prior to public launch. ]
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
