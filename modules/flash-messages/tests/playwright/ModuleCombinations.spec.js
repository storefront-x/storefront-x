import { test } from '@playwright/test'
import { buildProject } from '@magexo/testing'

test('with only vue', async () => {
  await buildProject({
    modules: ['@magexo/base', '@magexo/vue', '@magexo/flash-messages'],
  })
})
