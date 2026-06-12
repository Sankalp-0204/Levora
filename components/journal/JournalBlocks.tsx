import React from "react";
import { JournalBlock } from "@/types/journal";

/**
 * @file components/journal/JournalBlocks.tsx
 * @description Renders individual editorial blocks for the Journal articles.
 */

export function renderBlock(block: JournalBlock) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={block.id} className="type-body-lg text-ink-200 leading-relaxed mb-6 max-w-2xl mx-auto">
          {block.text}
        </p>
      );

    case "heading":
      const HeadingTag = block.level;
      const headingClasses = {
        h2: "type-h3 text-[var(--color-gold-400)] mt-16 mb-8 max-w-2xl mx-auto",
        h3: "type-h4 text-ink-white mt-12 mb-6 max-w-2xl mx-auto",
        h4: "type-body-lg uppercase tracking-widest text-ink-400 mt-8 mb-4 max-w-2xl mx-auto",
      };
      return (
        <HeadingTag key={block.id} className={headingClasses[block.level]}>
          {block.text}
        </HeadingTag>
      );

    case "pull-quote":
      return (
        <figure key={block.id} className="my-16 max-w-4xl mx-auto text-center px-6">
          <blockquote className="type-h2 text-gold-parchment leading-tight mb-6">
            "{block.text}"
          </blockquote>
          {block.attribution && (
            <figcaption className="type-caption uppercase tracking-widest text-ink-400">
              — {block.attribution}
            </figcaption>
          )}
        </figure>
      );

    case "image-full":
      return (
        <figure key={block.id} className="my-16 w-full max-w-5xl mx-auto">
          <div
            className="w-full aspect-video bg-black rounded overflow-hidden border border-white/5"
            dangerouslySetInnerHTML={{ __html: block.svgContent }}
          />
          {block.caption && (
            <figcaption className="mt-4 type-caption text-ink-400 text-center max-w-2xl mx-auto">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "heritage-fact":
      return (
        <div key={block.id} className="my-12 p-8 border-l border-[var(--color-gold-400)]/30 bg-[var(--color-gold-400)]/5 max-w-2xl mx-auto">
          <h4 className="type-caption uppercase tracking-widest text-ink-400 mb-3">
            Heritage Archive: {block.title}
          </h4>
          <p className="type-body text-ink-200">
            {block.fact}
          </p>
        </div>
      );

    case "technical-note":
      return (
        <div key={block.id} className="my-12 p-8 border border-white/10 bg-white/[0.02] rounded max-w-2xl mx-auto">
          <h4 className="type-caption uppercase tracking-widest text-ink-400 mb-3">
            Technical Specification: {block.title}
          </h4>
          <p className="type-body text-ink-300 font-mono text-sm leading-relaxed">
            {block.details}
          </p>
        </div>
      );

    case "two-column":
      return (
        <div key={block.id} className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-6">
          <p className="type-body text-ink-200 leading-relaxed border-t border-white/10 pt-4">
            {block.leftText}
          </p>
          <p className="type-body text-ink-200 leading-relaxed border-t border-[var(--color-gold-400)]/30 pt-4">
            {block.rightText}
          </p>
        </div>
      );

    case "lesson-block":
      return (
        <div key={block.id} className="my-16 py-12 border-y border-[var(--color-gold-400)]/20 text-center max-w-3xl mx-auto px-6">
          <h3 className="type-h4 text-[var(--color-gold-400)] mb-4">
            {block.title}
          </h3>
          <p className="type-body-lg text-ink-100 leading-relaxed">
            {block.lesson}
          </p>
        </div>
      );

    case "timeline":
      return (
        <div key={block.id} className="my-12 max-w-2xl mx-auto relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />
          <div className="flex flex-col gap-8">
            {block.events.map((ev, i) => (
              <div key={i} className="flex gap-6 relative z-10">
                <div className="mt-1 w-[15px] h-[15px] rounded-full bg-black border border-[var(--color-gold-400)] flex items-center justify-center flex-shrink-0">
                  <div className="w-[3px] h-[3px] rounded-full bg-[var(--color-gold-400)]" />
                </div>
                <div>
                  <h5 className="type-caption text-[var(--color-gold-400)] mb-1">{ev.year}</h5>
                  <p className="type-body text-ink-200">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      console.warn(`Unsupported block type: ${(block as any).type}`);
      return null;
  }
}
