import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('Google Analytics script with Partytown enabled', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        '@storefront-x/partytown',
        '@storefront-x/google-analytics',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Heading</h1>
                </template>
              `,
            },
            config: { googleAnalytics: { 'GOOGLE_ANALYTICS_ID.ts': `export default 'G-TESTER'` } },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(
        page.locator('head script[src="https://www.googletagmanager.com/gtag/js?id=G-TESTER"]'),
      ).toHaveAttribute('type', 'text/partytown-x')
    },
  )
})
