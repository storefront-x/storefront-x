import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('simple beforeEach guard', async ({ page }) => {
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
              },
              'sign-in.vue': `<template><main>Sign in</main></template>`,
            },
            vueRouter: {
              beforeEach: {
                'auth.js': `
                export default (to, from, ctx) => {
                  const isRestricted = to.path.startsWith('/account')

                  if (isRestricted && to.name !== 'sign-in') {
                    ctx.redirect = '/sign-in'

                    return { name: 'sign-in', force: true }
                  } else {
                    return true
                  }
                }
                `,
              },
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

test('multiple beforeEach guards', async ({ page }) => {
  await makeProject(
    {
      modules: [
        '@storefront-x/base',
        '@storefront-x/vue',
        '@storefront-x/vue-router',
        [
          'my-module-A',
          {
            pages: {
              'account': {
                'index.vue': `<template><h1>Index</h1></template>`,
              },
              'sign-in.vue': `<template><main>Sign in</main></template>`,
            },
            vueRouter: {
              beforeEach: {
                'auth.js': `
                export default (to, from, ctx) => {
                  if(from.name === 'sign-up') {
                    return true
                  }
                  const isRestricted = to.path.startsWith('/account')

                  if (isRestricted && to.name !== 'sign-in') {
                    ctx.redirect = '/sign-in'

                    return { name: 'sign-in', force: true }
                  } else {
                    return true
                  }
                }
                `,
              },
            },
          },
        ],
        [
          'my-module-B',
          {
            pages: {
              'sign-up.vue': `<template><main>Sign up</main></template>`,
            },
            vueRouter: {
              beforeEach: {
                'authToSignUp.js': `
                export default (to, from, ctx) => {

                  if (to.name === 'sign-in') {
                    ctx.redirect = '/sign-up'

                    return { name: 'sign-up', force: true }
                  } else {
                    return true
                  }
                }
                `,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/account', { waitUntil: 'networkidle' })
      await expect(page.locator('body')).toContainText('Sign up')
    },
  )
})
