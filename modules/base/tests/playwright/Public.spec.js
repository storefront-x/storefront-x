import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic public file', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        [
          'app',
          {
            public: {
              'hello.txt': `Hello, public file!`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/hello.txt', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, public file!')
    },
  )
})

test('basic public file in nested directory', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        [
          'app',
          {
            public: {
              a: {
                b: {
                  'hello.txt': `Hello, public file!`,
                },
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a/b/hello.txt', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, public file!')
    },
  )
})
