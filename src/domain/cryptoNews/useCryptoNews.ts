import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

import { useLocalStorageSerializeKey } from "lib/localStorage";

import { fetchAllCryptoNews } from "./cryptoNewsApi";
import { CryptoNewsArticle, NewsCategory, NewsFilterState, NewsSortOption, NewsSourceId } from "./types";

const BOOKMARKS_STORAGE_KEY = "gmx_crypto_news_bookmarks_v1";

export function useCryptoNews() {
  const [filterState, setFilterState] = useState<NewsFilterState>({
    category: "all",
    source: "all",
    searchQuery: "",
    sortBy: "newest",
  });

  const [bookmarkedIds, setBookmarkedIds] = useLocalStorageSerializeKey<string[]>(BOOKMARKS_STORAGE_KEY, []);

  const {
    data: articles = [],
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<CryptoNewsArticle[]>("crypto-news-feed", fetchAllCryptoNews, {
    refreshInterval: 60000, // auto-refresh every 60s
    revalidateOnFocus: true,
    dedupingInterval: 15000,
  });

  const toggleBookmark = useCallback(
    (articleId: string) => {
      setBookmarkedIds((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        if (safePrev.includes(articleId)) {
          return safePrev.filter((id) => id !== articleId);
        }
        return [...safePrev, articleId];
      });
    },
    [setBookmarkedIds]
  );

  const isBookmarked = useCallback(
    (articleId: string) => {
      return Array.isArray(bookmarkedIds) && bookmarkedIds.includes(articleId);
    },
    [bookmarkedIds]
  );

  const setCategory = useCallback((category: NewsCategory) => {
    setFilterState((prev) => ({ ...prev, category }));
  }, []);

  const setSource = useCallback((source: NewsSourceId) => {
    setFilterState((prev) => ({ ...prev, source }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery }));
  }, []);

  const setSortBy = useCallback((sortBy: NewsSortOption) => {
    setFilterState((prev) => ({ ...prev, sortBy }));
  }, []);

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Filter by Source
    if (filterState.source !== "all") {
      result = result.filter((a) => a.source.id === filterState.source);
    }

    // Filter by Category
    if (filterState.category === "bookmarked") {
      result = result.filter((a) => isBookmarked(a.id));
    } else if (filterState.category !== "all") {
      result = result.filter((a) => a.categories.includes(filterState.category));
    }

    // Filter by Search Query
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.source.name.toLowerCase().includes(q) ||
          a.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sort
    if (filterState.sortBy === "oldest") {
      result.sort((a, b) => a.publishedAt - b.publishedAt);
    } else if (filterState.sortBy === "popular") {
      result.sort((a, b) => {
        const scoreA = (a.isHot ? 2 : 0) + (a.sentiment === "bullish" ? 1 : 0);
        const scoreB = (b.isHot ? 2 : 0) + (b.sentiment === "bearish" ? -1 : 1);
        return scoreB - scoreA || b.publishedAt - a.publishedAt;
      });
    } else {
      result.sort((a, b) => b.publishedAt - a.publishedAt);
    }

    return result;
  }, [articles, filterState, isBookmarked]);

  const featuredArticle = useMemo(() => {
    if (filterState.category !== "all" || filterState.searchQuery.trim() || filterState.source !== "all") {
      return null;
    }
    return articles.find((a) => a.isHot) || articles[0] || null;
  }, [articles, filterState]);

  const nonFeaturedArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  return {
    articles: filteredArticles,
    featuredArticle,
    nonFeaturedArticles,
    totalCount: articles.length,
    filteredCount: filteredArticles.length,
    bookmarkedCount: bookmarkedIds?.length || 0,
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
    refresh: () => mutate(),
  };
}
