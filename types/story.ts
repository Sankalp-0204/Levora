/**
 * @file types/story.ts
 * @description Story domain model — cultural heritage narratives for Levora.
 *
 * Stories are the editorial backbone of Levora. Each watch model is connected
 * to one or more Story documents that provide the historical, artistic, and
 * cultural context behind the dial design.
 *
 * Stories are rendered as scroll-driven GSAP experiences on the heritage story
 * pages (/stories/[slug]) and embedded as contextual sections within watch
 * detail pages.
 *
 * Design decisions:
 *
 * 1. STRUCTURED CONTENT BLOCKS
 *    Story content is stored as an ordered array of typed ContentBlock objects,
 *    not as a single freeform string. This allows GSAP to target each block
 *    independently as a scroll trigger — each block can animate in separately
 *    without the animation code knowing the content.
 *
 * 2. ANIMATION TRIGGERS AS DATA
 *    GSAP animation class selectors are stored as data on the content block
 *    rather than hardcoded in the component. This means editorial changes
 *    (e.g., changing a block from a fade-in to a slide-up) are made in the
 *    admin panel, not in code.
 *
 * 3. MANY-TO-MANY WATCH-STORY RELATIONSHIP
 *    A watch can reference multiple stories; a story can reference multiple
 *    watches. This is modelled as arrays of IDs on both sides (denormalised
 *    for Firestore's flat document structure).
 *
 * Firestore path: /stories/{storyId}
 */

import type { StoryId, WatchId, AuditFields, Slug } from "./common";
import type { ImageAsset, VideoSourceSet } from "./media";

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT BLOCK TYPES — Discriminated union for structured story content
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A text paragraph content block.
 * Rendered as a styled `<p>` element within the story scroller.
 */
export interface TextBlock {
  kind: "text";

  /**
   * The text content of the paragraph.
   * Supports plain text. Inline bold/italic via Markdown may be introduced later.
   */
  body: string;

  /**
   * Optional GSAP animation class applied to this block's DOM element.
   * The StoryScroller reads this to decide how the block enters the viewport.
   *
   * Defined values:
   *   "fade-up"    — Fades in while translating upward (default)
   *   "fade-in"    — Simple opacity fade with no translation
   *   "slide-left" — Slides in from the right (for alternating layouts)
   *   "slide-right"— Slides in from the left
   *   "reveal"     — Staggered character/line reveal (for impactful statements)
   */
  animationTrigger?: StoryAnimationTrigger;
}

/**
 * A full-bleed or inset image block within the story scroll.
 */
export interface ImageBlock {
  kind: "image";

  /** The image to display. Full ImageAsset for Next.js Image optimisation. */
  image: ImageAsset;

  /**
   * Display style of the image within the story layout.
   * "full-bleed"  — Edge-to-edge, no margins
   * "inset"       — Bounded within prose width with padding
   * "float-right" — Floats right with text wrapping (desktop only)
   * "float-left"  — Floats left with text wrapping (desktop only)
   */
  layout: "full-bleed" | "inset" | "float-right" | "float-left";

  animationTrigger?: StoryAnimationTrigger;
}

/**
 * An ambient video loop block — plays inline within the story scroll.
 * Used for close-up craft videos (hands applying gold leaf, laser engraving).
 */
export interface VideoBlock {
  kind: "video";

  /** Dual-format video source set. Both WebM and MP4 required. */
  video: VideoSourceSet;

  /**
   * Display style — same options as ImageBlock layout.
   */
  layout: "full-bleed" | "inset";

  animationTrigger?: StoryAnimationTrigger;
}

/**
 * A pull-quote content block — a highlighted sentence from the story.
 * Rendered with Cormorant Garamond italic, large size, gold left border.
 */
export interface QuoteBlock {
  kind: "quote";

  /**
   * The quoted text. Should be concise — maximum 30 words.
   * Example: "Time is not measured. It is remembered."
   */
  body: string;

  /**
   * Optional attribution for the quote.
   * Example: "Master Craftsman, Jaipur Atelier"
   */
  attribution?: string;

  animationTrigger?: StoryAnimationTrigger;
}

/**
 * A decorative divider between story sections.
 * Rendered as a thin horizontal rule with optional gold accent element.
 */
export interface DividerBlock {
  kind: "divider";

  /**
   * Visual style of the divider.
   * "rule"    — Simple thin horizontal line
   * "dots"    — Three centered dots (⋯)
   * "ornament"— A decorative SVG ornament (watch gear, lotus, etc.)
   */
  style: "rule" | "dots" | "ornament";
}

/**
 * A "callout" block — a fact card or highlighted detail box.
 * Used for impactful historical facts, dimensions, or material details.
 */
export interface CalloutBlock {
  kind: "callout";

  /** The highlighted fact or detail. Example: "Built in 1499 AD." */
  fact: string;

  /** Supporting context for the fact. */
  detail: string;

  animationTrigger?: StoryAnimationTrigger;
}

/**
 * All possible content block types within a story.
 * TypeScript discriminated union — switch on `block.kind`.
 *
 * @example
 *   story.content.forEach((block) => {
 *     switch (block.kind) {
 *       case "text":    renderTextBlock(block); break;
 *       case "image":   renderImageBlock(block); break;
 *       case "video":   renderVideoBlock(block); break;
 *       case "quote":   renderQuoteBlock(block); break;
 *       case "divider": renderDivider(block);    break;
 *       case "callout": renderCallout(block);    break;
 *     }
 *   });
 */
