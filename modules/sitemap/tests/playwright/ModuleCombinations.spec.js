import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('with only vue', async () => {
  await buildProject({
    modules: ['@storefront-x/base', '@storefront-x/vue', '@storefront-x/sitemap'],
  })
})

test('with vue-i18n', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/vue-i18n',
      '@storefront-x/sitemap',
      [
        'my-module',
        {
          config: {
            'VUE_I18N_LOCALES.ts': `export default [
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

test('with vue-router', async () => {
  await buildProject({
    modules: ['@storefront-x/base', '@storefront-x/vue', '@storefront-x/vue-router', '@storefront-x/sitemap'],
  })
})
