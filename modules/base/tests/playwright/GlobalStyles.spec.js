import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('global styles are injected into html', async ({ page }) => {
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
              styles: {
                'style.css': `
                  body: {
                    background-color:red;
                  }
                `,
              },
            },
            pages: {
              'index.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('background-color:red')
    },
  )
})
