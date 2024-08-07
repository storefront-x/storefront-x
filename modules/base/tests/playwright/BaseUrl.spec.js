import { test, expect } from '@playwright/test'
import { makeProject, buildProject } from '@storefront-x/testing'

test('it supports base bath', async ({ page }) => {
  await makeProject(
    {
      baseUrl: '/web',
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
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/web', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})

test('it supports base bath in production', async ({ page }) => {
  await buildProject(
    {
      baseUrl: '/web',
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
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/web', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})

test('app is hydrated properly', async ({ page }) => {
  await makeProject(
    {
      baseUrl: '/web',
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
                  <button @click="onClick">Click me!</button>
                </template>
                <script setup>
                import useRouter from '#ioc/composables/useRouter'
                const router = useRouter()
                const onClick = () => {
                  router.push('/test')
                }
                </script>
              `,
              'test.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/web', { waitUntil: 'networkidle' })
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})

test('app is hydrated properly in production', async ({ page }) => {
  await buildProject(
    {
      baseUrl: '/web',
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
                  <button @click="onClick">Click me!</button>
                </template>
                <script setup>
                import useRouter from '#ioc/composables/useRouter'
                const router = useRouter()
                const onClick = () => {
                  router.push('/test')
                }
                </script>
              `,
              'test.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/web', { waitUntil: 'networkidle' })
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})
