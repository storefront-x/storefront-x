import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with only vue', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/atatus-client',
      [
        'my-module',
        {
          config: {
            'atatus-client': {
              'ATATUS_RUM_API_KEY.ts': `export default 'key'`,
            },
          },
        },
      ],
    ],
  })
})
