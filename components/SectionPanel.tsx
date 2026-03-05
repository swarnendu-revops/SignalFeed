"use client";

import { NewsItem } from "@/lib/types";
import NewsCard from "./NewsCard";

interface SectionPanelProps {
  title: string;
  icon: string;
  subtitle: string;
  items: NewsItem[];
}

export default function SectionPanel({
  title,
  icon,
  subtitle,
  items,
}: SectionPanelProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">
          {icon} {title}
        </h2>
        <span className="text-[11px] text-white/25">{subtitle}</span>
        <span className="font-mono text-[10px] text-accent/60 ml-auto">
          {items.length} signal{items.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <NewsCard key={`${item.headline}-${i}`} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
