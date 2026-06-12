import React from "react";
import { JOURNAL_ARTICLES } from "@/lib/constants/journal";
import { ArticleCard } from "@/components/journal/ArticleCard";

/**
 * @file app/journal/page.tsx
 * @description The Journal Hub. An editorial landing page for Levora's cultural content.
 */

export const metadata = {
  title: "The Archive | Levora Journal",
  description: "Essays, historical context, and curatorial notes on haute horlogerie and Indian heritage arts.",
};

export default function JournalHubPage() {
  const featuredArticle = JOURNAL_ARTICLES[0];
  const recentArticles = JOURNAL_ARTICLES.slice(1, 4);
  const archiveArticles = JOURNAL_ARTICLES.slice(4);

  return (
    <div className="bg-black min-h-screen pt-32 pb-24 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
      
      {/* Header */}
      <header className="mb-20 text-center max-w-3xl mx-auto">
        <span className="type-caption text-[var(--color-gold-400)] uppercase tracking-widest mb-4 block">
          Levora Publications
        </span>
        <h1 className="type-h1 text-ink-white mb-6">
          The Archive
        </h1>
        <p className="type-body-lg text-ink-200">
          Curatorial essays, historical context, and technical studies exploring the intersection of Swiss haute horlogerie and three millennia of Indian heritage arts.
        </p>
      </header>

      {/* Featured Story */}
      <section className="mb-32">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-2 rounded-full bg-[var(--color-gold-400)]" />
          <h2 className="type-caption uppercase tracking-widest text-ink-300">Featured Manuscript</h2>
        </div>
        <ArticleCard article={featuredArticle} featured />
      </section>

      {/* Latest Essays Grid */}
      <section className="mb-32">
        <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-12">
          <h2 className="type-h3 text-ink-white">Latest Essays</h2>
          <span className="type-caption uppercase tracking-widest text-ink-400">Vol. I</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {recentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Craftsmanship Studies / Archive */}
      <section className="mb-24">
        <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-12">
          <h2 className="type-h3 text-ink-white">From the Curators</h2>
          <span className="type-caption uppercase tracking-widest text-ink-400">Archive</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {archiveArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
      
    </div>
  );
}
