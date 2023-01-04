import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('redirect all pages to basic-auth page', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/basic-auth',
        [
          'my-module',
          {
            config: {
              'IS_PRODUCTION.ts': `export default true`,
              'BASIC_AUTH.ts': `export default 'test:test'`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Unauthorized')
    },
  )
})

test('working login with credentials', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/basic-auth',
        [
          'my-module',
          {
            pages: {
              'index.vue': `<template><h1>BEHIND AUTH</h1></template>`,
            },
            config: {
              'IS_PRODUCTION.ts': `export default true`,
              'BASIC_AUTH.ts': `export default 'test:pass'`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/a', { waitUntil: 'networkidle' })
      await page.locator("[name='username']").fill('test')
      await page.locator("[name='password']").fill('pass')
      await page.locator("[type='submit']").click()
      expect(await page.content()).toContain('BEHIND AUTH')
    },
  )
})
