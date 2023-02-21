import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('web app manifest meta link is present in the html', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/web-app-manifest',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url, { waitUntil: 'networkidle' })
      expect(await response.text()).toContain('<link rel="manifest" href="/manifest.webmanifest">')
    },
  )
})

test('web app manifest route returns json response with schema', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/web-app-manifest',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/manifest.webmanifest', { waitUntil: 'networkidle' })
      const json = await response.json()
      expect(json.$schema).toEqual('https://json.schemastore.org/web-manifest-combined.json')
    },
  )
})

test('overriding fields of manifest', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/web-app-manifest',
        [
          'my-module',
          {
            pages: {
              'index.vue': `
                <template>
                  <h1>Hello, World!</h1>
                </template>
              `,
            },
            webAppManifest: {
              '$schema.ts': `export default 'schema'`,
              'name.ts': `export default 'name'`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const response = await page.goto(url + '/manifest.webmanifest', { waitUntil: 'networkidle' })
      const json = await response.json()
      expect(json.$schema).toEqual('schema')
      expect(json.name).toEqual('name')
    },
  )
})
