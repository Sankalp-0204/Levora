"use client";

/**
 * @file components/layout/Header.tsx
 * @description Global site header for Levora.
 *
 * Sprint 2C Phase 8 — GSAP Motion Architecture.
 *
 * Scroll-aware: GSAP hides header on scroll-down, reveals on scroll-up.
 * Mobile navigation uses a hamburger button that opens a slide-over drawer.
 *
 * Marked "use client" because the mobile drawer requires useState.
 * Desktop nav is purely CSS-driven — no JS involvement.
 *
 * Data source: lib/constants/navigation.ts → HEADER_NAV_LINKS
 * Design tokens: globals.css → .glass-dark, --z-sticky, --z-drawer, --duration-slow
 *
 * GSAP integration point: data-gsap="header" reserved for Sprint 3.
 */

import { useState, useRef } from "react";
import Link from "next/link";
import { HEADER_NAV_LINKS } from "@/lib/constants/navigation";
import { BRAND_IDENTITY } from "@/lib/constants/brand";
import { useGsap } from "@/hooks/useGsap";
import { createHeaderScroll } from "@/lib/gsap/headerScroll";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (headerRef.current) {
        createHeaderScroll(headerRef.current);
      }
    },
    [],
    headerRef,
  );

  function openDrawer() {
    setDrawerOpen(true);
    // Lock body scroll while drawer is open
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    setDrawerOpen(false);
    document.body.style.overflow = "";
  }

  return (
    <>
      {/* ── Site Header ─────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        id="site-header"
        role="banner"
        aria-label="Levora site header"
        data-gsap="header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--nav-height-default)",
          zIndex: "var(--z-sticky)",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--space-nav-px)",
          /* Lightweight glass — single-state */
          backgroundColor: "var(--glass-dark-bg)",
          backdropFilter: "blur(var(--glass-dark-blur))",
          WebkitBackdropFilter: "blur(var(--glass-dark-blur))",
          borderBottom: "0.5px solid var(--glass-dark-border)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "var(--container-stage)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >

          {/* ── Brand mark ─────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label={`${BRAND_IDENTITY.name} — return to homepage`}
            style={{ textDecoration: "none", flexShrink: 0 }}
          >
            <span
              className="type-card-heading"
              style={{
                color: "var(--color-text-primary)",
                letterSpacing: "0.12em",
                fontWeight: 300,
                fontSize: "1.25rem",
              }}
            >
              {BRAND_IDENTITY.name}
            </span>
          </Link>

          {/* ── Desktop primary navigation (≥ 1024px) ─────────────── */}
          <nav
            aria-label="Primary"
            style={{
              display: "none",
            }}
            className="desktop-nav"
          >
            <ul
              role="list"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {HEADER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-nav-label"
                    aria-label={`Navigate to ${link.label}`}
                    style={{ textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Desktop CTA (≥ 1024px) ─────────────────────────────── */}
          <div className="desktop-nav" style={{ flexShrink: 0 }}>
            <a
              href="#salon"
              aria-label="Request a private consultation"
              className="type-nav-label"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                padding: "0.625rem 1.25rem",
                border: "0.5px solid var(--color-gold-400)",
                borderRadius: "var(--radius-crystal)",
                color: "var(--color-gold-400)",
                transition: `background-color var(--duration-fast) var(--ease-luxury),
                             box-shadow var(--duration-fast) var(--ease-luxury)`,
                minHeight: "48px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--glass-gold-bg)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "var(--shadow-gold-sm)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Private Salon
            </a>
          </div>

          {/* ── Mobile hamburger (< 1024px) ────────────────────────── */}
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            onClick={openDrawer}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "48px",
              height: "48px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.75rem",
              borderRadius: "var(--radius-md)",
              flexShrink: 0,
            }}
          >
            {/* Hamburger lines */}
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                backgroundColor: "var(--color-text-primary)",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: "16px",
                height: "1px",
                backgroundColor: "var(--color-gold-400)",
                alignSelf: "flex-start",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                backgroundColor: "var(--color-text-primary)",
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile slide-over drawer ──────────────────────────────────── */}
      {/* Backdrop */}
      <div
        id="mobile-nav-backdrop"
        aria-hidden="true"
        onClick={closeDrawer}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: "calc(var(--z-drawer) - 1)",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: `opacity var(--duration-slow) var(--ease-luxury)`,
        }}
      />

      {/* Drawer panel */}
      <nav
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(320px, 85vw)",
          zIndex: "var(--z-drawer)",
          backgroundColor: "var(--color-void-300)",
          borderLeft: "0.5px solid var(--color-ink-100)",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: `transform var(--duration-slow) var(--ease-luxury)`,
          overflowY: "auto",
        }}
      >
        {/* Drawer header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}
        >
          <span
            className="type-section-label"
            style={{ letterSpacing: "0.2em" }}
          >
            Menu
          </span>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeDrawer}
            style={{
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "0.5px solid var(--color-ink-100)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
              fontSize: "1.25rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Drawer nav links */}
        <ul
          role="list"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {HEADER_NAV_LINKS.map((link) => (
            <li
              key={link.href}
              style={{
                borderBottom: "0.5px solid var(--color-ink-100)",
              }}
            >
              <Link
                href={link.href}
                onClick={closeDrawer}
                aria-label={`Navigate to ${link.label}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1.25rem 0",
                  textDecoration: "none",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: `color var(--duration-fast) var(--ease-luxury)`,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer CTA */}
        <div style={{ marginTop: "2.5rem" }}>
          <a
            href="#salon"
            onClick={closeDrawer}
            aria-label="Request a private consultation"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem 1.5rem",
              border: "0.5px solid var(--color-gold-400)",
              borderRadius: "var(--radius-crystal)",
              textDecoration: "none",
              color: "var(--color-gold-400)",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              minHeight: "48px",
            }}
          >
            Private Salon
          </a>
        </div>

        {/* Brand mark at drawer bottom */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "2rem",
            borderTop: "0.5px solid var(--color-ink-100)",
          }}
        >
          <span
            className="type-metadata"
            style={{ color: "var(--color-text-muted)" }}
          >
            {BRAND_IDENTITY.name} — {BRAND_IDENTITY.tagline}
          </span>
        </div>
      </nav>

      {/* ── Responsive CSS via <style> ──────────────────────────────────── */}
      <style>{`
        /* Desktop: show inline nav + CTA, hide hamburger */
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        /* Mobile: hide desktop nav + CTA by default (already hidden inline) */
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
