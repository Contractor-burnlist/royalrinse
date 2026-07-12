import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS — edit here to change the look of the whole site.
 * Component code references these names only, never raw hex.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B0D10",
        charcoal: "#14181D",
        surface: "#1B2027",
        royal: {
          DEFAULT: "#1D4ED8",
          hover: "#2563EB",
        },
        chrome: "#C9CED6",
        ink: "#F5F7FA",
        muted: "#9BA3AF",
        hairline: "rgba(201, 206, 214, 0.12)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -12px rgba(0,0,0,0.6)",
        glow: "0 8px 30px -8px rgba(29, 78, 216, 0.45)",
      },
      maxWidth: {
        container: "72rem",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Logo entrance: a quiet fade + settle. No bounce, no overshoot.
        "logo-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        // Slow drift on the active hero slide. Outlasts the 5s advance so it
        // never visibly snaps back.
        kenburns: "kenburns 9s ease-out forwards",
        "logo-in": "logo-in 400ms ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
