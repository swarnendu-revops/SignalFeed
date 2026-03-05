# SIGNAL — App Builder Master Prompt for Claude Code

## Project Overview

Build **SIGNAL** — a noise-filtering economic news feed web app for Indian retail investors. The app uses AI (Claude API with web search) to scan dozens of sources, apply a ruthless 5-gate relevance filter, and surface ONLY consequential economic news in two sections: India & Global.

Tech stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Claude API (with web_search tool)**

---

## Architecture

```
signal-feed/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Main feed page (server component shell)
│   ├── globals.css             # Tailwind + custom animations
│   └── api/
│       └── scan/
│           └── route.ts        # POST endpoint — calls Claude API with web search
├── components/
│   ├── SignalFeed.tsx           # Main client component orchestrating the feed
│   ├── NewsCard.tsx             # Individual news item card with impact badge
│   ├── SectionPanel.tsx         # Section wrapper (India / Global) with header
│   ├── MarketPulse.tsx          # Top bar showing market mood + noise count
│   ├── ScanButton.tsx           # Animated scan trigger button
│   ├── SkeletonLoader.tsx       # Loading shimmer state
│   ├── FilterStats.tsx          # Footer showing signal/noise ratio
│   └── EmptyState.tsx           # Initial state before first scan
├── lib/
│   ├── prompt.ts               # THE MASTER PROMPT (exported as string constant)
│   ├── types.ts                # TypeScript interfaces for all data shapes
│   └── parseResponse.ts        # Extract & validate JSON from Claude response
├── .env.local                  # ANTHROPIC_API_KEY
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## Step 1 — Data Types (`lib/types.ts`)

```typescript
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
```

---

## Step 2 — The Master Prompt (`lib/prompt.ts`)

This is the brain of the app. Export it as a string constant. This prompt is sent as the `system` message in every Claude API call.

```
You are SIGNAL — an elite economic intelligence filter for retail investors.

## YOUR MISSION
Scan the web for the most CONSEQUENTIAL economic and market news. You are a noise-cancelling algorithm in human form. Your job is to surface ONLY what moves markets, changes policy, or shifts the macro landscape.

## FILTERING ALGORITHM — The 5-Gate Test
Every news item must pass ALL 5 gates to be included:

**GATE 1 — MATERIALITY**: Does this news materially affect GDP, inflation, interest rates, currency, major indices, or sector valuations? If it's just commentary, opinion, or speculation → REJECT.

**GATE 2 — ACTIONABILITY**: Can a retail investor reasonably act on this information (buy, sell, hold, hedge, reallocate)? If not → REJECT.

**GATE 3 — MAGNITUDE**: Is the quantitative impact significant? Minor data revisions, small regulatory tweaks, or single-company stories (unless mega-cap / Nifty 50) → REJECT.

**GATE 4 — NOVELTY**: Is this genuinely new information, or a rehash/follow-up of already-known developments? Repetitive coverage of the same story → REJECT (keep only the most substantive piece).

**GATE 5 — TIME SENSITIVITY**: Is this relevant NOW? Stale analysis, backward-looking summaries, or "year in review" pieces → REJECT.

## NOISE PATTERNS — Auto-Reject These
- Celebrity investor opinions / "guru says" stories
- Clickbait predictions ("Market CRASH incoming!", "This stock will 10x!")
- Minor earnings beats/misses (unless Nifty 50 or global top-20 by market cap)
- Political horse-race coverage without concrete policy implications
- Crypto pump/dump narratives or meme coin stories
- Repetitive inflation/rate commentary without NEW data points
- PR-driven "company announces partnership" fluff
- Listicles ("5 stocks to buy now", "7 mutual funds for 2026")
- Technical analysis / chart pattern stories ("Head and shoulders forming!")
- Influencer-driven market narratives
- Repackaged press releases disguised as news
- "Markets are volatile" filler pieces with no substance

## SIGNAL PATTERNS — Prioritize These
- RBI rate decisions, policy shifts, forward guidance changes, liquidity actions (CRR, SLR, OMO)
- Fed/ECB/BOJ/PBOC rate decisions and forward guidance
- GDP, CPI, WPI, PMI, IIP, employment data releases WITH surprising deviations from consensus
- SEBI regulatory changes (margin rules, FPI limits, IPO norms, mutual fund regulation)
- Government fiscal policy: Union Budget announcements, GST council decisions, disinvestment, subsidy changes
- Currency moves: INR/USD > 0.5% in a session, major DXY moves
- Index moves: Nifty/Sensex > 1.5% in a session, S&P 500 > 2%
- FII/DII flow data when showing significant trend shifts
- Sovereign or corporate credit rating changes by Moody's, S&P, Fitch, CRISIL, ICRA
- Trade policy shifts: tariffs, sanctions, FTA progress, anti-dumping duties
- Major M&A: >$500M or sector-reshaping deals
- Government capex announcements, infrastructure project approvals
- Commodity price shocks: crude oil, gold, metals, agricultural commodities affecting India
- Banking system events: NPA data, merger announcements, PCA actions, large credit events
- IPO/FPO/OFS of significant size (>₹2,000 Cr)
- Global supply chain disruptions affecting Indian industries
- Monsoon/weather data significantly impacting agri or inflation outlook

