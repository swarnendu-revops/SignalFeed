interface KeywordEntry {
  pattern: RegExp;
  weight: number;
  sentiment?: "bullish" | "bearish";
  sectors?: string[];
}

// ── Signal keywords (positive weight) ──────────────────────────

const HIGH_SIGNAL_KEYWORDS: KeywordEntry[] = [
  // Central banks & monetary policy
  { pattern: /\bRBI\b/i, weight: 15, sectors: ["Banking", "Broad Market"] },
  { pattern: /\brepo rate\b/i, weight: 15, sectors: ["Banking"] },
  { pattern: /\brate cut/i, weight: 14, sentiment: "bullish", sectors: ["Banking", "Auto", "Realty"] },
  { pattern: /\brate hike/i, weight: 14, sentiment: "bearish", sectors: ["Banking"] },
  { pattern: /\bmonetary policy\b/i, weight: 13, sectors: ["Banking", "Broad Market"] },
  { pattern: /\bFed\b/, weight: 12, sectors: ["Broad Market"] },
  { pattern: /\bFederal Reserve\b/i, weight: 12, sectors: ["Broad Market"] },
  { pattern: /\bECB\b/, weight: 10, sectors: ["Broad Market"] },
  { pattern: /\bPBOC\b/, weight: 8, sectors: ["Metals", "Broad Market"] },
  { pattern: /\bBOJ\b/, weight: 8, sectors: ["Broad Market"] },
  // Economic indicators
  { pattern: /\bGDP\b/, weight: 14, sectors: ["Broad Market"] },
  { pattern: /\binflation\b/i, weight: 13, sectors: ["Broad Market", "FMCG"] },
  { pattern: /\bCPI\b/, weight: 13, sectors: ["Broad Market"] },
  { pattern: /\bWPI\b/, weight: 11, sectors: ["Broad Market"] },
  { pattern: /\bPMI\b/, weight: 12, sectors: ["Broad Market"] },
  { pattern: /\bIIP\b/, weight: 10, sectors: ["Broad Market"] },
  { pattern: /\bfiscal deficit\b/i, weight: 12, sectors: ["Broad Market", "Banking"] },
  { pattern: /\bunemployment\b/i, weight: 10, sectors: ["Broad Market"] },
  // Markets & regulators
  { pattern: /\bSEBI\b/, weight: 14, sectors: ["Broad Market"] },
  { pattern: /\bNifty\b/i, weight: 11, sectors: ["Broad Market"] },
  { pattern: /\bSensex\b/i, weight: 11, sectors: ["Broad Market"] },
  { pattern: /\bFII\b/, weight: 12, sectors: ["Broad Market"] },
  { pattern: /\bFPI\b/, weight: 12, sectors: ["Broad Market"] },
  { pattern: /\bDII\b/, weight: 10, sectors: ["Broad Market"] },
  { pattern: /\bFDI\b/, weight: 10, sectors: ["Broad Market"] },
  { pattern: /\bIPO\b/, weight: 9, sectors: ["Broad Market"] },
  // Trade & geopolitics
  { pattern: /\btariff/i, weight: 13, sentiment: "bearish", sectors: ["Broad Market", "Metals"] },
  { pattern: /\bsanction/i, weight: 11, sentiment: "bearish", sectors: ["Broad Market", "Energy"] },
  { pattern: /\btrade war\b/i, weight: 12, sentiment: "bearish", sectors: ["Broad Market"] },
  // Commodities
  { pattern: /\bcrude oil\b/i, weight: 12, sectors: ["Energy"] },
  { pattern: /\bBrent\b/i, weight: 11, sectors: ["Energy"] },
  { pattern: /\bOPEC\b/, weight: 12, sectors: ["Energy"] },
  { pattern: /\bgold price/i, weight: 9, sectors: ["Metals"] },
  // Sector-specific
  { pattern: /\bNPA\b/, weight: 10, sectors: ["Banking"] },
  { pattern: /\bcredit growth\b/i, weight: 9, sectors: ["Banking"] },
  { pattern: /\brupee\b/i, weight: 10, sectors: ["Broad Market", "IT"] },
  { pattern: /\bINR\b/, weight: 10, sectors: ["Broad Market"] },
  { pattern: /\bS&P 500\b/i, weight: 9, sectors: ["Broad Market"] },
  { pattern: /\bDXY\b/, weight: 8, sectors: ["Broad Market"] },
  { pattern: /\btreasury yield/i, weight: 10, sectors: ["Broad Market", "Banking"] },
  { pattern: /\bbudget\b/i, weight: 11, sectors: ["Broad Market"] },
  { pattern: /\bGST\b/, weight: 10, sectors: ["Broad Market", "FMCG"] },
  { pattern: /\bdisinvestment\b/i, weight: 9, sectors: ["Broad Market"] },
  { pattern: /\bcredit rating\b/i, weight: 11, sectors: ["Banking", "Broad Market"] },
  { pattern: /\bMoody/i, weight: 10, sectors: ["Broad Market"] },
  { pattern: /\bFitch\b/, weight: 10, sectors: ["Broad Market"] },
];

