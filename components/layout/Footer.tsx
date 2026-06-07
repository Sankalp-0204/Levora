/**
 * @file components/layout/Footer.tsx
 * @description Global site footer for Levora.
 *
 * Sprint 2 scaffold — structural and semantic only.
 * Renders four navigation columns, a newsletter subscription form,
 * social links, and legal copy.
 *
 * Uses Next.js <Form> (import Form from 'next/form') for the newsletter
 * subscription — progressive enhancement, no JS required to submit.
 * This is a Server Component — no "use client" directive.
 *
 * Data sources:
 *   lib/constants/navigation.ts → FOOTER_NAV_SECTIONS
 *   lib/constants/brand.ts      → BRAND_IDENTITY, SOCIAL_LINKS
 */

import Form from "next/form";
import Link from "next/link";
import { FOOTER_NAV_SECTIONS } from "@/lib/constants/navigation";
import { BRAND_IDENTITY, SOCIAL_LINKS } from "@/lib/constants/brand";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" role="contentinfo" aria-label="Levora site footer">

      {/* ── Top row: nav columns + newsletter ──────────────────────── */}
      <div aria-label="Footer content">

        {/* Four navigation column groups from FOOTER_NAV_SECTIONS */}
        <nav aria-label="Footer navigation">
          {FOOTER_NAV_SECTIONS.map((section) => (
            <div key={section.title} aria-labelledby={`footer-nav-${section.title.toLowerCase()}`}>
              <h3 id={`footer-nav-${section.title.toLowerCase()}`}>
                {section.title}
              </h3>
              <ul role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-label={link.label}
                      {...(link.isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── Newsletter subscription ───────────────────────────────── */}
        {/*
         * Next.js <Form> with a string action performs client-side navigation
         * without a full page reload, with prefetching built in.
         * Sprint 3 will wire this to a Server Action for Firebase integration.
         */}
        <section aria-labelledby="footer-newsletter-heading">
          <h3 id="footer-newsletter-heading">The Journal</h3>
          <p>
            Receive limited dispatches on new collections and horological heritage.
          </p>
          <Form action="/journal/subscribe" aria-label="Newsletter subscription form">
            <label htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="your@email.com"
              aria-label="Your email address"
            />
            <button type="submit" aria-label="Subscribe to the Levora Journal">
              Subscribe
            </button>
          </Form>
        </section>
      </div>

      {/* ── Bottom row: brand, social, legal ───────────────────────── */}
      <div aria-label="Footer legal and social">

        {/* Brand name */}
        <p aria-label="Brand name">
          <Link href="/" aria-label="Return to Levora homepage">
            {BRAND_IDENTITY.name}
          </Link>
        </p>

        {/* Social links */}
        <nav aria-label="Social media links">
          <ul role="list">
            <li>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Levora on Instagram"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Levora on YouTube"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Levora on Pinterest"
              >
                Pinterest
              </a>
            </li>
          </ul>
        </nav>

        {/* Legal links and copyright */}
        <nav aria-label="Legal links">
          <ul role="list">
            <li>
              <Link href="/privacy" aria-label="Privacy Policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" aria-label="Terms of Service">Terms of Service</Link>
            </li>
          </ul>
        </nav>

        <p aria-label="Copyright notice">
          <small>
            &copy; {currentYear} {BRAND_IDENTITY.legalName}. All rights reserved.
          </small>
        </p>
      </div>

    </footer>
  );
}
