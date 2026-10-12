import cx from "classnames";
import { useMemo } from "react";

import { NEWS_CATEGORIES, NEWS_SOURCES } from "domain/cryptoNews/constants";
import { NewsCategory, NewsFilterState, NewsSortOption, NewsSourceId } from "domain/cryptoNews/types";

interface NewsFiltersProps {
  filterState: NewsFilterState;
  onSelectCategory: (category: NewsCategory) => void;
  onSelectSource: (source: NewsSourceId) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: NewsSortOption) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  viewMode: "grid" | "compact";
  onViewModeChange: (mode: "grid" | "compact") => void;
  totalArticlesCount: number;
  bookmarkedCount: number;
}

export function NewsFilters({
  filterState,
  onSelectCategory,
  onSelectSource,
  onSearchChange,
  onSortChange,
  onRefresh,
  isRefreshing,
  viewMode,
  onViewModeChange,
  totalArticlesCount,
  bookmarkedCount,
}: NewsFiltersProps) {
  const categoryTabs = useMemo(() => {
    return NEWS_CATEGORIES.map((cat) => ({
      ...cat,
      badge: cat.id === "bookmarked" ? bookmarkedCount : undefined,
    }));
  }, [bookmarkedCount]);

  return (
    <div className="flex flex-col gap-16 rounded-16 border border-slate-800 bg-slate-900/60 p-16 sm:p-20 backdrop-blur-md">
      {/* Top Controls Row */}
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative min-w-[280px] grow lg:max-w-[420px]">
          <input
            type="text"
            placeholder="Search crypto news, tokens, protocols..."
            value={filterState.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-10 border border-slate-700/80 bg-slate-950/80 py-10 pl-38 pr-32 text-14 text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <svg
            className="absolute left-12 top-1/2 size-16 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          {filterState.searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-10 top-1/2 -translate-y-1/2 rounded-full p-4 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-10 sm:justify-end">
          {/* Source Filter */}
          <div className="flex items-center gap-4 rounded-10 border border-slate-800 bg-slate-950/60 p-4">
            {NEWS_SOURCES.map((src) => (
              <button
                key={src.id}
                onClick={() => onSelectSource(src.id)}
                className={cx(
                  "rounded-8 px-10 py-6 text-xs font-semibold transition-all",
                  filterState.source === src.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                )}
              >
                {src.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <select
            value={filterState.sortBy}
            onChange={(e) => onSortChange(e.target.value as NewsSortOption)}
            className="rounded-10 border border-slate-700/80 bg-slate-950/80 px-12 py-8 text-xs font-semibold text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Trending / Hot</option>
            <option value="oldest">Oldest First</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-10 border border-slate-800 bg-slate-950/60 p-4">
            <button
              onClick={() => onViewModeChange("grid")}
              title="Grid View"
              className={cx(
                "flex size-30 items-center justify-center rounded-6 transition-all",
                viewMode === "grid" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange("compact")}
              title="Compact View"
              className={cx(
                "flex size-30 items-center justify-center rounded-6 transition-all",
                viewMode === "compact" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh news feeds"
            className={cx(
              "flex items-center gap-6 rounded-10 border border-slate-700 bg-slate-800/90 px-12 py-8 text-xs font-semibold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-700",
              isRefreshing && "opacity-70 cursor-not-allowed"
            )}
          >
            <svg
              className={cx("size-14 text-blue-400", isRefreshing && "animate-spin")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Category Tabs Row */}
      <div className="scrollbar-hide flex items-center gap-8 overflow-x-auto border-t border-slate-800/80 pt-12">
        {categoryTabs.map((tab) => {
          const isActive = filterState.category === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={cx(
                "relative flex shrink-0 items-center gap-6 rounded-8 px-12 py-7 text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                  : "text-slate-400 border border-transparent hover:bg-slate-800 hover:text-slate-200"
              )}
            >
              <span>{tab.label}</span>
              {typeof tab.badge === "number" && tab.badge > 0 && (
                <span
                  className={cx(
                    "rounded-full px-6 py-1 text-[10px] font-bold",
                    isActive ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-300"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
