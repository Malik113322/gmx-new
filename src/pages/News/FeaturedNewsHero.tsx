import cx from "classnames";
import { useCallback, useState } from "react";

import { CryptoNewsArticle } from "domain/cryptoNews/types";
import { helperToast } from "lib/helperToast";

import ExternalLink from "components/ExternalLink/ExternalLink";

interface FeaturedNewsHeroProps {
  article: CryptoNewsArticle;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function FeaturedNewsHero({ article, isBookmarked, onToggleBookmark }: FeaturedNewsHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleShare = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(article.url);
        helperToast.success("Featured article link copied!");
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
        helperToast.success("Saved featured article to bookmarks");
      }
    },
    [article.id, isBookmarked, onToggleBookmark]
  );

  const sourceColors: Record<string, string> = {
    cointelegraph: "text-amber-400 bg-amber-400/15 border-amber-400/40",
    decrypt: "text-emerald-400 bg-emerald-400/15 border-emerald-400/40",
    coindesk: "text-cyan-400 bg-cyan-400/15 border-cyan-400/40",
    theblock: "text-purple-400 bg-purple-400/15 border-purple-400/40",
    bitcoinmagazine: "text-orange-400 bg-orange-400/15 border-orange-400/40",
    other: "text-blue-400 bg-blue-400/15 border-blue-400/40",
  };

  return (
    <div className="group relative w-full overflow-hidden rounded-24 border border-slate-750 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl transition-all duration-300 hover:border-blue-500/40">
      <div className="grid grid-cols-1 gap-24 lg:grid-cols-12 lg:items-center">
        {/* Visual Media Column */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-16 bg-slate-950 lg:col-span-7 lg:aspect-[16/10]">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              className={cx(
                "size-full object-cover transition-transform duration-700 group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-24">
              <span className="text-2xl font-black tracking-wider text-blue-400/40">GMX FEATURED NEWS</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Floating Badges */}
          <div className="absolute left-16 top-16 flex items-center gap-8">
            <span className="inline-flex items-center gap-6 rounded-full border border-red-500/50 bg-red-500/20 px-12 py-4 text-xs font-bold uppercase tracking-wider text-red-400 backdrop-blur-md">
              <span className="inline-block size-8 rounded-full bg-red-500 animate-ping" />
              Spotlight Story
            </span>
            <span
              className={cx(
                "inline-flex items-center rounded-full border px-12 py-4 text-xs font-semibold backdrop-blur-md",
                sourceColors[article.source.id] || sourceColors.other
              )}
            >
              {article.source.name}
            </span>
          </div>

          <div className="absolute bottom-16 left-16 right-16 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-8">
              {article.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-slate-900/80 px-10 py-3 text-[11px] font-medium text-slate-300 backdrop-blur-md uppercase"
                >
                  #{cat}
                </span>
              ))}
            </div>
            <span className="rounded-full bg-slate-900/80 px-10 py-3 text-[11px] font-medium text-slate-300 backdrop-blur-md">
              {article.timeAgo}
            </span>
          </div>
        </div>

        {/* Story Info Column */}
        <div className="flex flex-col justify-between gap-20 p-8 lg:col-span-5 lg:p-12">
          <div className="flex flex-col gap-14">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-8">
                <span className="font-semibold text-blue-400">{article.source.name}</span>
                <span>•</span>
                <span>{article.publishedAtFormatted}</span>
              </div>
              <span>{article.readTimeMinutes} min read</span>
            </div>

            <ExternalLink
              href={article.url}
              className="text-22 font-extrabold leading-tight text-white transition-colors group-hover:text-blue-400 sm:text-26"
            >
              {article.title}
            </ExternalLink>

            <p className="text-14 leading-relaxed text-slate-300/90 sm:text-15">{article.summary}</p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-12 border-t border-slate-800 pt-16">
            <ExternalLink
              href={article.url}
              className="inline-flex items-center gap-8 rounded-12 bg-blue-600 px-20 py-10 text-14 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              <span>Read Full Story</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </ExternalLink>

            <div className="flex items-center gap-8">
              <button
                onClick={handleBookmark}
                title={isBookmarked ? "Remove from bookmarks" : "Save article"}
                className={cx(
                  "flex size-38 items-center justify-center rounded-10 border transition-all",
                  isBookmarked
                    ? "border-amber-400/50 bg-amber-400/20 text-amber-400"
                    : "border-slate-700 bg-slate-800/80 text-slate-400 hover:border-slate-500 hover:text-white"
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>

              <button
                onClick={handleShare}
                title="Share article"
                className="flex size-38 items-center justify-center rounded-10 border border-slate-700 bg-slate-800/80 text-slate-400 transition-all hover:border-slate-500 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
