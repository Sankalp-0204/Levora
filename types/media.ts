/**
 * @file types/media.ts
 * @description MediaAsset type system for Levora.
 *
 * Covers every asset format used across the platform:
 *   - Static high-resolution product images
 *   - GSAP-animated layered dial image stacks
 *   - Ambient background video loops
 *   - GLTF/GLB 3D watch models
 *   - Decorative UI graphics (story illustrations, section backgrounds)
 *
 * WHY A DEDICATED MEDIA TYPE LAYER:
 *   Asset metadata is referenced from both Watch and Story documents.
 *   Having shared, composable asset types prevents duplication and ensures
 *   that format constraints (size limits, MIME types, dimension caps) are
 *   defined once and enforced uniformly.
 */

import type { AssetId, AuditFields } from "./common";

// ─────────────────────────────────────────────────────────────────────────────
// MIME TYPES — Constrained to the formats the platform actually supports
// ─────────────────────────────────────────────────────────────────────────────

/** Supported image MIME types. AVIF and WebP are preferred over PNG. */
export type ImageMimeType =
  | "image/avif"    // Preferred — smallest file, best quality
  | "image/webp"    // Fallback for AVIF-unsupported browsers
  | "image/png"     // Source format for layered dial transparency (lossless)
  | "image/jpeg";   // Legacy fallback — avoid for new assets

/** Supported video MIME types. Both must be provided for cross-browser play. */
export type VideoMimeType =
  | "video/webm"    // VP9 — preferred (smaller, better quality)
  | "video/mp4";    // H.264/HEVC — universal fallback

/** Supported 3D model formats. GLB is the only production format. */
export type ModelMimeType =
  | "model/gltf-binary";  // GLB — binary glTF; Draco-compressed

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE DIMENSIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Pixel dimensions for an image asset. */
export interface ImageDimensions {
  width:  number; // px
  height: number; // px
}

// ─────────────────────────────────────────────────────────────────────────────
// BASE ASSET — Fields shared by all asset types
// ─────────────────────────────────────────────────────────────────────────────

interface BaseAsset {
  /** Unique asset identifier. */
  id: AssetId;

  /**
   * Absolute URL or root-relative path to the asset.
   * Examples:
   *   "/assets/watches/heritage-01/front.avif"
   *   "https://storage.googleapis.com/levora-prod.appspot.com/..."
   */
  url: string;

  /** File size in bytes. Used for bundle budgeting and performance monitoring. */
  sizeBytes: number;

  /** Alt text for images; transcript for videos. Required for accessibility. */
  alt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC IMAGE ASSET
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single optimised image asset.
 * Used for: product hero shots, gallery images, story section illustrations,
 * section background graphics.
 */
export interface ImageAsset extends BaseAsset {
  kind: "image";
  mimeType:   ImageMimeType;
  dimensions: ImageDimensions;

  /**
   * Low-quality placeholder for blur-up loading strategy.
   * A base64-encoded data URL generated at build time (e.g. via `plaiceholder`).
   * Used as Next.js Image `blurDataURL`.
   */
  blurDataUrl?: string;

  /**
   * Responsive size hint for Next.js Image `sizes` prop.
   * Example: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   */
  sizes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYERED DIAL ASSET — GSAP scroll-driven dial separation stack
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single transparent layer within a watch dial composition.
 * Layers are ordered bottom-to-top by `zIndex`.
 *
 * The GSAP LayeredRenderer animates each layer outward along the simulated
 * Z-axis based on `scrollDepth` and `scaleFactor` when the user scrolls
 * the product detail pinned section.
 */
export interface DialLayer {
  /**
   * Human-readable label shown in the scroll storytelling sidebar.
   * Example: "Hand-Patinated Canvas" / "Laser-Cut Silver Filigree"
   */
  name: string;

  /**
   * Short technical description of the layer — displayed as a callout
   * when the layer separates during the GSAP dial explosion.
   */
  description: string;

  /** URL of the transparent PNG layer image. Must be lossless (PNG). */
  url: string;

  /**
   * Render stack order. Base plate = lowest, glass bezel = highest.
   * Matches the Firestore `zIndex` field. GSAP reads this at runtime.
   */
  zIndex: number;

  /**
   * Scroll multiplier that controls how far this layer travels during
   * the dial explosion. Higher = travels further. Glass layer is fastest.
   * Typical range: 0.5 (base plate) to 3.0 (glass bezel).
   */
  scrollDepth: number;

  /**
   * Default render scale for this layer (1.0 = original size).
   * Allows subtle size differences between layers for optical depth.
   */
  scaleFactor: number;
}

/**
 * The complete layered dial asset configuration for a watch.
 * Used by the `LayeredRenderer` component when `renderType === "layered"`.
 */
export interface LayeredDialAsset {
  kind: "layered_dial";

  /**
   * Storage path prefix for all layers in this dial.
   * Example: "/assets/watches/heritage-01/layers/"
   * Individual layer URLs are relative to this directory.
   */
  baseDirectory: string;

  /**
   * Ordered array of transparent dial layers from bottom (base plate) to top
   * (sapphire glass bezel). Must contain at minimum 3 layers.
   */
  layers: [DialLayer, DialLayer, DialLayer, ...DialLayer[]];
}

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO ASSET — Ambient background loops
// ─────────────────────────────────────────────────────────────────────────────

/**
 * An ambient background video loop asset.
 * Must be provided in both WebM and MP4 for cross-browser autoplay.
 *
 * Constraints (from CONTENT_STRATEGY.md):
 *   - Max file size: 5MB per format
 *   - No audio track (stripped for autoplay compatibility)
 *   - Loops continuously without visual jump
 */
export interface VideoAsset extends BaseAsset {
  kind: "video";
  mimeType: VideoMimeType;

