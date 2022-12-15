import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic router', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/solid',
        '@storefront-x/solid-router',
        [
          'my-module',
          {
            pages: {
              'index.jsx': `
                export default () => <h1>Hello from home!</h1>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello from home!')
    },
  )
})
