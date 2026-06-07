/**
 * @file lib/constants/navigation.ts
 * @description Site-wide navigation structures for Levora.
 *
 * Defines lists of routes and links for the main navigation bar, footer menus,
 * user profile dashboards, and administrative panels.
 */

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

/** Header navigation links. Keeps route naming aligned. */
export const HEADER_NAV_LINKS: readonly NavLink[] = [
  { label: "Collections", href: "/collections" },
  { label: "Atelier", href: "/atelier" },
  { label: "Our Story", href: "/story" },
  { label: "Journal", href: "/journal" },
] as const;

/** Footer navigation directories. */
export const FOOTER_NAV_SECTIONS: readonly NavSection[] = [
  {
    title: "Collections",
    links: [
      { label: "Heritage Series", href: "/collections/heritage" },
      { label: "Atelier Custom", href: "/atelier" },
      { label: "Private Commission", href: "/inquiry/commission" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Our Story", href: "/story" },
      { label: "The Artisans", href: "/story/artisans" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Concierge Salon", href: "/inquiry" },
      { label: "Maintenance & Care", href: "/services/care" },
      { label: "Warranty", href: "/services/warranty" },
    ],
  },
  {
    title: "Corporate",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

/** Navigation paths inside the Admin Dashboard. */
export const ADMIN_DASHBOARD_LINKS: readonly NavLink[] = [
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Watches Catalog", href: "/admin/watches" },
  { label: "Collections", href: "/admin/collections" },
  { label: "Stories & Editorial", href: "/admin/stories" },
  { label: "Media Library", href: "/admin/media" },
] as const;
