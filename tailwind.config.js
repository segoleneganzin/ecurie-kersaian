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