// ── Noise keywords (negative weight) ──────────────────────────

const NOISE_KEYWORDS: KeywordEntry[] = [
  { pattern: /\btop \d+ stocks\b/i, weight: -20 },
  { pattern: /\bmultibagger/i, weight: -25 },
  { pattern: /\bexpert says\b/i, weight: -15 },
  { pattern: /\btechnical analysis\b/i, weight: -20 },
  { pattern: /\bastrology/i, weight: -30 },
  { pattern: /\btop picks?\b/i, weight: -18 },
  { pattern: /\bhot stocks?\b/i, weight: -20 },
  { pattern: /\bguru\b/i, weight: -15 },
  { pattern: /\bchart pattern/i, weight: -20 },
  { pattern: /\bthis stock will\b/i, weight: -20 },
  { pattern: /\b\d+x return/i, weight: -18 },
  { pattern: /\bbest (?:stocks|funds|SIP)/i, weight: -15 },
  { pattern: /\bwealth creation tips/i, weight: -15 },
  { pattern: /\bmeme (?:stock|coin)/i, weight: -20 },
  { pattern: /\bmarket crash incoming/i, weight: -15 },
  { pattern: /\bpenny stocks?\b/i, weight: -18 },
];

// ── Sentiment keywords ─────────────────────────────────────────

const BULLISH_PATTERNS = [
  /\brall(y|ied|ies)\b/i, /\bsurge[sd]?\b/i, /\bjump[sed]?\b/i, /\bgain[sed]?\b/i,
  /\brate cut/i, /\beasing\b/i, /\baccommodative\b/i, /\brecovery\b/i,
  /\bupgrade[sd]?\b/i, /\bbullish\b/i, /\bgrowth\b/i, /\bexpansion\b/i,
  /\brecord high/i, /\binflow[sd]?\b/i, /\bstimulus\b/i, /\bboost/i,
  /\bsoar/i, /\boptimis/i,
];

const BEARISH_PATTERNS = [
  /\bfall[s]?\b/i, /\bslump/i, /\bdrop(?:ped|s)?\b/i, /\bdecline[sd]?\b/i,
  /\brate hike/i, /\btightening\b/i, /\brecession/i, /\bcrash/i,
  /\bdowngrade[sd]?\b/i, /\bbearish\b/i, /\bcontraction\b/i, /\boutflow[sd]?\b/i,
  /\btariff/i, /\bsanction/i, /\bdefault\b/i, /\bcrisis\b/i,
  /\binflation (?:rise|surge|spike)/i, /\bplunge/i, /\bsell.?off/i,
];

// ── Sector detection ───────────────────────────────────────────

