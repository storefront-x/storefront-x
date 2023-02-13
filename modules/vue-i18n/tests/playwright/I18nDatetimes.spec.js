import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('date is displayed', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-i18n',
        [
          'my-module',
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
            },
            i18n: {
              datetimes: {
                'cs-CZ.js': `
                export default {
                  default: {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  },
                  short: {
                    month: 'short',
                    day: 'numeric',
                  },
                }
                `,
              },
            },
            pages: {
              'cart.vue': `
                <template>
                  <h1>{{ d(new Date('April 30, 1945')) }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { d } = useI18n()
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/cart', { waitUntil: 'networkidle' })

      await expect(page.locator('h1')).toContainText('30. dubna 1945')

      await page.goto(url + '/cart', { waitUntil: 'networkidle' })

      await expect(page.locator('h1')).not.toContainText('30. dubna 1945')
    },
  )
})

test('date is working with null', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-i18n',
        [
          'my-module',
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
            },
            i18n: {
              datetimes: {
                'cs-CZ.js': `
                export default {
                  default: {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  },
                  short: {
                    month: 'short',
                    day: 'numeric',
                  },
                }
                `,
              },
            },
            pages: {
              'cart.vue': `
                <template>
                  <h1>a{{ d(null) }}b</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { d } = useI18n()
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/cart', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('ab')
    },
  )
})
