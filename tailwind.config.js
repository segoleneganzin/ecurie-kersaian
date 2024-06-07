/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'principal-color': '#353130',
        'secondary-color': '#634D4C',
        white: '#FEFDFD',
        grey: '#7A7577',
      },
      fontFamily: {
        inconsolata: ['Inconsolata', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-out forwards',
      },
    },
    letterSpacing: {
      widest: '.25em',
    },
    screens: {
      mobile: '370px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
