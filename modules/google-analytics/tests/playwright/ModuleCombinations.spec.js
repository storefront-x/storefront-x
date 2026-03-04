import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/google-analytics',
      [
        'my-module',
        {
          config: {
            googleAnalytics: {
              'GOOGLE_ANALYTICS_ID.ts': `export default 'id'`,
            },
          },
        },
      ],
    ],
  })
})
