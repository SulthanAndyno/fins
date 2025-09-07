// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}", // << ini penting
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- TAMBAHKAN INI
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     fontFamily: {
        // Daftarkan 'mono' untuk kita panggil nanti
        mono: ['"Roboto Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}