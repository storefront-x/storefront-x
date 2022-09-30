import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('modules order', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-a',
          {
            server: {
              middleware: {
                'a.js': `export default (req, res) => res.send('a')`,
              },
            },
          },
        ],
        [
          'app-b',
          {
            server: {
              middleware: {
                'b.js': `export default (req, res) => res.send('b')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('a')
    },
  )
})
