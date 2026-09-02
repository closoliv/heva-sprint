import type { Config } from "tailwindcss";

// Tokens extracted from app.heva.co (practice detail, store, chat) on 2026-09-02.
// See design/heva.json + design/heva.md for the full measurement + taste analysis,
// and STYLE_GUIDE.md for the directives derived from it.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        "background-chat": "#F8FAFC",
        foreground: "#2F2F30",
        muted: "#8C8D91",
        navy: "#1A2433",
        slate: "#5B6473",
        border: "#E7E8EA",
        brand: {
          DEFAULT: "#0056D6",
          50: "#EAF1FD",
          600: "#0056D6",
          700: "#00449E",
        },
        accent: {
          DEFAULT: "#C3FB11",
          foreground: "#1A2433",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        pill: "9999px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(16,24,40,0.06)",
      },
      fontFamily: {
        // Stand-in for heva's proprietary "madeCarvingSoft" — swap for the
        // licensed font file when available. Quicksand was chosen for its
        // similarly soft/rounded geometric letterforms. See STYLE_GUIDE.md.
        sans: ["Quicksand", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "15px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      spacing: {
        "4.5": "18px",
      },
      maxWidth: {
        app: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
