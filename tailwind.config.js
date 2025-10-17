/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'philosopher': ['"Philosopher"', 'serif'],
        'inter': ['"Inter"', 'sans-serif'],
        'noto': ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        devotional: {
          gold: '#f59e0b',
          cream: '#fef3c7',
          temple: '#ff9933',
        },
      },
    },
  },
  plugins: [],
}
