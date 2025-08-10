/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f1a",
        surface: "#111827",
        neon1: "#9b5de5",
        neon2: "#f15bb5",
        neon3: "#fee440",
        neon4: "#00bbf9",
        neon5: "#00f5d4",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0,245,212,0.35), 0 0 40px rgba(155,93,229,0.25)",
      },
    },
  },
  plugins: [],
}
