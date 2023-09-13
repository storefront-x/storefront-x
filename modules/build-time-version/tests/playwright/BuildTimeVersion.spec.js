import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('exports as config to ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/build-time-version',
        [
          'my-module',
          {
            base: {
              templates: {
                'App.vue': `
                  <template>
                    <h1>{{ BUILD_TIME_VERSION }}</h1>
                  </template>
                  <script setup lang="ts">
                  import BUILD_TIME_VERSION from '#ioc/config/BUILD_TIME_VERSION'
                  </script>
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      // We remove the seconds from the date because the build version will be slightly different
      const currentDate = new Date().toISOString().substring(0, 16)

      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText(currentDate)
    },
  )
})
