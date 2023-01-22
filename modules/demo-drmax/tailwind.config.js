import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'

export default {
  content: [
    './node_modules/@storefront-x/theme-tailwind/**/*.vue',
    './node_modules/@storefront-x/theme-tailwind-magento/**/*.vue',
    './node_modules/@storefront-x/demo-drmax/**/*.vue',
  ],
  plugins: [
    forms,
    function ({ addComponents }) {
      addComponents({
        '.container': {
          '@screen lg': {
            maxWidth: '1188px',
          },
        },
      })
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#4BAA28',
          100: '#4BAA28',
          200: '#4BAA28',
          300: '#4BAA28',
          400: '#4BAA28',
          500: '#4BAA28',
          600: '#4BAA28',
          700: '#4BAA28',
          800: '#4BAA28',
          900: '#4BAA28',
        },
        secondary: colors.white,
        blue: {
          555: '#3fb8ff',
          560: '#0078be',
          565: '#015d9a',
          570: '#e1ebf5',
          575: '#f1f5fa',
        },
        grey: {
          555: '#787878',
          560: '#dcdcdc',
          565: '#d6d6d6',
          570: '#fbfbfb',
        },
        green: {
          555: '#4baa28',
          560: '#3c911e',
          565: '#f1f7ef',
          570: '#d1e8d0',
          575: '#d2e8d0',
        },
        red: {
          555: '#af0023',
        },
      },
    },
  },
}
