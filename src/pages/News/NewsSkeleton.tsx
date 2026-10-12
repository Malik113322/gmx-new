export function NewsSkeleton() {
  return (
    <div className="flex flex-col gap-24">
      {/* Featured Hero Skeleton */}
      <div className="w-full animate-pulse rounded-24 border border-slate-800 bg-slate-900/60 p-6">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
          <div className="aspect-[16/9] w-full rounded-16 bg-slate-800 lg:col-span-7" />
          <div className="flex flex-col justify-between p-12 lg:col-span-5">
            <div className="flex flex-col gap-16">
              <div className="h-16 w-1/3 rounded-md bg-slate-800" />
              <div className="h-28 w-full rounded-md bg-slate-800" />
              <div className="h-28 w-4/5 rounded-md bg-slate-800" />
              <div className="h-16 w-full rounded-md bg-slate-800/60" />
              <div className="h-16 w-3/4 rounded-md bg-slate-800/60" />
            </div>
            <div className="h-40 w-1/3 rounded-12 bg-slate-800" />
          </div>
        </div>
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex animate-pulse flex-col overflow-hidden rounded-16 border border-slate-800 bg-slate-900/60"
          >
            <div className="aspect-[16/9] w-full bg-slate-800" />
            <div className="flex flex-col gap-12 p-16">
              <div className="flex justify-between">
                <div className="h-14 w-24 rounded-md bg-slate-800" />
                <div className="h-14 w-16 rounded-md bg-slate-800" />
              </div>
              <div className="h-20 w-full rounded-md bg-slate-800" />
              <div className="h-20 w-3/4 rounded-md bg-slate-800" />
              <div className="h-14 w-full rounded-md bg-slate-800/50" />
              <div className="h-14 w-2/3 rounded-md bg-slate-800/50" />
              <div className="mt-8 flex justify-between border-t border-slate-800/60 pt-12">
                <div className="h-12 w-20 rounded-md bg-slate-800" />
                <div className="h-12 w-16 rounded-md bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
