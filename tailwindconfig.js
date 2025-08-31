/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2C3E50',      // Soft Navy Blue
        'secondary': '#2ECCB0',    // Mint Green
        'alert': '#F39C12',       // Light Orange
        'accent-gold': '#F1C40F',  // Soft Gold
        'accent-blue': '#5DADE2',  // Sky Blue
        'background': '#F8F9F9',   // Off White
        'text-dark': '#34495E',    // Dark Gray
      }
    },
  },
  plugins: [],
}