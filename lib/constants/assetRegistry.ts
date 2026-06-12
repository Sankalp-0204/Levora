/**
 * @file lib/constants/assetRegistry.ts
 * @description Centralized configuration for all media assets in the Levora application.
 *
 * Phase 13 — Asset & Production Readiness.
 * 
 * This registry acts as the single source of truth for all imagery, video, and
 * SVG fallbacks across the site. When production assets (4K videos, macro photography)
 * are ready, they are simply plugged into this configuration without requiring
 * any structural component changes.
 */

import { MediaAsset } from "@/components/story/MediaLayer";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface WatchMediaRegistry {
  /** Full-bleed hero image for the watch detail page */
  hero: MediaAsset;
  /** Extreme macro shot of the dial craftsmanship */
  dialMacro: MediaAsset;
  /** High-resolution image of the Swiss calibre */
  movement: MediaAsset;
  /** Open Graph image specifically for this watch */
  ogImage: string;
}

export interface HeritageArtMediaRegistry {
  /** Cinematic documentary footage of the heritage art form */
  cinematicMotion: MediaAsset;
  /** Detailed texture shot of the raw materials */
  texture: MediaAsset;
}

export interface AtelierMediaRegistry {
  /** Montage of craftsmen working */
  processMontage: MediaAsset;
  /** Still image of the workbench/tools */
  workbench: MediaAsset;
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRY IMPLEMENTATION (Placeholder State)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Global site assets (Logos, OG Images)
 */
export const GLOBAL_ASSETS = {
  logoLight: "/assets/logo-light.svg",
  logoDark: "/assets/logo-dark.svg",
  defaultOgImage: "/assets/og-default.jpg",
  favicon: "/favicon.ico",
};

/**
 * Watch Media Mapping
 * Keys match HERITAGE_01, HERITAGE_02, etc.
 * Currently populated with SVG abstractions until production assets are delivered.
 */
export const WATCH_MEDIA: Record<string, WatchMediaRegistry> = {
  HERITAGE_01: {
    hero: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>', alt: "Chand Baori Hero" },
    dialMacro: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#111"/></svg>', alt: "Chand Baori Dial Macro" },
    movement: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0a0a0a"/></svg>', alt: "Calibre SW200-1" },
    ogImage: "/assets/og/heritage-01.jpg",
  },
  HERITAGE_02: {
    hero: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>', alt: "Pichwai Hero" },
    dialMacro: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#111"/></svg>', alt: "Pichwai Dial Macro" },
    movement: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0a0a0a"/></svg>', alt: "Calibre ETA 2824-2" },
    ogImage: "/assets/og/heritage-02.jpg",
  },
  HERITAGE_03: {
    hero: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>', alt: "Warli Hero" },
    dialMacro: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#111"/></svg>', alt: "Warli Dial Macro" },
    movement: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0a0a0a"/></svg>', alt: "Calibre SW200-1" },
    ogImage: "/assets/og/heritage-03.jpg",
  },
  HERITAGE_04: {
    hero: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>', alt: "Pattachitra Hero" },
    dialMacro: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#111"/></svg>', alt: "Pattachitra Dial Macro" },
    movement: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0a0a0a"/></svg>', alt: "Calibre ETA 2824-2" },
    ogImage: "/assets/og/heritage-04.jpg",
  },
  HERITAGE_05: {
    hero: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>', alt: "Tanjore Hero" },
    dialMacro: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#111"/></svg>', alt: "Tanjore Dial Macro" },
    movement: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0a0a0a"/></svg>', alt: "Calibre SW200-1" },
    ogImage: "/assets/og/heritage-05.jpg",
  },
  HERITAGE_06: {
    hero: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>', alt: "Madhubani Hero" },
    dialMacro: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#111"/></svg>', alt: "Madhubani Dial Macro" },
    movement: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0a0a0a"/></svg>', alt: "Calibre ETA 2824-2" },
    ogImage: "/assets/og/heritage-06.jpg",
  },
  HERITAGE_07: {
    hero: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>', alt: "Bidriware Hero" },
    dialMacro: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#111"/></svg>', alt: "Bidriware Dial Macro" },
    movement: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#0a0a0a"/></svg>', alt: "Calibre SW200-1" },
    ogImage: "/assets/og/heritage-07.jpg",
  },
};

/**
 * Heritage Artwork Media Mapping
 * Used in Cinematic Chapters and the Maison Film montage.
 */
export const ARTWORK_MEDIA: Record<string, HeritageArtMediaRegistry> = {
  chand_baori: {
    cinematicMotion: { type: "heritage-motion", motionType: "chand_baori", alt: "Chand Baori Depth Parallax" },
    texture: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#222"/></svg>', alt: "Rajput Sandstone Texture" },
  },
  pichwai: {
    cinematicMotion: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1c1c1c"/></svg>', alt: "Pichwai Temple Scene" },
    texture: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#222"/></svg>', alt: "Natural Pigment Texture" },
  },
  warli: {
    cinematicMotion: { type: "heritage-motion", motionType: "warli", alt: "Warli Line Drawing Reveal" },
    texture: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#222"/></svg>', alt: "Rice Paste on Mud Texture" },
  },
  pattachitra: {
    cinematicMotion: { type: "heritage-motion", motionType: "pattachitra", alt: "Pattachitra Border Emergence" },
    texture: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#222"/></svg>', alt: "Wood Apple Resin Canvas" },
  },
  tanjore: {
    cinematicMotion: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1c1c1c"/></svg>', alt: "Tanjore Gold Relief" },
    texture: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#222"/></svg>', alt: "22-Karat Gold Foil Texture" },
  },
  madhubani: {
    cinematicMotion: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#1c1c1c"/></svg>', alt: "Madhubani Mythological Scene" },
    texture: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#222"/></svg>', alt: "Turmeric and Indigo Pigments" },
  },
  bidriware: {
    cinematicMotion: { type: "heritage-motion", motionType: "bidriware", alt: "Bidriware Oxidation Transition" },
    texture: { type: "svg", svgContent: '<svg width="100%" height="100%"><rect width="100%" height="100%" fill="#222"/></svg>', alt: "Silver Inlay on Zinc-Copper Alloy" },
  },
};
