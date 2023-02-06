import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test.only('redirect all pages to cookie-auth page', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/cookie-auth',
        [
          'my-module',
          {
            config: {
              'IS_PRODUCTION.ts': `export default true`,
              'cookieAuth': {
                'credentials.ts': `export default 'test:test'`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(await page.locator('h1')).toContainText('Unauthorized')
    },
  )
})

test.only('working login with credentials', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/cookie-auth',
        [
          'my-module',
          {
            pages: {
              'index.vue': `<template><h1>BEHIND AUTH</h1></template>`,
            },
            config: {
              'IS_PRODUCTION.ts': `export default true`,
              'cookieAuth': {
                'credentials.ts': `export default 'test:pass'`,
              },
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
      await expect(page.locator('h1')).toContainText('BEHIND AUTH')
    },
  )
})
