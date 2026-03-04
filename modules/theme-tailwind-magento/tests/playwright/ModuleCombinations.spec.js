import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/vue-pinia',
      '@magexo/vue-router',
      '@magexo/base-commerce',
      '@magexo/atomic-design',
      '@magexo/vue-head',
      '@magexo/vue-i18n',
      '@magexo/flash-messages',
      '@magexo/theme-tailwind-magento',
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
