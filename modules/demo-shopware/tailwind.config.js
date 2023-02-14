import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'
import { readdir } from 'node:fs/promises'
import { argv } from 'node:process'

const getTailwindContent = async (source) => {
  const runningConfig = argv.find((arg) => arg.startsWith('storefront-x'))?.split('.')[1] || ''
  const dir = (await readdir(source, { withFileTypes: true })) || []
  return dir
    .filter((dirent) => dirent.name.match(/^(theme-tailwind|demo)/))
    .filter((dirent) =>
      runningConfig === 'px'
        ? dirent.name === 'theme-tailwind' ||
          dirent.name === 'theme-tailwind-magento' ||
          dirent.name === `demo-${runningConfig}` ||
          dirent.name.endsWith(runningConfig)
        : dirent.name === 'theme-tailwind' ||
          dirent.name === `demo-${runningConfig}` ||
          dirent.name.endsWith(runningConfig),
    )
    .sort((a, b) => (a.name.includes('theme') && !b.name.includes('theme-') ? -1 : 1))
    .map((dirent) => `${source}${dirent.name}/**/*.vue`)
}

const content = await getTailwindContent('./node_modules/@storefront-x/')

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
