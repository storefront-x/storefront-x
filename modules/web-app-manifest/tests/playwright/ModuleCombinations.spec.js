import { test } from '@playwright/test'
import { buildProject } from '@storefront-x/testing'

test('module combinations with base, vue & vue-router', async () => {
  await buildProject({
    modules: ['@storefront-x/base', '@storefront-x/vue', '@storefront-x/vue-router', '@storefront-x/web-app-manifest'],
  })
})
