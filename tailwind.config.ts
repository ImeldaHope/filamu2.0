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
        primary: "#EB5A3C",
        secondary: "#DF9755",
        accent: "#E7D283",
        informational: "#EDF4C2",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        "10xl": "10rem", 
        "11xl": "12rem", 
        "12xl": "14rem", 
      },
      keyframes: {
        showContent: {
          "0%": {
            transform: "translateY(50px)",
            filter: "blur(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            filter: "blur(0)",
            opacity: "1",
          },
        },
        showImage: {
          "0%": {
            bottom: "50px",
            left: "50%",
            width: "150px",
            height: "220px",
          },
          "100%": {
            bottom: "0",
            left: "0",
            width: "100%",
            height: "100%",
            borderRadius: "0",
          },
        },
        showThumbnail: {
          "0%": { width: "0", opacity: "0" },
          "100%": { width: "100%", opacity: "1" },
        },
        effectNext: {
          "0%": { transform: "translateX(150px)" },
          "100%": { transform: "translateX(0)" },
        },
        runningTime: {
          "0%": { width: "100%" },
          "100%": { width: "0" },
        },
        contentOut: {
          "100%": {
            transform: "translateY(-150px)",
            filter: "blur(20px)",
            opacity: "0",
          },
        },
      },
      animation: {
        showContent: "showContent 0.5s 1s forwards",
        showImage: "showImage 0.5s forwards",
        showThumbnail: "showThumbnail 0.5s forwards",
        effectNext: "effectNext 0.5s forwards",
        runningTime: "runningTime 3s forwards",
        contentOut: "contentOut 1.5s forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
