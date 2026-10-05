/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mota: {
          navy: "#0B2545",
          "navy-dark": "#061528",
          "navy-light": "#133E75",
          green: "#1B6B4A",
          "green-light": "#2E7D32",
          teal: "#0E8A8A",
          amber: "#D98A00",
          "amber-light": "#FDF6E2",
          red: "#C62828",
          "warm-white": "#FAF8F4",
          slate: "#5B6B7A",
        },
      },
    },
  },
  plugins: [],
};
