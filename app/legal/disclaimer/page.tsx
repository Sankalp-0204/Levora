import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Salon Allocation Protocol | Levora",
  description: "Understanding the Levora Private Salon inquiry and acquisition process.",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-surface-base text-ink-white min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <header className="space-y-6 border-b border-ink-white/10 pb-12">
          <p className="type-metadata text-text-muted tracking-widest uppercase">
            Concierge Protocol
          </p>
          <h1 className="type-display-md text-ink-white">
            Private Salon Allocation
          </h1>
        </header>

        <div className="space-y-12 type-body-base text-text-muted">
          <section className="space-y-6">
            <h2 className="text-xl text-ink-white uppercase tracking-widest">
              The Inquiry Process
            </h2>
            <p>
              The Levora Private Salon functions as an archive and a curation space. Because our timepieces require extensive periods of craftsmanship—often months of continuous dedication by individual artisans—our production capacity is inherently constrained by the limits of human hands. 
            </p>
            <p>
              As such, the submission of an inquiry through the Private Salon represents the initiation of a conversation, rather than a guarantee of immediate availability. 
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl text-ink-white uppercase tracking-widest">
              Review and Allocation
            </h2>
            <p>
              We consider it our responsibility to place each timepiece with care. Levora reserves the right to review all inquiries individually. Allocation decisions are made at the discretion of the Maison, considering current production availability, the specific demands placed on our atelier, and the alignment of the collector with the heritage philosophy of the requested piece.
            </p>
            <p>
              Certain editions within the Heritage Collection may be strictly limited or fully allocated by the time an inquiry is received. In such instances, our concierge will retain your details for future reference or alternative curation, should you so desire.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl text-ink-white uppercase tracking-widest">
              Personal Consultation
            </h2>
            <p>
              We believe that the acquisition of a heritage artifact requires mutual understanding. Prior to any final allocation or acquisition, a personal consultation—either virtual or in-person at our New Delhi Salon—may be required. This ensures that the collector fully understands the physical nature, specific care requirements, and profound history of the art form they are assuming custodianship over.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
