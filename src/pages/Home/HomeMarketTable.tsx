import cx from "classnames";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useCoinGeckoPrices } from "domain/coingecko/useCoinGeckoPrices";

type MarketTab = "tradable" | "gainers" | "layer1" | "all";

export function HomeMarketTable() {
  const { tokens, isLoading } = useCoinGeckoPrices();
  const [tab, setTab] = useState<MarketTab>("tradable");
  const [search, setSearch] = useState("");

  const filteredTokens = useMemo(() => {
    let list = [...tokens];

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((t) => t.name.toLowerCase().includes(q) || t.symbol.toLowerCase().includes(q));
    }

    if (tab === "gainers") {
      list = list.filter((t) => t.change24h > 0).sort((a, b) => b.change24h - a.change24h);
    } else if (tab === "layer1") {
      list = list.filter((t) => ["BTC", "ETH", "AVAX", "SOL"].includes(t.symbol));
    }

    return list;
  }, [tokens, tab, search]);

  return (
    <div className="flex w-full flex-col gap-20 rounded-24 border border-slate-800 bg-slate-900/70 p-20 sm:p-32 backdrop-blur-md">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <h2 className="text-22 font-extrabold text-white sm:text-26">Explore Crypto Markets</h2>
            <span className="flex items-center gap-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-8 py-2 text-[10px] font-bold text-emerald-400">
              <span className="size-6 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
          <p className="text-13 text-slate-400">Real-time prices and 24h market activity via CoinGecko</p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] md:max-w-[320px]">
          <input
            type="text"
            placeholder="Search asset or symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-10 border border-slate-700 bg-slate-950/80 py-8 pl-36 pr-14 text-13 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
          <svg
            className="absolute left-12 top-1/2 size-14 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-800 pb-12">
        {[
          { id: "tradable", label: "Tradable on GMX" },
          { id: "gainers", label: "Top Gainers" },
          { id: "layer1", label: "Layer 1s" },
          { id: "all", label: "All Markets" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as MarketTab)}
            className={cx(
              "rounded-8 px-14 py-6 text-xs font-semibold transition-all",
              tab === t.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Markets Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-14 text-slate-200">
          <thead>
            <tr className="border-b border-slate-800 text-11 uppercase tracking-wider text-slate-400">
              <th className="pb-12 font-medium">Asset</th>
              <th className="pb-12 font-medium text-right">Price (USD)</th>
              <th className="pb-12 font-medium text-right">24h Change</th>
              <th className="hidden pb-12 font-medium text-right sm:table-cell">24h Volume</th>
              <th className="pb-12 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {isLoading && tokens.length === 0 ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-16">
                    <div className="h-20 w-120 rounded bg-slate-800" />
                  </td>
                  <td className="py-16 text-right">
                    <div className="ml-auto h-20 w-80 rounded bg-slate-800" />
                  </td>
                  <td className="py-16 text-right">
                    <div className="ml-auto h-20 w-60 rounded bg-slate-800" />
                  </td>
                  <td className="hidden py-16 text-right sm:table-cell">
                    <div className="ml-auto h-20 w-90 rounded bg-slate-800" />
                  </td>
                  <td className="py-16 text-right">
                    <div className="ml-auto h-28 w-60 rounded bg-slate-800" />
                  </td>
                </tr>
              ))
            ) : filteredTokens.length > 0 ? (
              filteredTokens.map((token) => {
                const isPositive = token.change24h >= 0;
                return (
                  <tr
                    key={token.id}
                    className="group transition-colors hover:bg-slate-850/70"
                  >
                    {/* Asset Name & Icon */}
                    <td className="py-16">
                      <div className="flex items-center gap-12">
                        <img src={token.icon} alt={token.symbol} className="size-28 object-contain" />
                        <div className="flex flex-col">
                          <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                            {token.name}
                          </span>
                          <span className="text-xs text-slate-400">{token.symbol}</span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-16 text-right font-bold text-white numbers">
                      {token.formattedPrice}
                    </td>

                    {/* 24h Change */}
                    <td className="py-16 text-right font-bold numbers">
                      <span
                        className={cx(
                          "inline-flex items-center gap-2 rounded-md px-6 py-2 text-xs font-bold",
                          isPositive
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        )}
                      >
                        {token.formattedChange}
                      </span>
                    </td>

                    {/* 24h Volume */}
                    <td className="hidden py-16 text-right text-xs text-slate-400 numbers sm:table-cell">
                      {token.volume24h
                        ? `$${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(token.volume24h)}`
                        : "—"}
                    </td>

                    {/* Trade Action */}
                    <td className="py-16 text-right">
                      <Link
                        to="/trade"
                        className="inline-flex items-center gap-4 rounded-8 bg-blue-600/20 border border-blue-500/40 px-14 py-6 text-xs font-bold text-blue-400 transition-all hover:bg-blue-600 hover:text-white"
                      >
                        <span>Trade</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-32 text-center text-slate-400">
                  No markets match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
