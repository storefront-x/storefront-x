import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/google-tag-manager',
      '@magexo/google-tag-manager-partytown',
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
