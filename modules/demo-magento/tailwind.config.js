import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './node_modules/@storefront-x/theme-tailwind/**/*.vue',
    './node_modules/@storefront-x/theme-tailwind-magento/**/*.vue',
    './node_modules/@storefront-x/demo-magento/**/*.vue',
  ],
  plugins: [forms, typography],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
      },
    },
  },
}
