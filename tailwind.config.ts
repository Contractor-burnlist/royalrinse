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
        // Named `canvas`, not `base`: a colour called `base` makes the font-size
        // class text-base also set this as the TEXT colour.
        canvas: "#211E1C",
        charcoal: "#1A1816",
        surface: "#3A3531",
        // Metal tones. Mirrored as CSS variables in app/globals.css, where the
        // brushed and machined surface classes are built from them.
        graphite: "#48423D",
        gunmetal: "#554E48",
        "chrome-bright": "#EDEAE6",
        royal: {
          DEFAULT: "#1D4ED8",
          hover: "#2563EB",
        },
        chrome: "#D6D2CC",
        ink: "#F7F5F2",
        muted: "#C2BDB7",
        hairline: "rgba(214, 210, 204, 0.16)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
      },
      boxShadow: {
        // Layered so a card reads as a raised metal panel: a lit top lip, a
        // tight contact shadow, then a soft wide one.
        card: "inset 0 1px 0 rgba(232,236,242,0.07), inset 0 -1px 0 rgba(0,0,0,0.45), 0 1px 1px rgba(0,0,0,0.5), 0 6px 12px -4px rgba(0,0,0,0.55), 0 22px 40px -22px rgba(0,0,0,0.85)",
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
