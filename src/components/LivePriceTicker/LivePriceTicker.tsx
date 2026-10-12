import cx from "classnames";
import { Link } from "react-router-dom";

import { useCoinGeckoPrices } from "domain/coingecko/useCoinGeckoPrices";
import { TokenMarketPrice } from "domain/coingecko/types";

interface LivePriceTickerProps {
  variant?: "header" | "banner" | "compact";
  className?: string;
  showAllTokens?: boolean;
}

function TokenPriceItem({
  token,
  variant,
}: {
  token: TokenMarketPrice;
  variant: "header" | "banner" | "compact";
}) {
  const isPositive = token.change24h >= 0;

  return (
    <div
      className={cx(
        "group flex items-center gap-8 rounded-8 transition-all duration-300 select-none",
        variant === "header" && "px-8 py-4 hover:bg-slate-800/80",
        variant === "banner" && "rounded-12 border border-slate-800 bg-slate-900/80 px-14 py-10 hover:border-slate-700 hover:bg-slate-850",
        variant === "compact" && "px-6 py-3",
        token.priceDirection === "up" && "bg-emerald-500/20 ring-1 ring-emerald-500/50",
        token.priceDirection === "down" && "bg-rose-500/20 ring-1 ring-rose-500/50"
      )}
    >
      {/* Token Icon */}
      <img src={token.icon} alt={token.symbol} className="size-18 shrink-0 object-contain" />

      {/* Token Symbol & Name */}
      <div className="flex items-center gap-4">
        <span className="text-12 font-bold text-white group-hover:text-blue-400 transition-colors">
          {token.symbol}
        </span>
      </div>

      {/* Live USD Price */}
      <span
        className={cx(
          "text-12 font-extrabold numbers transition-colors",
          token.priceDirection === "up" ? "text-emerald-400" : token.priceDirection === "down" ? "text-rose-400" : "text-slate-100"
        )}
      >
        {token.formattedPrice}
      </span>

      {/* 24h Change Pill */}
      <span
        className={cx(
          "inline-flex items-center gap-2 rounded-md px-5 py-1 text-[10px] font-bold numbers",
          isPositive
            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
            : "bg-rose-500/15 text-rose-400 border border-rose-500/20"
        )}
      >
        <span className="text-[8px]">{isPositive ? "▲" : "▼"}</span>
        {token.formattedChange}
      </span>
    </div>
  );
}

export function LivePriceTicker({ variant = "header", className, showAllTokens = false }: LivePriceTickerProps) {
  const { tokens, isLoading, isValidating } = useCoinGeckoPrices();

  // Focus on BTC, ETH, and GMX by default as requested, or all tracked tokens
  const displayedTokens = showAllTokens ? tokens : tokens.filter((t) => ["BTC", "ETH", "GMX"].includes(t.symbol));

  if (isLoading && tokens.length === 0) {
    return (
      <div className={cx("flex items-center gap-12 animate-pulse", className)}>
        <div className="h-24 w-120 rounded-md bg-slate-800" />
        <div className="h-24 w-120 rounded-md bg-slate-800" />
        <div className="h-24 w-120 rounded-md bg-slate-800" />
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cx(
          "flex flex-wrap items-center justify-between gap-12 rounded-16 border border-slate-800 bg-slate-950/60 p-12 sm:px-20 backdrop-blur-md",
          className
        )}
      >
        {/* Live Indicator Badge */}
        <div className="flex items-center gap-8 shrink-0">
          <span className="relative flex size-8">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-8 rounded-full bg-emerald-500" />
          </span>
          <span className="text-11 font-bold tracking-wider text-emerald-400 uppercase">
            Live Prices
          </span>
          <span className="text-[10px] text-slate-500">• CoinGecko</span>
        </div>

        {/* Tokens List */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-14">
          {displayedTokens.map((token) => (
            <TokenPriceItem key={token.id} token={token} variant="banner" />
          ))}
        </div>

        {/* Trade CTA Link */}
        <Link
          to="/trade"
          className="hidden sm:inline-flex items-center gap-4 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>Trade on GMX</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "flex items-center gap-8 sm:gap-12 rounded-10 border border-slate-800/80 bg-slate-900/80 px-10 py-4 backdrop-blur-md",
        className
      )}
      title="Live Crypto Prices (CoinGecko)"
    >
      {/* Mini live pulse */}
      <div className="flex items-center gap-4 shrink-0 pr-4 border-r border-slate-800">
        <span className="size-6 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold text-slate-400 tracking-wider hidden xl:inline">LIVE</span>
      </div>

      {/* Token Prices */}
      <div className="flex items-center gap-6 sm:gap-8">
        {displayedTokens.map((token) => (
          <TokenPriceItem key={token.id} token={token} variant="header" />
        ))}
      </div>
    </div>
  );
}
