/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f4',
          100: '#e1f2e6',
          200: '#c5e5ce',
          300: '#99d2aa',
          400: '#67b780',
          500: '#3f9a5c',
          600: '#2e7c47',
          700: '#26633b',
          800: '#214e31',
          900: '#1c412a',
          950: '#0c2315',
        },
        earth: {
          50: '#fbf9f5',
          100: '#f5f1e8',
          200: '#ece3d2',
          300: '#dfcfb4',
          400: '#ceb692',
          500: '#be9e74',
          600: '#ad8761',
          700: '#8e6b4f',
          800: '#735743',
          900: '#5f4738',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
