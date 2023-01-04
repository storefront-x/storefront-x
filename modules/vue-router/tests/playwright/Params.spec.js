import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('basic params', async ({ page }) => {
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
              hello: {
                '[name].vue': `<template><h1>Hello, {{ $route.params.name }}!</h1></template>`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/hello/Params', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Hello, Params!')
    },
  )
})

test('navigating to named route with params', async ({ page }) => {
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
              'index.vue': `<template><button @click="$router.push({name: 'hello/[name]', params: { name: 'Params' }})">Click me</button></template>`,
              'hello': {
                '[name].vue': `<template><h1>Hello, {{ $route.params.name }}!</h1></template>`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('button').click()
      await expect(page.locator('h1')).toContainText('Hello, Params!')
    },
  )
})
