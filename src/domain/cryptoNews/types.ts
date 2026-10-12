export type NewsSourceId = "all" | "cointelegraph" | "decrypt" | "coindesk" | "theblock" | "bitcoinmagazine" | "other";

export type NewsCategory =
  | "all"
  | "bitcoin"
  | "ethereum"
  | "defi"
  | "arbitrum"
  | "market"
  | "regulation"
  | "ai"
  | "bookmarked";

export type NewsSortOption = "newest" | "oldest" | "popular";

export type NewsSentiment = "bullish" | "bearish" | "neutral";

export interface CryptoNewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url: string;
  source: {
    id: NewsSourceId;
    name: string;
    domain: string;
    logo?: string;
  };
  author?: string;
  publishedAt: number; // Unix timestamp ms
  publishedAtFormatted: string;
  timeAgo: string;
  imageUrl: string;
  categories: string[];
  sentiment: NewsSentiment;
  isHot?: boolean;
  readTimeMinutes: number;
}

export interface NewsFilterState {
  category: NewsCategory;
  source: NewsSourceId;
  searchQuery: string;
  sortBy: NewsSortOption;
}
