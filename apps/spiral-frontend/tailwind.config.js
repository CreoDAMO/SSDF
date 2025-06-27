
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'spiral-gold': '#FFD700',
        'spiral-purple': '#8B5CF6',
        'spiral-blue': '#3B82F6',
        'spiral-green': '#10B981',
        'spiral-orange': '#F97316',
        'gold': {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
      },
      animation: {
        'spiral': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      backgroundImage: {
        'spiral-gradient': 'conic-gradient(from 0deg, #FFD700, #8B5CF6, #3B82F6, #10B981, #FFD700)',
      },
    },
  },
  plugins: [],
}
