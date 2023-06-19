import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/speed-curve',
      [
        'my-module',
        {
          config: {
            'speed-curve': {
              'SPEEDCURVE_ID.ts': `export default 'id'`,
            },
          },
        },
      ],
    ],
  })
})
