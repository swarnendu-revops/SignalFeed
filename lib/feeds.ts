export interface FeedSource {
  name: string;
  url: string;
  category: "india" | "global" | "both";
  priority: number;
}

// Verify RSS URLs periodically — some sources may deprecate feeds.
export const FEED_SOURCES: FeedSource[] = [
  // India feeds
  {
    name: "Economic Times",
    url: "https://economictimes.indiatimes.com/rssfeedstopstories.cms",
    category: "india",
    priority: 9,
  },
  {
    name: "Economic Times",
    url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
    category: "india",
    priority: 8,
  },
  {
    name: "Mint",
    url: "https://www.livemint.com/rss/markets",
    category: "india",
    priority: 8,
  },
  {
    name: "Mint",
    url: "https://www.livemint.com/rss/economy",
    category: "india",
    priority: 8,
  },
  {
    name: "Moneycontrol",
    url: "https://www.moneycontrol.com/rss/latestnews.xml",
    category: "india",
    priority: 7,
  },
  {
    name: "Moneycontrol",
    url: "https://www.moneycontrol.com/rss/marketreports.xml",
    category: "india",
    priority: 7,
  },
  {
    name: "RBI",
    url: "https://www.rbi.org.in/pressreleases_rss.xml",
    category: "india",
    priority: 10,
  },
  {
    name: "SEBI",
    url: "https://www.sebi.gov.in/sebirss.xml",
    category: "india",
    priority: 10,
  },
  // Global feeds
  {
    name: "Reuters",
    url: "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best",
    category: "global",
    priority: 9,
  },
  {
    name: "Bloomberg",
    url: "https://feeds.bloomberg.com/markets/news.rss",
    category: "global",
    priority: 9,
  },
  {
    name: "Bloomberg",
    url: "https://feeds.bloomberg.com/economics/news.rss",
    category: "global",
    priority: 8,
  },
  // Both (classified per-article by content)
  {
    name: "Reuters India",
    url: "http://feeds.reuters.com/reuters/INbusinessNews",
    category: "both",
    priority: 8,
  },
];
