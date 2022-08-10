import { test, expect } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('removing files works with HMR', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module',
          {
            pages: {
              '$404.vue': `<template><h1>404</h1></template>`,
            },
            public: {
              'robots.txt': `robots`,
            },
          },
        ],
      ],
    },
    async ({ url, rm }) => {
      await rm('my-module/public/robots.txt')
      await page.goto(url + '/robots.txt', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('404')
    },
  )
})
