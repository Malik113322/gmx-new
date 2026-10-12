import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { fetchCoinGeckoPrices } from "./coingeckoApi";
import { TokenMarketPrice } from "./types";

export function useCoinGeckoPrices() {
  const prevPricesRef = useRef<Record<string, number>>({});
  const [priceDirections, setPriceDirections] = useState<Record<string, "up" | "down" | "neutral">>({});

  const {
    data: tokens = [],
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TokenMarketPrice[]>("coingecko-token-prices", fetchCoinGeckoPrices, {
    refreshInterval: 15000, // auto-refresh every 15s for smooth real-time experience
    revalidateOnFocus: true,
    dedupingInterval: 10000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      const newDirections: Record<string, "up" | "down" | "neutral"> = {};

      tokens.forEach((t) => {
        const prevPrice = prevPricesRef.current[t.id];
        if (typeof prevPrice === "number" && prevPrice > 0) {
          if (t.usdPrice > prevPrice) {
            newDirections[t.id] = "up";
          } else if (t.usdPrice < prevPrice) {
            newDirections[t.id] = "down";
          } else {
            newDirections[t.id] = "neutral";
          }
        } else {
          newDirections[t.id] = "neutral";
        }
        prevPricesRef.current[t.id] = t.usdPrice;
      });

      setPriceDirections(newDirections);

      // Clear the flash direction after 2 seconds
      const timer = setTimeout(() => {
        setPriceDirections({});
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [tokens]);

  const enrichedTokens: TokenMarketPrice[] = tokens.map((t) => ({
    ...t,
    priceDirection: priceDirections[t.id] || "neutral",
  }));

  const btc = enrichedTokens.find((t) => t.symbol === "BTC");
  const eth = enrichedTokens.find((t) => t.symbol === "ETH");
  const gmx = enrichedTokens.find((t) => t.symbol === "GMX");

  return {
    tokens: enrichedTokens,
    btc,
    eth,
    gmx,
    isLoading,
    isValidating,
    error,
    refresh: () => mutate(),
  };
}
