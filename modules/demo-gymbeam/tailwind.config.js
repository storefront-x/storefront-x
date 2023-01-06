import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'

export default {
  content: [
    './node_modules/@storefront-x/theme-tailwind/**/*.vue',
    './node_modules/@storefront-x/theme-tailwind-gymbeam/**/*.vue',
    './node_modules/@storefront-x/demo-gymbeam/**/*.vue',
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
