import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/google-analytics',
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
