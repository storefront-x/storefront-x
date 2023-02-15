import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'
import { readFile } from 'node:fs/promises'
import { argv } from 'node:process'

const getTailwindContent = async (source) => {
  const configIndex = argv.findIndex((arg) => arg === '--config')
  const runningConfig = configIndex !== -1 ? argv[configIndex + 1] : 'storefront-x.config.js'
  try {
    const configFile = await readFile(`./${runningConfig}`, { encoding: 'utf8' })
    const modules = configFile
      ?.replace(/^export default\s*|\s/g, '')
      ?.replaceAll(`'`, '')
      ?.split('modules:[')[1]
      ?.split(']')[0]
      ?.split(',')
      ?.filter(Boolean)
      ?.map((module) => `${source}${module}/**/*.vue`)

    return modules || []
  } catch (e) {
    return []
  }
}

const content = await getTailwindContent('./node_modules/')

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
