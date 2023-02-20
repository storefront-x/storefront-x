import { argv } from 'node:process'

export async function generateTailwindContent() {
  const configIndex = argv.findIndex((arg) => arg === '--config')
  const runningConfig = configIndex !== -1 ? argv[configIndex + 1] : 'storefront-x.config.js'
  try {
    const configFile = await import(`${process.cwd()}/${runningConfig}`)
    const modules = Object.values(configFile)?.flatMap(({ modules }) =>
      modules?.map((module) => `./node_modules/${module}/**/*.vue`),
    )

    return modules || []
  } catch (e) {
    console.error(e)
    return []
  }
}
