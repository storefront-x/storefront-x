import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'

export default {
  content: ['./modules/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [forms],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
      },
    },
  },
}
