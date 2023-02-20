import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('sitemap with locale prefix', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-i18n',
        '@storefront-x/vue-pinia',
        '@storefront-x/sitemap',
        [
          'demo',
          {
            pages: {
              'index.vue': `<template><h1>Hello from home!</h1></template>`,
              'sign-in.vue': `<template><h1>Sign in page</h1></template>`,
              '$404.vue': `<template><h1>Error</h1></template>`,
            },
            config: {
              'VUE_I18N_LOCALES.ts': `export default [
                    {
                      name: 'en',
                      locale: 'en-US',
                      prefix: '/',
                    },
                    {
                      name: 'cz',
                      locale: 'cs-CZ',
                      prefix: '/cz',
                    },
                  ]
                  `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/sitemap.xml', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('https://localhost/sign-in')
      await page.goto(url + '/cz/sitemap.xml', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('https://localhost/cz/sign-in')
    },
  )
})

test('sitemap with translated routes', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        '@storefront-x/vue-i18n',
        '@storefront-x/sitemap',
        [
          'demo',
          {
            pages: {
              'index.vue': `<template><h1>Hello from home!</h1></template>`,
              'sign-in.vue': `<template><h1>Sign in page</h1></template>`,
              '$404.vue': `<template><h1>Error</h1></template>`,
            },
            config: {
              'VUE_I18N_LOCALES.ts': `export default [
                    {
                      name: 'en',
                      locale: 'en-US',
                      prefix: '/',
                    },
                    {
                      name: 'cz',
                      locale: 'cs-CZ',
                      prefix: '/cz',
                    },
                  ]
                  `,
              'VUE_I18N_ROUTE_PATHS.ts': `export default {
                  '/sign-in': {
                    cz: '/prihlasit',
                    en: '/sign-in',
                  },
                }
                  `,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/sitemap.xml', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('https://localhost/sign-in')
      await page.goto(url + '/cz/sitemap.xml', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('https://localhost/cz/prihlasit')
    },
  )
})
