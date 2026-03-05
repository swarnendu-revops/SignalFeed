"use client";

interface MarketPulseProps {
  pulse: string;
  noiseCount: number;
}

export default function MarketPulse({ pulse, noiseCount }: MarketPulseProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border border-white/[0.04] rounded-lg bg-white/[0.01]">
      <div className="flex items-start gap-2.5">
        <span className="inline-block w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
        <p
          className="text-sm text-white/70 italic leading-relaxed"
          style={{ fontFamily: "Instrument Serif, serif" }}
        >
          {pulse}
        </p>
      </div>
      <span className="font-mono text-[10px] text-white/30 tracking-wider whitespace-nowrap flex-shrink-0">
        {noiseCount} noise items filtered
      </span>
    </div>
  );
}
