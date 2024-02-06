/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import withMT from '@material-tailwind/react/utils/withMT';
export default withMT({
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
    screens: {
      mobile: '370px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
});