## OUTPUT FORMAT
Return ONLY valid JSON. No markdown fences. No preamble. No explanation. Pure JSON.

{
  "india": [
    {
      "headline": "Concise, factual headline — no clickbait, no sensationalism",
      "summary": "2-3 sentences explaining WHY this matters for a retail investor. Include key numbers, percentage changes, and what action this might warrant.",
      "impact": "BULLISH | BEARISH | NEUTRAL | MIXED",
      "sectors": ["Banking", "IT", "Auto", "Pharma", "FMCG", "Metals", "Energy", "Realty", "Infra", "Broad Market"],
      "urgency": "HIGH | MEDIUM",
      "source_name": "Publication name (e.g., Economic Times, Mint, Reuters)",
      "source_url": "Direct URL to the source article"
    }
  ],
  "global": [
    {
      "headline": "...",
      "summary": "...",
      "impact": "...",
      "sectors": ["..."],
      "urgency": "...",
      "source_name": "...",
      "source_url": "..."
    }
  ],
  "market_pulse": "1-2 sentence overall market mood. Be specific: mention key levels, direction, and dominant theme.",
  "noise_rejected": <integer — approximate count of articles you evaluated but filtered out>
}

## HARD RULES
1. India section: 4-7 items MAX. Focus on RBI, SEBI, Indian macro data, Nifty/Sensex drivers, INR, Indian fiscal policy, major Indian corporate actions.
2. Global section: 4-7 items MAX. Focus on Fed/ECB/BOJ, US/EU/China macro, global commodities, geopolitical economic impacts, DXY, US Treasury yields.
3. If fewer items pass the 5-gate test, return FEWER items. NEVER pad with noise to fill a quota.
4. Every item MUST have a real, verifiable source URL from your web search results. No fabricated URLs.
5. "noise_rejected" should be an honest approximate count of articles you encountered but filtered out.
6. Sort each section: HIGH urgency first, then MEDIUM. Within same urgency, most recent first.
7. Headlines must be factual and specific. Bad: "Markets rally on positive sentiment". Good: "Nifty crosses 24,500 as RBI holds repo rate at 6.25%, signals easing bias".
8. Summaries must answer: What happened? What's the number? Why should I care? What might I do?
```

---

## Step 3 — API Route (`app/api/scan/route.ts`)

```typescript
// POST /api/scan
// 1. Build the user message with today's date and search queries
// 2. Call Claude API with:
//    - model: "claude-sonnet-4-20250514"
//    - system: MASTER_PROMPT (from lib/prompt.ts)
//    - tools: [{ type: "web_search_20250305", name: "web_search" }]
//    - max_tokens: 16000 (needs room for search + reasoning + JSON output)
// 3. Parse response: iterate content blocks, find type === "text", extract JSON
// 4. Validate against ScanResult type
// 5. Return JSON response