export type StoryContentBlock =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | QuoteBlock
  | DividerBlock
  | CalloutBlock;

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION TRIGGERS — GSAP integration points
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The set of supported GSAP animation triggers for story content blocks.
 * These string values correspond to animation configurations registered
 * in `lib/gsap/animations.ts` — the CSS class-like identifiers that
 * the StoryScroller uses to look up and apply the correct GSAP timeline.
 */
export type StoryAnimationTrigger =
  | "fade-up"     // Translate Y + opacity (default, most blocks)
  | "fade-in"     // Opacity only (for elements already in position)
  | "slide-left"  // TranslateX from right + opacity
  | "slide-right" // TranslateX from left + opacity
  | "reveal"      // SplitText character/line stagger (impactful headlines)
  | "scale-in"    // Scale from 0.85 + opacity (for image blocks)
  | "parallax";   // Slow vertical parallax (background layers only)

// ─────────────────────────────────────────────────────────────────────────────
// STORY CHAPTER — A named section within a long story
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A named chapter within a story — a logical group of ContentBlocks.
 * Chapters appear as navigation markers in the story sidebar on desktop,
 * allowing readers to jump to sections.
 */
export interface StoryChapter {
  /**
   * Chapter display number (used for the decorative `.type-chapter-marker`).
   * Example: "01", "02", "03"
   */
  number: string;

  /** Chapter title shown in the sidebar navigation. */
  title: string;

  /**
   * An optional atmospheric subtitle for the chapter.
   * Example: "The Architecture of Shadow"
   */
  subtitle?: string;

  /** The ordered content blocks within this chapter. */
  content: StoryContentBlock[];
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY — Full domain entity
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A Levora cultural heritage story.
 *
 * Stories are the editorial centrepiece of the Levora experience.
 * Each story connects a watch's dial design to its historical inspiration —
 * a dynasty, monument, art form, or craft tradition.
 *
 * @example
 *   {
 *     id:              "story_heritage_01" as StoryId,
 *     title:           "The Geometry of Chand Baori",
 *     slug:            "the-geometry-of-chand-baori",
 *     summary:         "How a 10th-century stepwell became a dial.",
 *     relatedWatchIds: ["HERITAGE_01" as WatchId],
 *     chapters:        [...],
 *     ...
 *   }
 */
export interface Story extends AuditFields {
  /**
   * Firestore document ID.
   * Convention: `story_{watchId.toLowerCase()}` for watch-linked stories.
   * Example: "story_heritage_01"
   */
  id: StoryId;

  /**
   * Full story title.
   * Example: "The Geometry of Chand Baori"
   */
  title: string;

  /**
   * URL-friendly slug.
   * Route: /stories/[slug]
   * Example: "the-geometry-of-chand-baori"
   */
  slug: Slug;

  /**
   * Short editorial summary shown on listing cards and meta descriptions.
   * Example: "How a 10th-century stepwell became the canvas for a watch dial."
   * Maximum 160 characters (SEO-optimised length).
   */
  summary: string;

  /**
   * Structured content — an ordered array of chapters, each containing blocks.
   * At minimum one chapter with at least one TextBlock is required.
   */
  chapters: [StoryChapter, ...StoryChapter[]];

  /**
   * The watch models this story is connected to.
   * A story may be linked to multiple watches (e.g., a dynasty story
   * inspiring three different Heritage models).
   */
  relatedWatchIds: WatchId[];

  /**
   * Cover image for story listing cards, the story header, and OG images.
   */
  coverImage: ImageAsset;

  /**
   * Optional ambient background video for the full story scroll stage.
   * When provided, plays silently behind the story content.
   */
  ambientVideo?: VideoSourceSet;

  /**
   * The approximate reading time in minutes.
   * Displayed on story cards and at the beginning of the story.
   * Calculated at write time (admin): wordCount / 200 words-per-minute.
   */
  readingTimeMinutes: number;

  /**
   * Optional cultural period or dynasty label.
   * Displayed as a decorative section label above the story title.
   * Example: "Rajput Dynasty · 9th Century"
   */
  era?: string;

  /**
   * Optional geographic origin label.
   * Example: "Abhaneri, Rajasthan" / "Hampi, Karnataka"
   */
  origin?: string;

  /**
   * Controls whether this story is publicly visible.
   * Admin can toggle to draft/publish stories independently of watch visibility.
   */
  isPublished: boolean;

  /**
   * SEO meta description for the /stories/[slug] page.
   */
  metaDescription: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY SUMMARY — Lightweight card representation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A lightweight Story projection used in listing cards and watch detail
 * page "related stories" sections. Avoids fetching full chapter content.
 */
export type StorySummary = Pick<
  Story,
  | "id"
  | "title"
  | "slug"
  | "summary"
  | "coverImage"
  | "relatedWatchIds"
  | "readingTimeMinutes"
  | "era"
  | "origin"
  | "isPublished"
>;

// ─────────────────────────────────────────────────────────────────────────────
// SERVER ACTION PAYLOADS
// ─────────────────────────────────────────────────────────────────────────────

/** Payload for creating a new Story via Admin Server Action. */
export type CreateStoryPayload = Omit<Story, "id" | "createdAt" | "updatedAt">;

/** Payload for updating an existing Story. */
export type UpdateStoryPayload = Partial<
  Omit<Story, "id" | "createdAt" | "updatedAt">
>;
