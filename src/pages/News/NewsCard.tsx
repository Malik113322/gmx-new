import cx from "classnames";
import { useCallback, useState } from "react";

import { CryptoNewsArticle } from "domain/cryptoNews/types";
import { helperToast } from "lib/helperToast";

import ExternalLink from "components/ExternalLink/ExternalLink";

interface NewsCardProps {
  article: CryptoNewsArticle;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  viewMode?: "grid" | "compact";
}

export function NewsCard({ article, isBookmarked, onToggleBookmark, viewMode = "grid" }: NewsCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleShare = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(article.url);
        helperToast.success("Article link copied to clipboard!");
      }
    },
    [article.url]
  );

  const handleBookmark = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleBookmark(article.id);
      if (!isBookmarked) {
        helperToast.success("Saved to bookmarks");
      }
    },
    [article.id, isBookmarked, onToggleBookmark]
  );

  const sentimentStyles = {
    bullish: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    bearish: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    neutral: "bg-slate-700/50 text-slate-300 border-slate-600/40",
  };

  const sentimentLabels = {
    bullish: "Bullish",
    bearish: "Bearish",
    neutral: "Market",
  };

  const sourceColors: Record<string, string> = {
    cointelegraph: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    decrypt: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    coindesk: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    theblock: "text-purple-400 bg-purple-400/10 border-purple-400/30",
    bitcoinmagazine: "text-orange-400 bg-orange-400/10 border-orange-400/30",
    other: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  };

  if (viewMode === "compact") {
    return (
      <div className="group relative flex flex-col justify-between gap-12 rounded-12 border border-slate-700/60 bg-slate-900/80 p-16 transition-all duration-200 hover:border-blue-500/50 hover:bg-slate-850 hover:shadow-lg hover:shadow-blue-500/5 sm:flex-row sm:items-center">
        <div className="flex grow flex-col gap-6">
          <div className="flex flex-wrap items-center gap-8 text-[11px]">
            <span
              className={cx(
                "inline-flex items-center rounded-full border px-8 py-2 font-medium tracking-wide uppercase",
                sourceColors[article.source.id] || sourceColors.other
              )}
            >
              {article.source.name}
            </span>
            <span className="text-slate-400">{article.timeAgo}</span>
            <span
              className={cx(
                "inline-flex items-center rounded-md border px-6 py-1 text-[10px] font-semibold",
                sentimentStyles[article.sentiment]
              )}
            >
              {sentimentLabels[article.sentiment]}
            </span>
          </div>

          <ExternalLink
            href={article.url}
            className="text-[15px] font-semibold text-slate-100 transition-colors group-hover:text-blue-400 line-clamp-2"
          >
            {article.title}
          </ExternalLink>
        </div>

        <div className="flex shrink-0 items-center gap-8">
          <button
            onClick={handleBookmark}
            title={isBookmarked ? "Remove from bookmarks" : "Save article"}
            className={cx(
              "flex size-32 items-center justify-center rounded-8 border transition-all",
              isBookmarked
                ? "border-amber-400/40 bg-amber-400/20 text-amber-400"
                : "border-slate-700 bg-slate-800/80 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <button
            onClick={handleShare}
            title="Share article"
            className="flex size-32 items-center justify-center rounded-8 border border-slate-700 bg-slate-800/80 text-slate-400 transition-all hover:border-slate-500 hover:text-slate-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>

          <ExternalLink
            href={article.url}
            className="flex items-center gap-4 rounded-8 border border-blue-500/30 bg-blue-500/10 px-12 py-6 text-xs font-semibold text-blue-400 transition-all hover:border-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
          >
            <span>Read</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </ExternalLink>
        </div>
      </div>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-16 border border-slate-800/90 bg-slate-900/90 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-slate-850 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Article Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
        {article.imageUrl && !imageError ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={cx(
              "size-full object-cover transition-transform duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-16">
            <span className="text-xl font-bold tracking-wider text-blue-400/40">GMX NEWS</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute left-12 top-12 flex flex-wrap items-center gap-6">
          <span
            className={cx(
              "inline-flex items-center rounded-full border px-10 py-3 text-[11px] font-semibold tracking-wide backdrop-blur-md",
              sourceColors[article.source.id] || sourceColors.other
            )}
          >
            {article.source.name}
          </span>
          {article.isHot && (
            <span className="inline-flex items-center gap-4 rounded-full border border-amber-500/40 bg-amber-500/20 px-8 py-3 text-[11px] font-bold text-amber-300 backdrop-blur-md">
              <span className="inline-block size-6 rounded-full bg-amber-400 animate-ping" />
              HOT
            </span>
          )}
        </div>

        {/* Top Right Actions */}
        <div className="absolute right-12 top-12 flex items-center gap-6">
          <button
            onClick={handleBookmark}
            title={isBookmarked ? "Remove from bookmarks" : "Save article"}
            className={cx(
              "flex size-32 items-center justify-center rounded-full border backdrop-blur-md transition-all",
              isBookmarked
                ? "border-amber-400/50 bg-amber-400/30 text-amber-300"
                : "border-slate-700/80 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:text-white"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        {/* Bottom Image Bar */}
        <div className="absolute bottom-10 left-12 right-12 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-6">
            <span
              className={cx(
                "inline-flex items-center rounded-md border px-6 py-1 text-[10px] font-semibold",
                sentimentStyles[article.sentiment]
              )}
            >
              {sentimentLabels[article.sentiment]}
            </span>
            {article.categories.slice(0, 2).map((cat) => (
              <span key={cat} className="rounded-md bg-slate-800/80 px-6 py-1 text-[10px] text-slate-400 uppercase">
                #{cat}
              </span>
            ))}
          </div>
          <span className="font-medium text-slate-400">{article.timeAgo}</span>
        </div>
      </div>

      {/* Article Content */}
      <div className="flex grow flex-col justify-between p-18">
        <div className="flex flex-col gap-10">
          <ExternalLink
            href={article.url}
            className="text-[16px] font-bold leading-snug text-slate-100 transition-colors duration-200 group-hover:text-blue-400 line-clamp-2"
          >
            {article.title}
          </ExternalLink>

          <p className="text-[13px] leading-relaxed text-slate-400 line-clamp-3">{article.summary}</p>
        </div>

        {/* Footer Meta */}
        <div className="mt-16 flex items-center justify-between border-t border-slate-800/80 pt-14 text-xs text-slate-400">
          <div className="flex items-center gap-6">
            {article.author && (
              <span className="max-w-[120px] truncate text-[11px] text-slate-400" title={article.author}>
                {article.author}
              </span>
            )}
            <span className="text-slate-600">•</span>
            <span className="text-[11px] text-slate-400">{article.readTimeMinutes} min read</span>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={handleShare}
              title="Share article"
              className="text-slate-400 transition-colors hover:text-slate-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>

            <ExternalLink
              href={article.url}
              className="inline-flex items-center gap-4 text-xs font-semibold text-blue-400 transition-all group-hover:translate-x-1 group-hover:text-blue-300"
            >
              <span>Read</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </ExternalLink>
          </div>
        </div>
      </div>
    </article>
  );
}
