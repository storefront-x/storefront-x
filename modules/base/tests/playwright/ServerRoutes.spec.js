import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

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
                'hello.js': `export default (req, res) => res.send('Hello, server routes!')`,
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
                'hello.js': `export default (req, res) => res.send('Hello, server routes!')`,
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
