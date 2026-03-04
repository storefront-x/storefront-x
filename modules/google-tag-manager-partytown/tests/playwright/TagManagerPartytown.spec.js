import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('Google Tag Manager script with Partytown enabled', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/partytown',
        '@magexo/google-tag-manager',
        '@magexo/google-tag-manager-partytown',
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
      const response = await page.goto(url, { waitUntil: 'networkidle' })

      expect(await response.text()).toContain(`forward: ["dataLayer.push"]`)

      await expect(page.locator('head script').first()).toHaveAttribute('type', /^text\/partytown/)
    },
  )
})
