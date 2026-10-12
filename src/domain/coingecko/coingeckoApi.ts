import btcIcon from "img/tokens/ic_btc.svg";
import ethIcon from "img/tokens/ic_eth.svg";
import gmxIcon from "img/tokens/ic_gmx.svg";
import avaxIcon from "img/tokens/ic_avax.svg";
import solIcon from "img/tokens/ic_sol.svg";

import { CoinGeckoRawResponse, TokenMarketPrice } from "./types";

export const TRACKED_TOKENS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", icon: btcIcon, precision: 2 },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", icon: ethIcon, precision: 2 },
  { id: "gmx", symbol: "GMX", name: "GMX", icon: gmxIcon, precision: 2 },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche", icon: avaxIcon, precision: 2 },
  { id: "solana", symbol: "SOL", name: "Solana", icon: solIcon, precision: 2 },
];

function formatUsdPrice(val: number, precision = 2): string {
  if (val >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }).format(val);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(val);
}

function formatPercentage(change?: number): string {
  if (typeof change !== "number" || isNaN(change)) return "0.00%";
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

export async function fetchCoinGeckoPrices(): Promise<TokenMarketPrice[]> {
  const tokenIds = TRACKED_TOKENS.map((t) => t.id).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_last_updated_at=true`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`CoinGecko HTTP error ${res.status}`);
    }

    const data: CoinGeckoRawResponse = await res.json();

    return TRACKED_TOKENS.map((tokenConfig) => {
      const rawData = data[tokenConfig.id] || { usd: 0, usd_24h_change: 0, usd_24h_vol: 0, last_updated_at: Date.now() / 1000 };
      const usdPrice = rawData.usd || 0;
      const change24h = rawData.usd_24h_change || 0;

      return {
        id: tokenConfig.id,
        symbol: tokenConfig.symbol,
        name: tokenConfig.name,
        usdPrice,
        formattedPrice: formatUsdPrice(usdPrice, tokenConfig.precision),
        change24h,
        formattedChange: formatPercentage(change24h),
        volume24h: rawData.usd_24h_vol,
        lastUpdatedAt: (rawData.last_updated_at || Date.now() / 1000) * 1000,
        icon: tokenConfig.icon,
      };
    });
  } catch (err) {
    clearTimeout(timeoutId);
    // eslint-disable-next-line no-console
    console.warn("[CoinGecko] Price fetch error:", err);
    throw err;
  }
}
