import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/google-tag-manager',
      [
        'my-module',
        {
          config: {
            'GOOGLE_TAG_MANAGER_ID.ts': `export default 'id'`,
          },
        },
      ],
    ],
  })
})
