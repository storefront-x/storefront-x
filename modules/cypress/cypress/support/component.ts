import { mount } from 'cypress/vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import '~/cypress/support/commands'

Cypress.Commands.add('mount', (component: any, options = {}) => {
  options.global = options.global || {}
  options.global.stubs = options.global.stubs || {}
  options.global.stubs['transition'] = false
  options.global.components = options.global.components || {}
  options.global.plugins = options.global.plugins || []

  /* Add any global plugins */
  options.global.plugins.push({
    install(app: any) {
      const i18n = createI18n({
        locale: 'en-US',
      })

      const pinia = createPinia()

      app.use(i18n).use(pinia)
    },
  })

  return mount(component, options)
})
