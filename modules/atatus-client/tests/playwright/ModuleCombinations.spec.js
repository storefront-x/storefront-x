import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('with only vue', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/atatus-client',
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
