import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('import of composables via ioc', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
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
