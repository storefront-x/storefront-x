import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('ClientOnly component renders only on client side', async ({ page }) => {
  await makeProject(
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
                  <div>
                    <ClientOnly>
                      <h1>Rendered on client side</h1>
                    </ClientOnly>
                  </div>
                </template>

                <script setup lang="ts">
                  import ClientOnly from '#ioc/components/ClientOnly'
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url)
      const content = await page.content()
      expect(content).not.toContain('Rendered on client side')
    },
  )
})
