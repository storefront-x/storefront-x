import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('Partytown scripts loaded properly', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/partytown',
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
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      expect(await page.evaluate(() => window.partytown)).toBeTruthy()
    },
  )
})
