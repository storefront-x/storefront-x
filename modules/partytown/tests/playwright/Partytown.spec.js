import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('Partytown scripts loaded properly', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router-simple',
        '@storefront-x/partytown',
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
      const pageContent = await page.content()
      await expect(pageContent).toContain(`<script type="text/javascript">partytown = { debug: false, forward: [],`)
      await expect(pageContent).toContain(`<script type="text/javascript">/* Partytown 0.7.5 - MIT builder.io */`)
    },
  )
})
