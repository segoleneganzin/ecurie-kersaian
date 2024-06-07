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
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        openMenuMobile: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0px)' },
        },
        closeMenuMobile: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        openMenu: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0px)' },
        },
        closeMenu: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-out forwards',
        openMenuMobile: 'openMenuMobile 0.5s ease-out forwards',
        closeMenuMobile: 'closeMenuMobile 0.5s ease-in forwards',
        openMenu: 'openMenu 0.5s ease-out forwards',
        closeMenu: 'closeMenu 0.5s ease-in forwards',
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
