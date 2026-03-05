"use client";

import { NewsItem } from "@/lib/types";

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

const impactConfig = {
  BULLISH: {
    label: "BULLISH",
    textColor: "text-bullish",
    bgColor: "bg-bullish-bg",
    borderColor: "border-bullish-border",
  },
  BEARISH: {
    label: "BEARISH",
    textColor: "text-bearish",
    bgColor: "bg-bearish-bg",
    borderColor: "border-bearish-border",
  },
  NEUTRAL: {
    label: "NEUTRAL",
    textColor: "text-neutral",
    bgColor: "bg-neutral-bg",
    borderColor: "border-neutral-border",
  },
  MIXED: {
    label: "MIXED",
    textColor: "text-mixed",
    bgColor: "bg-mixed-bg",
    borderColor: "border-mixed-border",
  },
};

export default function NewsCard({ item, index }: NewsCardProps) {
  const impact = impactConfig[item.impact];
  const staggerClass = `stagger-${Math.min(index + 1, 7)}`;

  return (
    <a
      href={item.source_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        block border border-white/[0.04] rounded-lg p-4
        hover:bg-white/[0.02] transition-colors duration-200
        opacity-0 animate-fade-slide-in ${staggerClass}
      `}
    >
      {/* Row 1: urgency dot + impact badge + source name */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
            item.urgency === "HIGH" ? "bg-red-500" : "bg-amber-500"
          }`}
        />
        <span
          className={`
            font-mono text-[10px] tracking-wider px-2 py-0.5 rounded border
            ${impact.textColor} ${impact.bgColor} ${impact.borderColor}
          `}
        >
          {impact.label}
        </span>
        <span className="ml-auto font-mono text-[10px] text-white/30 tracking-wider">
          {item.source_name}
        </span>
      </div>

      {/* Row 2: headline */}
      <h3
        className="text-[15px] text-white/90 leading-snug mb-1.5"
        style={{ fontFamily: "Instrument Serif, serif" }}
      >
        {item.headline}
      </h3>

      {/* Row 3: summary */}
      <p className="text-[12px] text-white/45 leading-relaxed mb-3">
        {item.summary}
      </p>

      {/* Row 4: sector tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.sectors.map((sector) => (
          <span
            key={sector}
            className="font-mono text-[9px] text-white/30 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-0.5 tracking-wider"
          >
            {sector}
          </span>
        ))}
      </div>
    </a>
  );
}
