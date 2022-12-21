import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('with only vue', async () => {
  await buildProject({
    modules: ['@storefront-x/base', '@storefront-x/vue', '@storefront-x/base-commerce'],
  })
})

test('with full vue stack', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/vue-router-simple',
      '@storefront-x/vue-head',
      '@storefront-x/vue-i18n',
      '@storefront-x/vue-pinia',
      '@storefront-x/base-commerce',
    ],
  })
})
