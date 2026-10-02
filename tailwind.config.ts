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
        /**
         * Every theme colour is a CSS variable (RGB triplets in
         * app/globals.css), so the palette flips in ONE place and a section
         * can opt back into the dark palette with the `on-dark` class (the
         * footer and the photo viewer do).
         *
         * Names describe the ROLE, not a hue:
         *   canvas   page base colour (also used for scrims over photos)
         *   surface  cards and panels
         *   charcoal a step toward the darker side: chips, hover fills
         *   ink      headings and strongest text
         *   chrome   secondary text, icons, lines
         *   muted    body copy
         *   accent   links, focus rings, small indicators
         *   royal    primary CTA buttons only (always white text)
         *
         * `canvas`, not `base`: a colour called `base` makes the font-size
         * class text-base also set it as the TEXT colour.
         */
        canvas: "rgb(var(--c-canvas) / <alpha-value>)",
        charcoal: "rgb(var(--c-charcoal) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        graphite: "rgb(var(--c-graphite) / <alpha-value>)",
        gunmetal: "rgb(var(--c-gunmetal) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        royal: {
          DEFAULT: "#1A44C2",
          hover: "#15389F",
        },
        chrome: "rgb(var(--c-chrome) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        hairline: "rgb(var(--c-line) / 0.22)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
      },
      boxShadow: {
        // A plate resting on the sheet: lit top lip, tight contact shadow,
        // then a soft wide one. Light theme, so the shadows are gentle.
        card: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.14), 0 6px 14px -6px rgba(0,0,0,0.22), 0 22px 40px -24px rgba(0,0,0,0.3)",
        glow: "0 8px 30px -8px rgba(26, 68, 194, 0.45)",
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
