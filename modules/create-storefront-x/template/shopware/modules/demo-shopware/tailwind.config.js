import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'

export default {
  content: [
    './node_modules/@storefront-x/theme-tailwind/**/*.vue',
    './node_modules/@storefront-x/theme-tailwind-shopware/**/*.vue',
    './modules/demo-shopware/**/*.vue',
  ],
  plugins: [forms],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
      },
    },
  },
}
