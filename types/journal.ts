export type JournalCategory = 
  | "Heritage Archive"
  | "Craftsmanship Studies"
  | "Horology & Movements"
  | "Collector Notes";

// Editorial Block Types
export interface BaseBlock {
  id: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  text: string;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  level: "h2" | "h3" | "h4";
  text: string;
}

export interface PullQuoteBlock extends BaseBlock {
  type: "pull-quote";
  text: string;
  attribution?: string;
}

export interface FullBleedImageBlock extends BaseBlock {
  type: "image-full";
  // We use inline SVG strings for placeholders to maintain archival aesthetic
  svgContent: string;
  caption: string;
}

export interface HeritageFactBlock extends BaseBlock {
  type: "heritage-fact";
  title: string;
  fact: string;
}

export interface TechnicalNoteBlock extends BaseBlock {
  type: "technical-note";
  title: string;
  details: string;
}

export interface TimelineBlock extends BaseBlock {
  type: "timeline";
  events: { year: string; description: string }[];
}

export interface TwoColumnEditorialBlock extends BaseBlock {
  type: "two-column";
  leftText: string;
  rightText: string;
}

export interface LessonBlock extends BaseBlock {
  type: "lesson-block";
  title: string;
  lesson: string;
}

export type JournalBlock =
  | ParagraphBlock
  | HeadingBlock
  | PullQuoteBlock
  | FullBleedImageBlock
  | HeritageFactBlock
  | TechnicalNoteBlock
  | TimelineBlock
  | TwoColumnEditorialBlock
  | LessonBlock;

// Structure required by user:
// Opening Thesis
// Historical Context
// Technical Analysis
// Philosophical Lesson
// Collector Perspective
// Closing Reflection

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategory;
  publishDate: string; // ISO format or localized
  readTime: number; // in minutes
  heroSvgPlaceholder: string; // For the listing cards and hero header
  content: JournalBlock[];
}
