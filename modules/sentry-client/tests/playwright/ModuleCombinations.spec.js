import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with only vue', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/sentry-client',
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
