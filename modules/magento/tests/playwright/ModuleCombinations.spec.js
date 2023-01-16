import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test.only('minimal stack', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/vue-i18n',
      '@storefront-x/vue-pinia',
      '@storefront-x/base-commerce',
      '@storefront-x/graphql',
      '@storefront-x/magento',
    ],
  })
})

test.only('with full vue stack', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/vue-router-simple',
      '@storefront-x/vue-head',
      '@storefront-x/vue-i18n',
      '@storefront-x/vue-pinia',
      '@storefront-x/base-commerce',
      '@storefront-x/graphql',
      '@storefront-x/magento',
    ],
  })
})
