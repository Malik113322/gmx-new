import { Link } from "react-router-dom";

import { useCryptoNews } from "domain/cryptoNews/useCryptoNews";

import ExternalLink from "components/ExternalLink/ExternalLink";

export function HomeNewsSection() {
  const { articles, isLoading } = useCryptoNews();

  const latestNews = articles.slice(0, 3);

  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <span className="size-8 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-22 font-extrabold text-white sm:text-26">Latest Crypto News & Intel</h2>
          </div>
          <p className="text-13 text-slate-400">Live feeds from Cointelegraph, Decrypt, CoinDesk & The Block</p>
        </div>

        <Link
          to="/news"
          className="inline-flex items-center gap-6 text-13 font-bold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>View All News & Market Feeds</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-20 md:grid-cols-3">
        {isLoading && latestNews.length === 0 ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex animate-pulse flex-col rounded-16 border border-slate-800 bg-slate-900/60 p-16">
              <div className="aspect-[16/9] w-full rounded-10 bg-slate-800 mb-12" />
              <div className="h-16 w-3/4 rounded bg-slate-800 mb-8" />
              <div className="h-12 w-full rounded bg-slate-800/60" />
            </div>
          ))
        ) : (
          latestNews.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-16 border border-slate-800/90 bg-slate-900/90 p-16 transition-all hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col gap-12">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-10 bg-slate-950">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-8 top-8 rounded-full bg-slate-900/80 px-8 py-2 text-[10px] font-bold text-blue-400 backdrop-blur-md">
                    {article.source.name}
                  </div>
                </div>

                <ExternalLink
                  href={article.url}
                  className="text-15 font-bold leading-snug text-white transition-colors group-hover:text-blue-400 line-clamp-2"
                >
                  {article.title}
                </ExternalLink>

                <p className="text-12 leading-relaxed text-slate-400 line-clamp-2">{article.summary}</p>
              </div>

              <div className="mt-14 flex items-center justify-between border-t border-slate-800/80 pt-10 text-[11px] text-slate-400">
                <span>{article.timeAgo}</span>
                <ExternalLink
                  href={article.url}
                  className="font-bold text-blue-400 transition-colors group-hover:text-blue-300"
                >
                  Read →
                </ExternalLink>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
