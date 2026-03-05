"use client";

interface ScanButtonProps {
  isScanning: boolean;
  cooldownRemaining: number;
  onScan: () => void;
}

export default function ScanButton({
  isScanning,
  cooldownRemaining,
  onScan,
}: ScanButtonProps) {
  const isDisabled = isScanning || cooldownRemaining > 0;

  return (
    <button
      onClick={onScan}
      disabled={isDisabled}
      className={`
        font-mono text-xs tracking-widest uppercase px-5 py-2.5 rounded-lg
        border transition-all duration-200
        ${
          isScanning
            ? "border-accent/30 text-accent/70 bg-accent/5 cursor-not-allowed"
            : cooldownRemaining > 0
            ? "border-white/10 text-white/30 bg-transparent cursor-not-allowed"
            : "border-accent/40 text-accent bg-transparent hover:bg-accent/10 hover:border-accent/60 cursor-pointer"
        }
      `}
    >
      {isScanning ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          SCANNING...
        </span>
      ) : cooldownRemaining > 0 ? (
        <span>WAIT {cooldownRemaining}s</span>
      ) : (
        <span>&#x27F3; SCAN NOW</span>
      )}
    </button>
  );
}
