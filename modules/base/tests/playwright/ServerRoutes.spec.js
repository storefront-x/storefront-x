import { test, expect } from '@playwright/test'
import { buildProject, makeProject } from '@storefront-x/testing'

test('basic server route', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              routes: {
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Hello, server routes!')
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/hello', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Hello, server routes!')
    },
  )
})

test('request on different path doesnt invoke server route', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              routes: {
                'hello.js': `
                  import { eventHandler } from 'h3'
                  export default eventHandler(() => 'Hello, server routes!')
                `,
              },
            },
            base: {
              templates: {
                'App.vue': `<template><h1>Hello, World!</h1></template>`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, World!')
    },
  )
})

test('server route with path prefix', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              routes: {
                '[prefix]': {
                  'hello.js': `
                    import { eventHandler, getRequestURL } from 'h3'
                    export default eventHandler((event) => getRequestURL(event))
                  `,
                },
                'hello.js': `
                    import { eventHandler, getRequestURL } from 'h3'
                    export default eventHandler((event) => getRequestURL(event))
                  `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response1 = await page.goto(url + '/sk/hello')
      await expect(await response1.text()).toContain('/sk/hello')
      const response2 = await page.goto(url + '/sk/hello')
      await expect(await response2.text()).toContain('/hello')
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
              routes: {
                'hello.js': `
                    import { eventHandler } from 'h3'
                    export default eventHandler((event) => 'a')
                  `,
              },
            },
          },
        ],
      ],
    },
    async ({ url, writeFile }) => {
      const response1 = await page.goto(url + '/hello')
      await expect(await response1.text()).toBe('a')

      await writeFile(
        'my-module/server/routes/hello.js',
        `
          import { eventHandler } from 'h3'
          export default eventHandler((event) => 'b')
        `,
      )

      const response2 = await page.goto(url + '/hello')
      await expect(await response2.text()).toBe('b')
    },
  )
})

test('deep nested routes in dev', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              routes: {
                _api: {
                  '[...].js': `
                    import { eventHandler } from 'h3'
                    export default eventHandler((event) => 'a')
                  `,
                },
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/_api/a/b/c/d')
      await expect(await response.text()).toBe('a')
    },
  )
})

test('deep nested routes in prod', async ({ page }) => {
  await buildProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        [
          'my-module',
          {
            server: {
              routes: {
                _api: {
                  '[...].js': `
                    import { eventHandler } from 'h3'
                    export default eventHandler((event) => 'a')
                  `,
                },
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/_api/a/b/c/d')
      await expect(await response.text()).toBe('a')
    },
  )
})
