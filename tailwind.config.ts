import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Mapped to: Primary Brand Teal & Lighter Teal
        marine: { DEFAULT: "#0A748C", 75: "#4A9CAF" },

        // Mapped to: Coral / Soft Orange (Accent) & Lighter Coral
        wine: { DEFAULT: "#F97316", 75: "#FB923C" },

        // Mapped to: Deep Charcoal (Text) & Lighter Muted Text
        ink: { DEFAULT: "#1F2937", 75: "#4B5563" },

        // Mapped to: Warm Sand / Soft Cream & Lighter Cream
        terracotta: { DEFAULT: "#F5F0E6", 75: "#FAF8F3" },

        // Mapped to: Soft Mint / Pale Aqua & Lighter Mint
        sand: { DEFAULT: "#E6F2F4", 75: "#F2F8F9" },

        // Mapped to: Crisp White & Off-White (for main backgrounds)
        almond: { DEFAULT: "#FFFFFF", 75: "#F9FAFB" },
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
