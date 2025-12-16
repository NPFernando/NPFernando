/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 12px 35px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: []
};
