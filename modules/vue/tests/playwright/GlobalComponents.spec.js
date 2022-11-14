import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('global components', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            global: {
              components: {
                'MyGlobalComponent.vue': `
                  <template>
                    MyGlobalComponent
                  </template>
                `,
              },
            },
            pages: {
              'index.vue': `
                <template>
                  <h1>
                    <MyGlobalComponent />
                  </h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('MyGlobalComponent')
    },
  )
})
