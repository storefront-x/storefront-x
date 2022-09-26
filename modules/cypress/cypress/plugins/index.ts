/// <reference types="cypress" />

import vitePreprocessor from 'cypress-vite'
import path from 'node:path'

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: any, config: any) => {
  on('file:preprocessor', vitePreprocessor(path.resolve(process.cwd(), 'viteCypress.config.js')))
  for (const [key, value] of Object.entries(process.env)) {
    config.env[key] = value
  }

  return config
}
