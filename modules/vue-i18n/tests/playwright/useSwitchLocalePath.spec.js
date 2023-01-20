import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('switch locale path', async ({ page }) => {
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
            },
            pages: {
              'index.vue': `
                  <template>
                    <h1>{{ t('message') }}</h1>
                    <button id="switch" @click.prevent="change">click</button>
                  </template>
                  <script setup>
                  import useI18n from '#ioc/composables/useI18n'
                  import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

                  const { t } = useI18n()
                  const switchLocalePath = useSwitchLocalePath()

                  function change() {
                    window.location.href = switchLocalePath('cz')
                  }
                  </script>
                  <i18n lang="yaml">
                  en-US:
                    message: hello
                  cs-CZ:
                    message: ahoj
                  </i18n>
                `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('hello')
      await page.locator('#switch').click()
      await expect(page.locator('h1')).toContainText('ahoj')
    },
  )
})

test('switch locale to nested page', async ({ page }) => {
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
            },
            pages: {
              a: {
                b: {
                  'test.vue': `
                    <template>
                      <h1>{{ t('message') }}</h1>
                      <button id="switch" @click.prevent="change">click</button>
                    </template>
                    <script setup>
                    import useI18n from '#ioc/composables/useI18n'
                    import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

                    const { t } = useI18n()
                    const switchLocalePath = useSwitchLocalePath()

                    function change() {
                      window.location.href = switchLocalePath('cz')
                    }
                    </script>
                    <i18n lang="yaml">
                    en-US:
                      message: hello
                    cs-CZ:
                      message: ahoj
                    </i18n>
                  `,
                },
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a/b/test', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('hello')
      await page.locator('#switch').click()
      await expect(page.locator('h1')).toContainText('ahoj')
    },
  )
})

test('switch locale path to default language', async ({ page }) => {
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
            },
            pages: {
              'test.vue': `
                      <template>
                        <h1>{{ t('message') }}</h1>
                        <button id="switch" @click.prevent="change">click</button>
                      </template>
                      <script setup>
                      import useI18n from '#ioc/composables/useI18n'
                      import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

                      const { t } = useI18n()
                      const switchLocalePath = useSwitchLocalePath()

                      function change() {
                        window.location.href = switchLocalePath('en')
                      }
                      </script>
                      <i18n lang="yaml">
                      en-US:
                        message: hello
                      cs-CZ:
                        message: ahoj
                      </i18n>
                    `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/cz/test', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('ahoj')
      await page.locator('#switch').click()
      await expect(page.locator('h1')).toContainText('hello')
    },
  )
})

test('renders domain', async ({ page }) => {
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
                    domain: 'my-shop.en',
                  },
                  {
                    name: 'cz',
                    locale: 'cs-CZ',
                    prefix: '/',
                    domain: 'my-shop.cz',
                  },
                ]
                `,
            },
            pages: {
              'test.vue': `
                  <template>
                    <h1>{{ switchLocalePath('cz') }}</h1>
                  </template>
                  <script setup>
                  import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

                  const switchLocalePath = useSwitchLocalePath()
                  </script>
                `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/test', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('//my-shop.cz/test')
    },
  )
})

test('renders domain and prefix', async ({ page }) => {
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
                    domain: 'my-shop.en',
                  },
                  {
                    name: 'cz',
                    locale: 'cs-CZ',
                    prefix: '/cz',
                    domain: 'my-shop.cz',
                  },
                ]
                `,
            },
            pages: {
              'test.vue': `
                  <template>
                    <h1>{{ switchLocalePath('cz') }}</h1>
                  </template>
                  <script setup>
                  import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

                  const switchLocalePath = useSwitchLocalePath()
                  </script>
                `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/test', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('//my-shop.cz/cz/test')
    },
  )
})
