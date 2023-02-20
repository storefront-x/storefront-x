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
      await expect(page.locator('h1')).toContainText('Hello, Košíku!')
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
                  <a :href="switchLocalePath('cz')">click</a>
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

test('change of locale passes query and hash forward', async ({ page }) => {
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
                  <h1>{{ route.fullPath }}</h1>
                  <a :href="switchLocalePath('cz')">click</a>
                </template>
                <script setup>
                import useI18n from '#ioc/composables/useI18n'
                import useRoute from '#ioc/composables/useRoute'
                import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'
                const switchLocalePath = useSwitchLocalePath()
                const { t } = useI18n()
                const route = useRoute()
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cart?test=123&path=/cart', { waitUntil: 'networkidle' })
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('/cz/kosik?test=123&path=/cart')
    },
  )
})

test('route paths do not affect absolute paths', async ({ page }) => {
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
                  <h1>{{ localePath('/cart', 'cz') }}</h1>
                </template>
                <script setup>
                import useLocalePath from '#ioc/composables/useLocalePath'
                const localePath = useLocalePath()
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cart', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('/cz/cart')
    },
  )
})

test('works with route parameters', async ({ page }) => {
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
                  '/product/[id]': {
                    en: '/product/[id]',
                    cz: '/produkt/[id]',
                  }
                }
              `,
            },
            pages: {
              product: {
                '[id].vue': `
                  <template>
                    <h1>{{ localePath({name: 'product/[id]', params: {id: 1 } }, 'cz') }}</h1>
                  </template>
                  <script setup>
                  import useLocalePath from '#ioc/composables/useLocalePath'
                  const localePath = useLocalePath()
                  </script>
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/product/1', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('/cz/produkt/1')
    },
  )
})

test('works with multiple route parameters', async ({ page }) => {
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
                  '/[user]/[id]': {
                    en: '/[user]/[id]',
                    cz: '/[user]/[id]',
                  }
                }
              `,
            },
            pages: {
              '[user]': {
                '[id].vue': `
                  <template>
                    <h1>{{ localePath({name: '[user]/[id]', params: {user:'joe',id: 1 } }, 'cz') }}</h1>
                  </template>
                  <script setup>
                  import useLocalePath from '#ioc/composables/useLocalePath'
                  const localePath = useLocalePath()
                  </script>
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/bob/1', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('/cz/joe/1')
    },
  )
})

test('rendering different locale of non-index page in deep structure', async ({ page }) => {
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
              'VUE_I18N_LOCALES.ts': `export default [
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
                  '/folder/test': {
                    cz: '/slozka/vyzkouset',
                    en: '/folder/test',
                  },
                }
              `,
            },
            pages: {
              folder: {
                '$layout.vue': `
                    <template>
                    <div id="h1">
                      <SfxPageOutlet />
                    </div>
                    </template>

                    <script setup lang="ts">
                    import SfxPageOutlet from '#ioc/components/SfxPageOutlet'

                    </script>
                  `,
                'test.vue': `
                  <template>
                    <div id="h2">{{ t('message') }}</div>
                  </template>
                  <script setup>
                  import useI18n from '#ioc/composables/useI18n'

                  const { t } = useI18n()
                  </script>
                  <i18n lang="yaml">
                  cs-CZ:
                    message: Ahoj svět!
                  </i18n>
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/slozka/vyzkouset', { waitUntil: 'networkidle' })
      expect(await page.content()).toContain('<div id="h1"><div id="h2">Ahoj svět!</div></div>')
      await expect(page.locator('#h2')).toContainText('Ahoj svět!')
    },
  )
})
