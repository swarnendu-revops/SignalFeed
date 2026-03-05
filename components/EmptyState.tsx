"use client";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-5xl mb-6 opacity-60">◎</div>
      <h2
        className="text-2xl mb-3 text-white/90"
        style={{ fontFamily: "Instrument Serif, serif" }}
      >
        Ready to filter the noise
      </h2>
      <p className="text-sm text-white/40 max-w-md leading-relaxed mb-8">
        SIGNAL scans dozens of economic news sources and applies a ruthless
        5-gate relevance filter. Only consequential news that moves markets,
        changes policy, or shifts the macro landscape makes it through.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-2xl w-full">
        {[
          { gate: "01", label: "Materiality" },
          { gate: "02", label: "Actionability" },
          { gate: "03", label: "Magnitude" },
          { gate: "04", label: "Novelty" },
          { gate: "05", label: "Time Sensitivity" },
        ].map((g) => (
          <div
            key={g.gate}
            className="border border-white/[0.06] rounded-lg px-3 py-2.5 text-center"
          >
            <div className="font-mono text-[10px] text-accent mb-1">
              GATE {g.gate}
            </div>
            <div className="text-[11px] text-white/50">{g.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
