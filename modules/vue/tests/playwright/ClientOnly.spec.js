import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('ClientOnly component renders only on the client side', async ({ page }) => {
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

test('ClientOnly component renders its fallback content before component is loaded', async ({ page }) => {
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
                      <template #fallback>
                        <p>Fallback content</p>
                      </template>
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
      expect(content).toContain('Fallback content')

      await page.waitForLoadState('networkidle')
      await expect(page.locator('h1')).toContainText('Rendered on client side')
      await expect(page.locator('p')).toBeHidden()
    },
  )
})
