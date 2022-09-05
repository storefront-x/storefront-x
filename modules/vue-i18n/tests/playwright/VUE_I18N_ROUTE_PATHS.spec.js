import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('route paths', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-i18n',
        [
          'app',
          {
            config: {
              'VUE_I18N_LOCALES.ts': `
                export default [
                  {
                    name: 'en',
                    locale: 'en-US',
                    prefix: '/',
                  },
                  {
                    name: 'cz',
                    locale: 'cs-CZ',
                    prefix: '/cz',
                  },
                ]
              `,
              'VUE_I18N_ROUTE_PATHS.ts': `
                export default {
                  '/cart': {
                    en: '/cart',
                    cz: '/kosik',
                  }
                }
              `,
            },
            pages: {
              'cart.vue': `
                <template>
                  <h1>{{ t('message') }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
                <i18n lang="yaml">
                en-US:
                  message: Hello, Cart!
                cs-CZ:
                  message: Hello, Košíku!
                </i18n>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cart', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('<h1>Hello, Cart!</h1>')
      await page.goto(url + '/cz/kosik', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('<h1>Hello, Košíku!</h1>')
    },
  )
})
