import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('with vue', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/vue-router',
      '@storefront-x/atomic-design',
      '@storefront-x/vue-head',
      '@storefront-x/vue-i18n',
      '@storefront-x/theme-tailwind',
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
