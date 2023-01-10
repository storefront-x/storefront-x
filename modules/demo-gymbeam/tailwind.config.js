import forms from '@tailwindcss/forms'

export default {
  content: [
    './node_modules/@storefront-x/theme-tailwind/**/*.vue',
    './node_modules/@storefront-x/theme-tailwind-gymbeam/**/*.vue',
    './node_modules/@storefront-x/demo-gymbeam/**/*.vue',
  ],
  plugins: [
    forms,
    function ({ addComponents }) {
      addComponents({
        '.container': {
          '@screen lg': {
            maxWidth: '960px',
          },
        },
      })
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          default: '#000000',
          300: '#333333',
          500: '#000000',
        },
        secondary: {
          default: '#f44100',
          500: '#f44100',
        },
        grey: {
          855: '#00000073',
          890: '#ececec',
          895: '#9e9e9e',
        },

        green: {
          855: '#8dc63f',
        },
      },
    },
  },
}
