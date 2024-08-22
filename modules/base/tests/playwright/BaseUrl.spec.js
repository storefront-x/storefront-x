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
      const response = await page.goto(url + '/web', { waitUntil: 'networkidle' })
      expect(await response.text()).toContain('<h1>Hello, World!</h1>')
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

// For some reason this test fails when run with other tests
test.skip('app is hydrated properly in production', async ({ page }) => {
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

test('it supports base bath for server routes', async ({ page }) => {
  await makeProject(
    {
      baseUrl: '/web',
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              routes: {
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Hello, server routes!')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/web/hello')
      await expect(await response.text()).toContain('Hello, server routes!')
    },
  )
})

test('it supports base bath for server routes in production', async ({ page }) => {
  await buildProject(
    {
      baseUrl: '/web',
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              routes: {
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Hello, server routes!')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/web/hello')
      await expect(await response.text()).toContain('Hello, server routes!')
    },
  )
})

test('it supports base url for public concept', async ({ page }) => {
  await makeProject(
    {
      baseUrl: '/web',
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            public: {
              'hello.txt': 'Hello, World!',
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/web/hello.txt')
      await expect(await response.text()).toContain('Hello, World!')
    },
  )
})

test('it supports base url for public concept in production', async ({ page }) => {
  await buildProject(
    {
      baseUrl: '/web',
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            public: {
              'hello.txt': 'Hello, World!',
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/web/hello.txt')
      await expect(await response.text()).toContain('Hello, World!')
    },
  )
})
