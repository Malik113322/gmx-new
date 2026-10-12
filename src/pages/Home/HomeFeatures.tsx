import { Link } from "react-router-dom";

export function HomeFeatures() {
  const features = [
    {
      title: "Decentralized Perpetual Trading",
      subtitle: "Trade with up to 100x leverage on BTC, ETH, SOL, AVAX and more directly from your self-custody wallet with zero price impact and minimal slippage.",
      badge: "Perps & Spot",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      link: "/trade",
      linkText: "Start Trading",
      gradient: "from-blue-600/20 via-slate-900 to-slate-950",
      stats: "0.05% Opening Fee",
    },
    {
      title: "Real Yield with GM & GLV Vaults",
      subtitle: "Deposit liquidity into multi-asset GM pools to earn 70% of platform trading fees distributed directly in ETH and AVAX without inflationary tokenomics.",
      badge: "Earn & Yield",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      link: "/earn",
      linkText: "Explore GM Vaults",
      gradient: "from-emerald-600/20 via-slate-900 to-slate-950",
      stats: "Up to 24% APY",
    },
    {
      title: "Low-Latency Chainlink Data Streams",
      subtitle: "Continuous real-time sub-second price oracles powered by Chainlink data streams protect positions from artificial liquidations and high-frequency front-running.",
      badge: "Oracle Tech",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      link: "/pools",
      linkText: "View Pool Stats",
      gradient: "from-cyan-600/20 via-slate-900 to-slate-950",
      stats: "Dual-Oracle Protected",
    },
    {
      title: "100% Self-Custodial & Transparent",
      subtitle: "Keep full control of your assets at all times. All transactions, positions, and protocol revenues are auditable on-chain on Arbitrum and Avalanche.",
      badge: "Security First",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      link: "/stats",
      linkText: "Protocol Analytics",
      gradient: "from-amber-600/20 via-slate-900 to-slate-950",
      stats: "Triple Audited",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-28">
      <div className="flex flex-col items-center text-center gap-10">
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-14 py-4 text-xs font-bold text-blue-400 uppercase tracking-wider">
          Why Choose GMX
        </span>
        <h2 className="text-28 font-black text-white sm:text-36 max-w-2xl">
          Everything you need to trade, earn, and build on-chain
        </h2>
        <p className="max-w-xl text-14 text-slate-400 sm:text-16">
          Engineered for institutional reliability with decentralized self-custodial freedom.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-24 border border-slate-800 bg-gradient-to-br ${feat.gradient} p-28 sm:p-36 transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="flex flex-col gap-16">
              <div className="flex items-center justify-between">
                <span className={`inline-flex rounded-full border px-10 py-3 text-[11px] font-bold uppercase tracking-wider ${feat.badgeColor}`}>
                  {feat.badge}
                </span>
                <span className="text-xs font-bold text-slate-300 numbers">{feat.stats}</span>
              </div>

              <h3 className="text-20 font-bold text-white group-hover:text-blue-400 transition-colors sm:text-22">
                {feat.title}
              </h3>

              <p className="text-14 leading-relaxed text-slate-300/90 font-normal">
                {feat.subtitle}
              </p>
            </div>

            <div className="mt-24 pt-16 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                to={feat.link}
                className="inline-flex items-center gap-6 text-13 font-bold text-blue-400 group-hover:translate-x-1 group-hover:text-blue-300 transition-all"
              >
                <span>{feat.linkText}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
