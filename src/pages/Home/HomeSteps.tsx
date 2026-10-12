import { Link } from "react-router-dom";

export function HomeSteps() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Wallet",
      description: "Connect MetaMask, Coinbase Wallet, Rabby, or login seamlessly with Privy email or social auth.",
      iconBg: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    {
      number: "02",
      title: "Deposit Collateral",
      description: "Fund your account with ETH, USDC, BTC, or AVAX on Arbitrum or Avalanche with zero deposit fees.",
      iconBg: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    },
    {
      number: "03",
      title: "Trade & Earn Yield",
      description: "Open leveraged perpetual positions with 1-click execution or stake in GM vaults for real yield.",
      iconBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-24 rounded-24 border border-slate-800 bg-slate-900/60 p-24 sm:p-36 backdrop-blur-md">
      <div className="flex flex-col items-center text-center gap-8">
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-12 py-3 text-xs font-bold text-blue-400 uppercase tracking-wider">
          How to Get Started
        </span>
        <h2 className="text-24 font-extrabold text-white sm:text-30">Start Trading in Minutes</h2>
        <p className="text-14 text-slate-400 max-w-lg">
          No KYC, no sign-up forms, no centralized custody. Pure Web3 simplicity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-20 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-12 rounded-16 border border-slate-800 bg-slate-950/70 p-20 transition-all hover:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <span className={`flex size-36 items-center justify-center rounded-10 border text-14 font-black numbers ${step.iconBg}`}>
                {step.number}
              </span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Step {idx + 1}</span>
            </div>

            <h3 className="text-16 font-bold text-white mt-4">{step.title}</h3>
            <p className="text-13 leading-relaxed text-slate-400">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Link
          to="/trade"
          className="inline-flex items-center gap-8 rounded-12 bg-blue-600 px-28 py-12 text-14 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
        >
          <span>Launch GMX App</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
