import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F2EFE9",
        "cream-warm": "#EEEAE0",
        ink: "#1C1B17",
        "ink-muted": "#6B6862",
        terracotta: "#B85C38",
        line: "rgba(28, 27, 23, 0.12)",
      },
      fontFamily: {
        serif: ["Instrument Serif", "Times New Roman", "serif"],
        sans: ["var(--font-geist)", "Noto Serif SC", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
        "serif-cn": ["Noto Serif SC", "serif"],
        "sans-cn": ["Noto Sans SC", "sans-serif"],
      },
      letterSpacing: {
        "annotation": "0.005em",
        "nav": "0.08em",
        "mark": "0.12em",
        "label": "0.18em",
        "cue": "0.2em",
      },
      lineHeight: {
        "wordmark": "0.86",
        "heading": "0.98",
      },
    },
  },
  plugins: [],
};
export default config;
