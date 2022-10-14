import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('modules order', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-a',
          {
            server: {
              middleware: {
                'a.js': `export default (req, res) => res.send('a')`,
              },
            },
          },
        ],
        [
          'app-b',
          {
            server: {
              middleware: {
                'b.js': `export default (req, res) => res.send('b')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('a')
    },
  )
})

test('modules order back', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-b',
          {
            server: {
              middleware: {
                'b.js': `export default (req, res) => res.send('b')`,
              },
            },
          },
        ],
        [
          'app-a',
          {
            server: {
              middleware: {
                'a.js': `export default (req, res) => res.send('a')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('b')
    },
  )
})

test('when server middleware from frist module is change, it still returns first module but with changed value', async ({
  page,
}) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-a',
          {
            server: {
              middleware: {
                'a.js': `export default (req, res) => res.send('a')`,
              },
            },
          },
          'app-b',
          {
            server: {
              middleware: {
                'b.js': `export default (req, res) => res.send('b')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('a')
      await writeFile('app-a/server/middleware/a.js', `export default (req, res) => res.send('c')`)
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('c')
    },
  )
})

test('when server middleware from second module is changed, it still returns response from first module', async ({
  page,
}) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-a',
          {
            server: {
              middleware: {
                'a.js': `export default (req, res) => res.send('a')`,
              },
            },
          },
          'app-b',
          {
            server: {
              middleware: {
                'b.js': `export default (req, res) => res.send('b')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('a')
      await writeFile('app-b/server/middleware/b.js', `export default (req, res) => res.send('c')`)
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('a')
    },
  )
})

test('when new file is added to second module, it still returns value from first module', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-a',
          {
            server: {
              middleware: {
                'a.js': `export default (req, res) => res.send('a')`,
              },
            },
          },
          'app-b',
          {
            server: {
              middleware: {
                'b.js': `export default (req, res) => res.send('b')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('a')
      await writeFile('app-b/server/middleware/c.js', `export default (req, res) => res.send('c')`)
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('a')
    },
  )
})

test('add new file to first module but return value as before', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-a',
          {
            server: {
              middleware: {
                'ab.js': `export default (req, res) => res.send('ab')`,
              },
            },
          },
          'app-b',
          {
            server: {
              middleware: {
                'b.js': `export default (req, res) => res.send('b')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('ab')
      await writeFile('app-a/server/middleware/aa.js', `export default (req, res) => res.send('aa')`)
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('ab')
    },
  )
})
