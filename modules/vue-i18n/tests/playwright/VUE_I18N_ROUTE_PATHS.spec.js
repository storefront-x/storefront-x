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
      await page.goto(url + '/cz/kosik', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('<h1>Hello, Košíku!</h1>')
    },
  )
})

test('change of locale', async ({ page }) => {
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
                  <a :href="switchLocalePath('cz').fullPath">click</a>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'
                import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

                const switchLocalePath = useSwitchLocalePath()
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
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('Hello, Košíku!')
    },
  )
})

test('change of page', async ({ page }) => {
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
              'index.vue': `
              <template>
                <RouterLink :to="localePath('cart')">click</RouterLink>
              </template>
              <script setup>
              import useLocalePath from '#ioc/composables/useLocalePath'

              const localePath = useLocalePath()
              </script>
              `,
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
      await page.goto(url + '/cz', { waitUntil: 'networkidle' })
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('Hello, Košíku!')
    },
  )
})
