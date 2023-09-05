import { expect, test } from '@playwright/test'
import { buildProject, wrapConsole } from '@storefront-x/testing'

test('renders error page in production', async ({ page }) => {
  await buildProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>rendered</h1>
                </template>
                <script setup lang="ts">
                  throw new Error('Oops!')
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        await page.goto(url, { waitUntil: 'networkidle' })
        await expect(page.locator('h1')).toContainText('Something went wrong...')
      })
    },
  )
})

test('renders async error page in production', async ({ page }) => {
  await buildProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>{{ data }}</h1>
                </template>
                <script setup lang="ts">
                  import useResource from '#ioc/composables/useResource'
                  const [data] = await useResource(async () => {
                    throw new Error('Oops!')
                  })
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await wrapConsole(async () => {
        await page.goto(url, { waitUntil: 'networkidle' })
        await expect(page.locator('h1')).toContainText('Something went wrong...')
      })
    },
  )
})
