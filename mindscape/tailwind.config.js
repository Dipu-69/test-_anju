/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  important: '#root',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f7ff',
          100: '#e2efff',
          200: '#bfdcff',
          300: '#94c2ff',
          400: '#69a3ff',
          500: '#3f7eff',
          600: '#2e5fe6',
          700: '#2549b3',
          800: '#1f3c8f',
          900: '#1c346f'
        },
        mint: { 500: '#33d6a6' },
        plum: { 500: '#7a5af8' },
        ink: { 900: '#0b1020', 800: '#0f172a' }
      },
      boxShadow: {
        glow: '0 10px 40px rgba(63,126,255,.35)'
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(1200px 600px at 80% -10%, #69a3ff20 0%, transparent 50%), radial-gradient(800px 400px at -10% 10%, #33d6a620 0%, transparent 50%), linear-gradient(180deg, #0b1020 0%, #0a0f1a 100%)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}