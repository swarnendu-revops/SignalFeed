import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#08090c",
        "card-border": "rgba(255,255,255,0.04)",
        accent: "#818cf8",
        bullish: "#22c55e",
        "bullish-bg": "rgba(34,197,94,0.08)",
        "bullish-border": "rgba(34,197,94,0.3)",
        bearish: "#ef4444",
        "bearish-bg": "rgba(239,68,68,0.08)",
        "bearish-border": "rgba(239,68,68,0.3)",
        neutral: "#818cf8",
        "neutral-bg": "rgba(129,140,248,0.08)",
        "neutral-border": "rgba(129,140,248,0.3)",
        mixed: "#f59e0b",
        "mixed-bg": "rgba(245,158,11,0.08)",
        "mixed-border": "rgba(245,158,11,0.3)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Instrument Serif", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      keyframes: {
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-slide-in": "fadeSlideIn 0.4s ease-out forwards",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        pulse: "pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