  /**
   * Duration of the loop in seconds.
   * Used to set the `loop` restart point precisely.
   */
  durationSeconds: number;

  /**
   * Static poster image shown before the video loads or in fallback contexts.
   * Must be provided for performance — prevents blank flash on slow connections.
   */
  posterUrl: string;
}

/**
 * A video source set — both WebM and MP4 versions of the same clip.
 * Always use this type rather than a single VideoAsset to ensure
 * cross-browser compatibility.
 */
export interface VideoSourceSet {
  /** VP9 WebM — preferred format for Chrome, Firefox, Edge. */
  webm: VideoAsset;

  /** H.264 MP4 — universal fallback for Safari and legacy browsers. */
  mp4:  VideoAsset;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D MODEL ASSET — GLTF/GLB interactive watch model
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A 3D coordinate vector [x, y, z].
 * Used for camera position and target configuration in the ModelRenderer.
 */
export type Vector3 = [x: number, y: number, z: number];

/**
 * GLTF/GLB 3D watch model asset configuration.
 * Used by `ModelRenderer` when `renderType === "3d"`.
 *
 * Constraints (from CONTENT_STRATEGY.md):
 *   - Format: GLB (binary glTF, Draco-compressed)
 *   - Max file size: 3.5MB
 *   - Textures: Ambient occlusion baked in; no real-time lighting calculations
 */
export interface Model3dAsset {
  kind: "model_3d";

  /**
   * URL to the Draco-compressed GLB file.
   * Example: "/assets/watches/heritage-06/model.glb"
   */
  url: string;

  /** File size in bytes. Must not exceed 3,670,016 bytes (3.5MB). */
  sizeBytes: number;

  /**
   * Ambient light intensity for the React Three Fiber canvas environment.
   * Simulates jewelry store lighting conditions.
   * Typical value: 0.4–0.8
   */
  ambientIntensity: number;

  /**
   * The 3D point the camera always looks at.
   * Typically the center of the watch face.
   */
  cameraTarget: Vector3;

  /**
   * The initial camera position when the model first loads.
   * Adjusted per model to ensure the best opening angle.
   */
  cameraPosition: Vector3;

  /**
   * Minimum zoom distance (prevents clipping into the model surface).
   */
  minDistance: number;

  /**
   * Maximum zoom distance (prevents the model becoming too small to see).
   */
  maxDistance: number;

  /**
   * Whether to enable auto-rotation when the user is not interacting.
   * Typically true for showcase contexts, false for detail inspection.
   */
  autoRotate: boolean;

  /** Auto-rotation speed in degrees per second. Typical value: 0.5–1.5. */
  autoRotateSpeed: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// WATCH ASSET BUNDLE — All media for a single watch
//
// This is the top-level asset type stored inside a Watch document.
// The `renderType` on the Watch determines which asset fields are required.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The complete asset bundle for a single watch model.
 *
 * `staticUrl` and `galleryImages` are always required.
 * `layeredDial` is required when `renderType === "layered"`.
 * `model3d` is required when `renderType === "3d"`.
 */
export interface WatchAssetBundle {
  /**
   * Primary high-resolution front-face product image.
   * Used as the loading fallback for all render types (including 3D and layered).
   * Must be AVIF or WebP, max 2048×2048px.
   */
  staticImage: ImageAsset;

  /**
   * Gallery images for the carousel on the watch detail page.
   * Minimum 3, maximum 12 images.
   * Each image represents a different angle or detail of the watch.
   */
  galleryImages: [ImageAsset, ImageAsset, ImageAsset, ...ImageAsset[]];

  /**
   * Layered dial asset configuration.
   * Required when Watch.renderType === "layered".
   * Absent for static and 3D render modes.
   */
  layeredDial?: LayeredDialAsset;

  /**
   * 3D model asset configuration.
   * Required when Watch.renderType === "3d".
   * Absent for static and layered render modes.
   */
  model3d?: Model3dAsset;
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY ASSET BUNDLE — Media for a story content block
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Asset bundle for a Story document's ambient and section-level media.
 */
export interface StoryAssetBundle {
  /**
   * Ambient background video shown behind the full story scroll stage.
   * Optional — some stories use static image backgrounds instead.
   */
  ambientVideo?: VideoSourceSet;

  /**
   * Static background image fallback for the story stage.
   * Used when video is unavailable or on reduced-motion devices.
   * Required if ambientVideo is absent.
   */
  backgroundImage?: ImageAsset;

  /**
   * Cover image for story listing cards and social sharing (OG image).
   * Must be present on every story.
   */
  coverImage: ImageAsset;
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA ASSET — Generic indexed asset for the Admin media library
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A generic, catalogued media asset stored in the Admin media library.
 * Used for asset management — not for runtime rendering (use the specific
 * asset types above for rendering).
 *
 * Stored at: `/media/{assetId}` (admin-only collection)
 */
export interface MediaAsset extends AuditFields {
  id:       AssetId;
  kind:     "image" | "video" | "model_3d" | "document";
  url:      string;
  mimeType: ImageMimeType | VideoMimeType | ModelMimeType | "application/pdf";
  sizeBytes: number;
  filename:  string;
  alt:       string;

  /**
   * Tags used for filtering in the admin media library.
   * Example: ["heritage-01", "dial", "front-face"]
   */
  tags: string[];

  /** Who uploaded this asset. Linked to their UserId. */
  uploadedBy: string;
}
