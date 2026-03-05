export interface NewsItem {
  headline: string;
  summary: string;
  impact: "BULLISH" | "BEARISH" | "NEUTRAL" | "MIXED";
  sectors: string[];
  urgency: "HIGH" | "MEDIUM";
  source_name: string;
  source_url: string;
}

export interface ScanResult {
  india: NewsItem[];
  global: NewsItem[];
  market_pulse: string;
  noise_rejected: number;
}
