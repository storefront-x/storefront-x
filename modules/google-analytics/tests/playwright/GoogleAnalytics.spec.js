import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('Google analytics script and correct ID in head', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/google-analytics',
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
      expect(await page.content()).toContain(
        '<script async="" type="text/javascript" src="https://www.googletagmanager.com/gtag/js?id=G-TESTER"></script>',
      )
    },
  )
})
