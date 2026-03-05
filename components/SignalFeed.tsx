"use client";

import { useState, useEffect, useCallback } from "react";
import { ScanResult } from "@/lib/types";
import ScanButton from "./ScanButton";
import MarketPulse from "./MarketPulse";
import SectionPanel from "./SectionPanel";
import SkeletonLoader from "./SkeletonLoader";
import EmptyState from "./EmptyState";
import FilterStats from "./FilterStats";

type TabFilter = "ALL" | "INDIA" | "GLOBAL";

export default function SignalFeed() {
  const [data, setData] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<TabFilter>("ALL");
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleScan = useCallback(async () => {
    if (isScanning || cooldown > 0) return;

    setIsScanning(true);
    setError(null);
    setShowSlowMessage(false);

    // Show "still scanning" after 15s
    const slowTimer = setTimeout(() => setShowSlowMessage(true), 15000);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const res = await fetch("/api/scan", {
        method: "POST",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }

      setData(json as ScanResult);
      setLastUpdated(new Date());
      setCooldown(60);
      setActiveTab("ALL");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Scan timed out. The AI search took too long. Please try again.");
      } else {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    } finally {
      clearTimeout(slowTimer);
      setIsScanning(false);
      setShowSlowMessage(false);
    }
  }, [isScanning, cooldown]);

  const signalCount = data ? data.india.length + data.global.length : 0;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-white/[0.04] px-4 sm:px-6">
        <div className="max-w-3xl mx-auto py-5 flex items-center justify-between">
          <div>
            <h1 className="font-mono text-sm tracking-[0.3em] text-white/90 font-medium">
              SIGNAL
            </h1>
            <p className="font-mono text-[10px] text-white/25 tracking-widest mt-0.5">
              NOISE-FILTERED ECONOMIC INTELLIGENCE
            </p>
          </div>
          <ScanButton
            isScanning={isScanning}
            cooldownRemaining={cooldown}
            onScan={handleScan}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Scanning slow message */}
        {isScanning && showSlowMessage && (
          <div className="text-center py-3 mb-4">
            <p className="font-mono text-[11px] text-white/30 animate-pulse">
              Still scanning... AI is searching multiple sources
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="border border-bearish-border bg-bearish-bg rounded-lg p-4 mb-6">
            <p className="text-sm text-bearish">{error}</p>
            <button
              onClick={handleScan}
              disabled={isScanning || cooldown > 0}
              className="mt-2 font-mono text-[10px] text-white/50 hover:text-white/70 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading state */}
        {isScanning && !data && <SkeletonLoader />}

        {/* Empty state */}
        {!isScanning && !data && !error && <EmptyState />}

        {/* Results */}
        {data && (
          <>
            {/* Market Pulse */}
            <MarketPulse
              pulse={data.market_pulse}
              noiseCount={data.noise_rejected}
            />

            {/* Tab navigation */}
            <div className="flex gap-1 mt-5 mb-6 border-b border-white/[0.04]">
              {(["ALL", "INDIA", "GLOBAL"] as TabFilter[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    font-mono text-[10px] tracking-[0.15em] px-4 py-2.5
                    border-b-2 transition-colors duration-150
                    ${
                      activeTab === tab
                        ? "border-accent text-accent"
                        : "border-transparent text-white/30 hover:text-white/50"
                    }
                  `}
                >
                  {tab === "ALL"
                    ? "ALL SIGNALS"
                    : tab === "INDIA"
                    ? "INDIA"
                    : "GLOBAL"}
                </button>
              ))}
            </div>

            {/* Empty results check */}
            {data.india.length === 0 && data.global.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-white/40">
                  No consequential news found right now — the market is quiet.
                  Check back later.
                </p>
              </div>
            )}

            {/* News sections */}
            <div className="space-y-8">
              {(activeTab === "ALL" || activeTab === "INDIA") &&
                data.india.length > 0 && (
                  <SectionPanel
                    title="INDIA"
                    icon="🇮🇳"
                    subtitle="Domestic markets & policy"
                    items={data.india}
                  />
                )}

              {activeTab === "ALL" &&
                data.india.length > 0 &&
                data.global.length > 0 && (
                  <div className="section-divider my-8" />
                )}

              {(activeTab === "ALL" || activeTab === "GLOBAL") &&
                data.global.length > 0 && (
                  <SectionPanel
                    title="GLOBAL"
                    icon="🌐"
                    subtitle="International markets & macro"
                    items={data.global}
                  />
                )}
            </div>

            {/* Footer stats */}
            <FilterStats
              signalCount={signalCount}
              noiseRejected={data.noise_rejected}
              lastUpdated={lastUpdated}
            />
          </>
        )}
      </main>
    </div>
  );
}
