import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic server middleware', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              middleware: {
                'hello.js': `export default (req, res) => res.send('Hello, server middleware!')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, server middleware!')
    },
  )
})

test('hot module reloading', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              middleware: {
                'hello.js': `export default (req, res) => res.send('Hello, server middleware!')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await writeFile('my-module/server/middleware/hello.js', `export default (req, res) => res.send('Hello, HMR!')`)
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, HMR!')
    },
  )
})

test('module overloading', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-1',
          {
            server: {
              middleware: {
                'hello.js': `export default (req, res) => res.send('Hello, server middleware!')`,
              },
            },
          },
        ],
        [
          'app-2',
          {
            server: {
              middleware: {
                'hello.js': `export default (req, res) => res.send('Overrided!')`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Overrided!')
    },
  )
})

test('typescript support', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              middleware: {
                'hello.ts': `
                  import type { Request, Response } from 'express'
                  export default (req: Request, res: Response) => res.send('typed')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('typed')
    },
  )
})

test('transient hmr', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            config: {
              'GREET.ts': `export default 'Hello, World!'`,
            },
            server: {
              middleware: {
                'hello.ts': `
                  import GREET from '#ioc/config/GREET'
                  export default (req, res) => res.send(GREET)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, World!')
      await writeFile('my-module/config/GREET.ts', `export default 'HMR'`)
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('HMR')
    },
  )
})

test('transient hmr with overriding', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'app-1',
          {
            config: {
              'GREET.ts': `export default 'Hello, World!'`,
            },
            server: {
              middleware: {
                'hello.ts': `
                  import GREET from '#ioc/config/GREET'
                  export default (req, res) => res.send(GREET)
                `,
              },
            },
          },
        ],
        [
          'app-2',
          {
            config: {
              'TEST.ts': `export default 'Hello, World!'`,
            },
            server: {
              middleware: {
                'hello.ts': `
                  import GREET from '#ioc/config/GREET'
                  export default (req, res) => res.send(GREET)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, World!')
      await writeFile('app-2/config/GREET.ts', `export default 'HMR'`)
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('HMR')
    },
  )
})
