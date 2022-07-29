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
          'app',
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
                    <a href="#" @click.prevent="change">click</a>
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
      await page.locator('a').click()
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
          'app',
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
                    <a href="#" @click.prevent="change">click</a>
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
      await page.locator('a').click()
      await expect(page.locator('h1')).toContainText('b')
    },
  )
})
