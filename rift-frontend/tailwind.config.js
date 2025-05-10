/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/styles/index.css",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            black: "#000000",
            white: "#FFFFFF",
            gray: {
              dark: "#4B4B4B",
              light: "#D1D1D1",
            },
            gold: "#D4AF37", // Versace-inspired accent
          },
        },
        fontFamily: {
          heading: ["Playfair Display", "serif"],
          body: ["Inter", "sans-serif"],
        },
      },
    },
    plugins: [],
  };