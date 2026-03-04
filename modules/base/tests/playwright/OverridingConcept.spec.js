import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('adding of nested files', async ({ page }) => {
  await makeProject(
    {
      modules: ['@magexo/base', ['my-module', {}]],
    },
    async ({ url, writeFile }) => {
      await writeFile('my-module/public/a/b/c.txt', 'Hello, nested!')
      await page.goto(url + '/a/b/c.txt', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, nested!')
    },
  )
})
