import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('config can be used from Vue components', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            config: {
              'GREET.ts': `export default 'Hello, World!'`,
            },
            base: {
              templates: {
                'App.vue': `
                  <template>
                    <h1>{{ GREET }}</h1>
                  </template>
                  <script setup lang="ts">
                  import GREET from '#ioc/config/GREET'
                  </script>
                `,
              },
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

test('config can be used from server middleware', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            config: {
              'GREET.ts': `export default 'Hello, World!'`,
            },
            server: {
              middleware: {
                'hello.ts': `
                import { eventHandler } from 'h3'
                import GREET from '#ioc/config/GREET'
                export default eventHandler(() => GREET)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, World!')
    },
  )
})
