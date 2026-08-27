import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // VHS / video-store CRT system
        crt: {
          DEFAULT: "#0E1414",
          800: "#0A0F0F",
          700: "#15201F",
          600: "#1E2C2A",
        },
        phosphor: "#2FE6C4",
        magenta: "#FF4FA3",
        cream: "#EDE9DE",
        amber: "#FFB020",
        muted: "#7C918D",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Archivo Black", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Hanken Grotesk", "system-ui", "sans-serif"],
        crt: ["var(--font-mono)", "VT323", "ui-monospace", "monospace"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
        "12xl": "14rem",
      },
      keyframes: {
        // Analog "tracking" wobble on hover — a tape that hasn't settled.
        tracking: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-1px)" },
          "40%": { transform: "translateX(1.5px)" },
          "60%": { transform: "translateX(-1px)" },
          "80%": { transform: "translateX(0.5px)" },
        },
        // Existing hero slider mechanics, kept for compatibility.
        showContent: {
          "0%": { transform: "translateY(50px)", filter: "blur(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", filter: "blur(0)", opacity: "1" },
        },
        runningTime: {
          "0%": { width: "100%" },
          "100%": { width: "0" },
        },
      },
      animation: {
        tracking: "tracking 0.4s ease-in-out",
        showContent: "showContent 0.5s 1s forwards",
        runningTime: "runningTime 5s linear forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
