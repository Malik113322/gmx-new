export interface CoinGeckoRawTokenData {
  usd: number;
  usd_24h_change?: number;
  usd_24h_vol?: number;
  last_updated_at?: number;
}

export type CoinGeckoRawResponse = Record<string, CoinGeckoRawTokenData>;

export interface TokenMarketPrice {
  id: string;
  symbol: string;
  name: string;
  usdPrice: number;
  formattedPrice: string;
  change24h: number;
  formattedChange: string;
  volume24h?: number;
  lastUpdatedAt: number;
  icon: string;
  priceDirection?: "up" | "down" | "neutral";
}
