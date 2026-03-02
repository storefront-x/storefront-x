import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with only vue', async () => {
  await buildProject({
    modules: ['@magexo/base', '@magexo/vue', '@magexo/base-commerce'],
  })
})

test('with full vue stack', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/vue-router',
      '@magexo/vue-head',
      '@magexo/vue-i18n',
      '@magexo/vue-pinia',
      '@magexo/base-commerce',
      [
        'my-module',
        {
          config: {
            'VUE_I18N_LOCALES.ts': `
            export default [
              {
                name: 'en',
                locale: 'en-US',
                prefix: '/',
              },
            ]
          `,
          },
        },
      ],
    ],
  })
})
