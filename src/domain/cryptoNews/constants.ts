import { NewsCategory, NewsSourceId } from "./types";

export const NEWS_CATEGORIES: { id: NewsCategory; label: string; icon?: string }[] = [
  { id: "all", label: "All News" },
  { id: "bitcoin", label: "Bitcoin (BTC)" },
  { id: "ethereum", label: "Ethereum (ETH)" },
  { id: "defi", label: "DeFi & Perps" },
  { id: "arbitrum", label: "Arbitrum & L2s" },
  { id: "market", label: "Market Analysis" },
  { id: "regulation", label: "Regulation & Policy" },
  { id: "ai", label: "AI & Web3" },
  { id: "bookmarked", label: "Saved" },
];

export const NEWS_SOURCES: { id: NewsSourceId; name: string; domain: string; color: string }[] = [
  { id: "all", name: "All Sources", domain: "", color: "#38bdf8" },
  { id: "cointelegraph", name: "Cointelegraph", domain: "cointelegraph.com", color: "#f59e0b" },
  { id: "decrypt", name: "Decrypt", domain: "decrypt.co", color: "#10b981" },
  { id: "coindesk", name: "CoinDesk", domain: "coindesk.com", color: "#06b6d4" },
  { id: "theblock", name: "The Block", domain: "theblock.co", color: "#8b5cf6" },
  { id: "bitcoinmagazine", name: "Bitcoin Magazine", domain: "bitcoinmagazine.com", color: "#f97316" },
];
