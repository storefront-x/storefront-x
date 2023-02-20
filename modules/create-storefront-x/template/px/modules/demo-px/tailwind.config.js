import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'
import { generateTailwindContent } from '@storefront-x/theme-tailwind'

const content = await generateTailwindContent()

export default {
  content,
  plugins: [forms],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
      },
    },
  },
}
