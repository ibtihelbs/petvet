import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ported 1:1 from the original variables.module.css brand palette
        marine: { DEFAULT: "#0f190c", 75: "#325027" },
        wine: { DEFAULT: "#38512f", 75: "#48683d" },
        ink: { DEFAULT: "#1d261a", 75: "#293625" },
        terracotta: { DEFAULT: "#cca325", 75: "#e3b832" },
        sand: { DEFAULT: "#a1b058", 75: "#b5c46b" },
        almond: { DEFAULT: "#f1f0db", 75: "#faf9f0" },
      },
      fontFamily: {
        headline: ["var(--font-headline)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        brand: "32px",
      },
    },
  },
  plugins: [],
};

export default config;
