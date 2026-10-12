import { CryptoNewsArticle, NewsCategory, NewsSentiment, NewsSourceId } from "./types";

interface RssItem {
  title?: string;
  pubDate?: string;
  link?: string;
  guid?: string;
  author?: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  enclosure?: {
    link?: string;
    type?: string;
    thumbnail?: string;
  };
  categories?: string[];
}

interface RssFeedResponse {
  status?: string;
  feed?: {
    url?: string;
    title?: string;
    link?: string;
  };
  items?: RssItem[];
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export const SOURCE_DEFAULTS: Record<NewsSourceId, { name: string; domain: string }> = {
  all: {
    name: "All Sources",
    domain: "",
  },
  cointelegraph: {
    name: "Cointelegraph",
    domain: "cointelegraph.com",
  },
  decrypt: {
    name: "Decrypt",
    domain: "decrypt.co",
  },
  coindesk: {
    name: "CoinDesk",
    domain: "coindesk.com",
  },
  theblock: {
    name: "The Block",
    domain: "theblock.co",
  },
  bitcoinmagazine: {
    name: "Bitcoin Magazine",
    domain: "bitcoinmagazine.com",
  },
  other: {
    name: "Crypto News",
    domain: "",
  },
};

/**
 * Extracts the real image URL provided directly by the news API response payload.
 */
function extractImageFromApiResponse(item: RssItem): string {
  let imgUrl = "";

  // 1. Check enclosure.link from API
  if (item.enclosure?.link && typeof item.enclosure.link === "string" && item.enclosure.link.startsWith("http")) {
    imgUrl = item.enclosure.link;
  }
  // 2. Check thumbnail property from API
  else if (item.thumbnail && typeof item.thumbnail === "string" && item.thumbnail.startsWith("http")) {
    imgUrl = item.thumbnail;
  }
  // 3. Check enclosure.thumbnail from API
  else if (item.enclosure?.thumbnail && typeof item.enclosure.thumbnail === "string" && item.enclosure.thumbnail.startsWith("http")) {
    imgUrl = item.enclosure.thumbnail;
  } else {
    // 4. Extract embedded <img> tag from API description or content field
    const rawHtml = `${item.description || ""} ${item.content || ""}`;
    const imgMatch = rawHtml.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      imgUrl = imgMatch[1];
    }
  }

  // Handle YouTube embeds (convert to high quality thumbnail)
  if (imgUrl.includes("youtube.com/embed/")) {
    const videoId = imgUrl.split("youtube.com/embed/")[1]?.split("?")[0]?.split("/")[0];
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  }

  // Clean URL query entity encoding if present (e.g. &amp; -> &)
  return imgUrl.replace(/&amp;/g, "&").trim();
}

function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function analyzeSentiment(title: string, summary: string): NewsSentiment {
  const text = `${title} ${summary}`.toLowerCase();

  const bullishKeywords = [
    "surge",
    "rally",
    "bull",
    "gain",
    "jump",
    "high",
    "soar",
    "spike",
    "inflow",
    "growth",
    "milestone",
    "record",
    "boom",
    "profit",
    "upgrade",
    "launch",
    "accumulat",
    "adoption",
    "breakout",
    "approval",
  ];

  const bearishKeywords = [
    "crash",
    "plunge",
    "drop",
    "dump",
    "fall",
    "ban",
    "hack",
    "exploit",
    "scam",
    "lawsuit",
    "sec charges",
    "outflow",
    "liquidation",
    "fear",
    "down",
    "bear",
    "decline",
    "warning",
    "collapse",
    "risk",
  ];

  let score = 0;
  for (const word of bullishKeywords) {
    if (text.includes(word)) score += 1;
  }
  for (const word of bearishKeywords) {
    if (text.includes(word)) score -= 1;
  }

  if (score > 0) return "bullish";
  if (score < 0) return "bearish";
  return "neutral";
}