// User message template (inject current date dynamically):
const userMessage = `
Today is ${formattedDate}. Search for today's most consequential economic and financial news for both India and global markets. Apply your 5-Gate noise filter ruthlessly.

Search these query groups:
1. "India economy news today RBI SEBI Nifty Sensex"
2. "India fiscal policy GDP inflation trade ${currentMonth} ${currentYear}"
3. "India stock market FII DII flows corporate earnings"
4. "Federal Reserve ECB interest rates global economy today"
5. "Crude oil gold commodities global trade policy today"
6. "US China Europe economic data PMI employment ${currentMonth} ${currentYear}"

After searching all sources, compile results. Apply ALL 5 gates to every article found. Return ONLY the JSON output as specified in your instructions.
`;
```

**Important implementation notes for the API route:**
- Set a generous timeout (60s+) — web search takes time
- The Claude response with web search will have multiple content blocks (text, tool_use, tool_result). Loop through ALL blocks and collect text blocks.
- The final text block typically contains the JSON. Try to parse it. If parsing fails, try regex extraction of the JSON object.
- Add error handling: if JSON extraction fails, return a structured error so the frontend can show a retry option.
- Store `ANTHROPIC_API_KEY` in `.env.local`, read via `process.env.ANTHROPIC_API_KEY`.
- Add rate limiting or a simple cooldown (e.g., 60s between scans) to prevent API abuse.

---

## Step 4 — Response Parser (`lib/parseResponse.ts`)

```typescript
// Takes raw Claude API response object
// 1. Filter content blocks where type === "text"
// 2. Concatenate all text blocks
// 3. Try JSON.parse() on the full text
// 4. If that fails, use regex: /\{[\s\S]*\}/ to extract JSON
// 5. Parse extracted JSON
// 6. Validate: check india/global are arrays, each item has required fields
// 7. Sanitize URLs: ensure they start with https://
// 8. Return typed ScanResult or throw descriptive error
```

---

## Step 5 — UI Components

### Design System
- **Palette**: Dark mode. Background `#08090c`. Cards on `transparent` with subtle borders `rgba(255,255,255,0.04)`. Accent: indigo `#818cf8`.
- **Fonts**: Load from Google Fonts — `JetBrains Mono` (labels, badges, mono elements), `Instrument Serif` (headlines), `DM Sans` (body text, summaries).
- **Impact colors**: BULLISH = green (#22c55e border, dark green bg), BEARISH = red (#ef4444 border, dark red bg), NEUTRAL = indigo, MIXED = amber.
- **Animations**: `fadeSlideIn` for cards appearing with staggered delay. `shimmer` for skeleton loading. `pulse` for scanning indicator.
- **Layout**: Single column, full-width, mobile-first. No sidebar. News cards stack vertically.

### Component Specifications

**`ScanButton.tsx`**
- Default state: "⟳ SCAN NOW" — indigo ghost button
- Loading state: "◎ SCANNING..." with pulsing dot, disabled
- Add 60s cooldown after scan to prevent spam

**`MarketPulse.tsx`**
- Appears after successful scan, above news sections
- Left: indigo dot + italic market pulse text
- Right: "{n} noise items filtered" in muted mono text

**`NewsCard.tsx`**
- Entire card is a clickable link (`<a>` wrapping everything), opens source_url in new tab
- Row 1: urgency dot (red=HIGH, amber=MEDIUM) + ImpactBadge + source name (right-aligned, muted)
- Row 2: headline in serif font, 15-16px
- Row 3: summary in body font, muted color, 12-13px
- Row 4: sector tags as small pills
- Hover: subtle background highlight

**`SectionPanel.tsx`**
- Header: section title ("🇮🇳 INDIA" / "🌐 GLOBAL") in uppercase mono + subtitle + signal count
- Body: list of NewsCard components
- Indigo gradient divider between sections

**`EmptyState.tsx`**
- Centered layout with icon, title "Ready to filter the noise", description of the 5-gate process
- Shown before first scan

**`SkeletonLoader.tsx`**
- 4 shimmer rows mimicking card layout
- Shown during loading

**`FilterStats.tsx`**
- Footer bar: last updated time (left) + "{n} signals • {n} noise rejected" (right)

### Tab Navigation
- Three tabs below header: ALL SIGNALS | INDIA | GLOBAL
- Only shown after data is loaded
- "ALL" shows both sections, "INDIA"/"GLOBAL" shows respective section only

---

## Step 6 — Environment & Config

**.env.local:**
```
ANTHROPIC_API_KEY=sk-ant-...
```

**tailwind.config.ts:**
- Extend with custom animations: fadeSlideIn, shimmer, pulse
- Add custom colors for impact badges

**next.config.js:**
- No special config needed unless you add image domains

---

## Step 7 — Edge Cases & Error Handling

1. **API timeout**: Claude web search can take 30-60s. Set fetch timeout to 90s. Show "Still scanning..." message after 15s.
2. **JSON parse failure**: If Claude returns malformed JSON (rare but possible), show error with retry button. Log the raw response for debugging.
3. **Empty results**: If both india and global arrays are empty, show "No consequential news found right now — the market is quiet. Check back later."
4. **Invalid URLs**: Some URLs from web search might be malformed. Validate with URL constructor, skip items with bad URLs.
5. **Rate limiting**: Add a simple client-side cooldown (60s) and optional server-side rate limiting.
6. **Network errors**: Show distinct error for network failures vs API errors.

---

## Step 8 — Optional Enhancements (Phase 2)

If time permits, add:
- **Auto-refresh**: Poll every 30 minutes with a visible countdown timer
- **Filter by impact**: Let user toggle BULLISH/BEARISH/NEUTRAL/MIXED visibility
- **Filter by sector**: Click a sector tag to filter all news to that sector
- **Scan history**: Store last 5 scans in localStorage so user can compare what changed
- **Share**: Copy a single news item as formatted text
- **PWA**: Add manifest.json for mobile home screen install
- **Sound**: Optional subtle chime on new HIGH urgency items

---

## Summary for Claude Code

Build this as a clean Next.js 14 app. The critical piece is the master prompt in `lib/prompt.ts` — that's the noise-filtering algorithm. The API route calls Claude with web search enabled, the prompt filters aggressively, and the frontend renders the results in a dark, information-dense, Bloomberg-terminal-inspired UI. Every news card links directly to its source. The app should feel like an instrument — precise, fast, zero fluff.
