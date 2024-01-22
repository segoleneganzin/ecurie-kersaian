/** @type {import('tailwindcss').Config} */
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
        playfair: ['"Playfair"'],
        inconsolata: ['"Inconsolata"'],
      },
      backgroundImage: {
        'main-pattern': "url('./assets/wave-haikei.svg')",
      },
    },
    letterSpacing: {
      widest: '.25em',
    },
  },
  plugins: [],
};