function detectCategories(title: string, summary: string, rawCategories: string[] = []): NewsCategory[] {
  const text = `${title} ${summary} ${rawCategories.join(" ")}`.toLowerCase();
  const categories: NewsCategory[] = [];

  if (text.includes("bitcoin") || text.includes("btc") || text.includes("satoshi")) {
    categories.push("bitcoin");
  }
  if (text.includes("ethereum") || text.includes("eth") || text.includes("vitalik") || text.includes("evm")) {
    categories.push("ethereum");
  }
  if (
    text.includes("defi") ||
    text.includes("perp") ||
    text.includes("yield") ||
    text.includes("liquidity") ||
    text.includes("dex") ||
    text.includes("gmx") ||
    text.includes("swap") ||
    text.includes("uniswap")
  ) {
    categories.push("defi");
  }
  if (
    text.includes("arbitrum") ||
    text.includes("layer 2") ||
    text.includes("l2") ||
    text.includes("optimism") ||
    text.includes("base") ||
    text.includes("avalanche") ||
    text.includes("avax") ||
    text.includes("polygon")
  ) {
    categories.push("arbitrum");
  }
  if (
    text.includes("sec") ||
    text.includes("regulation") ||
    text.includes("policy") ||
    text.includes("tax") ||
    text.includes("court") ||
    text.includes("law") ||
    text.includes("cftc") ||
    text.includes("senate")
  ) {
    categories.push("regulation");
  }
  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("agent") ||
    text.includes("bot")
  ) {
    categories.push("ai");
  }
  if (
    categories.length === 0 ||
    text.includes("market") ||
    text.includes("price") ||
    text.includes("analysis") ||
    text.includes("trader") ||
    text.includes("rally")
  ) {
    categories.push("market");
  }

  return categories;
}

const RSS_FEEDS: { sourceId: NewsSourceId; url: string }[] = [
  {
    sourceId: "cointelegraph",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcointelegraph.com%2Frss",
  },
  {
    sourceId: "decrypt",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fdecrypt.co%2Ffeed",
  },
  {
    sourceId: "coindesk",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.coindesk.com%2Farc%2Foutboundfeeds%2Frss%2F",
  },
  {
    sourceId: "theblock",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theblock.co%2Frss.xml",
  },
  {
    sourceId: "bitcoinmagazine",
    url: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fbitcoinmagazine.com%2Ffeed",
  },
];

export async function fetchAllCryptoNews(): Promise<CryptoNewsArticle[]> {
  const fetchPromises = RSS_FEEDS.map(async ({ sourceId, url }) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: RssFeedResponse = await res.json();

      if (!data.items || !Array.isArray(data.items)) return [];

      const sourceConfig = SOURCE_DEFAULTS[sourceId] || SOURCE_DEFAULTS.cointelegraph;

      return data.items.map((item, idx): CryptoNewsArticle => {
        const title = stripHtml(item.title || "Crypto Market Update");
        const rawSummary = stripHtml(item.description || item.content || "");
        const summary = rawSummary.length > 220 ? `${rawSummary.slice(0, 220).trim()}...` : rawSummary;
        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
        const publishedAt = isNaN(pubDate.getTime()) ? Date.now() - idx * 1000 * 60 * 30 : pubDate.getTime();
        const timeAgo = formatRelativeTime(new Date(publishedAt));
        const publishedAtFormatted = new Date(publishedAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        // Strictly extract image from API response
        const imageUrl = extractImageFromApiResponse(item);
        const categories = detectCategories(title, summary, item.categories);
        const sentiment = analyzeSentiment(title, summary);
        const words = `${title} ${summary}`.split(/\s+/).length;
        const readTimeMinutes = Math.max(1, Math.ceil(words / 60));

        return {
          id: item.guid || item.link || `${sourceId}-${publishedAt}-${idx}`,
          title,
          summary,
          url: item.link || "https://gmx.io",
          source: {
            id: sourceId,
            name: sourceConfig.name,
            domain: sourceConfig.domain,
          },
          author: item.author ? stripHtml(item.author) : undefined,
          publishedAt,
          publishedAtFormatted,
          timeAgo,
          imageUrl,
          categories,
          sentiment,
          isHot: idx < 2 || sentiment === "bullish",
          readTimeMinutes,
        };
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`[CryptoNews] Failed to load feed ${sourceId}:`, err);
      return [];
    }
  });

  const results = await Promise.allSettled(fetchPromises);
  const allArticles: CryptoNewsArticle[] = [];

  for (const r of results) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      allArticles.push(...r.value);
    }
  }

  if (allArticles.length === 0) {
    return [];
  }

  // Deduplicate by URL or normalized Title
  const seen = new Set<string>();
  const uniqueArticles = allArticles.filter((article) => {
    const key = article.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (seen.has(key) || seen.has(article.url)) return false;
    seen.add(key);
    seen.add(article.url);
    return true;
  });

  // Sort newest first
  return uniqueArticles.sort((a, b) => b.publishedAt - a.publishedAt);
}
