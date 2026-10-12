import cx from "classnames";
import { useState } from "react";

import { useCryptoNews } from "domain/cryptoNews/useCryptoNews";

import AppPageLayout from "components/AppPageLayout/AppPageLayout";
import { LivePriceTicker } from "components/LivePriceTicker/LivePriceTicker";

import { FeaturedNewsHero } from "./FeaturedNewsHero";
import { NewsCard } from "./NewsCard";
import { NewsFilters } from "./NewsFilters";
import { NewsSkeleton } from "./NewsSkeleton";

export default function NewsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  const {
    articles,
    featuredArticle,
    nonFeaturedArticles,
    totalCount,
    filteredCount,
    bookmarkedCount,
    filterState,
    setCategory,
    setSource,
    setSearchQuery,
    setSortBy,
    toggleBookmark,
    isBookmarked,
    isLoading,
    isValidating,
    error,
    refresh,
  } = useCryptoNews();

  const isFiltering =
    filterState.category !== "all" || Boolean(filterState.searchQuery.trim()) || filterState.source !== "all";

  return (
    <AppPageLayout title="Crypto News & Market Intelligence">
      <div className="flex w-full flex-col gap-28">
        {/* Page Banner / Header */}
        <div className="relative overflow-hidden rounded-20 border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/40 p-24 sm:p-32 shadow-xl">
          <div className="relative z-10 flex flex-col gap-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-10">
                <span className="flex items-center gap-6 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-10 py-3 text-xs font-bold text-emerald-400">
                  <span className="inline-block size-8 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE FEEDS
                </span>
                <span className="text-xs text-slate-400">Cointelegraph • Decrypt • CoinDesk</span>
              </div>

              <h1 className="text-28 font-black tracking-tight text-white sm:text-34">
                Crypto News & Market Intel
              </h1>

              <p className="max-w-2xl text-14 text-slate-400 sm:text-15 leading-relaxed">
                Real-time cryptocurrency headlines, market developments, regulatory updates, and decentralized finance
                intelligence curated for active traders and liquidity providers.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex shrink-0 items-center gap-16 rounded-16 border border-slate-750 bg-slate-900/90 p-16 backdrop-blur-md">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Stories</span>
                <span className="text-20 font-bold text-white numbers">{totalCount}</span>
              </div>
              <div className="h-28 w-1 bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Saved</span>
                <span className="text-20 font-bold text-amber-400 numbers">{bookmarkedCount}</span>
              </div>
              <div className="h-28 w-1 bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Status</span>
                <span className="text-13 font-semibold text-emerald-400 flex items-center gap-4">
                  <span className="size-6 rounded-full bg-emerald-400" />
                  Synced
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Real-Time CoinGecko Market Ticker */}
        <LivePriceTicker variant="banner" showAllTokens />

        {/* Filter Toolbar */}
        <NewsFilters
          filterState={filterState}
          onSelectCategory={setCategory}
          onSelectSource={setSource}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onRefresh={refresh}
          isRefreshing={isValidating}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalArticlesCount={totalCount}
          bookmarkedCount={bookmarkedCount}
        />

        {/* Loading State */}
        {isLoading && articles.length === 0 ? (
          <NewsSkeleton />
        ) : (
          <div className="flex flex-col gap-24">
            {/* Spotlight Hero Article (shown only on default unfiltered view) */}
            {!isFiltering && featuredArticle && viewMode === "grid" && (
              <FeaturedNewsHero
                article={featuredArticle}
                isBookmarked={isBookmarked(featuredArticle.id)}
                onToggleBookmark={toggleBookmark}
              />
            )}

            {/* Articles Grid or Compact List */}
            {articles.length > 0 ? (
              <div
                className={cx(
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-12"
                )}
              >
                {(!isFiltering && viewMode === "grid" ? nonFeaturedArticles : articles).map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    isBookmarked={isBookmarked(article.id)}
                    onToggleBookmark={toggleBookmark}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : error ? (
              /* API Failure Error State */
              <div className="flex flex-col items-center justify-center rounded-20 border border-rose-500/30 bg-rose-500/5 p-48 text-center">
                <div className="flex size-64 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 mb-16 border border-rose-500/20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="text-18 font-bold text-white mb-6">Unable to load crypto news feeds</h3>
                <p className="max-w-md text-14 text-slate-400 mb-20">
                  The live API endpoints could not be reached. Please check your network connection and retry.
                </p>
                <button
                  onClick={refresh}
                  className="inline-flex items-center gap-8 rounded-10 bg-blue-600 px-24 py-10 text-13 font-semibold text-white transition-all hover:bg-blue-500"
                >
                  <svg className="size-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  <span>Retry Live Sync</span>
                </button>
              </div>
            ) : (
              /* Empty Search / Filter State */
              <div className="flex flex-col items-center justify-center rounded-20 border border-dashed border-slate-800 bg-slate-900/40 p-48 text-center">
                <div className="flex size-64 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 mb-16">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="text-18 font-bold text-white mb-6">No articles found</h3>
                <p className="max-w-md text-14 text-slate-400 mb-20">
                  {filterState.category === "bookmarked"
                    ? "You haven't saved any articles yet. Bookmark articles by clicking the bookmark icon on any card."
                    : "No news stories match your current filters or search criteria. Try adjusting your search query or selecting another category."}
                </p>
                <button
                  onClick={() => {
                    setCategory("all");
                    setSource("all");
                    setSearchQuery("");
                  }}
                  className="rounded-10 bg-blue-600 px-20 py-8 text-13 font-semibold text-white transition-all hover:bg-blue-500"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppPageLayout>
  );
}
