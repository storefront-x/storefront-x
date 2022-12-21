import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test.only('with vue', async () => {
  await buildProject({
    modules: [
      '@storefront-x/base',
      '@storefront-x/vue',
      '@storefront-x/vue-router-simple',
      '@storefront-x/atomic-design',
      '@storefront-x/vue-i18n',
      '@storefront-x/theme-tailwind',
    ],
  })
})
