/// <reference types="cypress" />

import vitePreprocessor from 'cypress-vite'
import * as dotenv from 'dotenv'
import path from 'node:path'
dotenv.config()

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: any, config: any) => {
  on('file:preprocessor', vitePreprocessor(path.resolve(__dirname, '..', '..', './viteCypress.config.js')))
  for (const [key, value] of Object.entries(process.env)) {
    config.env[key] = value
  }

  return config
}
