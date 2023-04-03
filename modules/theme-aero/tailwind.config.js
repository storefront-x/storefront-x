import forms from '@tailwindcss/forms'

export default {
  content: [
    './node_modules/@storefront-x/theme-tailwind/**/*.vue',
    './node_modules/@storefront-x/theme-tailwind-magento/**/*.vue',
    './modules/theme-aero/**/*.vue',
  ],
  plugins: [forms],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1B5673',
          555: '#008fd1',
          565: '#001f2e',
          575: '#003147',
          585: '#001925',
          600: '#1B5673',
          700: '#1B5673',
        },
        grey: {
          555: '#F2F6F7',
          565: '#e5e5e5',
          575: '#e5e9e9',
          585: '#ccd2d5',
          595: '#b2b2b2',
        },
      },
    },
  },
}
