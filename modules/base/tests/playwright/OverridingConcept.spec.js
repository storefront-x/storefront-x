import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('adding of nested files', async ({ page }) => {
  await makeProject(
    {
      modules: ['@storefront-x/base', ['my-module', {}]],
    },
    async ({ url, writeFile }) => {
      await writeFile('my-module/public/a/b/c.txt', 'Hello, nested!')
      await page.goto(url + '/a/b/c.txt', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, nested!')
    },
  )
})
