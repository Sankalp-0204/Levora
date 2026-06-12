import React from "react";
import Link from "next/link";
import { JournalArticle } from "@/types/journal";

/**
 * @file components/journal/ArticleCard.tsx
 * @description A card component for the Journal Hub displaying an article preview.
 */

interface ArticleCardProps {
  article: JournalArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Link href={`/journal/${article.slug}`} className={`group flex flex-col ${featured ? "lg:flex-row gap-12 items-center" : "gap-6"}`}>
      
      <div className={`relative overflow-hidden bg-black border border-white/5 ${featured ? "w-full lg:w-3/5 aspect-video" : "w-full aspect-[4/3]"}`}>
        <div 
          className="w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
          dangerouslySetInnerHTML={{ __html: article.heroSvgPlaceholder }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
      </div>

      <div className={`flex flex-col ${featured ? "w-full lg:w-2/5" : "w-full"}`}>
        <div className="flex items-center gap-4 mb-4">
          <span className="type-caption text-[var(--color-gold-400)] uppercase tracking-widest">
            {article.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="type-caption text-ink-400">
            {article.readTime} Min Read
          </span>
        </div>
        
        <h3 className={`${featured ? "type-h2" : "type-h4"} text-ink-white mb-4 transition-colors group-hover:text-[var(--color-gold-400)]`}>
          {article.title}
        </h3>
        
        <p className="type-body text-ink-200 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="mt-6 flex items-center gap-2 text-gold-parchment type-caption uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
          <span>Read Manuscript</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

    </Link>
  );
}
