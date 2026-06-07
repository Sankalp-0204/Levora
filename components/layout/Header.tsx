/**
 * @file components/layout/Header.tsx
 * @description Global site header for Levora.
 *
 * Sprint 2 scaffold — structural and semantic only.
 * Renders the brand mark and primary navigation links.
 *
 * GSAP scroll-aware hide/reveal will be added in a later sprint
 * via lib/gsap/headerScroll.ts. This component is intentionally
 * a Server Component — no "use client" directive.
 *
 * Data source: lib/constants/navigation.ts → HEADER_NAV_LINKS
 */

import Link from "next/link";
import { HEADER_NAV_LINKS } from "@/lib/constants/navigation";
import { BRAND_IDENTITY } from "@/lib/constants/brand";

export default function Header() {
  return (
    <header
      id="site-header"
      role="banner"
      aria-label="Levora site header"
      /**
       * data-gsap="header" — reserved attribute for the GSAP
       * scroll-velocity hook (lib/gsap/headerScroll.ts, Sprint 2).
       */
      data-gsap="header"
    >
      {/* ── Brand mark ─────────────────────────────────────────────── */}
      <div aria-label="Brand mark">
        <Link
          href="/"
          aria-label={`${BRAND_IDENTITY.name} — return to homepage`}
        >
          {/* Placeholder: replace with SVG logo asset in Sprint 2 */}
          <span aria-hidden="true">{BRAND_IDENTITY.name}</span>
        </Link>
      </div>

      {/* ── Primary navigation ─────────────────────────────────────── */}
      <nav aria-label="Primary">
        <ul role="list">
          {HEADER_NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Concierge CTA ──────────────────────────────────────────── */}
      {/*
       * Placeholder anchor for the "Request Private Consultation" CTA
       * that will sit in the header on desktop. Scrolls to #salon.
       */}
      <div aria-label="Header concierge action">
        <a href="#salon" aria-label="Request a private consultation">
          Private Salon
        </a>
      </div>
    </header>
  );
}
