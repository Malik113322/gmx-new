import cx from "classnames";
import { Link } from "react-router-dom";

import { useCryptoNews } from "domain/cryptoNews/useCryptoNews";

import ExternalLink from "components/ExternalLink/ExternalLink";

export function NewsWidget({ className }: { className?: string }) {
  const { articles, isLoading } = useCryptoNews();

  const topArticles = articles.slice(0, 4);

  return (
    <div className={cx("flex flex-col rounded-16 border border-slate-800 bg-slate-900/90 p-16", className)}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-12">
        <div className="flex items-center gap-8">
          <span className="flex size-8 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-14 font-bold text-white">Live Crypto News</h3>
        </div>
        <Link
          to="/news"
          className="text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300"
        >
          View All →
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-slate-800/60 pt-6">
        {isLoading && topArticles.length === 0 ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse py-10">
              <div className="h-14 w-3/4 rounded bg-slate-800 mb-6" />
              <div className="h-10 w-1/3 rounded bg-slate-800/60" />
            </div>
          ))
        ) : (
          topArticles.map((article) => (
            <div key={article.id} className="group py-10 transition-colors">
              <ExternalLink
                href={article.url}
                className="text-13 font-semibold text-slate-200 transition-colors group-hover:text-blue-400 line-clamp-2"
              >
                {article.title}
              </ExternalLink>
              <div className="mt-4 flex items-center gap-6 text-[11px] text-slate-400">
                <span className="font-medium text-slate-300">{article.source.name}</span>
                <span>•</span>
                <span>{article.timeAgo}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
