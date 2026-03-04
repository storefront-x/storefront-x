import { test, expect } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('sitemap with locale prefix', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/vue-i18n',
        '@magexo/vue-pinia',
        '@magexo/sitemap',
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
      const response1 = await page.goto(url + '/sitemap.xml')
      await expect(await response1.text()).toContain('/sign-in')
      const response2 = await page.goto(url + '/cz/sitemap.xml')
      await expect(await response2.text()).toContain('/cz/sign-in')
    },
  )
})

test('sitemap with translated routes', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
        '@magexo/vue-i18n',
        '@magexo/sitemap',
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
      const response1 = await page.goto(url + '/sitemap.xml')
      await expect(await response1.text()).toContain('/sign-in')
      const response2 = await page.goto(url + '/cz/sitemap.xml')
      await expect(await response2.text()).toContain('/cz/prihlasit')
    },
  )
})
