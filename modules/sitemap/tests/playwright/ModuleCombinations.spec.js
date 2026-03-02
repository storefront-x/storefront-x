import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with only vue', async () => {
  await buildProject({
    modules: ['@magexo/base', '@magexo/vue', '@magexo/sitemap'],
  })
})

test('with vue-i18n', async () => {
  await buildProject({
    modules: [
      '@magexo/base',
      '@magexo/vue',
      '@magexo/vue-i18n',
      '@magexo/sitemap',
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
    modules: ['@magexo/base', '@magexo/vue', '@magexo/vue-router', '@magexo/sitemap'],
  })
})
