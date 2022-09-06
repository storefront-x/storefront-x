import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('no index page', async ({ page }) => {
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
              '$layout.vue': `<template>Layout<RouterView /></template>`,
              '$404.vue': `<template>Correct text</template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('Correct text')
    },
  )
})
