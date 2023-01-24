import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('locale path with string param', async ({ page }) => {
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
              ]
              `,
            },
            pages: {
              'a.vue': `
                  <template>
                    <h1>a</h1>
                    <button id="switch" @click.prevent="change">click</button>
                  </template>
                  <script setup>
                  import useRouter from '#ioc/composables/useRouter'
                  import useLocalePath from '#ioc/composables/useLocalePath'

                  const router = useRouter()
                  const localePath = useLocalePath()

                  function change() {
                    router.push(localePath('b'))
                  }
                  </script>
                `,
              'b.vue': `
                  <template>
                    <h1>b</h1>
                  </template>
                `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('a')
      await page.locator('#switch').click()
      await expect(page.locator('h1')).toContainText('b')
    },
  )
})

test('locale path with object param', async ({ page }) => {
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
              ]
              `,
            },
            pages: {
              'a.vue': `
                  <template>
                    <h1>a</h1>
                    <button id="switch" @click.prevent="change">click</button>
                  </template>
                  <script setup>
                  import useRouter from '#ioc/composables/useRouter'
                  import useLocalePath from '#ioc/composables/useLocalePath'

                  const router = useRouter()
                  const localePath = useLocalePath()

                  function change() {
                    router.push(localePath({ name: 'b' }))
                  }
                  </script>
                `,
              'b.vue': `
                  <template>
                    <h1>b</h1>
                  </template>
                `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('a')
      await page.locator('#switch').click()
      await expect(page.locator('h1')).toContainText('b')
    },
  )
})

test('does not render domain of current locale', async ({ page }) => {
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
              ]
              `,
            },
            pages: {
              'a.vue': `
                <template>
                  <h1>{{ localePath({ name: 'a' }) }}</h1>
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
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('/a')
    },
  )
})

test('renders prefix but not domain of current locale', async ({ page }) => {
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
                  prefix: '/en',
                  domain: 'my-shop.en',
                },
              ]
              `,
            },
            pages: {
              'a.vue': `
                <template>
                  <h1>{{ localePath({ name: 'a' }) }}</h1>
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
      await page.goto(url + '/en/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('/en/a')
    },
  )
})

test('renders domain of different store', async ({ page }) => {
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
              'a.vue': `
                <template>
                  <h1>{{ localePath({ name: 'a' }, 'cz') }}</h1>
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
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('//my-shop.cz/a')
    },
  )
})

test('renders prefix and domain of different store', async ({ page }) => {
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
              'a.vue': `
                <template>
                  <h1>{{ localePath({ name: 'a' }, 'cz') }}</h1>
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
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('//my-shop.cz/cz/a')
    },
  )
})
