/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      primary: "#6366F1",
      accent: "#22D3EE",
      dark: "#0B0F19",
     },
    },
  },
  plugins: [],
}

