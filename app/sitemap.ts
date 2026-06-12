import { MetadataRoute } from "next";
import { WATCH_PLACEHOLDERS } from "@/lib/constants/collection";
import { JOURNAL_ARTICLES } from "@/lib/constants/journal";

const SITE_URL = "https://levora.in";

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Static Routes
  const staticRoutes = ["", "/journal", "/salon"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Collection Routes
  const collectionRoutes = Object.values(WATCH_PLACEHOLDERS).map((watch) => ({
    url: `${SITE_URL}/collections/heritage/${watch.id.toLowerCase().replace(/_/g, "-")}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // 3. Dynamic Journal Routes
  const journalRoutes = JOURNAL_ARTICLES.map((article) => ({
    url: `${SITE_URL}/journal/${article.slug}`,
    lastModified: new Date(article.publishDate).toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...collectionRoutes, ...journalRoutes];
}
