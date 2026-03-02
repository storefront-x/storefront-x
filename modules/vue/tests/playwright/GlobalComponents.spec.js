import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('global components', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
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
