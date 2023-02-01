import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('Google Tag Manager script with Partytown enabled', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        '@storefront-x/partytown',
        '@storefront-x/google-tag-manager',
        '@storefront-x/google-tag-manager-partytown',
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
            config: { 'GOOGLE_TAG_MANAGER_ID.ts': `export default 'G-TESTER'` },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })

      await expect(page.locator('head script').first()).toHaveAttribute('type', /^text\/partytown/)
      await expect(page.locator('head')).toContainText(`forward: ["dataLayer.push"]`)
    },
  )
})
