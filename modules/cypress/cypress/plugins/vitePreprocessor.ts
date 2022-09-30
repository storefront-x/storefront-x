import vitePreprocessor from 'cypress-vite'
import path from 'node:path'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (on: any, config: any) => {
  on('file:preprocessor', vitePreprocessor(path.resolve(process.cwd(), 'viteCypress.config.js')))
}
