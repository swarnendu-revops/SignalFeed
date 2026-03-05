import Parser from "rss-parser";
import { FEED_SOURCES } from "./feeds";

const FEED_TIMEOUT_MS = 10_000;

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#39;": "'", "&apos;": "'", "&#x27;": "'", "&#x2F;": "/",
  "&nbsp;": " ", "&#8211;": "–", "&#8212;": "—", "&#8216;": "'",
  "&#8217;": "'", "&#8220;": '"', "&#8221;": '"', "&rsquo;": "'",
  "&lsquo;": "'", "&rdquo;": '"', "&ldquo;": '"', "&mdash;": "—",
  "&ndash;": "–",
};

function decodeEntities(text: string): string {
  return text.replace(/&[#\w]+;/g, (match) => HTML_ENTITIES[match] ?? match);
}

export interface RawFeedItem {
  title: string;
  contentSnippet: string;
  link: string;
  pubDate: string | undefined;
  sourceName: string;
  sourceCategory: "india" | "global" | "both";
}

export interface FetchResult {
  items: RawFeedItem[];
  feedsFailed: number;
  feedsSucceeded: number;
}

export async function fetchAllFeeds(): Promise<FetchResult> {
  const parser = new Parser({
    timeout: FEED_TIMEOUT_MS,
    headers: {
      "User-Agent": "SignalFeed/1.0 (RSS Reader)",
      Accept: "application/rss+xml, application/xml, text/xml",
    },
  });

  const results = await Promise.allSettled(
    FEED_SOURCES.map(async (source) => {
      const feed = await parser.parseURL(source.url);
      return feed.items.map((item) => ({
        title: decodeEntities(item.title?.trim() ?? ""),
        contentSnippet: decodeEntities(
          (item.contentSnippet ?? item.content ?? "")
            .replace(/<[^>]*>/g, "")
            .trim()
            .substring(0, 500)
        ),
        link: item.link ?? "",
        pubDate: item.isoDate ?? item.pubDate,
        sourceName: source.name,
        sourceCategory: source.category,
      }));
    })
  );

  const items: RawFeedItem[] = [];
  let feedsFailed = 0;
  let feedsSucceeded = 0;

  for (const result of results) {
    if (result.status === "fulfilled") {
      items.push(...result.value);
      feedsSucceeded++;
    } else {
      console.warn(
        "Feed fetch failed:",
        result.reason?.message ?? result.reason
      );
      feedsFailed++;
    }
  }

  return { items, feedsFailed, feedsSucceeded };
}
