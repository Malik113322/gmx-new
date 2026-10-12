import cx from "classnames";
import { Link } from "react-router-dom";

import { useCoinGeckoPrices } from "domain/coingecko/useCoinGeckoPrices";

export function HomeHero() {
  const { tokens } = useCoinGeckoPrices();

  const heroTokens = tokens.slice(0, 4);

  return (
    <div className="relative w-full overflow-hidden rounded-24 border border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-24 sm:p-40 lg:p-48 shadow-2xl">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-120 -top-120 size-350 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-120 top-40 size-350 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 gap-36 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Headline & Action Controls */}
        <div className="flex flex-col gap-24 lg:col-span-7">
          {/* Trust Pill */}
          <div className="inline-flex w-fit items-center gap-8 rounded-full border border-blue-500/30 bg-blue-500/10 px-12 py-5 text-xs font-bold text-blue-400 backdrop-blur-md">
            <span className="flex size-6 rounded-full bg-blue-400 animate-ping" />
            <span>THE LEADING DECENTRALIZED PERPETUAL EXCHANGE</span>
          </div>

          {/* Main Title */}
          <div className="flex flex-col gap-12">
            <h1 className="text-36 font-black tracking-tight text-white sm:text-48 lg:text-54 leading-[1.1]">
              The future of crypto trading is{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                self-custodial
              </span>
              .
            </h1>

            <p className="max-w-xl text-16 text-slate-300 sm:text-18 leading-relaxed font-normal">
              Trade spot or perpetual Bitcoin, Ethereum, Solana, and AVAX with up to 100x leverage directly from your
              wallet. Zero price impact, deep liquidity, and institutional-grade execution.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-14 pt-6">
            <Link
              to="/trade"
              className="inline-flex items-center gap-8 rounded-12 bg-blue-600 px-28 py-14 text-15 font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              <span>Launch Trading App</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link
              to="/earn"
              className="inline-flex items-center gap-8 rounded-12 border border-slate-700 bg-slate-800/80 px-24 py-14 text-15 font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-750 hover:text-white"
            >
              <span>Earn Yield (GM Pools)</span>
            </Link>

            <Link
              to="/news"
              className="inline-flex items-center gap-6 text-14 font-semibold text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span>Live News Feed</span>
              <span>→</span>
            </Link>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-16 border-t border-slate-800/80 pt-24 sm:grid-cols-4">
            <div className="flex flex-col">
              <span className="text-11 font-medium uppercase tracking-wider text-slate-400">Total Volume</span>
              <span className="text-20 font-black text-white numbers sm:text-22">$235B+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-11 font-medium uppercase tracking-wider text-slate-400">Total Traders</span>
              <span className="text-20 font-black text-white numbers sm:text-22">650,000+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-11 font-medium uppercase tracking-wider text-slate-400">Fees to LP Vaults</span>
              <span className="text-20 font-black text-emerald-400 numbers sm:text-22">$360M+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-11 font-medium uppercase tracking-wider text-slate-400">Max Leverage</span>
              <span className="text-20 font-black text-cyan-400 numbers sm:text-22">100x</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Floating Crypto Asset Cards */}
        <div className="flex flex-col gap-12 lg:col-span-5">
          <div className="rounded-20 border border-slate-750 bg-slate-900/90 p-20 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-14">
              <div className="flex items-center gap-8">
                <span className="size-8 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-13 font-bold uppercase tracking-wider text-white">Live Market Rates</span>
              </div>
              <span className="text-xs text-slate-400">CoinGecko Feed</span>
            </div>

            <div className="flex flex-col divide-y divide-slate-800/60 pt-6">
              {heroTokens.map((token) => {
                const isPositive = token.change24h >= 0;
                return (
                  <Link
                    key={token.id}
                    to={`/trade`}
                    className="group flex items-center justify-between py-12 transition-all hover:bg-slate-850/80 rounded-8 px-8 -mx-8"
                  >
                    <div className="flex items-center gap-12">
                      <img src={token.icon} alt={token.symbol} className="size-32 object-contain" />
                      <div className="flex flex-col">
                        <span className="text-14 font-bold text-white group-hover:text-blue-400 transition-colors">
                          {token.name}
                        </span>
                        <span className="text-xs text-slate-400">{token.symbol}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-15 font-extrabold text-white numbers">{token.formattedPrice}</span>
                      <span
                        className={cx(
                          "inline-flex items-center text-xs font-bold numbers",
                          isPositive ? "text-emerald-400" : "text-rose-400"
                        )}
                      >
                        {token.formattedChange}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/trade"
              className="mt-14 block w-full rounded-10 bg-slate-800 py-10 text-center text-xs font-bold text-slate-200 transition-all hover:bg-blue-600 hover:text-white"
            >
              View All 50+ Markets & Trade →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
