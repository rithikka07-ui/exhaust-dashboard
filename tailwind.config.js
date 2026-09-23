/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#070a10',
          900: '#0d121c',
          850: '#121824',
          800: '#172030',
          750: '#1d283c',
          700: '#25334c',
          600: '#344563',
          500: '#4d6288',
        },
        status: {
          green: '#10b981',
          yellow: '#f59e0b',
          red: '#ef4444',
          blue: '#0284c7',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'subtle-glow': '0 0 15px -3px rgba(16, 185, 129, 0.15)',
        'alert-glow': '0 0 15px -3px rgba(239, 68, 68, 0.2)',
        'industrial-card': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
