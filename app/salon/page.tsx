"use client";

import React, { useActionState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { submitSalonInquiry } from "@/app/actions/inquiry";
import { WATCH_DETAIL_CONTENT } from "@/lib/constants/watchDetail";

/**
 * @file app/salon/page.tsx
 * @description The Private Salon Concierge inquiry page - Editorial Layout.
 */

const WATCH_OPTIONS = [
  { value: "chand-baori", label: "Chand Baori" },
  { value: "pichwai", label: "Pichwai" },
  { value: "warli", label: "Warli" },
  { value: "pattachitra", label: "Pattachitra" },
  { value: "tanjore", label: "Tanjore" },
  { value: "madhubani", label: "Madhubani" },
  { value: "bidriware", label: "Bidriware" },
];

const WATCH_MAP: Record<string, string> = {
  "chand-baori": "HERITAGE_01",
  pichwai: "HERITAGE_02",
  warli: "HERITAGE_03",
  pattachitra: "HERITAGE_04",
  tanjore: "HERITAGE_05",
  madhubani: "HERITAGE_06",
  bidriware: "HERITAGE_07",
};

function PrivateSalonForm() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest") || "";

  const mappedWatchKey = WATCH_MAP[interestParam];
  const watchContext = mappedWatchKey ? WATCH_DETAIL_CONTENT[mappedWatchKey] : null;

  const [state, formAction, isPending] = useActionState(submitSalonInquiry, {
    success: false,
    error: null,
  });

  const layoutRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (leftColRef.current && rightColRef.current) {
      gsap.fromTo(
        [leftColRef.current.children, rightColRef.current.children],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  // Success animation
  useEffect(() => {
    if (state.success && rightColRef.current && leftColRef.current && successRef.current) {
      gsap.to([leftColRef.current, rightColRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          if (layoutRef.current) {
             layoutRef.current.style.display = "none";
          }
          successRef.current!.style.display = "flex";
          gsap.fromTo(
            successRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
          );
        },
      });
    }
  }, [state.success]);

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col justify-center">
      
      {/* Editorial 2-Column Layout */}
      <div ref={layoutRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Context & Curation */}
        <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-12 pt-4">
          <div className="flex flex-col gap-6">
            <span className="type-caption text-gold-parchment uppercase tracking-widest">
              The Private Salon
            </span>
            <h1 className="type-h2 text-ink-white" style={{ color: "var(--color-gold-400)" }}>
              The Archive
            </h1>
            <p className="type-body-lg text-ink-200 leading-relaxed">
              Levora timepieces are not sold; they are placed. Each inquiry is reviewed individually by our concierge to ensure our limited annual production reaches custodians who understand the weight of the heritage they carry.
            </p>
          </div>

          {/* Dynamic Context (If navigating from a watch detail) */}
          {watchContext && (
            <div className="pl-6 border-l border-[var(--color-gold-400)]/30 flex flex-col gap-3">
              <span className="type-caption text-ink-400 uppercase tracking-wider">
                Current Inquiry
              </span>
              <h3 className="type-h4 text-ink-white">
                {WATCH_OPTIONS.find(o => o.value === interestParam)?.label}
              </h3>
              <p className="type-caption text-gold-parchment">
                {watchContext.artworkRegion} · {watchContext.artworkPeriod}
              </p>
              <p className="type-body text-ink-200 italic mt-2">
                "{watchContext.lessonBody[0].split('.')[0]}."
              </p>
            </div>
          )}

          {/* The Path to Ownership */}
          <div className="flex flex-col gap-6 mt-4">
            <h3 className="type-caption uppercase tracking-widest text-ink-400">
              The Path to Ownership
            </h3>
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />
              {[
                "Inquiry",
                "Curatorial Review",
                "Personal Conversation",
                "Commission & Acquisition"
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 relative z-10">
                  <div className="w-[15px] h-[15px] rounded-full bg-black border border-[var(--color-gold-400)] flex items-center justify-center">
                    <div className="w-[3px] h-[3px] rounded-full bg-[var(--color-gold-400)]" />
                  </div>
                  <span className="type-body text-ink-200">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col gap-4 mt-4 pt-8 border-t border-white/10">
            {[
              "Strictly limited annual production",
              "Hand-finished heritage artwork",
              "Swiss mechanical calibre",
              "Global collector delivery"
            ].map((indicator, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/40">
                  <path d="M1 6L4.5 9.5L11 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="type-caption text-ink-300">{indicator}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: The Form */}
        <div ref={rightColRef} className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-xl backdrop-blur-sm">
          <form action={formAction} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Full Name" name="name" required disabled={isPending} />
              <Input label="Email Address" name="email" type="email" required disabled={isPending} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Country / Region" name="country" disabled={isPending} />
              <Select
                label="Collection Interest"
                name="interest"
                defaultValue={interestParam}
                options={WATCH_OPTIONS}
                required
                disabled={isPending}
              />
            </div>

            <Textarea
              label="Message (Optional)"
              name="message"
              placeholder="Any specific requests or context you wish to share with the curator..."
              disabled={isPending}
            />

            {state.error && (
              <div className="p-4 border border-red-500/30 bg-red-500/10 rounded text-red-400 text-sm">
                {state.error}
              </div>
            )}

            <div className="mt-4 pt-8 border-t border-white/5 flex justify-end">
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? "Submitting..." : "Initiate Conversation"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Ceremonial Success State */}
      <div
        ref={successRef}
        className="hidden flex-col items-center justify-center text-center max-w-2xl mx-auto py-24"
        style={{ display: "none" }}
      >
        <div className="w-20 h-20 mb-8 rounded-full border border-[var(--color-gold-400)]/30 flex items-center justify-center relative">
          <div className="absolute inset-2 border border-[var(--color-gold-400)]/60 rounded-full" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-400)" strokeWidth="1">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="type-h2 mb-6" style={{ color: "var(--color-gold-400)" }}>
          Your inquiry has entered the Levora Archive.
        </h2>
        <p className="type-body-lg text-ink-200 leading-relaxed max-w-lg">
          The conversation has begun. A dedicated curator will review your request and contact you directly to arrange a private consultation.
        </p>
      </div>
    </div>
  );
}

export default function PrivateSalonPage() {
  return (
    <div className="bg-black relative min-h-screen overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-gold-900)_0%,_transparent_50%)] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-void-500)_0%,_transparent_50%)] opacity-40 pointer-events-none" />
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><span className="text-gold-parchment type-caption uppercase tracking-widest">Entering Archive...</span></div>}>
        <PrivateSalonForm />
      </Suspense>
    </div>
  );
}
