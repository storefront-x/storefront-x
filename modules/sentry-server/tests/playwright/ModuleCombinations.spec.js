import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with only vue', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/sentry-server',
      [
        'my-module',
        {
          config: {
            sentry: {
              server: {
                'dsn.ts': `export default 'https://examplePublicKey@o0.ingest.sentry.io/0'`,
              },
            },
          },
        },
      ],
    ],
  })
})
