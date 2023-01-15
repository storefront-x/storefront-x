import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('with only vue', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/sentry-client',
      [
        'my-module',
        {
          config: {
            sentry: {
              client: {
                'dsn.ts': `export default 'key'`,
              },
            },
          },
        },
      ],
    ],
  })
})
