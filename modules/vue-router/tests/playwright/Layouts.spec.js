import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('layout in directory', async ({ page }) => {
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
              '$layout.vue': `<template><h1>root</h1><RouterView /></template>`,
              'index.vue': `<template><h2>root</h2></template>`,
              'nested': {
                '$layout.vue': `<template><h1>nested</h1><RouterView /></template>`,
                'index.vue': `<template><h2>nested</h2></template>`,
              },
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/nested', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('nested')
      await expect(page.locator('h2')).toContainText('nested')
    },
  )
})
