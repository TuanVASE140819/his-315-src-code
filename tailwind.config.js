/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        blink: 'blink 0.75s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { color: '#fbbf24' },
          '50%': { color: '#f59e0b' },
        },
      },
    },
  },
  plugins: [],
}
