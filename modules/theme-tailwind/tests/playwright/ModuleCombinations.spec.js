import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/vue-router',
      '@magexo/atomic-design',
      '@magexo/vue-head',
      '@magexo/vue-i18n',
      '@magexo/theme-tailwind',
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
