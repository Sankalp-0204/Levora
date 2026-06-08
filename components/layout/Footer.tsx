/**
 * @file components/layout/Footer.tsx
 * @description Global site footer for Levora.
 *
 * Sprint 2C Phase 4 — Layout Foundation.
 *
 * Desktop: 4-column grid for nav sections + newsletter sidebar.
 * Mobile: single column with native <details>/<summary> accordions (zero JS).
 *
 * Design tokens: globals.css — void-*, ink-*, gold-*, typography.css — .type-*
 * Container: .container-content, section padding .section-pad-sm
 *
 * Server Component — no "use client" directive.
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
    <footer
      id="site-footer"
      role="contentinfo"
      aria-label="Levora site footer"
      style={{
        borderTop: "0.5px solid var(--color-ink-100)",
        backgroundColor: "var(--color-void-300)",
      }}
    >
      <div className="container-content section-pad-sm">

        {/* ── Top grid: nav columns + newsletter ─────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
          className="footer-grid"
        >

          {/* ── Four navigation column groups ──────────────────────── */}
          {FOOTER_NAV_SECTIONS.map((section) => (
            <div
              key={section.title}
              aria-labelledby={`footer-nav-${section.title.toLowerCase()}`}
              className="footer-nav-col"
            >
              {/* ── Desktop: plain heading ─────────────────────────── */}
              <h3
                id={`footer-nav-${section.title.toLowerCase()}`}
                className="type-sub-heading footer-col-heading-desktop"
                style={{
                  marginBottom: "1.25rem",
                  display: "none",
                }}
              >
                {section.title}
              </h3>

              {/* ── Mobile: native <details> accordion ─────────────── */}
              <details
                className="footer-col-accordion"
                style={{ borderBottom: "0.5px solid var(--color-ink-100)" }}
              >
                <summary
                  className="type-sub-heading"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 0",
                    cursor: "pointer",
                    listStyle: "none",
                    userSelect: "none",
                    minHeight: "48px",
                  }}
                >
                  {section.title}
                  <span
                    aria-hidden="true"
                    className="footer-accordion-icon"
                    style={{
                      color: "var(--color-gold-400)",
                      fontSize: "0.75rem",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </summary>

                <ul
                  role="list"
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: "0 0 1rem 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-label={link.label}
                        className="type-body"
                        style={{
                          textDecoration: "none",
                          color: "var(--color-text-muted)",
                          transition: `color var(--duration-fast) var(--ease-luxury)`,
                          display: "inline-block",
                          minHeight: "48px",
                          lineHeight: "48px",
                        }}
                        {...(link.isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              {/* ── Desktop link list (shown via CSS) ─────────────── */}
              <ul
                role="list"
                className="footer-col-links-desktop"
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "none",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-label={link.label}
                      className="type-body"
                      style={{
                        textDecoration: "none",
                        color: "var(--color-text-muted)",
                        transition: `color var(--duration-fast) var(--ease-luxury)`,
                      }}
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

          {/* ── Newsletter subscription ─────────────────────────────── */}
          <section
            aria-labelledby="footer-newsletter-heading"
            className="footer-newsletter"
            style={{
              paddingTop: "1.5rem",
              borderTop: "0.5px solid var(--color-ink-100)",
            }}
          >
            <h3
              id="footer-newsletter-heading"
              className="type-sub-heading"
              style={{ marginBottom: "0.75rem" }}
            >
              The Journal
            </h3>
            <p
              className="type-body"
              style={{ marginBottom: "1.5rem", maxWidth: "38ch" }}
            >
              Receive limited dispatches on new collections and horological
              heritage.
            </p>

            {/*
             * Next.js <Form> — progressive enhancement, no JS required to submit.
             * Sprint 3 will wire this to a Server Action for backend integration.
             */}
            <Form
              action="/journal/subscribe"
              aria-label="Newsletter subscription form"
              style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              <label
                htmlFor="newsletter-email"
                className="type-spec-label"
                style={{ display: "block" }}
              >
                Email address
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="your@email.com"
                  aria-label="Your email address"
                  style={{
                    flex: "1 1 200px",
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--glass-frost-bg)",
                    border: "0.5px solid var(--color-ink-200)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    fontWeight: 300,
                    outline: "none",
                    minHeight: "48px",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to the Levora Journal"
                  className="type-button-label"
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "transparent",
                    border: "0.5px solid var(--color-gold-400)",
                    borderRadius: "var(--radius-crystal)",
                    color: "var(--color-gold-400)",
                    cursor: "pointer",
                    minHeight: "48px",
                    whiteSpace: "nowrap",
                    transition: `background-color var(--duration-fast) var(--ease-luxury)`,
                  }}
                >
                  Subscribe
                </button>
              </div>
            </Form>
          </section>
        </div>

        {/* ── Divider ────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            borderTop: "0.5px solid var(--color-ink-100)",
            marginTop: "3rem",
            marginBottom: "2rem",
          }}
        />

        {/* ── Bottom row: brand, social, legal ───────────────────────── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          {/* Brand name */}
          <Link
            href="/"
            aria-label="Return to Levora homepage"
            style={{ textDecoration: "none" }}
          >
            <span
              className="type-nav-label"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {BRAND_IDENTITY.name}
            </span>
          </Link>

          {/* Social links */}
          <nav aria-label="Social media links">
            <ul
              role="list"
              style={{
                display: "flex",
                gap: "1.5rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Levora on Instagram"
                  className="type-nav-label"
                  style={{
                    textDecoration: "none",
                    color: "var(--color-text-muted)",
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "48px",
                  }}
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
                  className="type-nav-label"
                  style={{
                    textDecoration: "none",
                    color: "var(--color-text-muted)",
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "48px",
                  }}
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
                  className="type-nav-label"
                  style={{
                    textDecoration: "none",
                    color: "var(--color-text-muted)",
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "48px",
                  }}
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal links + copyright */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <nav aria-label="Legal links">
              <ul
                role="list"
                style={{
                  display: "flex",
                  gap: "1rem",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                <li>
                  <Link
                    href="/privacy"
                    aria-label="Privacy Policy"
                    className="type-caption"
                    style={{
                      textDecoration: "none",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    aria-label="Terms of Service"
                    className="type-caption"
                    style={{
                      textDecoration: "none",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
            <small className="type-caption" style={{ color: "var(--color-text-muted)" }}>
              &copy; {currentYear} {BRAND_IDENTITY.legalName}
            </small>
          </div>
        </div>
      </div>

      {/* ── Responsive CSS ──────────────────────────────────────────────── */}
      <style>{`
        /* Desktop: 5-column grid (4 nav + 1 newsletter), show desktop elements */
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .footer-newsletter {
            grid-column: 1 / -1;
            border-top: 0.5px solid var(--color-ink-100) !important;
            padding-top: 2rem !important;
          }
          /* Hide mobile accordion, show desktop heading + link list */
          .footer-col-accordion {
            display: none !important;
          }
          .footer-col-heading-desktop {
            display: block !important;
          }
          .footer-col-links-desktop {
            display: flex !important;
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr) 1.5fr !important;
          }
          .footer-newsletter {
            grid-column: auto !important;
            border-top: none !important;
            padding-top: 0 !important;
            border-left: 0.5px solid var(--color-ink-100) !important;
            padding-left: 2rem !important;
          }
        }
        /* Mobile: hide desktop heading + link list */
        @media (max-width: 767px) {
          .footer-col-heading-desktop {
            display: none !important;
          }
          .footer-col-links-desktop {
            display: none !important;
          }
          .footer-nav-col {
            border-top: 0.5px solid var(--color-ink-100);
          }
          .footer-nav-col:first-child {
            border-top: none;
          }
        }
        /* <details> open state: rotate plus to minus */
        details[open] .footer-accordion-icon::after {
          content: '−';
        }
        .footer-accordion-icon::after {
          content: '+';
        }
        .footer-accordion-icon {
          font-size: 1rem;
        }
      `}</style>
    </footer>
  );
}
