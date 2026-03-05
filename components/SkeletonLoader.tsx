"use client";

function SkeletonCard() {
  return (
    <div className="border border-white/[0.04] rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full shimmer-bg animate-shimmer" />
        <div className="h-4 w-16 rounded shimmer-bg animate-shimmer" />
        <div className="ml-auto h-3 w-24 rounded shimmer-bg animate-shimmer" />
      </div>
      <div className="h-5 w-3/4 rounded shimmer-bg animate-shimmer" />
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded shimmer-bg animate-shimmer" />
        <div className="h-3 w-5/6 rounded shimmer-bg animate-shimmer" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-14 rounded-full shimmer-bg animate-shimmer" />
        <div className="h-5 w-12 rounded-full shimmer-bg animate-shimmer" />
        <div className="h-5 w-16 rounded-full shimmer-bg animate-shimmer" />
      </div>
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <div className="space-y-8 mt-6">
      <div className="space-y-3">
        <div className="h-5 w-32 rounded shimmer-bg animate-shimmer mb-4" />
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
