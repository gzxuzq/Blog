/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dashboard-bg': '#0b1221',
        'dashboard-panel': '#111b2f',
        'dashboard-accent': '#3dd9c6',
        'dashboard-accent-strong': '#25a6ff',
      },
    },
  },
  plugins: [],
}

