import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JOURNAL_ARTICLES } from "@/lib/constants/journal";
import { renderBlock } from "@/components/journal/JournalBlocks";
import { ReadingProgress } from "@/components/journal/ReadingProgress";

/**
 * @file app/journal/[slug]/page.tsx
 * @description Dynamic route for individual journal articles.
 */

// Generate static params for all known articles
export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = JOURNAL_ARTICLES.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <article className="bg-black min-h-screen relative pb-32">
      <ReadingProgress />

      {/* Hero Section */}
      <header className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-16 px-6 md:px-12 border-b border-white/10">
        <div 
          className="absolute inset-0 z-0 opacity-40"
          dangerouslySetInnerHTML={{ __html: article.heroSvgPlaceholder }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        
        <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-8">
            <span className="type-caption text-[var(--color-gold-400)] uppercase tracking-widest">
              {article.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="type-caption text-ink-400">
              {article.readTime} Min Read
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="type-caption text-ink-400">
              {new Date(article.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
            </span>
          </div>
          
          <h1 className="type-h1 text-ink-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="type-body-lg text-gold-parchment max-w-2xl mx-auto italic">
            {article.excerpt}
          </p>
        </div>
      </header>

      {/* Article Content */}
      <div className="w-full max-w-screen-xl mx-auto px-6 py-16 md:py-24">
        {article.content.map((block) => renderBlock(block))}
      </div>

      {/* Divider */}
      <div className="max-w-xl mx-auto flex justify-center py-16">
        <svg width="64" height="12" viewBox="0 0 64 12" fill="none" className="text-white/20">
          <circle cx="6" cy="6" r="2" fill="currentColor"/>
          <circle cx="32" cy="6" r="2" fill="currentColor"/>
          <circle cx="58" cy="6" r="2" fill="currentColor"/>
        </svg>
      </div>

      {/* Author/Curation Tag */}
      <div className="max-w-2xl mx-auto px-6 text-center mb-32">
        <p className="type-caption uppercase tracking-widest text-ink-400 mb-2">Curated By</p>
        <p className="type-body text-ink-200">The Levora Heritage Archive</p>
      </div>

      {/* Related Reading */}
      <section className="max-w-screen-xl mx-auto px-6 border-t border-white/10 pt-24">
        <h3 className="type-h3 text-ink-white mb-12 text-center">Further Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {relatedArticles.map(related => (
            <Link key={related.id} href={`/journal/${related.slug}`} className="group flex flex-col gap-6">
              <div className="w-full aspect-video border border-white/5 overflow-hidden">
                <div 
                  className="w-full h-full transform transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  dangerouslySetInnerHTML={{ __html: related.heroSvgPlaceholder }}
                />
              </div>
              <div>
                <span className="type-caption text-[var(--color-gold-400)] uppercase tracking-widest mb-3 block">
                  {related.category}
                </span>
                <h4 className="type-h4 text-ink-white group-hover:text-[var(--color-gold-400)] transition-colors">
                  {related.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </article>
  );
}
