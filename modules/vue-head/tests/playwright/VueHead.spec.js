import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('server-side rendering of title', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-head',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Heading</h1>
                </template>
                <script setup>
                import useHead from '#ioc/composables/useHead'

                useHead({
                  title: 'Homepage',
                })
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      expect(await expect(page).toHaveTitle('Homepage'))
    },
  )
})

test('title changes between pages', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-head',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Heading</h1>
                  <RouterLink to="/test">Link</RouterLink>
                </template>
                <script setup>
                import useHead from '#ioc/composables/useHead'

                useHead({
                  title: 'Homepage',
                })
                </script>
              `,
              'test.vue': `
                <template>
                  <h1>Heading</h1>
                </template>
                <script setup>
                import useHead from '#ioc/composables/useHead'

                useHead({
                  title: 'Test',
                })
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      expect(await expect(page).toHaveTitle('Homepage'))
      await page.locator('a').click()
      expect(await expect(page).toHaveTitle('Test'))
    },
  )
})

test('html attributes', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-head',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Heading</h1>
                </template>
                <script setup>
                import useHead from '#ioc/composables/useHead'

                useHead({
                  htmlAttrs: {
                    'lang': 'en-US',
                  },
                })
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toMatch(/<html.*?lang="en-US".*?>/)
    },
  )
})

test('body attributes', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-head',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Heading</h1>
                </template>
                <script setup>
                import useHead from '#ioc/composables/useHead'

                useHead({
                  bodyAttrs: {
                    bgcolor: 'red',
                  },
                })
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toMatch(/<body.*?bgcolor="red".*?>/)
    },
  )
})
