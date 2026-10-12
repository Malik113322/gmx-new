import AppPageLayout from "components/AppPageLayout/AppPageLayout";

import { HomeCtaBanner } from "./HomeCtaBanner";
import { HomeFeatures } from "./HomeFeatures";
import { HomeHero } from "./HomeHero";
import { HomeMarketTable } from "./HomeMarketTable";
import { HomeNewsSection } from "./HomeNewsSection";
import { HomeSteps } from "./HomeSteps";
import { HomeYieldCalculator } from "./HomeYieldCalculator";

export default function HomePage() {
  return (
    <AppPageLayout title="GMX | Decentralized Perpetual & Spot Exchange">
      <div className="flex w-full flex-col gap-40 pb-32">
        {/* 1. Hero Section */}
        <HomeHero />

        {/* 2. Explore Markets (Coinbase Style Table) */}
        <HomeMarketTable />

        {/* 3. Core Ecosystem Features */}
        <HomeFeatures />

        {/* 4. Interactive Yield & Earnings Calculator */}
        <HomeYieldCalculator />

        {/* 5. Live Crypto News Feed */}
        <HomeNewsSection />

        {/* 6. How to Get Started (3 Steps) */}
        <HomeSteps />

        {/* 7. Bottom CTA Banner */}
        <HomeCtaBanner />
      </div>
    </AppPageLayout>
  );
}
