import { NextResponse } from "next/server";
import { ScanResult, NewsItem } from "@/lib/types";
import { MOCK_DATA } from "@/lib/mockData";
import { fetchAllFeeds } from "@/lib/fetchFeeds";
import {
  scoreArticle,
  classifyRegion,
  generateMarketPulse,
  deduplicateArticles,
  ScoredArticle,
} from "@/lib/scorer";

// Simple in-memory rate limiting
let lastScanTime = 0;
const COOLDOWN_MS = 60_000; // 60 seconds

function scoredToNewsItem(article: ScoredArticle): NewsItem {
  return {
    headline: article.title,
    summary: article.description.substring(0, 300) || article.title,
    impact: article.impact,
    sectors: article.sectors,
    urgency: article.urgency,
    source_name: article.sourceName,
    source_url: article.link,
  };
}

export async function POST() {
  // Rate limiting check
  const now = Date.now();
  if (now - lastScanTime < COOLDOWN_MS) {
    const waitSeconds = Math.ceil((COOLDOWN_MS - (now - lastScanTime)) / 1000);
    return NextResponse.json(
      { error: `Please wait ${waitSeconds}s before scanning again.` },
      { status: 429 }
    );
  }

  lastScanTime = now;

  try {
    // 1. Fetch all RSS feeds in parallel
    const { items, feedsFailed, feedsSucceeded } = await fetchAllFeeds();

    // If ALL feeds failed, fall back to mock data
    if (feedsSucceeded === 0) {
      console.error(`All ${feedsFailed} feeds failed. Returning mock data.`);
      return NextResponse.json(MOCK_DATA);
    }

    // 2. Score and filter each article
    const scored: ScoredArticle[] = [];
    let noiseRejected = 0;

    for (const item of items) {
      if (!item.title) {
        noiseRejected++;
        continue;
      }
      const result = scoreArticle(
        item.title,
        item.contentSnippet,
        item.sourceName,
        item.sourceCategory,
        item.pubDate,
        item.link
      );
      if (result) {
        scored.push(result);
      } else {
        noiseRejected++;
      }
    }

    // 3. Deduplicate
    const deduped = deduplicateArticles(scored);
    noiseRejected += scored.length - deduped.length;

    // 4. Classify into India vs Global
    const indiaArticles: ScoredArticle[] = [];
    const globalArticles: ScoredArticle[] = [];

    for (const article of deduped) {
      const region = classifyRegion(
        article.title,
        article.description,
        article.sourceCategory
      );
      if (region === "india") indiaArticles.push(article);
      else globalArticles.push(article);
    }

    // 5. Sort: HIGH urgency first, then by score descending
    const sortFn = (a: ScoredArticle, b: ScoredArticle) => {
      if (a.urgency !== b.urgency) return a.urgency === "HIGH" ? -1 : 1;
      return b.score - a.score;
    };
    indiaArticles.sort(sortFn);
    globalArticles.sort(sortFn);

    // 6. Cap at 7 items per section
    const indiaSlice = indiaArticles.slice(0, 7);
    const globalSlice = globalArticles.slice(0, 7);

    // 7. Generate market pulse
    const marketPulse = generateMarketPulse(indiaSlice, globalSlice);

    // 8. Build response
    const scanResult: ScanResult = {
      india: indiaSlice.map(scoredToNewsItem),
      global: globalSlice.map(scoredToNewsItem),
      market_pulse: marketPulse,
      noise_rejected: noiseRejected,
    };

    return NextResponse.json(scanResult);
  } catch (error) {
    console.error("Scan error:", error);
    lastScanTime = 0;

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
