import cx from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";

export function HomeYieldCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [selectedVault, setSelectedVault] = useState<"gm-eth" | "gm-btc" | "glv" | "gmx">("gm-eth");

  const vaultConfigs = {
    "gm-eth": { name: "GM ETH/USDC Pool", apr: 18.4, token: "ETH", network: "Arbitrum" },
    "gm-btc": { name: "GM BTC/USDC Pool", apr: 16.2, token: "BTC", network: "Arbitrum" },
    glv: { name: "GLV Multi-Asset Vault", apr: 21.8, token: "GLV", network: "Arbitrum" },
    gmx: { name: "GMX Staking Vault", apr: 12.5, token: "GMX", network: "Avalanche & Arbitrum" },
  };

  const selected = vaultConfigs[selectedVault];
  const yearlyEarnings = (amount * selected.apr) / 100;
  const monthlyEarnings = yearlyEarnings / 12;
  const dailyEarnings = yearlyEarnings / 365;

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-24 border border-slate-800 bg-slate-900/80 p-24 sm:p-36 backdrop-blur-md shadow-2xl">
      <div className="grid grid-cols-1 gap-32 lg:grid-cols-12 lg:items-center">
        {/* Left Config Column */}
        <div className="flex flex-col gap-20 lg:col-span-6">
          <div className="flex flex-col gap-8">
            <span className="w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-12 py-4 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Interactive Yield Calculator
            </span>
            <h3 className="text-24 font-black text-white sm:text-30">Calculate Your Potential Returns</h3>
            <p className="text-14 text-slate-300">
              Provide liquidity to GM & GLV vaults and earn real yield in ETH, BTC, and USDC from trading fees.
            </p>
          </div>

          {/* Vault Selector Pills */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(vaultConfigs).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedVault(key as keyof typeof vaultConfigs)}
                className={cx(
                  "flex flex-col rounded-10 border p-10 text-left transition-all",
                  selectedVault === key
                    ? "border-emerald-500 bg-emerald-500/15 text-white shadow-md shadow-emerald-500/10"
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <span className="text-[11px] font-semibold">{config.token}</span>
                <span className="text-13 font-bold text-emerald-400 numbers">{config.apr}% APY</span>
              </button>
            ))}
          </div>

          {/* Amount Slider */}
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Deposit Amount</span>
              <span className="text-16 font-extrabold text-white numbers">
                ${new Intl.NumberFormat("en-US").format(amount)}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-6 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>$500</span>
              <span>$50,000</span>
              <span>$100,000+</span>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="flex flex-col justify-between rounded-20 border border-slate-750 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 p-24 lg:col-span-6 shadow-xl">
          <div className="flex flex-col gap-18">
            <div className="flex items-center justify-between border-b border-slate-800 pb-12">
              <span className="text-13 font-bold text-white">{selected.name}</span>
              <span className="rounded-full bg-slate-800 px-8 py-2 text-[10px] text-slate-300">{selected.network}</span>
            </div>

            <div className="grid grid-cols-3 gap-12 text-center">
              <div className="flex flex-col rounded-10 bg-slate-900/90 p-12">
                <span className="text-[10px] text-slate-400 uppercase">Daily</span>
                <span className="text-16 font-bold text-white numbers">
                  ${dailyEarnings.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col rounded-10 bg-slate-900/90 p-12">
                <span className="text-[10px] text-slate-400 uppercase">Monthly</span>
                <span className="text-16 font-bold text-white numbers">
                  ${monthlyEarnings.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col rounded-10 bg-slate-900/90 p-12">
                <span className="text-[10px] text-slate-400 uppercase">Yearly</span>
                <span className="text-16 font-bold text-emerald-400 numbers">
                  ${yearlyEarnings.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              *Estimated earnings are dynamic and paid out directly from trading fees generated on GMX. No lockups required.
            </p>
          </div>

          <Link
            to="/earn"
            className="mt-18 inline-flex items-center justify-center gap-8 rounded-12 bg-emerald-600 py-12 text-14 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-500/30"
          >
            <span>Deposit into {selected.token} Vault</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
