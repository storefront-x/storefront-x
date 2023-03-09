import { resolve } from 'node:path'
import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    viewportWidth: 1280,
    viewportHeight: 768,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
    },
    scrollBehavior: 'center',
    chromeWebSecurity: false,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor(resolve(process.cwd(), 'viteCypress.config.js')))
    },
  },

  component: {
    specPattern: 'cypress/component/**/*.cy.js',
    devServer: {
      bundler: 'vite',
      framework: 'vue',
    },
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor(resolve(process.cwd(), 'vite.config.js')))
    },
  },
})
