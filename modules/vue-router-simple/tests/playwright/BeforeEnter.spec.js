import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('simple beforeEnter guard', async ({ page }) => {
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
              'account': {
                'index.vue': `<template><h1>Index</h1></template>`,
                'index.beforeEnter.ts': `
                export default (to: any, from: any, next: any) => {
                  next('/sign-in')
                }
                `,
              },
              'sign-in.vue': `<template><main>Sign in</main></template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/account', { waitUntil: 'networkidle' })
      await expect(page.locator('body')).toContainText('Sign in')
    },
  )
})
