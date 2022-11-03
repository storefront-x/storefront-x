import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic application', async ({ page }) => {
  await makeProject(
    {
      modules: ['@storefront-x/base', '@storefront-x/solid'],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, Storefront X!')
    },
  )
})
