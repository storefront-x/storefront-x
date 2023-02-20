import { expect, test } from '@playwright/test'
import { makeProject } from '@storefront-x/testing'

test('$app component', async ({ page }) => {
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
              '$app.vue': `<template>hello from app</template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('hello from app')
    },
  )
})

test('$app component with outlet', async ({ page }) => {
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
              '$app.vue': `
                <template>hello from <SfxLayoutOutlet /></template>
                <script setup>
                import SfxLayoutOutlet from '#ioc/components/SfxLayoutOutlet'
                </script>
              `,
              'index.vue': `<template>page</template>`,
            },
          },
        ],
      ],
    },
    async ({ url }) => {
      await page.goto(url + '/', { waitUntil: 'networkidle' })
      await expect(await page.content()).toContain('hello from page')
    },
  )
})