const SECTOR_PATTERNS: Record<string, RegExp[]> = {
  Banking: [/\bbank/i, /\bNBFC/i, /\bRBI\b/i, /\brepo\b/i, /\bNPA\b/i, /\bcredit\b/i, /\blend/i],
  IT: [/\bIT\b/, /\bsoftware\b/i, /\bInfosys\b/i, /\bTCS\b/i, /\bWipro\b/i, /\btech sector/i],
  Auto: [/\bauto\b/i, /\bvehicle/i, /\bEV\b/, /\bMaruti\b/i, /\bTata Motors/i],
  Pharma: [/\bpharma/i, /\bdrug\b/i, /\bhealthcare/i, /\bFDA\b/],
  FMCG: [/\bFMCG\b/, /\bconsumer\b/i, /\bHUL\b/, /\bITC\b/, /\binflation\b/i],
  Metals: [/\bsteel\b/i, /\bmetal/i, /\balumini?um\b/i, /\bcopper\b/i, /\bgold\b/i, /\bmining\b/i],
  Energy: [/\bcrude\b/i, /\boil\b/i, /\bgas\b/i, /\bOPEC\b/, /\benergy\b/i],
  Realty: [/\brealt?y\b/i, /\bhousing\b/i, /\bproperty/i, /\bconstruction/i],
  Infra: [/\binfra/i, /\bhighway/i, /\brailway/i, /\bL&T\b/, /\bcapex/i],
};

// ── India-indicator keywords ───────────────────────────────────

const INDIA_INDICATORS = [
  /\bIndia\b/i, /\bIndian\b/i, /\bRBI\b/, /\bSEBI\b/, /\bNifty\b/i,
  /\bSensex\b/i, /\bBSE\b/, /\bNSE\b/, /\bINR\b/, /\brupee\b/i,
  /\bMumbai\b/i, /\bDelhi\b/i, /\bGST\b/,
];

// ── Scoring thresholds ─────────────────────────────────────────

const INCLUSION_THRESHOLD = 10;
const HIGH_URGENCY_THRESHOLD = 25;

// ── Exported types ─────────────────────────────────────────────

export interface ScoredArticle {
  title: string;
  description: string;
  link: string;
  sourceName: string;
  sourceCategory: "india" | "global" | "both";
  pubDate: string | undefined;
  score: number;
  impact: "BULLISH" | "BEARISH" | "NEUTRAL" | "MIXED";
  sectors: string[];
  urgency: "HIGH" | "MEDIUM";
}

// ── Core scoring function ──────────────────────────────────────

export function scoreArticle(
  title: string,
  description: string,
  sourceName: string,
  sourceCategory: "india" | "global" | "both",
  pubDate: string | undefined,
  link: string
): ScoredArticle | null {
  const text = `${title} ${description}`;
  let totalScore = 0;
  const matchedSectors = new Set<string>();
  let bullishCount = 0;
  let bearishCount = 0;

  // 1. Check noise keywords first (title = 2x weight)
  for (const kw of NOISE_KEYWORDS) {
    if (kw.pattern.test(title)) totalScore += kw.weight * 2;
    if (kw.pattern.test(description)) totalScore += kw.weight;
  }
  if (totalScore <= -20) return null;

  // 2. Score signal keywords (title = 2x weight)
  for (const kw of HIGH_SIGNAL_KEYWORDS) {
    if (kw.pattern.test(title)) {
      totalScore += kw.weight * 2;
      if (kw.sectors) kw.sectors.forEach((s) => matchedSectors.add(s));
      if (kw.sentiment === "bullish") bullishCount++;
      if (kw.sentiment === "bearish") bearishCount++;
    }
    if (kw.pattern.test(description)) {
      totalScore += kw.weight;
      if (kw.sectors) kw.sectors.forEach((s) => matchedSectors.add(s));
      if (kw.sentiment === "bullish") bullishCount++;
      if (kw.sentiment === "bearish") bearishCount++;
    }
  }

  // 3. Detect sectors from content
  for (const [sector, patterns] of Object.entries(SECTOR_PATTERNS)) {
    for (const p of patterns) {
      if (p.test(text)) {
        matchedSectors.add(sector);
        break;
      }
    }
  }
  if (matchedSectors.size === 0) matchedSectors.add("Broad Market");

  // 4. Recency boost
  if (pubDate) {
    const hoursAgo =
      (Date.now() - new Date(pubDate).getTime()) / (1000 * 60 * 60);
    if (hoursAgo < 6) totalScore += 5;
    else if (hoursAgo < 24) totalScore += 3;
    else if (hoursAgo < 48) totalScore += 1;
  }

  // 5. Threshold check
  if (totalScore < INCLUSION_THRESHOLD) return null;

  // 6. Sentiment classification
  for (const p of BULLISH_PATTERNS) {
    if (p.test(text)) bullishCount++;
  }
  for (const p of BEARISH_PATTERNS) {
    if (p.test(text)) bearishCount++;
  }

  let impact: "BULLISH" | "BEARISH" | "NEUTRAL" | "MIXED";
  if (bullishCount > 0 && bearishCount > 0) impact = "MIXED";
  else if (bullishCount > bearishCount) impact = "BULLISH";
  else if (bearishCount > bullishCount) impact = "BEARISH";
  else impact = "NEUTRAL";

  return {
    title,
    description,
    link,
    sourceName,
    sourceCategory,
    pubDate,
    score: totalScore,
    impact,
    sectors: Array.from(matchedSectors).slice(0, 4),
    urgency: totalScore >= HIGH_URGENCY_THRESHOLD ? "HIGH" : "MEDIUM",
  };
}

