import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('redirect to base auth', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/basic-auth',
        [
          'my-module',
          {
            config: {
              'IS_PRODUCTION.ts': `export default true`,
              'BASIC_AUTH.ts': `export default 'test:test'`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Unauthorized')
    },
  )
})
