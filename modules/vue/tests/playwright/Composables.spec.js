import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('import of composables via ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            composables: {
              'useGreet.ts': `
                import { ref } from 'vue'

                export default () => ref('Hello, World!')
              `,
            },
            pages: {
              'index.vue': `
                <template>
                  <h1>{{ val }}</h1>
                </template>
                <script setup lang="ts">
                import useGreet from '#ioc/composables/useGreet'

                const val = useGreet()
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
