"use client";

interface FilterStatsProps {
  signalCount: number;
  noiseRejected: number;
  lastUpdated: Date | null;
}

export default function FilterStats({
  signalCount,
  noiseRejected,
  lastUpdated,
}: FilterStatsProps) {
  if (!lastUpdated) return null;

  const timeStr = lastUpdated.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.04] mt-8">
      <span className="font-mono text-[10px] text-white/25 tracking-wider">
        Last updated {timeStr}
      </span>
      <span className="font-mono text-[10px] text-white/25 tracking-wider">
        {signalCount} signals &bull; {noiseRejected} noise rejected
      </span>
    </div>
  );
}