// ── Region classification ──────────────────────────────────────

export function classifyRegion(
  title: string,
  description: string,
  sourceCategory: "india" | "global" | "both"
): "india" | "global" {
  if (sourceCategory === "india") return "india";
  if (sourceCategory === "global") return "global";
  const text = `${title} ${description}`;
  const indiaHits = INDIA_INDICATORS.reduce(
    (n, re) => n + (re.test(text) ? 1 : 0),
    0
  );
  return indiaHits >= 1 ? "india" : "global";
}

// ── Deduplication ──────────────────────────────────────────────

export function deduplicateArticles(
  articles: ScoredArticle[]
): ScoredArticle[] {
  const seen = new Map<string, ScoredArticle>();

  for (const article of articles) {
    const norm = article.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .substring(0, 60)
      .trim();

    let isDup = false;
    const entries = Array.from(seen.entries());
    for (const [key, existing] of entries) {
      const existingWords = new Set(key.split(/\s+/));
      const newWords = norm.split(/\s+/);
      const overlap = newWords.filter((w) => existingWords.has(w)).length;
      const similarity = overlap / Math.max(existingWords.size, newWords.length);

      if (similarity > 0.6) {
        if (article.score > existing.score) {
          seen.delete(key);
          seen.set(norm, article);
        }
        isDup = true;
        break;
      }
    }
    if (!isDup) seen.set(norm, article);
  }

  return Array.from(seen.values());
}

// ── Market pulse generator ─────────────────────────────────────

export function generateMarketPulse(
  indiaItems: ScoredArticle[],
  globalItems: ScoredArticle[]
): string {
  const all = [...indiaItems, ...globalItems];
  if (all.length === 0)
    return "No significant market signals detected right now.";

  const bullish = all.filter((i) => i.impact === "BULLISH").length;
  const bearish = all.filter((i) => i.impact === "BEARISH").length;

  let mood: string;
  if (bullish > bearish * 2) mood = "Broadly positive sentiment";
  else if (bearish > bullish * 2) mood = "Risk-off sentiment dominates";
  else if (bullish > bearish) mood = "Cautiously optimistic";
  else if (bearish > bullish) mood = "Cautious with downside risks";
  else mood = "Mixed signals across markets";

  const topSignal = all.find((i) => i.urgency === "HIGH") ?? all[0];
  const topSectors = Array.from(
    new Set(all.flatMap((i) => i.sectors).filter((s) => s !== "Broad Market"))
  ).slice(0, 3);

  const sectorStr =
    topSectors.length > 0
      ? ` Key sectors in focus: ${topSectors.join(", ")}.`
      : "";

  const headline =
    topSignal.title.length > 80
      ? topSignal.title.substring(0, 80) + "..."
      : topSignal.title;

  return `${mood} — top signal: ${headline}.${sectorStr}`;
}
