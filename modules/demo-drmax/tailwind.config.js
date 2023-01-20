import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'

export default {
  content: [
    './node_modules/@storefront-x/theme-tailwind/**/*.vue',
    './node_modules/@storefront-x/theme-tailwind-magento/**/*.vue',
    './node_modules/@storefront-x/demo-magento/**/*.vue',
  ],
  plugins: [forms],
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
      },
    },
  },
}
