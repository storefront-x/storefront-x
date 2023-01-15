import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test.only('with only vue', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/sentry-server',
      [
        'my-module',
        {
          config: {
            sentry: {
              server: {
                'dsn.ts': `export default 'key'`,
              },
            },
          },
        },
      ],
    ],
  })
})
