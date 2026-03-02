import { expect, test } from '@playwright/test'
import { makeProject } from '@magexo/testing'

test('simple beforeEnter guard', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@magexo/base',
        '@magexo/vue',
        '@magexo/vue-router',
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
