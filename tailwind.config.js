/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          50: "#EEF2FF",
          100: "#E0E7FF",
          500: "#4F46E5",
          600: "#4338CA",
        },
        secondary: {
          DEFAULT: "#0EA5E9",
        },
        accent: {
          DEFAULT: "#F97316",
        },
      },
    },
  },
  plugins: [],
};
