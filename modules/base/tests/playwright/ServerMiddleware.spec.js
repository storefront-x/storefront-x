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
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Hello, server middleware!')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url)
      await expect(await response.text()).toContain('Hello, server middleware!')
    },
  )
})

test('basic server middleware under deep URL', async ({ page }) => {
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
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Hello, server middleware!')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/deep/url')
      await expect(await response.text()).toContain('Hello, server middleware!')
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
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Hello, server middleware!')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      await writeFile(
        'my-module/server/middleware/hello.js',
        `
          import { eventHandler } from 'h3'
          export default eventHandler(() => 'Hello, HMR!')
        `,
      )

      const response = await page.goto(url)
      await expect(await response.text()).toContain('Hello, HMR!')
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
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Hello, server middleware!')
                `,
              },
            },
          },
        ],
        [
          'app-2',
          {
            server: {
              middleware: {
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Overrided!')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url)
      await expect(await response.text()).toContain('Overrided!')
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
                  import { eventHandler, H3Event } from 'h3'
                  export default eventHandler((event: H3Event) => 'typed')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url)
      await expect(await response.text()).toContain('typed')
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
                  import { eventHandler } from 'h3'
                  import GREET from '#ioc/config/GREET'
                  export default eventHandler(() => GREET)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      const response1 = await page.goto(url)
      await expect(await response1.text()).toContain('Hello, World!')
      await writeFile('my-module/config/GREET.ts', `export default 'HMR'`)
      const response2 = await page.goto(url)
      await expect(await response2.text()).toContain('HMR')
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
                  import { eventHandler } from 'h3'
                  import GREET from '#ioc/config/GREET'
                  export default eventHandler(() => GREET)
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
                  import { eventHandler } from 'h3'
                  import GREET from '#ioc/config/GREET'
                  export default eventHandler(() => GREET)
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      const response1 = await page.goto(url)
      await expect(await response1.text()).toContain('Hello, World!')
      await writeFile('app-2/config/GREET.ts', `export default 'HMR'`)
      const response2 = await page.goto(url)
      await expect(await response2.text()).toContain('HMR')
    },
  )
})
