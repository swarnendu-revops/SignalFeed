import { ScanResult } from "./types";

export const MOCK_DATA: ScanResult = {
  india: [
    {
      headline: "RBI holds repo rate at 6.25% but shifts stance to 'accommodative', signals rate cut in April",
      summary: "The RBI MPC kept the repo rate unchanged at 6.25% but shifted its stance from 'neutral' to 'accommodative', strongly signalling a 25bps cut in April. GDP growth forecast retained at 6.5% for FY26 while inflation projected at 4.2%. Bond yields dropped 8bps immediately. Rate-sensitive sectors like banking, auto, and realty stand to benefit.",
      impact: "BULLISH",
      sectors: ["Banking", "Auto", "Realty", "Broad Market"],
      urgency: "HIGH",
      source_name: "Economic Times",
      source_url: "https://economictimes.indiatimes.com"
    },
    {
      headline: "FII outflows hit ₹12,400 Cr in first week of March, worst since October 2024",
      summary: "Foreign institutional investors pulled out ₹12,400 Cr from Indian equities in the first 5 trading sessions of March, driven by a strengthening dollar and rising US Treasury yields. DIIs absorbed ₹9,800 Cr, providing partial support. The INR weakened to 84.2/USD. Continued FII selling pressure may cap near-term upside for large-caps.",
      impact: "BEARISH",
      sectors: ["Broad Market", "IT", "Banking"],
      urgency: "HIGH",
      source_name: "Mint",
      source_url: "https://livemint.com"
    },
    {
      headline: "India's services PMI surges to 62.1 in February, highest in 7 months",
      summary: "India's services PMI jumped to 62.1 in February from 56.5 in January, driven by strong new order growth and business confidence. The composite PMI rose to 60.5, indicating robust economic expansion. New export orders hit a 14-year high. This reinforces India's growth story and supports premium valuations in services-linked sectors.",
      impact: "BULLISH",
      sectors: ["IT", "Banking", "Broad Market"],
      urgency: "MEDIUM",
      source_name: "Reuters",
      source_url: "https://reuters.com"
    },
    {
      headline: "SEBI tightens F&O rules: lot sizes doubled, weekly expiry limited to one index per exchange",
      summary: "SEBI announced stricter derivatives regulations effective April 1 — lot sizes for index options will double, and weekly expiry contracts will be limited to one benchmark index per exchange (Nifty for NSE, Sensex for BSE). This will reduce speculative retail participation and could lower exchange volumes by 30-40%. Bearish for discount brokers, neutral for market stability.",
      impact: "MIXED",
      sectors: ["Banking", "Broad Market"],
      urgency: "HIGH",
      source_name: "Business Standard",
      source_url: "https://business-standard.com"
    },
    {
      headline: "Government approves ₹1.2 lakh Cr highway expansion plan across 12 states",
      summary: "The Cabinet approved a ₹1.2 lakh Cr national highway expansion project covering 6,500 km across 12 states, to be executed over 3 years. Major beneficiaries include L&T, IRB Infra, Dilip Buildcon, and cement companies. This is the largest single highway approval in FY26 and signals continued government capex push ahead of state elections.",
      impact: "BULLISH",
      sectors: ["Infra", "Realty"],
      urgency: "MEDIUM",
      source_name: "NDTV Profit",
      source_url: "https://ndtvprofit.com"
    }
  ],
  global: [
    {
      headline: "Fed Chair Powell signals no rush to cut rates, markets price in June as earliest",
      summary: "In testimony before Congress, Fed Chair Powell stated the economy remains strong and the Fed can be 'patient' on rate cuts, pushing back against March/May cut expectations. Markets now price June as the earliest possible cut with 62% probability. The S&P 500 fell 0.8% and the 10Y yield rose to 4.32%. Higher-for-longer US rates will keep pressure on EM currencies including INR.",
      impact: "BEARISH",
      sectors: ["Broad Market", "IT", "Banking"],
      urgency: "HIGH",
      source_name: "Bloomberg",
      source_url: "https://bloomberg.com"
    },
    {
      headline: "US imposes 25% tariffs on all steel and aluminum imports, no exceptions",
      summary: "President Trump signed an executive order imposing 25% tariffs on all steel and aluminum imports effective immediately, eliminating prior country-specific exemptions. The EU and Canada announced retaliatory measures. This could disrupt global trade flows and raise input costs for US manufacturers. Indian steel exporters like Tata Steel and JSW may see reduced US volumes but could benefit from trade diversion.",
      impact: "MIXED",
      sectors: ["Metals", "Auto", "Broad Market"],
      urgency: "HIGH",
      source_name: "Financial Times",
      source_url: "https://ft.com"
    },
    {
      headline: "Brent crude drops to $69.8/bbl on OPEC+ surprise output increase plan",
      summary: "Brent crude fell 4.2% to $69.8/bbl after OPEC+ announced plans to increase output by 500K bpd starting April, more than the expected 250K bpd. This is positive for India as a major oil importer — every $1 drop in crude saves India ~$1.5B annually on its import bill. OMCs, airlines, and paint companies stand to benefit from lower input costs.",
      impact: "BULLISH",
      sectors: ["Energy", "FMCG", "Broad Market"],
      urgency: "HIGH",
      source_name: "Reuters",
      source_url: "https://reuters.com"
    },
    {
      headline: "China's February PMI contracts at 49.1, stimulus expectations rise",
      summary: "China's official manufacturing PMI fell to 49.1 in February from 50.1, marking the first contraction in 4 months amid Lunar New Year disruptions and weak export orders. Markets now expect the PBOC to cut the MLF rate by 10bps and the government to announce additional fiscal stimulus at the ongoing NPC session. Metals and commodity demand outlook remains uncertain.",
      impact: "BEARISH",
      sectors: ["Metals", "Energy"],
      urgency: "MEDIUM",
      source_name: "CNBC",
      source_url: "https://cnbc.com"
    },
    {
      headline: "ECB cuts rates by 25bps to 2.5%, signals one more cut likely by June",
      summary: "The ECB cut its deposit facility rate by 25bps to 2.5% as expected and signalled at least one more cut by mid-2026 given falling inflation (now 2.4%) and sluggish growth. The euro weakened 0.4% against the dollar. European equities rallied. For Indian IT companies, a weaker euro may compress European revenue in rupee terms.",
      impact: "NEUTRAL",
      sectors: ["IT", "Broad Market"],
      urgency: "MEDIUM",
      source_name: "Financial Times",
      source_url: "https://ft.com"
    }
  ],
  market_pulse: "Markets are in a cautious phase — Nifty hovering around 22,200 with FII selling capping upside. RBI's accommodative shift and falling crude are tailwinds, but US rate uncertainty and tariff escalation create headwinds. Defensive sectors and rate-sensitives are outperforming.",
  noise_rejected: 47
};
