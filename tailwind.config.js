/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1a1a1a',
          primary: '#2a2a2a',
          secondary: '#3a3a3a',
          accent: '#4a4a4a',
          text: '#e0e0e0',
          textSecondary: '#a0a0a0',
          border: '#404040',
        }
      }
    },
  },
  plugins: [],
}