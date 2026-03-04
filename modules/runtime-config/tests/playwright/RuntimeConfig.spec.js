import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('en translation', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/runtime-config',
        [
          'my-module',
          {
            runtime: {
              config: {
                'RUNTIME_TESTING.ts': `export default process.env.RUNTIME_TESTING`,
              },
            },
            pages: {
              'index.vue': `
                <template>
                  <h1>{{ RUNTIME_TESTING }}</h1>
                </template>
                <script setup>
                import getRuntimeConfigValue from '#ioc/utils/getRuntimeConfigValue'

                const RUNTIME_TESTING = getRuntimeConfigValue('RUNTIME_TESTING')
                </script>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      process.env.RUNTIME_TESTING = 'Hello, World!'
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})
