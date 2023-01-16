import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('import of components via ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            components: {
              'Hello.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <Hello />
                </template>
                <script setup lang="ts">
                import Hello from '#ioc/components/Hello'
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})

test('overriding of components via ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'app-1',
          {
            components: {
              'Hello.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <Hello />
                </template>
                <script setup lang="ts">
                import Hello from '#ioc/components/Hello'
                </script>
              `,
            },
          },
        ],
        [
          'app-2',
          {
            components: {
              'Hello.vue': `
                <template>
                  <h1>Overrided!</h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Overrided!')
    },
  )
})

test('HMR of components via ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            components: {
              'Hello.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <Hello />
                </template>
                <script setup lang="ts">
                import Hello from '#ioc/components/Hello'
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, World!')
      await writeFile('my-module/components/Hello.vue', '<template><h1>HMR</h1></template>')
      await expect(page.locator('h1')).toContainText('HMR')
    },
  )
})
