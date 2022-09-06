import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('config can be used from Vue components', async ({ page }) => {
  await makeProject(
    {
      files: {
        '.env': 'SFX_GREET=Hello, Dotenv!',
      },
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            config: {
              'GREET.ts': `export default import.meta.env.SFX_GREET`,
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
      await expect(page.locator('h1')).toContainText('Hello, Dotenv!')
    },
  )
})
