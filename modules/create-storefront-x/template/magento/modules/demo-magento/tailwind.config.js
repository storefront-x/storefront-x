import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'
import useGetTailwindContent from '@storefront-x/theme-tailwind'

const getTailwindContent = useGetTailwindContent()
const content = await getTailwindContent()

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
