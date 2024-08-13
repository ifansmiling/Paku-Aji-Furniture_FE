// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-brown": "#8B4513",
        "custom-hover": "#CD9D6D",
      },
    },
  },
  plugins: [],
};
