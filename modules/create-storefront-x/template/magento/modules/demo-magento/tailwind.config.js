import forms from '@tailwindcss/forms'

export default {
  content: [
    './node_modules/@storefront-x/theme-tailwind/**/*.vue',
    './node_modules/@storefront-x/theme-tailwind-magento/**/*.vue',
    './modules/demo-magento/**/*.vue',
  ],
  plugins: [
    forms,
    function ({ addComponents }) {
      addComponents({
        '.container': {
          '@screen lg': {
            maxWidth: '1280px',
          },
          '@screen xl': {
            maxWidth: '1450px',
          },
          '@screen 2xl': {
            maxWidth: '1920px',
          },
        },
      })
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#000000',
          550: '#1a1b1e',
          650: '#383838',
          750: '#6b6b6b',
        },
        secondary: {
          500: '#d33d01',
        },
        yellow: {
          550: '#b89e60',
        },
        grey: {
          550: '#f4f4f4',
        },
      },
    },
  },
}
