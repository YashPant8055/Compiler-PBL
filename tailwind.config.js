import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      colors: {
        tokenKeyword: "#7f5af0",
        tokenIdentifier: "#2cb67d",
        tokenError: "#ff6b6b",
        surface: "#1a1a1d",
        text: "#ffffff",
        muted: "#ffffff",
        primary: "var(--color-primary)",
        background: "var(--color-background)",
      },
    },
  },
  plugins: [],
};
