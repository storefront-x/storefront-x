import { test, expect } from '@playwright/test'
import { makeProject, wrapConsole } from '@storefront-x/testing'

test('redirect all pages to cookie-auth page', async ({ page }) => {
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

test('working login with credentials', async ({ page }) => {
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

test('returns status code 401 Unauthorized', async () => {
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
      await wrapConsole(async () => {
        const responseWithoutRedirecting = await fetch(url, { redirect: 'manual' })
        expect(responseWithoutRedirecting.status).toEqual(302)
        const response = await fetch(url, { waitUntil: 'networkidle' })
        expect(response.status).toEqual(401)
      })
    },
  )
})

test('fallback with header', async ({ browser }) => {
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
                'credentials.ts': `export default 'user:password'`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      const page = await browser.newPage({
        extraHTTPHeaders: {
          'X-SFX-Cookie-Auth': 'dXNlcjpwYXNzd29yZAo=',
        },
      })

      await page.goto(url, { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('BEHIND AUTH')
    },
  )
})
