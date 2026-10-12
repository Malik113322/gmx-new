import { Link } from "react-router-dom";

import ExternalLink from "components/ExternalLink/ExternalLink";

export function HomeCtaBanner() {
  return (
    <div className="relative w-full overflow-hidden rounded-24 border border-blue-500/30 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950/80 p-32 sm:p-48 shadow-2xl">
      <div className="pointer-events-none absolute -right-80 -top-80 size-250 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-80 -bottom-80 size-250 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center gap-20">
        <div className="flex flex-col items-center gap-10">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-14 py-4 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Ready to trade?
          </span>
          <h2 className="text-30 font-black text-white sm:text-42 max-w-2xl leading-tight">
            Join the Decentralized Future of Trading
          </h2>
          <p className="max-w-xl text-15 text-slate-300 sm:text-17">
            Start trading spot & perpetual contracts with up to 100x leverage or earn real yield on your assets today.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-14">
          <Link
            to="/trade"
            className="inline-flex items-center gap-8 rounded-12 bg-blue-600 px-32 py-14 text-16 font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-1"
          >
            <span>Launch App</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <ExternalLink
            href="https://docs.gmx.io"
            className="inline-flex items-center gap-8 rounded-12 border border-slate-700 bg-slate-800/80 px-24 py-14 text-15 font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-750 hover:text-white"
          >
            <span>Read Documentation</span>
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
