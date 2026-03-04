import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('module combinations with base, vue & vue-router', async () => {
  await buildProject({
    modules: ['@magexo/base', '@magexo/vue', '@magexo/vue-router', '@magexo/web-app-manifest'],
  })
})
