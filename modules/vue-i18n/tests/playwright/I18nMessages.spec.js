import { test, expect } from '@playwright/test'
import { buildProject, makeProject } from '@storefront-x/testing'

test('global messages', async ({ page }) => {
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
              messages: {
                'cs-CZ.json': `
                  {
                    "message1": "A",
                    "message2": "B"
                  }
                `,
              },
            },
            pages: {
              'cart.vue': `
                <template>
                  <h1>{{ t('message1') + t('message2') }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/cart', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('AB')
    },
  )
})

test('merging of global messages', async ({ page }) => {
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
            pages: {
              'cart.vue': `
                <template>
                  <h1>{{ t('message1') + t('message2') }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
              `,
            },
          },
        ],
        [
          'translations-1',
          {
            i18n: {
              messages: {
                'cs-CZ.json': `
                  {
                    "message1": "A"
                  }
                `,
              },
            },
          },
        ],
        [
          'translations-2',
          {
            i18n: {
              messages: {
                'cs-CZ.json': `
                  {
                    "message2": "B"
                  }
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/cart', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('AB')
    },
  )
})

test('overriding of global messages', async ({ page }) => {
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
            pages: {
              'cart.vue': `
                <template>
                  <h1>{{ t('message1') + t('message2') }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
              `,
            },
          },
        ],
        [
          'translations-1',
          {
            i18n: {
              messages: {
                'cs-CZ.json': `
                  {
                    "message1": "A",
                    "message2": "B"
                  }
                `,
              },
            },
          },
        ],
        [
          'translations-2',
          {
            i18n: {
              messages: {
                'cs-CZ.json': `
                  {
                    "message1": "C"
                  }
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/cart', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('CB')
    },
  )
})

test('global messages interpolation', async ({ page }) => {
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
              messages: {
                'cs-CZ.json': `
                  {
                    "message": "test {0}"
                  }
                `,
              },
            },
            pages: {
              'cart.vue': `
                <template>
                  <h1>{{ t('message', ['success']) }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/cart', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('test success')
    },
  )
})

test('global messages interpolation in production', async ({ page }) => {
  await buildProject(
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
              messages: {
                'cs-CZ.json': `
                  {
                    "message": "test {0}"
                  }
                `,
              },
            },
            pages: {
              'cart.vue': `
                <template>
                  <h1>{{ t('message', ['success']) }}</h1>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'

                const { t } = useI18n()
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/cart', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('test success')
    },
  )
})
