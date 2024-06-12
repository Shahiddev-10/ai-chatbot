const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
//const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      serif: ['serif'],
      heading: [
        'var(--font-family-heading)',
        'Inter',
        'SF Pro Text',
        'system-ui',
      ],
      sans: ['var(--font-family-sans)'],
      monospace: [`SF Mono`, `ui-monospace`, `Monaco`, 'Monospace'],
      Outfit: ['Outfit'],
      Mulish: ['Mulish'],
    },
    extend: {
      colors: {
        primary: {
          50: '#f0f5fe',
          100: '#dde9fc',
          200: '#c2d9fb',
          300: '#98c1f8',
          400: '#68a1f2',
          500: '#467fed',
          600: '#2f60e1',
          700: '#264ccf',
          800: '#253fa8',
          900: '#233985',
          950: '#1a2551',
          contrast: '#fff',
        },
        black: {
          50: '#525252',
          100: '#424242',
          200: '#363636',
          300: '#282828',
          400: '#222',
          500: '#141414',
          600: '#0a0a0a',
          700: '#000',
          36: '#242424',
          10: '#101010',
        },
        logocolor: {
          100: '#2056BE',
          200: '#467FED',
        },
        btncolor: {
          0: '#FA9D00',
        },
        gray_text: {
          0: '#BDCADE',
          1: ' #B1B1B1',
          2: ' rgba(177, 177, 177, 0.6)',
          3: '#D1D5DB',
        },
        tulip: {
          0: '#2056BE',
          1: '#467FED',
        },
        dark_blue: {
          0: '#000D21',
          1: 'rgb(9, 33, 69)',
          2: 'rgba(38, 50, 68, 0.3)',
        },
        gray_bg: {
          0: 'rgba(189, 202, 222, 0.4)',
          1: 'rgba(189, 202, 222, 0.2)',
          2: 'rgba(49, 104, 190, 0.7)',
        },
      },
      fontSize: {
        '7xl': '45px',
        '22xl': '22px',
        '100xl': '100%',
      },
      backgroundImage: {
        'pack-train': "url('/assets/images/right.png')",
        'bottom-img': "url('/assets/images/bg-bottom.png')",
        'bottom-img-1': "url('/assets/images/bg-bottom-1.png')",
        tulip:
          'linear-gradient(114.99deg, rgb(32, 86, 190) 28.1%, rgb(70, 127, 237) 157.77%)',
      },
      spacing: {
        '579': '579px',
      },
      blur: {
        c_1: '112px',
      },
      screens: {
        sm: '320px',
      },
      flex: {
        '50': '50%',
        '10': '1',
        '100': '100%',
      },
      boxShadow: {
        '3xl': '0px 4px 20px rgba(11, 33, 75, 0.5)',
        'btn-shadow': '0px 10px 40px rgba(250, 157, 0, 0.15)',
        'field-shadow': ' 0px 6px 16px rgba(54, 133, 255, 0.1)',
      },
      screens: {
        '1xs': '320px',
        '3xl': '1441px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.chatbot-scrollbar::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
          'background-color': '#242424',
        },
        '.chatbot-scrollbar::-webkit-scrollbar': {
          width: '5px',
          'background-color': '#242424',
        },
        '.chatbot-scrollbar::-webkit-scrollbar-thumb': {
          'background-color': '#467FED',
        },
      });
    }),
  ],
};
