import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/speed-curve',
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
