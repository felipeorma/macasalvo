/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FAF5EC',
        beige: {
          50: '#FDF9F2',
          100: '#FAF5EC',
          200: '#F5EDD6',
          300: '#EDE0C4',
          400: '#E0CC9E',
        },
        sand: {
          100: '#F0E6CC',
          200: '#E8D5B0',
          300: '#DEC49A',
          400: '#C9A87A',
          500: '#B89060',
        },
        terracotta: {
          100: '#EDD4C8',
          200: '#D9A898',
          300: '#C4714A',
          400: '#B05A36',
          500: '#8C4428',
        },
        clay: {
          100: '#E8D0C8',
          200: '#CCA898',
          300: '#B5614A',
          400: '#9A4A38',
          500: '#7A3428',
        },
        sage: {
          100: '#D8E4D0',
          200: '#BDD4B0',
          300: '#9CB88A',
          400: '#8A9E7A',
          500: '#6E8460',
          600: '#506048',
        },
        rose: {
          100: '#EDD8D4',
          200: '#D9B4AA',
          300: '#C4887A',
          400: '#AA6A5A',
          500: '#8C5040',
        },
        gold: {
          100: '#F0E4C8',
          200: '#E0CC9E',
          300: '#C9A84C',
          400: '#B08C30',
          500: '#8C6E1C',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out infinite 2s',
        'float-slow': 'float 14s ease-in-out infinite 4s',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-slower': 'spin 50s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
