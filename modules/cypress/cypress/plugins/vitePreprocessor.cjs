/* eslint-disable @typescript-eslint/no-var-requires */
const vitePreprocessor = require('cypress-vite')
const path = require('node:path')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', vitePreprocessor(path.resolve(process.cwd(), 'viteCypress.config.js')))
}
